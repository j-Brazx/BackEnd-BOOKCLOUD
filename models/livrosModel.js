const conexao = require("../conexao");

const criarLivro = async (
  nome,
  sinopse,
  autor,
  status,
  avaliacao,
  imagem,
  nome_categoria
) => {
  const query = `
    INSERT INTO livros (nome, sinopse, autor, status, avaliacao, imagem, nome_categoria)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, nome, autor, status;
  `;

  const valores = [
    nome,
    sinopse,
    autor,
    status,
    avaliacao,
    imagem,
    nome_categoria,
  ];
  const { rows } = await conexao.query(query, valores);

  return rows[0];
};

const selecionarLivro = async () => {
  const query = "SELECT * FROM livros ORDER BY id ASC";
  const { rows } = await conexao.query(query);
  return rows;
};
const apagarLivro = async (
  nome,
  sinopse,
  autor,
  status,
  avaliacao,
  imagem,
  nome_categoria
) => {
  const query = `
    DELETE from livros (nome, sinopse, autor, status, avaliacao, imagem, nome_categoria)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, nome, autor, status;
  `;

  const valores = [
    nome,
    sinopse,
    autor,
    status,
    avaliacao,
    imagem,
    nome_categoria,
  ];
  const { rows } = await conexao.query(query, valores);

  return rows[0];
};

module.exports = {
  criarLivro,
  apagarLivro,
  selecionarLivro,
};
