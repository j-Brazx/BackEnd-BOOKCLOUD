const emprestimosModel = require("../models/emprestimosModel");

const solicitarEmprestimo = async (req, res) => {
  try {
    const { id_usuario, id_livro } = req.body;

    if (!id_usuario || !id_livro) {
      return res.status(400).json({ erro: "Informe usuário e livro" });
    }

    const emprestimo = await emprestimosModel.criarEmprestimo(id_usuario, id_livro);

    res.status(201).json({
      mensagem: "Empréstimo realizado com sucesso",
      emprestimo,
    });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

const devolverLivro = async (req, res) => {
  try {
    const { id } = req.params;

    const devolucao = await emprestimosModel.devolverEmprestimo(id);

    res.status(200).json({
      mensagem: "Livro devolvido com sucesso",
      devolucao,
    });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  solicitarEmprestimo,
  devolverLivro,
};
