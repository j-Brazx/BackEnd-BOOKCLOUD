const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig.js").default;

const livrosController = require("../controllers/livrosController.js");

router.post(
  "/cadastrarLivros",
  upload.single("imagem"),
  livrosController.registrarLivro
);

router.put(
  "/atualizarlivros/:id",
  upload.single("imagem"),
  livrosController.atualizarLivro
);

router.delete("/deletarlivros/:id", livrosController.apagarLivro);

router.get("/acervolivros", upload.single("imagem"), livrosController.selecionarLivro);
router.get(
  "/livrosporcat/:id",
  upload.single("imagem"),
  livrosController.selecionarPorCategoria
);
router.get(
  "/livroSinopse/:id",
  upload.single("imagem"),
  livrosController.Sinopse
);

module.exports = router;
