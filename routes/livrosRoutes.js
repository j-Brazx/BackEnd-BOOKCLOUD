const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig.js").default;

const livrosController = require("../controllers/livrosController.js");

router.post(
  "/cadastrarLivros",
  upload.single("imagem"),
  livrosController.registrarLivro
);
router.get("/emprestados", livrosController.listarLivrosEmprestados);
router.get("/disponiveis", livrosController.listarLivrosDisponiveis);

router.put(
  "/atualizarlivros/:id",
  upload.single("imagem"),
  livrosController.atualizarLivro
);

router.delete("/deletarlivros/:id", livrosController.apagarLivro);

router.get(
  "/acervolivros",
  livrosController.selecionarLivro
);
router.get(
  "/livrosporcat/:id",
  livrosController.selecionarPorCategoria
);
router.get(
  "/livroSinopse/:id",
  livrosController.Sinopse
);
router.get("/livrosPorId/:id", livrosController.buscarPorId);

module.exports = router;
