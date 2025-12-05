const livrosModel = require("../models/livrosModel");
const path = require("path");
//const uploadPath = path.join("uploads", filename);
const fs = require("fs");

const registrarLivro = async (req, res) => {
  try {
    const { nome, sinopse, autor, id_categoria } = req.body;
    const imagem = req.file ? req.file.buffer : null;
    console.log("1");
    console.log(autor);
    console.log(imagem);
    console.log(req.file);
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


// const atualizarLivro = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nome, sinopse, autor } = req.body;

//     let imagem = undefined;

//     // isso faz com que o model saiba se chegou imagem ou não
//     console.log("req.file 1:", req.file);
//     if (req.file) {
//       imagem = req.file.filename; // Apenas se veio imagem nova
//     }
//     console.log("req.file 2 :", req.file);

//     const livroAtualizado = await livrosModel.atualizarLivro(
//       id,
//       nome,
//       sinopse,
//       autor,
//       imagem // agora só passa se tiver imagem nova
//     );

//     if (!livroAtualizado) {
//       return res.status(404).json({ erro: "Livro não encontrado." });
//     }
//     res.json({
//       mensagem: "Livro atualizado com sucesso!",
//       livro: livroAtualizado,
//     });
//   } catch (erro) {
//     console.error("Erro ao atualizar livro:", erro.message, erro.stack);
//     res
//       .status(500)
//       .json({ erro: "Erro ao atualizar livro.", detalhe: erro.message });
//   }
// };

// 


const atualizarLivro = async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, sinopse, autor, avaliacao } = req.body;

    let novaImagem = null;

    if (req.file) {
      console.log("Nova imagem recebida:", req.file.filename);
      novaImagem = req.file.filename;
    }

    await livrosModel.atualizarLivro(
      id,
      nome,
      sinopse,
      autor,
      avaliacao,
      novaImagem   // <-- AQUI!!!
    );

    res.status(200).json({ message: "Livro atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    res.status(500).json({ error: "Erro ao atualizar livro" });
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

// const selecionarLivro = async (req, res) => {
//   try {
//     const todos = await livrosModel.selecionarLivro();

//     // Converte imagens para Base64
//     const livrosComImagem = todos.map((livro) => {
//       let imagemBase64 = null;
//       if (livro.imagem) {
//         imagemBase64 = Buffer.from(livro.imagem).toString("base64");
//         // adiciona prefixo para usar direto no <img src="...">
//         imagemBase64 = `data:image/jpeg;base64,${imagemBase64}`;
//       }
//       return { ...livro, imagem: imagemBase64 };
//     });

//     res.status(200).json(livrosComImagem);
//   } catch (error) {
//     console.error("Erro ao buscar livros:", error);
//     res.status(500).json({
//       erro: "Erro ao buscar livros",
//       detalhe: error.message,
//     });
//   }
// };
// Selecionar todos os livros
const selecionarLivro = async (req, res) => {
  try {
    const todos = await livrosModel.selecionarLivro();

    const livrosComUrl = todos.map((livro) => {
      // Adicionando o console.log para verificar o caminho da imagem
      if (livro.id == 2) {
        console.log(
          `Imagem para livro ${livro.id}: http://localhost:3000/uploads/${livro.imagem}`
        );
      }

      return {
        ...livro,
        imagemUrl: livro.imagem
          ? `http://localhost:3000/uploads/${livro.imagem}`
          : null,
      };
    });

    res.status(200).json(livrosComUrl);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar livros",
      detalhe: error.message,
    });
  }
};

// Selecionar livros emprestados
const selecionarLivrosEmprestados = async (req, res) => {
  try {
    const livros = await livrosModel.selecionarLivrosEmprestados();

    const livrosComUrl = livros.map((livro) => ({
      ...livro,
      imagemUrl: livro.imagem
        ? `http://localhost:3000/uploads/${livro.imagem}`
        : null,
    }));

    res.status(200).json(livrosComUrl);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar livros emprestados",
      detalhe: error.message,
    });
  }
};

// Selecionar livros disponíveis
const selecionarLivrosDisponiveis = async (req, res) => {
  try {
    const livros = await livrosModel.selecionarLivrosDisponiveis();

    const livrosComUrl = livros.map((livro) => ({
      ...livro,
      imagemUrl: livro.imagem
        ? `http://localhost:3000/uploads/${livro.imagem}`
        : null,
    }));

    res.status(200).json(livrosComUrl);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar livros disponíveis",
      detalhe: error.message,
    });
  }
};

const selecionarPorCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const livros = await livrosModel.LivroPorCategoria(id);

    if (livros.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Nenhum livro encontrado nesta categoria." });
    }

    res.json(livros);
  } catch (error) {
    console.error("Erro ao buscar livros por categoria:", error);
    res.status(500).json({ erro: "Erro no servidor." });
  }
};

// const Sinopse = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const livros = await livrosModel.SinopseLivro(id);

//     if (livros.length === 0) {
//       return res.status(404).json({ mensagem: "Nenhum livro encontrado." });
//     }

//     res.json(livros);
//   } catch (error) {
//     console.error("Erro ao buscar o livro:", error);
//     res.status(500).json({ erro: "Erro no servidor." });
//   }
// };
const Sinopse = async (req, res) => {
  try {
    const { id } = req.params;
    let livros = await livrosModel.SinopseLivro(id);

    if (livros.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum livro encontrado." });
    }

    // criar campo imagemUrl
    livros = livros.map((livro) => ({
      ...livro,
      imagemUrl: livro.imagem
        ? `http://localhost:3000/uploads/${livro.imagem}`
        : null,
    }));

    res.json(livros);
  } catch (error) {
    console.error("Erro ao buscar o livro:", error);
    res.status(500).json({ erro: "Erro no servidor." });
  }
};

// const buscarPorId = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const livro = await livrosModel.buscarPorId(id);

//     if (!livro) {
//       return res.status(404).json({ erro: "Livro não encontrado" });
//     }

//     return res.status(200).json(livro);
//   } catch (erro) {
//     console.error("Erro ao buscar livro:", erro);
//     return res.status(500).json({
//       erro: "Erro ao buscar o livro",
//     });
//   }
// };

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const livro = await livrosModel.buscarPorId(id);

    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }

    // Constrói URL da imagem se existir
    livro.imagemUrl = livro.imagem
      ? `http://localhost:3000/uploads/${livro.imagem}`
      : null;

    return res.status(200).json(livro);
  } catch (erro) {
    console.error("Erro ao buscar livro:", erro);
    return res.status(500).json({
      erro: "Erro ao buscar o livro",
    });
  }
};


const livrosLidos = async (req, res) => {
  try {
    const livros = await livrosModel.livrosLidos();

    res.status(200).json(livros);
  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao listar livros lidos",
      detalhe: erro.message,
    });
  }
};



module.exports = {
  registrarLivro,
  apagarLivro,
  selecionarLivro,
  selecionarPorCategoria,
  Sinopse,
  atualizarLivro,
  buscarPorId,
  selecionarLivrosDisponiveis,
  selecionarLivrosEmprestados,
  livrosLidos,
};
