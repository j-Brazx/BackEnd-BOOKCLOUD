const categoriaModel = require("../models/categoriasModel");
const conexao = require("../conexao");

const adicionarCategoria = async (req, res) => {
  const { nome_categoria, descricao } = req.body;
  try {
    const categoria = await categoriaModel.adicionarCategoria(
      nome_categoria,
      descricao
    );
    res.status(201).json(categoria);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao adicionar categoria", detalhe: error.message });
  }
};


const excluirCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await categoriaModel.excluirCategoria(id);
    res.status(200).json({ mensagem: "Categoria deletada com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar categoria", detalhe: error.message });
  }
};


const selecionarCategorias = async (req, res) => {
  try {
    const categoria = await categoriaModel.selecionarCategorias();

    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao selecionar categorias",
      detalhe: error.message,
    });
  }
};

module.exports = {
  adicionarCategoria,
  excluirCategoria,
  selecionarCategorias
};
