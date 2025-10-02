const conexao = require("../conexao");

const criarLivro = async (nome, sinopse, autor, imagem, id_categoria) => {
  const query = `
    INSERT INTO livros (nome, sinopse, autor, status, avaliacao, imagem, id_categoria)
    VALUES ($1, $2, $3, 'livre', 0 , $4, $5)
    RETURNING id, nome, autor, status;
  `;

  const valores = [nome, sinopse, autor, imagem, id_categoria];

  console.log(valores);
  console.log(query);

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

const LivroPorCategoria = async (id_categoria) => {
  const query = `
    SELECT id, nome, sinopse, autor, status, avaliacao, imagem, id_categoria
    FROM livros
    WHERE id_categoria = $1
  `;
  const { rows } = await conexao.query(query, [id_categoria]);
  return rows; // retorna lista de livros
};

module.exports = {
  criarLivro,
  apagarLivro,
  selecionarLivro,
  LivroPorCategoria
};
