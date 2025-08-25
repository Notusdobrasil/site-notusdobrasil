// 1. Importa os pacotes necessários
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');

// 2. Configura a aplicação Express
const app = express();
const port = process.env.PORT || 3000;

// Configuração do Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 3. Habilita Middlewares
// --- AJUSTE DE CORS PARA PRODUÇÃO ---
// Permite requisições apenas do seu domínio principal
const corsOptions = {
  // ATENÇÃO: Substitua pela URL final do seu site!
  origin: [
    'http://127.0.0.1:5500',
    'https://www.notus.ind.br',
    'https://notus.ind.br',
    'https://backend-site-notusdobrasil.onrender.com'
  ]
};
app.use(cors(corsOptions));
app.use(express.json());


// --- AJUSTE DE ORGANIZAÇÃO ---
// 4. Configura o Transporter do Nodemailer UMA VEZ
// Ele será reutilizado por todas as rotas que enviam e-mail
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // O bloco TLS INSEGURO foi REMOVIDO daqui.
});


// --- ROTA DA NEWSLETTER ---
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

// --- ROTA PARA ENVIAR CURRÍCULO ---
app.post('/api/enviar-curriculo', upload.single('curriculo'), async (req, res) => {
  const { nome, email } = req.body;
  const curriculo = req.file;
  if (!nome || !email || !curriculo) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }
  try {
    await transporter.sendMail({
      from: `"Notus do Brasil - Vagas" <${process.env.SMTP_USER}>`,
      to: 'recursoshumanos@notus.ind.br',
      subject: `Novo Currículo Recebido: ${nome}`,
      html: `<p>Olá,</p><p>Um novo currículo foi enviado através do site.</p><p><strong>Nome:</strong> ${nome}</p><p><strong>E-mail:</strong> ${email}</p><p>O currículo está anexado a este e-mail.</p>`,
      attachments: [{ filename: curriculo.originalname, content: curriculo.buffer }],
    });
    res.status(200).json({ message: 'Currículo enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail de currículo:', error);
    res.status(500).json({ message: 'Falha ao enviar o currículo. Tente novamente.' });
  }
});

// --- ROTA PARA FORMULÁRIO DE GARANTIA ---
app.post('/api/enviar-garantia', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }
  try {
    await transporter.sendMail({
      from: `"Notus do Brasil - Garantia" <${process.env.SMTP_USER}>`,
      to: 'garantia@notus.ind.br',
      replyTo: email,
      subject: `Contato via Formulário de Garantia: ${nome}`,
      html: `<p>Você recebeu uma nova mensagem através do formulário de garantia do site.</p><hr><p><strong>Nome:</strong> ${nome}</p><p><strong>E-mail:</strong> ${email}</p><p><strong>Mensagem:</strong></p><p>${mensagem.replace(/\n/g, "<br>")}</p><hr>`,
    });
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail de garantia:', error);
    res.status(500).json({ message: 'Falha ao enviar a mensagem. Tente novamente.' });
  }
});

// --- ROTA PARA FORMULÁRIO DE CONTATO ---
app.post('/api/enviar-contato', async (req, res) => {
  const { nome, sobrenome, email, telefone, mensagem } = req.body;
  if (!nome || !email || !mensagem || !telefone) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }
  try {
    const nomeCompleto = `${nome} ${sobrenome || ''}`.trim();
    await transporter.sendMail({
      from: `"Notus do Brasil - Contato" <${process.env.SMTP_USER}>`,
      to: 'contato@notus.ind.br',
      replyTo: email,
      subject: `Contato via Site: ${nomeCompleto}`,
      html: `<p>Você recebeu uma nova mensagem através do formulário de contato do site.</p><hr><p><strong>Nome:</strong> ${nomeCompleto}</p><p><strong>E-mail:</strong> ${email}</p><p><strong>Telefone:</strong> ${telefone}</p><p><strong>Mensagem:</strong></p><p>${mensagem.replace(/\n/g, "<br>")}</p><hr>`,
    });
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail de contato:', error);
    res.status(500).json({ message: 'Falha ao enviar a mensagem. Tente novamente.' });
  }
});

// 5. Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});