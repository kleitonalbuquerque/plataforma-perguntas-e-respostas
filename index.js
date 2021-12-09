const express = require("express");
const app = express();
const port = 4000;

app.set("view engine", "ejs");

app.get("/:nome?/:lang?", (req, res) => {
  var nome = req.params.nome;
  var lang = req.params.lang;
  var exibirMsg = false;

  res.render("index", {
    nome: nome,
    lang: lang,
    empresas: ["IK Solution", " Mirante"],
    msg: exibirMsg,
  });
});

app.listen(port, (error) => {
  if (error) {
    console.log("Ops! Algo deu errado!");
  } else {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
  }
});
