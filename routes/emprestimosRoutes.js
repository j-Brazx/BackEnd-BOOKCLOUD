const express = require("express");
const router = express.Router();
const emprestimosController = require("../controllers/emprestimosController");

// Solicitar empréstimo
router.post("/solicitar", emprestimosController.solicitarEmprestimo);

// Devolver livro
router.post("/devolver/:id", emprestimosController.devolverLivro);
router.get("/exibir/:id", emprestimosController.exibirEmprestimo);
router.get("/listar", emprestimosController.listarEmprestimos);
router.get("/ativo", emprestimosController.listarAtivos);

module.exports = router;
