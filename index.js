const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./models/Pergunta");
const Resposta = require("./models/Resposta");

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
  Pergunta.findAll({ raw: true, order: [["id_pergunta", "DESC"]] }).then(
    (perguntas) => {
      // console.log(perguntas);
      res.render("index", {
        perguntas: perguntas,
      });
    }
  );
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

app.get("/pergunta/:id", (req, res) => {
  var id_pergunta = req.params.id;

  Pergunta.findOne({
    where: { id_pergunta: id_pergunta },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: { perguntaId: pergunta.id_pergunta },
        order: [["id_resposta", "DESC"]],
      }).then((respostas) => {
        // Pergunta encontrada
        res.render("pergunta", {
          pergunta: pergunta, // varável pergunta guarda o resultado da query para ser utilizada no front
          respostas: respostas,
        });
      });
    } else {
      // Pergunta não encontrada
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect("/pergunta/" + perguntaId); // res.redirect("/pergunta/3")
  });
});

app.listen(port, (error) => {
  if (error) {
    console.log("Ops! Algo deu errado!");
  } else {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
  }
});
