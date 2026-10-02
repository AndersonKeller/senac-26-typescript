import express from "express";
import { data, ReturnUsuario } from "./data";

const app = express();
const port = 3000;

app.use(express.json());

interface Cadastro {
  email: string;
  password: string;
  documento?: string;
}

const user: Cadastro = {
  email: "",
  password: "",
};

const dadosLogin = ["email", "password"];
const dadosCadastro = ["email", "password", "username"];
function validaEmail(email: string): boolean {
  const emailValido =
    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm.test(email);
  return emailValido;
}
function validarDados(dados: any, listaDados: string[]) {
  const objeto: any = {};
  for (const key in dados) {
    if (listaDados.includes(key)) {
      // const keyLogin = key as keyof typeof dados;
      objeto[key] = dados[key];
    }
  }
  return objeto;
}

app.use("/cadastro", (req, res) => {
  const body = req.body;
  if (!body.email) {
    res.status(401).json({
      erro: "e-mail é obrigatório",
    });
  }
  const emailValido = validaEmail(body.email);
  if (!emailValido) {
    res.status(401).json({
      erro: "e-mail inválido",
    });
  }
  if (!body.password) {
    res.status(401).json({
      erro: "campo password é obbriagtório",
    });
  }
  if (!body.username) {
    res.status(401).json({
      erro: "username é obrigatório",
    });
  }
  const dados = validarDados(body, dadosCadastro);
  res.status(201).json(dados);
});

app.post("/login", (req, res) => {
  const body = req.body;
  if (!body.email) {
    res.status(401).json({
      erro: "Email é obrigatório",
    });
  }

  const emailValido = validaEmail(body.email);
  if (!emailValido) {
    res.status(401).json({
      erro: "E-mail inválido",
    });
  }
  if (!body.password) {
    res.status(401).json({
      erro: "campo password é obrigatório",
    });
  }
  const dados = validarDados(body, dadosLogin);
  res.status(201).json(dados);
});

app.get("/user", (req, res) => {
  res.status(200).json(data);
});

app.get("/user/:id", (req, res) => {
  const findUser = data.find((user) => user.id === req.params.id);
  if (!findUser) {
    res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }
  if (findUser) {
    const returnUser: ReturnUsuario = {
      email: findUser.email,
      id: findUser.id,
      username: findUser.username,
    };
    res.status(200).json(returnUser);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
