const conexao = require("../conexao");
const bcrypt = require("bcrypt");

const adicionarCategoria = async (nome_categoria, descricao) => {
  const query =
    "INSERT INTO categoria (nome_categoria, descricao) VALUES ($1, $2) RETURNING nome_categoria, descricao";
  const valores = [nome_categoria, descricao];
  console.log(valores);
  console.log(query);
  const { rows } = await conexao.query(query, valores);
  return rows[0];
};
const generoMaiorAcervo = async () => {
  const query = `
    SELECT c.nome_categoria, COUNT(l.id) AS total_livros
    FROM categoria c
    LEFT JOIN livros l ON l.id_categoria = c.id
    GROUP BY c.nome_categoria
    ORDER BY total_livros DESC
    LIMIT 1
  `;
  const { rows } = await conexao.query(query);
  return rows[0];
};


const excluirCategoria = async (id) => {
  const query = "DELETE FROM categoria WHERE id = $1";
  await conexao.query(query, [id]);
};

const selecionarCategoria = async () => {
  const query = "SELECT * FROM categoria ORDER BY id ASC";
  const { rows } = await conexao.query(query);
  return rows;
};

module.exports = {
  adicionarCategoria,
  excluirCategoria,
  selecionarCategoria,
  generoMaiorAcervo
};
