const usuarioModel = require("../models/usuariosModel");
const criarUsuario = async (req, res) => {
  const { nome, email, senha, tipo_usuario, status } = req.body;

  try {
    const senhaHash = await usuarioModel.gerarSenhaHash(senha);
    const usuario = await usuarioModel.criarUsuario(
      nome,
      email,
      senhaHash,
    );
    console.log(usuario);
    res.status(201).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao registrar usuario", detalhe: error.message });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }
    const senhaValida = await usuarioModel.compararSenhas(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha inválida" });
    }
    res.json({
      mensagem: "Login realizado com sucesso",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        tipo_usuario: usuario.tipo_usuario,
        status: usuario.status,
      },
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro no login", detalhe: error.message });
  }
};

//     // const token = usuarioModel.gerarTokenJWT(usuario.id);
//     // res.json({
//     //   token,
//     //   usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
//     // });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ erro: "Erro ao buscar usuário", detalhe: error.message });
//   }
// };

const getUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await usuarioModel.buscarUsuarioPorId(id);
    if (!usuario) {
      return res
        .status(404)
        .json({ erro: "Erro ao buscar usuario", detalhe: error.message });
    }
    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar usuário", detalhe: error.message });
  }
};

const selecionarTodosUsuarios = async (req, res) => {
  try {
    const todos = await usuarioModel.selecionarTodosUsuarios();

    res.status(201).json(todos);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar usuarios",
      detalhe: error.message,
    });
  }
};

module.exports = {
  selecionarTodosUsuarios,
  criarUsuario,
  loginUsuario,
  getUsuarioPorId,
};
