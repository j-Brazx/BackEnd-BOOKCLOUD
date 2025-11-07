const conexao = require("../conexao");
const comentarioModel = require("../models/comentarioModel");

const addComentario = async (req, res) => {
  try {
    const { id_usuario, id_livro, avaliacao, texto } = req.body;

    if (!id_usuario || !id_livro) {
      return res
        .status(400)
        .json({ erro: "Usuário e livro são obrigatórios." });
    }
    const novoComentario = await comentarioModel.adicionarComentario(
      id_usuario,
      id_livro,
      avaliacao,
      texto
    );

    const queryMedia = `
      SELECT AVG(avaliacao)::NUMERIC(3,1) AS media
      FROM comentario
      WHERE id_livro = $1;
    `;
    const { rows } = await conexao.query(queryMedia, [id_livro]);
    let media = 0;
    // media = Math.round(rows[0].media) || 0;
    media = (rows[0].media) || 0;

    const queryUpdate = `
      UPDATE livros
      SET avaliacao = $1
      WHERE id = $2;
    `;
    await conexao.query(queryUpdate, [media, id_livro]);

    res.status(201).json({
      mensagem: "Comentário criado com sucesso!",
      comentario: novoComentario,
      nova_media: media,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao criar comentário." });
  }
};

const listarComentariosPorLivro = async (req, res) => {
  try {
    const { id_livro } = req.params;

    const comentarios = await comentarioModel.selecionarComentariosPorLivro(
      id_livro
    );

    res.json(comentarios);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar comentários." });
  }
};

module.exports = {
  addComentario,
  listarComentariosPorLivro,
};
