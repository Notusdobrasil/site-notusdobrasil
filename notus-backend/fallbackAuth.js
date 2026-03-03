/**
 * Sistema de autenticação fallback quando SQL Server não está acessível
 * Use apenas para desenvolvimento/teste
 */

const crypto = require('crypto');

// Usuários de fallback (substitua com variáveis de ambiente em produção)
const FALLBACK_USERS = [
  {
    userId: 1,
    userName: process.env.ADMIN_USERNAME || 'admin',
    passwordHash: generatePasswordHash(
      process.env.ADMIN_USERNAME || 'admin',
      process.env.ADMIN_PASSWORD || 'admin123'
    ),
    isAdmin: true,
    isActive: true
  }
];

/**
 * Gera hash SHA1 no mesmo formato do SQL Server
 */
function generatePasswordHash(username, password) {
  const combined = `${username}=${password}`;
  const hash = crypto.createHash('sha1').update(combined).digest('hex');
  return hash.toUpperCase();
}

/**
 * Autentica usuário usando lista fallback
 */
function authenticateFallback(username, password) {
  console.log('⚠️  USANDO AUTENTICAÇÃO FALLBACK (SQL Server indisponível)');
  
  const passwordHash = generatePasswordHash(username, password);
  const user = FALLBACK_USERS.find(
    u => u.userName.toLowerCase() === username.toLowerCase() && 
         u.passwordHash === passwordHash
  );
  
  if (!user) {
    console.log(`DEBUG Fallback: Usuário '${username}' não encontrado ou senha incorreta`);
    return null;
  }
  
  if (!user.isActive) {
    return { 
      error: 'INACTIVE',
      message: 'Usuário inativo. Contate o administrador.'
    };
  }
  
  console.log(`✅ Fallback: Login bem-sucedido para '${username}'`);
  
  return {
    userId: user.userId,
    userName: user.userName,
    isAdmin: user.isAdmin
  };
}

module.exports = {
  authenticateFallback,
  generatePasswordHash
};
