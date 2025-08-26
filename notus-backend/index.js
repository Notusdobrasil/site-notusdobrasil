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
const MAIL_TO_CONTATO    = process.env.MAIL_TO_CONTATO   || 'contato@notus.ind.br';
const MAIL_TO_GARANTIA   = process.env.MAIL_TO_GARANTIA  || 'garantia@notus.ind.br';
const MAILRELAY_GROUP_ID = process.env.MAILRELAY_GROUP_ID;
const LOGO_URL           = process.env.LOGO_URL || 'https://www.notus.ind.br/images/logo-notus-branco.png';

// SMTP (para currículo e fallbacks)
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
  ],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 4) Helpers Mailrelay + SMTP
function mrHeaders() {
  return {
    headers: { 'Content-Type': 'application/json', 'X-Auth-Token': MAILRELAY_API_KEY },
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

// 5) Template de e-mail (fundo azul + logo)
function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailTemplate({ title, preheader, sections = [], footerNote = 'Mensagem automática do site Notus.' }) {
  const rowsHtml = sections.map(sec => `
    <tr>
      <td style="padding:12px 0;font:600 14px/1.3 'Segoe UI',Arial,sans-serif;color:#111;">
        ${escapeHtml(sec.label)}
      </td>
      <td class="cell" style="padding:12px 0 12px 12px;font:400 14px/1.5 'Segoe UI',Arial,sans-serif;color:#333;">
        ${sec.html ? sec.html : escapeHtml(sec.value || '')}
      </td>
    </tr>
  `).join('');

  const html = `<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .wrapper { background:#0f1115 !important; }
      .card { background:#161a21 !important; border-color:#1f2530 !important; }
      .title { color:#e7eaf0 !important; }
      .muted { color:#aab3c5 !important; }
      .cell { color:#d7dbe3 !important; }
    }
    a { color:#e2ecff; text-decoration:none; }
  </style>
</head>
<body style="margin:0;padding:0;background:#134596;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${escapeHtml(preheader || '')}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="wrapper"
         style="background:linear-gradient(180deg,#134596 0%, #e8edf6 100%);padding:24px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;">
          <tr>
            <td style="padding:16px 0;text-align:center;">
              <img src="${LOGO_URL}" alt="Notus" width="200" style="max-width:100%;height:auto;display:inline-block;">
              <div class="muted" style="font:400 12px/1.4 'Segoe UI',Arial,sans-serif;color:#e0e6f0;margin-top:6px;">
                www.notus.ind.br
              </div>
            </td>
          </tr>

          <tr>
            <td class="card" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;box-shadow:0 6px 18px rgba(0,0,0,.06);">
              <div class="title" style="font:700 20px/1.2 'Segoe UI',Arial,sans-serif;color:#0f172a;margin-bottom:12px;">
                ${escapeHtml(title)}
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${rowsHtml}
              </table>
            </td>
          </tr>

          <tr>
            <td style="text-align:center;padding:16px 8px;">
              <div class="muted" style="font:400 12px/1.5 'Segoe UI',Arial,sans-serif;color:#134596;">
                ${escapeHtml(footerNote)}
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    title, '',
    ...sections.map(s => `${s.label}: ${s.value ?? ''}`),
    '', footerNote
  ].join('\n');

  return { html, text };
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
// ROTA: Enviar Currículo (SMTP principal; Mailrelay opcional)
// ====================================================================
app.post('/api/enviar-curriculo', async (req, res) => {
  try {
    const { nome, email, attachments } = req.body;

    if (!nome || !email || !Array.isArray(attachments) || attachments.length === 0) {
      return res.status(400).json({ message: 'Todos os campos e o anexo são obrigatórios.' });
    }

    // Anexos: base64 -> Buffer
    const smtpAttachments = attachments.map((att, i) => {
      if (!att?.content) throw new Error(`Attachment #${i} sem 'content' (base64).`);
      return {
        filename: att.filename || att.name || `curriculo-${i + 1}.pdf`,
        content: Buffer.from(att.content, 'base64'),
        contentType: att.content_type || 'application/octet-stream',
      };
    });

    const transporter = buildSmtpTransport();
    if (!transporter) {
      return res.status(500).json({
        message: 'SMTP não configurado para envio de currículo.',
        details: 'Defina SMTP_HOST, SMTP_USER e SMTP_PASS nas variáveis do Render.'
      });
    }

    const tpl = buildEmailTemplate({
      title: `📎 Novo Currículo — ${nome}`,
      preheader: `${nome} enviou um currículo pelo site.`,
      sections: [
        { label: 'Nome', value: nome },
        { label: 'E-mail', value: email },
        { label: 'Status', value: 'Arquivo em anexo.' }
      ],
      footerNote: 'Recebido via Trabalhe Conosco — Notus.'
    });

    await transporter.sendMail({
      from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDR}>`,
      to: MAIL_TO_CURRICULO,
      subject: `📎 Novo Currículo — ${nome}`,
      html: tpl.html,
      text: tpl.text,
      replyTo: email,
      attachments: smtpAttachments,
    });

    return res.status(200).json({ message: 'Currículo enviado com sucesso (SMTP)!' });

    // (Opcional) quando Mailrelay liberar anexos por API, reativar bloco original aqui.
  } catch (error) {
    const status = error?.response?.status || 500;
    const details = error?.response?.data || error.message;
    console.error('Enviar Currículo ERROR:', status, details);
    return res.status(status).json({ message: 'Falha ao enviar o currículo.', details });
  }
});

// ====================================================================
// ROTA: Garantia (tenta Mailrelay; se "under review", fallback SMTP)
// ====================================================================
app.post('/api/enviar-garantia', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const tpl = buildEmailTemplate({
    title: `Garantia — ${nome}`,
    preheader: `Nova solicitação de garantia de ${nome}`,
    sections: [
      { label: 'Nome', value: nome },
      { label: 'E-mail', value: email },
      { label: 'Mensagem', html: `<div style="white-space:pre-wrap;">${escapeHtml(mensagem)}</div>` }
    ],
    footerNote: 'Recebido via Garantia — Notus.'
  });

  const mrPayload = {
    from: { name: MAIL_FROM_NAME, email: MAIL_FROM_ADDR },
    to:   [{ name: 'Garantia Notus', email: MAIL_TO_GARANTIA }],
    subject: `Garantia — ${nome}`,
    html_part: tpl.html,
    text_part: tpl.text
  };

  try {
    const mrResp = await mrSendEmail(mrPayload);
    console.log('Mailrelay Garantia OK:', mrResp.status, mrResp.data);
    return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    const status = error?.response?.status || 500;
    const details = error?.response?.data || error.message;
    const msgStr = JSON.stringify(details || '');
    console.error('Mailrelay Garantia ERROR:', status, details);

    // Fallback SMTP se "under review"
    const isUnderReview = /under review/i.test(msgStr);
    const transporter = buildSmtpTransport();

    if (isUnderReview && transporter) {
      try {
        await transporter.sendMail({
          from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDR}>`,
          to: MAIL_TO_GARANTIA,
          subject: `Garantia — ${nome}`,
          html: tpl.html,
          text: tpl.text,
          replyTo: email
        });
        return res.status(200).json({ message: 'Mensagem enviada com sucesso (SMTP fallback)!' });
      } catch (smtpErr) {
        console.error('SMTP Garantia fallback ERROR:', smtpErr.message);
      }
    }

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

  const tpl = buildEmailTemplate({
    title: `Contato do Site — ${nomeCompleto}`,
    preheader: `Nova mensagem de ${nomeCompleto}`,
    sections: [
      { label: 'Nome', value: nomeCompleto },
      { label: 'E-mail', value: email },
      { label: 'Telefone', value: telefone },
      { label: 'Mensagem', html: `<div style="white-space:pre-wrap;">${escapeHtml(mensagem)}</div>` }
    ],
    footerNote: 'Recebido via Contato — Notus.'
  });

  const mrPayload = {
    from: { name: MAIL_FROM_NAME, email: MAIL_FROM_ADDR },
    to:   [{ name: 'Contato Notus', email: MAIL_TO_CONTATO }],
    subject: `Contato do Site — ${nomeCompleto}`,
    html_part: tpl.html,
    text_part: tpl.text
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
          subject: `Contato do Site — ${nomeCompleto}`,
          html: tpl.html,
          text: tpl.text,
          replyTo: email
        });
        return res.status(200).json({ message: 'Mensagem enviada com sucesso (SMTP fallback)!' });
      } catch (smtpErr) {
        console.error('SMTP fallback ERROR:', smtpErr.message);
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
