const clientesModel = require("../models/clientesModel");

const selecionarClientes = async (req, res) => {
  try {
    const clientes = await clientesModel.selecionarClientes();
    res.status(200).json(clientes);
  } catch (erro) {
    console.error("Erro ao buscar clientes:", erro);
    res.status(500).json({ erro: "Erro ao buscar clientes." });
  }
};

module.exports = {
    selecionarClientes,
};