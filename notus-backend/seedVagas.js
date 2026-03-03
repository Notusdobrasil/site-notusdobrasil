/**
 * Script para adicionar vagas de exemplo ao sistema
 * 
 * Como usar:
 * 1. Certifique-se de que o servidor está rodando (npm start)
 * 2. Faça login primeiro alterando as credenciais abaixo
 * 3. Execute: node seedVagas.js
 */

const http = require('http');

// Configuração
const BASE_URL = 'http://localhost:3000';
const CREDENTIALS = {
  username: 'seu_usuario_aqui', // ALTERE PARA UM USUÁRIO VÁLIDO
  password: 'sua_senha_aqui'     // ALTERE PARA A SENHA CORRETA
};

// Variável para armazenar cookie de sessão
let sessionCookie = null;

/**
 * Faz uma requisição HTTP
 */
function makeRequest(method, path, data = null, useCookie = false, isJSON = true) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const headers = {};

    if (isJSON) {
      headers['Content-Type'] = 'application/json';
    }

    if (useCookie && sessionCookie) {
      headers['Cookie'] = sessionCookie;
    }

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: headers
    };

    const req = http.request(options, (res) => {
      let body = '';
      
      if (res.headers['set-cookie']) {
        sessionCookie = res.headers['set-cookie'][0].split(';')[0];
        console.log('📝 Cookie de sessão capturado');
      }

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ statusCode: res.statusCode, body: jsonBody });
        } catch (e) {
          resolve({ statusCode: res.statusCode, body: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(isJSON ? JSON.stringify(data) : data);
    }

    req.end();
  });
}

/**
 * Faz login
 */
async function login() {
  console.log('\n🔐 Fazendo login...');
  
  const response = await makeRequest('POST', '/api/admin/login', CREDENTIALS, false, true);
  
  if (response.statusCode === 200) {
    console.log('✅ Login bem-sucedido!');
    return true;
  } else {
    console.log('❌ Falha no login:', response.body);
    return false;
  }
}

/**
 * Cria uma vaga
 */
async function criarVaga(vaga) {
  console.log(`\n➕ Criando vaga: "${vaga.titulo}"`);
  
  const response = await makeRequest('POST', '/api/admin/vagas', vaga, true, true);
  
  if (response.statusCode === 201) {
    console.log(`✅ Vaga criada: ${response.body.id}`);
    return true;
  } else {
    console.log(`❌ Erro ao criar vaga:`, response.body);
    return false;
  }
}

/**
 * Vagas de exemplo
 */
const vagasExemplo = [
  {
    titulo: 'Desenvolvedor Full Stack',
    empresa: 'Notus Sistemas Térmicos',
    local: 'Jaraguá do Sul - SC',
    salario: 'R$ 5.000 - R$ 8.000',
    tipo: 'Tempo Integral',
    horario: 'Segunda a Sexta, 8h às 18h',
    descricao: 'Buscamos um desenvolvedor full stack experiente para integrar nossa equipe de TI.',
    responsabilidades: JSON.stringify([
      'Desenvolver e manter aplicações web',
      'Criar APIs RESTful',
      'Trabalhar com banco de dados SQL e NoSQL',
      'Colaborar com a equipe de design'
    ]),
    requisitos: JSON.stringify([
      '3+ anos de experiência com JavaScript',
      'Conhecimento em Node.js e React',
      'Experiência com SQL Server',
      'Inglês técnico (leitura)'
    ]),
    beneficios: JSON.stringify([
      'Vale alimentação',
      'Plano de saúde',
      'Home office flexível',
      'Auxílio educação'
    ]),
    nova: true
  },
  {
    titulo: 'Analista de Qualidade',
    empresa: 'Notus Sistemas Térmicos',
    local: 'Jaraguá do Sul - SC',
    salario: 'R$ 3.500 - R$ 5.500',
    tipo: 'Tempo Integral',
    horario: 'Segunda a Sexta, 8h às 18h',
    descricao: 'Procuramos profissional para garantir a qualidade de nossos produtos térmicos.',
    responsabilidades: JSON.stringify([
      'Realizar inspeções de qualidade',
      'Elaborar relatórios técnicos',
      'Implementar melhorias nos processos',
      'Auditar fornecedores'
    ]),
    requisitos: JSON.stringify([
      'Formação em Engenharia ou área correlata',
      '2+ anos de experiência em qualidade',
      'Conhecimento de normas ISO',
      'Atenção aos detalhes'
    ]),
    beneficios: JSON.stringify([
      'Vale alimentação',
      'Plano de saúde',
      'Vale transporte',
      'Participação nos lucros'
    ]),
    nova: true
  },
  {
    titulo: 'Assistente Administrativo',
    empresa: 'Notus Sistemas Térmicos',
    local: 'Jaraguá do Sul - SC',
    salario: 'R$ 2.500 - R$ 3.500',
    tipo: 'Tempo Integral',
    horario: 'Segunda a Sexta, 8h às 17h',
    descricao: 'Vaga para assistente administrativo para apoiar as operações do departamento.',
    responsabilidades: JSON.stringify([
      'Organizar documentos e arquivos',
      'Atender telefones e e-mails',
      'Auxiliar na elaboração de relatórios',
      'Dar suporte às equipes'
    ]),
    requisitos: JSON.stringify([
      'Ensino médio completo',
      'Conhecimento em pacote Office',
      'Boa comunicação',
      'Organização e proatividade'
    ]),
    beneficios: JSON.stringify([
      'Vale alimentação',
      'Vale transporte',
      'Plano de saúde após experiência',
      'Ambiente de trabalho agradável'
    ]),
    nova: false
  }
];

/**
 * Executa o script
 */
async function run() {
  console.log('═══════════════════════════════════════════════════');
  console.log('   SEED DE VAGAS - NOTUS SISTEMAS TÉRMICOS');
  console.log('═══════════════════════════════════════════════════');
  
  // Verificar configuração
  if (CREDENTIALS.username === 'seu_usuario_aqui') {
    console.log('\n⚠️  ATENÇÃO: Configure as credenciais no início deste arquivo!');
    console.log('   Edite as constantes username e password com credenciais válidas.\n');
    return;
  }

  // Login
  const loginOk = await login();
  if (!loginOk) {
    console.log('\n❌ Não foi possível fazer login. Encerrando...\n');
    return;
  }

  // Criar vagas
  let criadas = 0;
  let falhas = 0;

  for (const vaga of vagasExemplo) {
    const sucesso = await criarVaga(vaga);
    if (sucesso) {
      criadas++;
    } else {
      falhas++;
    }
  }

  // Resumo
  console.log('\n═══════════════════════════════════════════════════');
  console.log('   RESUMO');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Total de vagas: ${vagasExemplo.length}`);
  console.log(`✅ Criadas: ${criadas}`);
  console.log(`❌ Falhas: ${falhas}`);
  console.log('═══════════════════════════════════════════════════\n');
}

// Executar
run().catch(console.error);
