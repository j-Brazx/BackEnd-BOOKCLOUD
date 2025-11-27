const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriasController");

//Rotas de categorias

router.post("/adicionar", categoriaController.adicionarCategoria);
router.delete("/excluir/:id", categoriaController.excluirCategoria);
router.get("/selecionar", categoriaController.selecionarCategorias);
router.get("/maiorAcervo", categoriaController.maiorAcervo);
module.exports = router;