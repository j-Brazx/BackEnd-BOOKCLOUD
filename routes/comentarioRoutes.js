const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");

//Rotas de categorias

router.post("/comentar",comentarioController.addComentario);
router.get("/listarPorLivro/:id_livro", comentarioController.listarComentariosPorLivro);

module.exports = router;