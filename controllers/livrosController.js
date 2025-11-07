const livrosModel = require("../models/livrosModel");

const registrarLivro = async (req, res) => {
  try {
    const { nome, sinopse, autor, id_categoria } = req.body;
    const imagem = req.file ? req.file.filename : null; 
    console.log("1");
    console.log(autor);
console.log(imagem);
console.log(req.file);
console.log(req.file.filename);
    if (!nome || !sinopse || !id_categoria || !imagem) {
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
console.log("2 ");
    res.status(201).json({
      mensagem: "Livro cadastrado com sucesso!",
      livro: novoLivro,
    });
  } catch (erro) {
    console.error("Erro ao registrar livro:", erro);
    res.status(500).json({ erro: "Erro no servidor." });
  }
};


const atualizarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, sinopse, autor, avaliacao } = req.body;
    const imagem = req.file ? req.file.filename : null;

    const livroAtualizado = await livrosModel.atualizarLivro(
      id,
      nome,
      sinopse,
      autor,
      avaliacao,
      imagem
    );

    if (!livroAtualizado) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

    res.json({
      mensagem: "Livro atualizado com sucesso!",
      livro: livroAtualizado,
    });
  } catch (erro) {
  console.error("Erro ao atualizar livro:", erro.message, erro.stack);
  res.status(500).json({ erro: "Erro ao atualizar livro.", detalhe: erro.message });
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


const selecionarPorCategoria = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const livros = await livrosModel.LivroPorCategoria(id); 

    if (livros.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum livro encontrado nesta categoria." });
    }

    res.json(livros);
  } catch (error) {
    console.error("Erro ao buscar livros por categoria:", error);
    res.status(500).json({ erro: "Erro no servidor." });
  }
};

const Sinopse = async (req, res) => {
  try {
    const { id } = req.params; 
    const livros = await livrosModel.SinopseLivro(id);

    if (livros.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum livro encontrado." });
    }

    res.json(livros);
  } catch (error) {
    console.error("Erro ao buscar o livro:", error);
    res.status(500).json({ erro: "Erro no servidor." });
  }
};

module.exports = {
  registrarLivro,
  apagarLivro,
  selecionarLivro,
  selecionarPorCategoria, 
  Sinopse,
  atualizarLivro 
};