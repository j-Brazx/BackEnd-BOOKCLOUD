const conexao = require("../conexao");
const livrosModel = require("./livrosModel");

const criarEmprestimo = async (id_usuario, id_livro) => {
  const livro = await livrosModel.buscarPorId(id_livro);
  if (!livro) throw new Error("Livro não encontrado");
  if (livro.status !== "livre") throw new Error("Livro já está emprestado");


  const dataEmprestimo = new Date();
  const dataDevolucao = new Date();
  dataDevolucao.setDate(dataEmprestimo.getDate() + 15);


  const queryEmprestimo = `
    INSERT INTO emprestimo (data_emprestimo, data_devolucao, id_usuario, id_livro)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const { rows } = await conexao.query(queryEmprestimo, [
    dataEmprestimo,
    dataDevolucao,
    id_usuario,
    id_livro,
  ]);

  const emprestimo = rows[0];


  await livrosModel.atualizarStatus(id_livro, "ocupado");

 
  const insertCliente = `
    INSERT INTO clientes (id_cliente, id_nome_usuario, id_livro, id_reserva_atual)
    VALUES ($1, $2, $3, $4);
  `;

  await conexao.query(insertCliente, [
    id_usuario,        
    id_usuario,        
    id_livro,        
    emprestimo.id      
  ]);

  return emprestimo;
};

const devolverEmprestimo = async (id_emprestimo) => {
  const queryBuscar = `SELECT * FROM emprestimo WHERE id = $1`;
  const { rows } = await conexao.query(queryBuscar, [id_emprestimo]);
  const emprestimo = rows[0];
  if (!emprestimo) throw new Error("Empréstimo não encontrado");

  const queryAtualizar = `
    UPDATE emprestimo
    SET data_devolucao = CURRENT_DATE
    WHERE id = $1
    RETURNING *;
  `;
  const { rows: rowsAtualizado } = await conexao.query(queryAtualizar, [id_emprestimo]);

  await livrosModel.atualizarStatus(emprestimo.id_livro, "livre");

  return rowsAtualizado[0];
};

module.exports = {
  criarEmprestimo,
  devolverEmprestimo,
};
