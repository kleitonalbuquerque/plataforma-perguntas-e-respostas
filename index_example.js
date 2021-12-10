const express = require("express");
const app = express();
const port = 4000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/:nome?/:lang?", (req, res) => {
  var nome = req.params.nome;
  var lang = req.params.lang;
  var exibirMsg = false;
  var produtos = [
    { nome: "Doritos", preco: 5.99 },
    { nome: "Coca-Cola", preco: 7.99 },
    { nome: "M&Ms", preco: 6.99 },
    { nome: "Charge", preco: 2.99 },
    { nome: "Red Bull", preco: 8.99 },
  ];

  res.render("index", {
    nome: nome,
    lang: lang,
    empresas: ["IK Solution", " Mirante"],
    // empresas: "",
    msg: exibirMsg,
    produtos: produtos,
  });
});

app.listen(port, (error) => {
  if (error) {
    console.log("Ops! Algo deu errado!");
  } else {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
  }
});
