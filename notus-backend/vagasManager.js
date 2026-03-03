/**
 * Módulo de gerenciamento de vagas
 * Armazena vagas em arquivo JSON
 */

const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const VAGAS_FILE = path.join(__dirname, 'data', 'vagas.json');

/**
 * Garante que o diretório de dados existe
 */
async function ensureDataDir() {
  const dataDir = path.dirname(VAGAS_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

/**
 * Lê todas as vagas do arquivo
 */
async function readVagas() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(VAGAS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Arquivo não existe, retorna array vazio
      return [];
    }
    throw error;
  }
}

/**
 * Salva vagas no arquivo
 */
async function writeVagas(vagas) {
  await ensureDataDir();
  await fs.writeFile(VAGAS_FILE, JSON.stringify(vagas, null, 2), 'utf8');
}

/**
 * Retorna todas as vagas
 */
async function getAllVagas() {
  return await readVagas();
}

/**
 * Retorna uma vaga por ID
 */
async function getVagaById(id) {
  const vagas = await readVagas();
  return vagas.find(v => v.id === id);
}

/**
 * Cria uma nova vaga
 */
async function createVaga(vagaData) {
  const vagas = await readVagas();
  
  const novaVaga = {
    id: uuidv4(),
    ...vagaData,
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString()
  };
  
  vagas.push(novaVaga);
  await writeVagas(vagas);
  
  console.log(`DEBUG: Nova vaga criada - ID: ${novaVaga.id}, Título: ${novaVaga.titulo}`);
  return novaVaga;
}

/**
 * Atualiza uma vaga existente
 */
async function updateVaga(id, vagaData) {
  const vagas = await readVagas();
  const index = vagas.findIndex(v => v.id === id);
  
  if (index === -1) {
    return null;
  }
  
  vagas[index] = {
    ...vagas[index],
    ...vagaData,
    id, // Mantém o ID original
    atualizadoEm: new Date().toISOString()
  };
  
  await writeVagas(vagas);
  
  console.log(`DEBUG: Vaga atualizada - ID: ${id}, Título: ${vagas[index].titulo}`);
  return vagas[index];
}

/**
 * Exclui uma vaga
 */
async function deleteVaga(id) {
  const vagas = await readVagas();
  const index = vagas.findIndex(v => v.id === id);
  
  if (index === -1) {
    return false;
  }
  
  const vagaExcluida = vagas[index];
  vagas.splice(index, 1);
  await writeVagas(vagas);
  
  console.log(`DEBUG: Vaga excluída - ID: ${id}, Título: ${vagaExcluida.titulo}`);
  return true;
}

module.exports = {
  getAllVagas,
  getVagaById,
  createVaga,
  updateVaga,
  deleteVaga
};
