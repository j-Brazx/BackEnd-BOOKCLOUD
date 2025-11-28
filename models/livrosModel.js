const conexao = require("../conexao");

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
const selecionarLivrosEmprestados = async () => {
  const query = "SELECT * FROM livros WHERE status = 'ocupado'";
  const { rows } = await conexao.query(query);
  return rows;
};

const selecionarLivrosDisponiveis = async () => {
  const query = "SELECT * FROM livros WHERE status = 'livre'";
  const { rows } = await conexao.query(query);
  return rows;
}


atualizarLivro = async (id, nome, sinopse, autor, imagem) => {
  const campos = [];
  const valores = [];
  let index = 1;

  if (nome) {
    campos.push(`nome = $${index}`);
    valores.push(nome);
    index++;
  }

  if (sinopse) {
    campos.push(`sinopse = $${index}`);
    valores.push(sinopse);
    index++;
  }

  if (autor) {
    campos.push(`autor = $${index}`);
    valores.push(autor);
    index++;
  }

  // Atualiza imagem **somente se veio nova**
  if (imagem !== undefined) {
    campos.push(`imagem = $${index}`);
    valores.push(imagem);
    index++;
  }

  const query = `
    UPDATE livros
    SET ${campos.join(", ")}
    WHERE id = $${index}
    RETURNING *;
  `;

  valores.push(id);

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


const buscarPorId = async (id) => {
  const query = "SELECT * FROM livros WHERE id = $1";
  const { rows } = await conexao.query(query, [id]);
  return rows[0];
};


const atualizarStatus = async (id, status) => {
  await conexao.query("UPDATE livros SET status = $1 WHERE id = $2", [status, id]);
};


const listarPorCategoria = async (id_categoria) => {
  const query = "SELECT * FROM livros WHERE id_categoria = $1";
  const { rows } = await conexao.query(query, [id_categoria]);
  return rows;
};


const LivroPorCategoria = async (id_categoria) => {
  const query = `
    SELECT id, nome, sinopse, autor, status, avaliacao, imagem, id_categoria
    FROM livros
    WHERE id_categoria = $1
  `;
  const { rows } = await conexao.query(query, [id_categoria]);
  return rows;
};


const SinopseLivro = async (id) => {
  const query = `
    SELECT id, nome, sinopse, autor, status, avaliacao, imagem, id_categoria
    FROM livros
    WHERE id = $1
  `;
  const { rows } = await conexao.query(query, [id]);
  return rows;
};

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
  selecionarLivrosDisponiveis,
  selecionarLivrosEmprestados
};
