const conexao = require("../conexao");

const adicionarComentario = async (id_usuario, id_livro, avaliacao, texto) => {
  const query = `
    INSERT INTO comentario (id_usuario, id_livro, data_coment, avaliacao, texto)
    VALUES ($1, $2, CURRENT_DATE, $3, $4)
    RETURNING *;
  `;
  const valores = [id_usuario, id_livro, avaliacao, texto];
  const { rows } = await conexao.query(query, valores);
  return rows[0];
};

const selecionarComentariosPorLivro = async (id_livro) => {
  const query = `
    SELECT c.*, u.nome AS usuario_nome
    FROM comentario c
    JOIN usuarios u ON c.id_usuario = u.id
    WHERE c.id_livro = $1
    ORDER BY c.data_coment DESC;
  `;
  const { rows } = await conexao.query(query, [id_livro]);
  return rows;
};

module.exports = {
  adicionarComentario,
  selecionarComentariosPorLivro,
};
