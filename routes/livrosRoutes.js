const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig.js").default;

const livrosController = require("../controllers/livrosController.js");

// Rota para cadastrar um livro, com upload de imagem
// Rota para cadastrar um livro, com upload de imagem
router.post(
  "/cadastrarLivros",
  upload.single("imagem"), // Agora 'upload.single' é usado corretamente
  livrosController.registrarLivro
);

router.get("/emprestados", livrosController.selecionarLivrosEmprestados);
router.get("/disponiveis", livrosController.selecionarLivrosDisponiveis);

router.put(
  "/atualizarlivros/:id",
  upload.single("imagem"),
  livrosController.atualizarLivro
);

router.delete("/deletarlivros/:id", livrosController.apagarLivro);

router.get("/acervolivros", livrosController.selecionarLivro);
router.get("/livrosporcat/:id", livrosController.selecionarPorCategoria);
router.get("/livroSinopse/:id", livrosController.Sinopse);
// router.get("/livrosPorId/:id",upload.single("imagem"),livrosController.buscarPorId);
router.get("/livrosPorId/:id", livrosController.buscarPorId);

router.get("/livrosLidos", livrosController.livrosLidos);

module.exports = router;
