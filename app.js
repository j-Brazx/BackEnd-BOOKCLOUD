require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conexao = require("./conexao");
const usuariosRoutes = require("./routes/usuariosRoutes");
const livrosRoutes = require("./routes/livrosRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");
const emprestimosRoutes = require("./routes/emprestimosRoutes");

const app = express();

//Midlewares
app.use(cors());
app.use(express.json());

//rotas
app.use("/usuarios", usuariosRoutes);
app.use("/livros", livrosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/emprestimos", emprestimosRoutes);

//Rota para teste de conexao
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

//inicia o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor executando em: http://localhost:${port}`);
});
