const express = require("express");
const router = express.Router();
const emprestimosController = require("../controllers/emprestimosController");

// Solicitar empréstimo
router.post("/solicitar", emprestimosController.solicitarEmprestimo);

// Devolver livro
router.post("/devolver/:id", emprestimosController.devolverLivro);

module.exports = router;
