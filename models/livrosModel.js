const conexao = require("../conexao");

// ✅ Criar livro
const criarLivro = async (nome, sinopse, autor, imagem, id_categoria) => {
  const query = `
    INSERT INTO livros (nome, sinopse, autor, status, avaliacao, imagem, id_categoria)
    VALUES ($1, $2, $3, 'livre', 0, $4, $5)
    RETURNING id, nome, autor, status;
  `;
  const valores = [nome, sinopse, autor, imagem, id_categoria];
  const { rows } = await conexao.query(query, valores);
  return rows[0];
};

// ✅ Atualizar livro
const atualizarLivro = async (id, nome, sinopse, autor, avaliacao, imagem) => {
  const query = `
    UPDATE livros
    SET
      nome = COALESCE($1, nome),
      sinopse = COALESCE($2, sinopse),
      autor = COALESCE($3, autor),
      avaliacao = COALESCE($4, avaliacao),
      imagem = COALESCE($5, imagem)
    WHERE id = $6
    RETURNING id, nome, sinopse, autor, avaliacao, imagem, status;
  `;
  const valores = [nome, sinopse, autor, avaliacao, imagem, id];
  const { rows } = await conexao.query(query, valores);
  return rows[0]; // retorna o livro atualizado
};

// ✅ Selecionar todos os livros
const selecionarLivro = async () => {
  const query = "SELECT * FROM livros ORDER BY id ASC";
  const { rows } = await conexao.query(query);
  return rows;
};

// ✅ Apagar livro
const apagarLivro = async (id) => {
  const query = `
    DELETE FROM livros
    WHERE id = $1
    RETURNING id, nome, autor, status;
  `;
  const { rows } = await conexao.query(query, [id]);
  return rows[0];
};

// ✅ Buscar por ID
const buscarPorId = async (id) => {
  const query = "SELECT * FROM livros WHERE id = $1";
  const { rows } = await conexao.query(query, [id]);
  return rows[0];
};

// ✅ Atualizar status do livro
const atualizarStatus = async (id, status) => {
  await conexao.query("UPDATE livros SET status = $1 WHERE id = $2", [status, id]);
};

// ✅ Listar por categoria
const listarPorCategoria = async (id_categoria) => {
  const query = "SELECT * FROM livros WHERE id_categoria = $1";
  const { rows } = await conexao.query(query, [id_categoria]);
  return rows;
};

// ✅ Livros por categoria (com mais campos)
const LivroPorCategoria = async (id_categoria) => {
  const query = `
    SELECT id, nome, sinopse, autor, status, avaliacao, imagem, id_categoria
    FROM livros
    WHERE id_categoria = $1
  `;
  const { rows } = await conexao.query(query, [id_categoria]);
  return rows;
};

// ✅ Buscar sinopse de um livro específico
const SinopseLivro = async (id) => {
  const query = `
    SELECT id, nome, sinopse, autor, status, avaliacao, imagem, id_categoria
    FROM livros
    WHERE id = $1
  `;
  const { rows } = await conexao.query(query, [id]);
  return rows;
};

// ✅ Exporta tudo corretamente
module.exports = {
  criarLivro,
  atualizarLivro,
  apagarLivro,
  selecionarLivro,
  buscarPorId,
  atualizarStatus,
  listarPorCategoria,
  LivroPorCategoria,
  SinopseLivro,
};
