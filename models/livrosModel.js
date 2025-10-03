const conexao = require("../conexao");

const criarLivro = async (nome, sinopse, autor, imagem, id_categoria) => {
  const query = `
    INSERT INTO livros (nome, sinopse, autor, status, avaliacao, imagem, id_categoria)
    VALUES ($1, $2, $3, 'livre', 0 , $4, $5)
    RETURNING id, nome, autor, status;
  `;

  const valores = [nome, sinopse, autor, imagem, id_categoria];
  const { rows } = await conexao.query(query, valores);

  return rows[0];
};

const selecionarLivro = async () => {
  const query = "SELECT * FROM livros ORDER BY id ASC";
  const { rows } = await conexao.query(query);
  return rows;
};

const apagarLivro = async (id) => {
  const query = `
    DELETE FROM livros
    WHERE id = $1
    RETURNING id, nome, autor, status;
  `;
  const { rows } = await conexao.query(query, [id]);
  return rows[0];
};

const listarPorCategoria = async (id_categoria) => {
  const query = "SELECT * FROM livros WHERE id_categoria = $1";
  const { rows } = await conexao.query(query, [id_categoria]);
  return rows;
};

const buscarPorId = async (id) => {
  const { rows } = await conexao.query("SELECT * FROM livros WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

const atualizarStatus = async (id, status) => {
  await conexao.query("UPDATE livros SET status = $1 WHERE id = $2", [
    status,
    id,
  ]);
};

module.exports = {
  criarLivro,
  apagarLivro,
  selecionarLivro,
  buscarPorId,
  atualizarStatus,
  listarPorCategoria,
};
