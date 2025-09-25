const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

//Rotas de usuarios
router.post("/criar", usuariosController.criarUsuario);
router.post("/login", usuariosController.loginUsuario);
router.get("/getUsuarioPorId/:id", usuariosController.getUsuarioPorId);
router.get("/selecionarTodos", usuariosController.selecionarTodosUsuarios);

module.exports = router;
