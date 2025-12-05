const conexao = require("../conexao");
const bcrypt = require("bcrypt");

const criarUsuario = async (nome, email, senhaHash) => {
  const query =
    "INSERT INTO usuarios (nome, email, senha, tipo_usuario, status) VALUES ($1, $2, $3,'visitante','Ativo') RETURNING id, nome, email";
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
  const query = "SELECT id, email, senha, tipo_usuario, nome FROM usuarios WHERE email = $1";
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

const uploadBase64ToStorage = async (dataUrl) => {
  console.log(dataUrl);

  if (!dataUrl || !dataUrl.startsWith("data:")) {
    console.log("entrou no erro");
    throw new Error("Formato de Base64 inválido.");
  }

  const parts = dataUrl.split(";base64,");

  if (parts.length !== 2) {
    throw new Error("Base64 malformado.");
  }
  const mimeType = parts[0].split(":")[1];
  const base64Data = parts[1];

  const fileBuffer = Buffer.from(base64Data, "base64");

  // Nomes de variáveis
  const extensaoMapeada = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "application/pdf": "pdf",
    "image/svg+xml": "svg",
  };
  const extensao = extensaoMapeada[mimeType] || "bin";

  // Gera nome de arquivo único (chave única no Vercel Blob)
  const NomeArquivo = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}.${extensao}`;

  // Salva no Vercel Blob
  const resultado = await put(NomeArquivo, fileBuffer, {
    access: "public", // Permite acesso público via URL
    contentType: mimeType, // Define o tipo de conteúdo
  });

  // Retorna a URL pública gerada pelo Vercel Blob
  return resultado.url;
};


const atualizarUsuario = async (id, dados) => {
  const { nome, email, senha, imagem } = dados;

  const query = `
    UPDATE usuarios
    SET nome = $1, email = $2, senha = $3, imagem = $4
    WHERE id = $5
    RETURNING *
  `;

  const values = [nome, email, senha, imagem, id];

  const { rows } = await conexao.query(query, values);
  return rows[0];
};

module.exports = {
  selecionarTodosUsuarios,
  criarUsuario,
  buscarUsuarioPorId,
  gerarSenhaHash,
  compararSenhas,
  buscarUsuarioPorEmail,
  atualizarUsuario,
  uploadBase64ToStorage,
};
