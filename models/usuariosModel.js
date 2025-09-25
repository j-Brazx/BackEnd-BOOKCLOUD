const conexao = require("../conexao");
const bcrypt = require("bcrypt");

const criarUsuario = async (nome, email, senhaHash) => {
  const query =
    "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email";
  const valores = [nome, email, senhaHash];
  console.log(query);
  console.log(valores);
  const { rows } = await conexao.query(query, valores);
  console.log("volta do criar usuario");
  return rows[0];
};

const buscarUsuarioPorId = async (id) => {
  const query =
    "SELECT id, nome, email, tipo_usuario FROM usuarios WHERE id = $1";
  const { rows } = await conexao.query(query, [id]);
  return rows[0];
};

const buscarUsuarioPorEmail = async (email) => {
  const query = "SELECT email, senha FROM usuarios WHERE email = $1";
  const { rows } = await conexao.query(query, [email]);
  return rows[0];
};

const gerarSenhaHash = async (senha) => {
  return bcrypt.hash(senha, 10);
};

const compararSenhas = async (senha, senhaHash) => {
  return bcrypt.compare(senha, senhaHash);
};

const selecionarTodosUsuarios = async () => {
  const query = "SELECT * FROM usuarios ORDER BY id ASC";
  const { rows } = await conexao.query(query);
  return rows;
};

module.exports = {
  selecionarTodosUsuarios,
  criarUsuario,
  buscarUsuarioPorId,
  gerarSenhaHash,
  compararSenhas,
  buscarUsuarioPorEmail,
};
