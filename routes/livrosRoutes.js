const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig.js").default;

const livrosController = require("../controllers/livrosController.js");


router.post(
  "/cadastrolivros",
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


module.exports = router;
