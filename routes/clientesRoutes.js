const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController"); // ✅ Importando corretamente

router.get("/selecionarClientes", clientesController.selecionarClientes);

module.exports = router;
