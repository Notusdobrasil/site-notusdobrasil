// 1. Importa os pacotes necessários
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data'); // Necessário para o upload de currículo

// 2. Configura a aplicação Express
const app = express();
const port = process.env.PORT || 3000;

// Configuração do Multer para upload de arquivos em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 3. Habilita Middlewares
const corsOptions = {
  origin: [
    'https://www.notus.ind.br',
    'https://notus.ind.br',
    'http://127.0.0.1:5500'
  ]
};
app.use(cors(corsOptions));
app.use(express.json());


// --- ROTA DA NEWSLETTER (Funcional) ---
app.post('/api/subscribe', async (req, res) => {
  const { name, email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O e-mail é obrigatório.' });
  }
  const { MAILRELAY_HOST, MAILRELAY_API_KEY, MAILRELAY_GROUP_ID } = process.env;
  const data = {
    email: email, name: name || '', groups: [MAILRELAY_GROUP_ID], status: 'active',
  };
  const config = {
    headers: { 'Content-Type': 'application/json', 'X-Auth-Token': MAILRELAY_API_KEY, },
  };
  try {
    await axios.post(`${MAILRELAY_HOST}/api/v1/subscribers`, data, config);
    return res.status(200).json({ status: 'success', message: 'Inscrição realizada com sucesso!' });
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || 'Não foi possível completar a inscrição.';
    return res.status(500).json({ status: 'error', message: errorMessage });
  }
});


// --- ROTA PARA ENVIAR CURRÍCULO (CORREÇÃO FINAL com multipart/form-data) ---
app.post('/api/enviar-curriculo', upload.single('curriculo'), async (req, res) => {
  const { nome, email } = req.body;
  const curriculo = req.file;
  if (!nome || !email || !curriculo) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const { MAILRELAY_HOST, MAILRELAY_API_KEY } = process.env;

  // Cria um formulário multipart para enviar para a API
  const form = new FormData();

  // Adiciona os campos de texto ao formulário
  form.append('from[name]', 'Notus Vagas');
  form.append('from[email]', 'marketing@notus.ind.br');
  form.append('to[0][name]', 'RH Notus');
  form.append('to[0][email]', 'recursoshumanos@notus.ind.br');
  form.append('subject', `Novo Currículo Recebido: ${nome}`);
  form.append('html_part', `<p>Olá,</p><p>Um novo currículo foi enviado através do site.</p><p><strong>Nome:</strong> ${nome}</p><p><strong>E-mail:</strong> ${email}</p><p>O currículo está anexado a este e-mail.</p>`);
  
  // Adiciona o arquivo ao formulário (a partir do buffer em memória)
  form.append('attachments[0]', curriculo.buffer, {
    filename: curriculo.originalname,
    contentType: curriculo.mimetype,
  });

  const config = {
    headers: {
      'X-Auth-Token': MAILRELAY_API_KEY,
      ...form.getHeaders() // Adiciona os headers corretos para o multipart
    },
  };

  try {
    await axios.post(`${MAILRELAY_HOST}/api/v1/send_emails`, form, config);
    res.status(200).json({ message: 'Currículo enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail de currículo via API:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Falha ao enviar o currículo. Tente novamente.' });
  }
});


// --- ROTA PARA FORMULÁRIO DE GARANTIA (Funcional) ---
app.post('/api/enviar-garantia', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }
  const { MAILRELAY_HOST, MAILRELAY_API_KEY } = process.env;
  const data = {
    from: { name: 'Notus Garantia', email: 'marketing@notus.ind.br' },
    to: [{ name: 'Garantia Notus', email: 'garantia@notus.ind.br' }],
    reply_to: [{ name: nome, email: email }],
    subject: `Contato via Formulário de Garantia: ${nome}`,
    html_part: `<p>Você recebeu uma nova mensagem através do formulário de garantia do site.</p><hr><p><strong>Nome:</strong> ${nome}</p><p><strong>E-mail:</strong> ${email}</p><p><strong>Mensagem:</strong></p><p>${mensagem.replace(/\n/g, "<br>")}</p><hr>`,
  };
  const config = {
    headers: { 'Content-Type': 'application/json', 'X-Auth-Token': MAILRELAY_API_KEY },
  };
  try {
    await axios.post(`${MAILRELAY_HOST}/api/v1/send_emails`, data, config);
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail de garantia via API:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Falha ao enviar a mensagem. Tente novamente.' });
  }
});


// --- ROTA PARA FORMULÁRIO DE CONTATO (Funcional) ---
app.post('/api/enviar-contato', async (req, res) => {
  const { nome, sobrenome, email, telefone, mensagem } = req.body;
  if (!nome || !email || !mensagem || !telefone) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }
  const { MAILRELAY_HOST, MAILRELAY_API_KEY } = process.env;
  const nomeCompleto = `${nome} ${sobrenome || ''}`.trim();
  const data = {
    from: { name: 'Notus Contato', email: 'marketing@notus.ind.br' },
    to: [{ name: 'Contato Notus', email: 'Pedro.latorre@notus.ind.br' }],
    reply_to: [{ name: nomeCompleto, email: email }],
    subject: `Contato via Site: ${nomeCompleto}`,
    html_part: `<p>Você recebeu uma nova mensagem através do formulário de contato do site.</p><hr><p><strong>Nome:</strong> ${nomeCompleto}</p><p><strong>E-mail:</strong> ${email}</p><p><strong>Telefone:</strong> ${telefone}</p><p><strong>Mensagem:</strong></p><p>${mensagem.replace(/\n/g, "<br>")}</p><hr>`,
  };
  const config = {
    headers: { 'Content-Type': 'application/json', 'X-Auth-Token': MAILRELAY_API_KEY },
  };
  try {
    await axios.post(`${MAILRELAY_HOST}/api/v1/send_emails`, data, config);
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail de contato via API:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Falha ao enviar a mensagem. Tente novamente.' });
  }
});


// 5. Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});