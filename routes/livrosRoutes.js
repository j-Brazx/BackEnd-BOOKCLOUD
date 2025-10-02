const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig.js").default;

const livrosController = require("../controllers/livrosController.js");


router.post(
  "/cadastrarLivros",
  upload.single("imagem"),
  livrosController.registrarLivro
);

router.delete(
  "/deletarlivros",
  upload.single("imagem"),
  livrosController.apagarLivro
);

router.get(
  "/acervolivros",
  upload.single("imagem"),
  livrosController.selecionarLivro
);

router.get(
  "/livrosporcat/:id",
  upload.single("imagem"),
  livrosController.selecionarPorCategoria
);


module.exports = router;
