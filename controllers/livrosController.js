const livrosModel = require("../models/livrosModel");

const registrarLivro = async (req, res) => {
  try {
    const { nome, sinopse, autor, id_categoria } = req.body;
    const imagem = req.file ? req.file.filename : null;

    if (!nome || !sinopse || !imagem || !id_categoria) {
      return res
        .status(400)
        .json({ erro: "Preencha todos os campos obrigatórios!" });
    }

    const novoLivro = await livrosModel.criarLivro(
      nome,
      sinopse,
      autor || null,
      imagem,
      id_categoria
    );

    res.status(201).json({
      mensagem: "Livro cadastrado com sucesso!",
      livro: novoLivro,
    });
  } catch (erro) {
    console.error("Erro ao registrar livro:", erro);
    res.status(500).json({ erro: "Erro no servidor." });
  }
};

const apagarLivro = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await livrosModel.apagarLivro(id);
    if (!resultado) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }
    res.status(200).json({ mensagem: "Livro deletado com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar livro", detalhe: error.message });
  }
};

const selecionarLivro = async (req, res) => {
  try {
    const todos = await livrosModel.selecionarLivro();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar livros",
      detalhe: error.message,
    });
  }
};

const listarPorCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const livros = await livrosModel.listarPorCategoria(id);
    res.status(200).json(livros);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao listar por categoria", detalhe: error.message });
  }
};

module.exports = {
  registrarLivro,
  apagarLivro,
  selecionarLivro,
  listarPorCategoria,
};
