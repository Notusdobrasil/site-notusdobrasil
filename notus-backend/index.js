// 1) Imports e setup básico
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// 2) Variáveis de ambiente (unificadas)
const MAILRELAY_HOST     = process.env.MAILRELAY_HOST;
const MAILRELAY_API_KEY  = process.env.MAILRELAY_API_KEY;
const MAIL_FROM_NAME     = process.env.MAIL_FROM_NAME || 'Notus Site';
const MAIL_FROM_ADDR     = process.env.MAIL_FROM_ADDR || 'marketing@notus.ind.br';
const MAIL_TO_CURRICULO  = process.env.MAIL_TO_CURRICULO || 'recursoshumanos@notus.ind.br';
const MAIL_TO_CONTATO    = process.env.MAIL_TO_CONTATO   || 'recursoshumanos@notus.ind.br';
const MAIL_TO_GARANTIA   = process.env.MAIL_TO_GARANTIA  || 'recursoshumanos@notus.ind.br';
const MAILRELAY_GROUP_ID = process.env.MAILRELAY_GROUP_ID;

// SMTP (para fallback do contato)
const SMTP_HOST    = process.env.SMTP_HOST;
const SMTP_PORT    = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE  = String(process.env.SMTP_SECURE || 'false') === 'true';
const SMTP_USER    = process.env.SMTP_USER;
const SMTP_PASS    = process.env.SMTP_PASS;

// 3) Middlewares
const corsOptions = {
  origin: [
    'https://www.notus.ind.br',
    'https://notus.ind.br',
    'http://127.0.0.1:5500',
    // Se tiver outro domínio/subdomínio na Locaweb, adicione aqui
  ],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 4) Helpers
function mrHeaders() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': MAILRELAY_API_KEY,
    },
    timeout: 20000,
  };
}
async function mrSendEmail(payload) {
  const url = `${MAILRELAY_HOST}/api/v1/send_emails`;
  return axios.post(url, payload, mrHeaders());
}
function buildSmtpTransport() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// ====================================================================
// ROTA: Newsletter
// ====================================================================
app.post('/api/subscribe', async (req, res) => {
  const { name, email } = req.body;
  if (!email) return res.status(400).json({ message: 'O e-mail é obrigatório.' });

  try {
    await axios.post(
      `${MAILRELAY_HOST}/api/v1/subscribers`,
      { email, name: name || '', groups: [MAILRELAY_GROUP_ID], status: 'active' },
      mrHeaders()
    );
    return res.status(200).json({ status: 'success', message: 'Inscrição realizada com sucesso!' });
  } catch (error) {
    const details = error?.response?.data?.error?.message || 'Não foi possível completar a inscrição.';
    return res.status(500).json({ status: 'error', message: details });
  }
});

// ====================================================================
// ROTA: Enviar Currículo (com anexos normalizados)
// ====================================================================
app.post('/api/enviar-curriculo', async (req, res) => {
  try {
    const { nome, email, attachments } = req.body;

    console.log('Currículo BODY:', {
      nome, email,
      hasAttachments: Array.isArray(attachments),
      attachmentsLen: Array.isArray(attachments) ? attachments.length : 0,
      firstAttachmentKeys: Array.isArray(attachments) && attachments[0] ? Object.keys(attachments[0]) : []
    });

    if (!nome || !email || !Array.isArray(attachments) || attachments.length === 0) {
      return res.status(400).json({ message: 'Todos os campos e o anexo são obrigatórios.' });
    }

    // Normaliza anexos (garante chaves e tipos)
    const safeAttachments = attachments.map((att, i) => {
      if (!att?.content) throw new Error(`Attachment #${i} sem 'content' (base64).`);
      return {
        // Algumas instâncias esperam "name"; mantemos ambos por compatibilidade
        name: att.name || att.filename || `curriculo-${i + 1}.pdf`,
        filename: att.filename || att.name || `curriculo-${i + 1}.pdf`,
        content: att.content, // base64 puro (sem data:...;base64,)
        content_type: att.content_type || 'application/octet-stream',
      };
    });

    const payload = {
      from: { name: MAIL_FROM_NAME, email: MAIL_FROM_ADDR },
      to:   [{ name: 'RH Notus', email: MAIL_TO_CURRICULO }],
      subject: `Novo Currículo Recebido: ${nome}`,
      html_part: `<p>Olá,</p>
                  <p>Um novo currículo foi enviado através do site.</p>
                  <p><strong>Nome:</strong> ${nome}</p>
                  <p><strong>E-mail:</strong> ${email}</p>
                  <p>O currículo está anexado a este e-mail.</p>`,
      text_part: `Novo currículo enviado.\nNome: ${nome}\nE-mail: ${email}`,
      attachments: safeAttachments,
    };

    const mrResp = await mrSendEmail(payload);
    console.log('Mailrelay Currículo OK:', mrResp.status, mrResp.data);
    return res.status(200).json({ message: 'Currículo enviado com sucesso!' });
  } catch (error) {
    const status = error?.response?.status || 500;
    const details = error?.response?.data || error.message;
    console.error('Mailrelay Currículo ERROR:', status, details);
    return res.status(status).json({ message: 'Falha ao enviar o currículo.', details });
  }
});

// ====================================================================
// ROTA: Garantia (direto Mailrelay)
// ====================================================================
app.post('/api/enviar-garantia', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const payload = {
    from: { name: MAIL_FROM_NAME, email: MAIL_FROM_ADDR },
    to:   [{ name: 'Garantia Notus', email: MAIL_TO_GARANTIA }],
    subject: `Contato via Formulário de Garantia: ${nome}`,
    html_part: `<p>Nova mensagem recebida via formulário de garantia:</p>
                <hr>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${mensagem.replace(/\n/g, '<br>')}</p>
                <hr>`,
    // Evitamos reply_to por enquanto (alguns ESPs bloqueiam domínios não autenticados)
  };

  try {
    const mrResp = await mrSendEmail(payload);
    console.log('Mailrelay Garantia OK:', mrResp.status, mrResp.data);
    return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    const status = error?.response?.status || 500;
    const details = error?.response?.data || error.message;
    console.error('Mailrelay Garantia ERROR:', status, details);
    return res.status(status).json({ message: 'Falha ao enviar a mensagem.', details });
  }
});

// ====================================================================
// ROTA: Contato (tenta Mailrelay; se "under review", fallback SMTP)
// ====================================================================
app.post('/api/enviar-contato', async (req, res) => {
  const { nome, sobrenome, email, telefone, mensagem } = req.body;
  if (!nome || !email || !mensagem || !telefone) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }
  const nomeCompleto = `${nome} ${sobrenome || ''}`.trim();

  // Payload enxuto primeiro (sem reply_to) para minimizar bloqueios
  const mrPayload = {
    from: { name: MAIL_FROM_NAME, email: MAIL_FROM_ADDR },
    to:   [{ name: 'Contato Notus', email: MAIL_TO_CONTATO }],
    subject: `Contato via Site: ${nomeCompleto}`,
    html_part: `<p><strong>Nome:</strong> ${nomeCompleto}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${telefone}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${mensagem.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    const mrResp = await mrSendEmail(mrPayload);
    console.log('Mailrelay Contato OK:', mrResp.status, mrResp.data);
    return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    const status = error?.response?.status || 500;
    const details = error?.response?.data || error.message;
    const messageStr = JSON.stringify(details || '');

    console.error('Mailrelay Contato ERROR:', status, details);

    // Fallback SMTP se "under review"
    const isUnderReview = /under review/i.test(messageStr);
    const transporter = buildSmtpTransport();

    if (isUnderReview && transporter) {
      try {
        await transporter.sendMail({
          from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDR}>`,
          to: MAIL_TO_CONTATO,
          subject: `Contato via Site: ${nomeCompleto}`,
          html: `<p><strong>Nome:</strong> ${nomeCompleto}</p>
                 <p><strong>E-mail:</strong> ${email}</p>
                 <p><strong>Telefone:</strong> ${telefone}</p>
                 <p><strong>Mensagem:</strong></p>
                 <p>${mensagem.replace(/\n/g, '<br>')}</p>`,
          // Evite replyTo com domínio externo até o ESP liberar
          // replyTo: `${nomeCompleto} <${email}>`,
        });
        return res.status(200).json({ message: 'Mensagem enviada com sucesso (SMTP fallback)!' });
      } catch (smtpErr) {
        console.error('SMTP fallback ERROR:', smtpErr.message);
        // Continua para o retorno padrão abaixo
      }
    }

    return res.status(status).json({ message: 'Falha ao enviar a mensagem.', details });
  }
});

// ====================================================================
// Start
// ====================================================================
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
