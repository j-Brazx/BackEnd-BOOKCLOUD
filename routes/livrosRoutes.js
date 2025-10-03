const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig.js").default;

const livrosController = require("../controllers/livrosController.js");

router.post(
  "/cadastrarlivros",
  upload.single("imagem"),
  livrosController.registrarLivro
);

router.delete("/deletarlivros/:id", livrosController.apagarLivro);

router.get("/acervolivros", livrosController.selecionarLivro);

router.get("/categorias/:id/livros", livrosController.listarPorCategoria);

module.exports = router;
