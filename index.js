const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

const app = express();
const port = 4000;

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com banco de dados bem sucedida!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

// Rotas
app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true }).then((perguntas) => {
    // console.log(perguntas);
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    console.log("Pergunta salva no banco de dados com sucesso");
    res.redirect("/");
  });
});

app.listen(port, (error) => {
  if (error) {
    console.log("Ops! Algo deu errado!");
  } else {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
  }
});
