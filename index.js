const express = require("express");
const appExpress = express();
const bodyParser = require("body-parser");

appExpress.set("view engine", "ejs");
appExpress.use(express.static('public'));

appExpress.use(bodyParser.urlencoded({extended: false}));
appExpress.use(bodyParser.json());

appExpress.get("/", (req, res) => {
  res.render("index", {});
});

appExpress.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

appExpress.post("/salvarpergunta", (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
});

appExpress.listen(8181, () => {
  console.log("App rodando");
});
