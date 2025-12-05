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
  } catch (err) {
  if (err.response) {
    console.error("Erro do servidor:", err.response.data);
    alert(`Erro: ${err.response.data.message || "400 Bad Request"}`);
  } else {
    console.error("Erro:", err.message);
    alert("Erro desconhecido ao tentar reservar livro.");
  }}
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

const exibirEmprestimo = async (req, res) => {
  try {
    const { id_livro } = req.params; // pega o id do livro

    const emprestimo = await emprestimosModel.dataDevolucao(id_livro);

    if (!emprestimo) {
      return res.status(404).json({ error: "Nenhum empréstimo encontrado para este livro." });
    }

    return res.status(200).json(emprestimo);

  } catch (error) {
    console.error("Erro ao buscar empréstimo pelo livro:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

const listarEmprestimos = async (req, res) => {
  try {
    const emprestimos = await emprestimosModel.ListarEmprestimo();

    if (emprestimos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum empréstimo encontrado." });
    }

    res.json(emprestimos);
  } catch (error) {
    console.error("Erro ao listar empréstimos:", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};




const listarAtivos = async (req, res) => {
    try {
      const dados = await emprestimosModel.listarEmprestimosAtivos();
      return res.status(200).json(dados);
    } catch (error) {
      console.error("Erro ao listar empréstimos:", error);
      return res.status(500).json({ erro: "Erro ao buscar empréstimos ativos" });
    }
  };






   
module.exports = {
  solicitarEmprestimo,
  devolverLivro,
  exibirEmprestimo,
  listarEmprestimos,
  listarAtivos
}