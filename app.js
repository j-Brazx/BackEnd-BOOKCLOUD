require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const conexao = require("../conexao");
const usuariosRoutes = require("./routes/usuariosRoutes");
const livrosRoutes = require("./routes/livrosRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");
const emprestimosRoutes = require("./routes/emprestimosRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");
const path = require("path");

const app = express();



app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//Midlewares
app.use(cors());
app.use(express.json());

//rotas
app.use("/usuarios", usuariosRoutes);
app.use("/livros", livrosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/emprestimos", emprestimosRoutes);
app.use("/comentario", comentarioRoutes);


//Rota para teste de conexao
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

//inicia o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor executando em: http://localhost:${port}`);
});



