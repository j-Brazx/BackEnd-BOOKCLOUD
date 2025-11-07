const conexao = require("../conexao");

async function selecionarClientes() {
  const sql = `
    SELECT
      c.id_cliente AS "id_cliente",
      u.nome AS "nome_usuario",
      l.nome AS "nome_livro",
      e.data_devolucao AS "reserva_atual"
    FROM clientes c
    LEFT JOIN usuarios u ON c.id_nome_usuario = u.id
    LEFT JOIN livros l ON c.id_livro = l.id
    LEFT JOIN emprestimo e ON c.id_reserva_atual = e.id
    ORDER BY c.id_cliente;
  `;

  const { rows } = await conexao.query(sql);
  return rows;
}

module.exports = { selecionarClientes };