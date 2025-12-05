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

  console.log("1");

  const emprestimo = rows[0];

  await livrosModel.atualizarStatus(id_livro, "ocupado");

  
  console.log("2");

  return emprestimo;
};

const devolverEmprestimo = async (id_livro) => {
  const queryBuscar = `SELECT * FROM emprestimo WHERE id_livro = $1`;
  const { rows } = await conexao.query(queryBuscar, [id_livro]);
  const emprestimo = rows[0];
  if (!emprestimo) throw new Error("Empréstimo não encontrado");

  const queryAtualizar = `
    UPDATE emprestimo
    SET data_devolucao = CURRENT_DATE
    WHERE id = $1
    RETURNING *;
  `;
  const { rows: rowsAtualizado } = await conexao.query(queryAtualizar, [
    id_livro,
  ]);

  await livrosModel.atualizarStatus(emprestimo.id_livro, "livre");

  return rowsAtualizado[0];
};

const dataDevolucao = async (id_livro) => {
  const query = `
    SELECT * FROM emprestimo WHERE id_livro = $1
  `;
  const { rows } = await conexao.query(query, [id_livro]);
  return rows;
};

const ListarEmprestimo = async () => {
    const query = `
      SELECT 
        e.id,
        e.data_emprestimo,
        e.data_devolucao,
        e.multa,
        u.nome AS nome_usuario,
        l.nome AS nome_livro
      FROM emprestimo e
      INNER JOIN usuarios u ON u.id = e.id_usuario
      INNER JOIN livros l ON l.id = e.id_livro
      ORDER BY e.id DESC;
    `;
    const { rows } = await conexao.query(query);
    return rows;
  };


  const listarEmprestimosAtivos = async () => {
    const query = `
      SELECT 
        e.id_usuario,
        u.nome AS nome_usuario,
        l.nome AS nome_livro,
        e.data_devolucao
      FROM emprestimo e
      JOIN usuarios u ON e.id_usuario = u.id
      JOIN livros l ON e.id_livro = l.id
      WHERE l.status = 'ocupado'
      ORDER BY e.id_usuario;
    `;

    const result = await conexao.query(query);
    return result.rows;
  }





module.exports = {
  criarEmprestimo,
  devolverEmprestimo,
  dataDevolucao,
  ListarEmprestimo,
  listarEmprestimosAtivos
};
