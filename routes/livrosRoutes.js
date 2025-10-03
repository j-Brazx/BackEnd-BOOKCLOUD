const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig.js").default;

const livrosController = require("../controllers/livrosController.js");

router.post(
  "/cadastrarLivros",
  upload.single("imagem"),
  livrosController.registrarLivro
);

router.delete("/deletarlivros/:id", livrosController.apagarLivro);

router.get("/acervolivros", livrosController.selecionarLivro);

<<<<<<< HEAD
router.get("/categorias/:id/livros", livrosController.listarPorCategoria);
=======
router.get(
  "/livrosporcat/:id",
  upload.single("imagem"),
  livrosController.selecionarPorCategoria
);

>>>>>>> 90265ed999946102070df355725e7af0bc816d0c

module.exports = router;
