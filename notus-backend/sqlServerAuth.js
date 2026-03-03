/**
 * Módulo de autenticação SQL Server
 * Autentica usuários contra o banco Acesso_Duplicado.dbo.Usuario
 */

const sql = require('mssql');
const crypto = require('crypto');
const { authenticateFallback } = require('./fallbackAuth');

// Configuração do SQL Server
const sqlConfig = {
  server: process.env.SQL_SERVER || "192.168.77.150\\idealsql",
  database: process.env.SQL_DATABASE_ACESSO || "Acesso_Duplicado",
  user: process.env.SQL_USERNAME || "consulta",
  password: process.env.SQL_PASSWORD || "consulta123-",
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectionTimeout: 15000,
    requestTimeout: 15000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Pool de conexões global
let pool = null;
let sqlServerAvailable = null; // Cache do status de disponibilidade

/**
 * Obtém ou cria o pool de conexões SQL Server
 */
async function getSqlPool() {
  try {
    if (!pool) {
      console.log('DEBUG: Criando novo pool de conexões SQL Server...');
      console.log(`DEBUG: Servidor: ${sqlConfig.server}`);
      pool = await sql.connect(sqlConfig);
      console.log('✅ DEBUG: Pool de conexões SQL Server criado com sucesso');
      sqlServerAvailable = true;
    }
    return pool;
  } catch (error) {
    console.error('❌ ERRO ao criar pool SQL Server:', error.message);
    console.error('💡 Dica: Verifique se o SQL Server está acessível e as credenciais estão corretas');
    pool = null;
    sqlServerAvailable = false;
    throw error;
  }
}

/**
 * Gera hash SHA1 conforme o formato usado no banco
 * @param {string} username - Nome do usuário
 * @param {string} password - Senha em texto plano
 * @returns {string} Hash SHA1 em formato hexadecimal maiúsculo
 */
function generatePasswordHash(username, password) {
  // Formato: SHA1(usuario + '=' + senha)
  const combined = `${username}=${password}`;
  const hash = crypto.createHash('sha1').update(combined).digest('hex');
  // Converter para maiúsculas para coincidir com o formato do SQL Server
  return hash.toUpperCase();
}

/**
 * Autentica um usuário no banco SQL Server
 * @param {string} username - Nome do usuário
 * @param {string} password - Senha em texto plano
 * @returns {Promise<Object>} Dados do usuário ou null se não autenticado
 */
async function authenticateUser(username, password) {
  console.log(`\n--- Autenticando usuário: '${username}' ---`);
  
  if (!username || !password) {
    console.log('DEBUG: Username ou password vazios');
    return null;
  }

  // Se já sabemos que o SQL Server não está disponível, usar fallback direto
  if (sqlServerAvailable === false) {
    console.log('⚠️  SQL Server marcado como indisponível, usando fallback');
    return authenticateFallback(username, password);
  }

  let connection = null;
  
  try {
    // Obter pool de conexões
    connection = await getSqlPool();
    
    // Gerar hash da senha conforme formato do banco
    const passwordHash = generatePasswordHash(username, password);
    
    console.log(`DEBUG: Executando query de autenticação para usuário '${username}'`);
    
    // Query para buscar usuário com credenciais válidas
    const result = await connection.request()
      .input('cdUsuario', sql.VarChar(30), username)
      .input('deSenha', sql.VarChar(500), passwordHash)
      .query(`
        SELECT TOP 1
          idUsuario,
          cdUsuario,
          btAtivo,
          btAdministrador
        FROM Acesso_Duplicado.dbo.Usuario
        WHERE cdUsuario = @cdUsuario
          AND deSenha = @deSenha
      `);

    if (result.recordset && result.recordset.length > 0) {
      const user = result.recordset[0];
      
      console.log(`✅ DEBUG: Usuário encontrado via SQL Server - ID: ${user.idUsuario}`);
      
      // Validar se o usuário está ativo
      if (user.btAtivo === 0 || user.btAtivo === false) {
        console.log(`DEBUG: Usuário '${username}' está inativo`);
        return { error: 'INACTIVE', message: 'Usuário inativo. Entre em contato com o administrador.' };
      }

      // Retornar dados do usuário autenticado
      return {
        userId: user.idUsuario,
        userName: user.cdUsuario,
        isAdmin: user.btAdministrador === 1 || user.btAdministrador === true,
        isActive: user.btAtivo === 1 || user.btAtivo === true
      };
    } else {
      console.log(`DEBUG: Credenciais inválidas para usuário '${username}'`);
      return null;
    }
    
  } catch (error) {
    console.error('❌ ERRO ao autenticar usuário:', error.message);
    
    // Em caso de erro de conexão, resetar o pool e tentar fallback
    if (error.message && (
      error.message.includes('connection') || 
      error.message.includes('ENOTFOUND') ||
      error.message.includes('ETIMEDOUT') ||
      error.message.includes('Failed to connect')
    )) {
      console.log('⚠️  Erro de conexão SQL Server detectado, usando fallback');
      pool = null;
      sqlServerAvailable = false;
      
      // Tentar autenticação via fallback
      return authenticateFallback(username, password);
    }
    
    throw error;
  }
  
  console.log('--- Fim da autenticação ---');
}

/**
 * Fecha o pool de conexões (útil para cleanup)
 */
async function closeSqlPool() {
  if (pool) {
    try {
      await pool.close();
      pool = null;
      console.log('DEBUG: Pool de conexões SQL Server fechado');
    } catch (error) {
      console.error('ERRO ao fechar pool SQL Server:', error);
    }
  }
}

module.exports = {
  authenticateUser,
  closeSqlPool,
  getSqlPool
};
