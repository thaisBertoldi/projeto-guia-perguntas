const express = require("express");
const appExpress = express();

appExpress.set('view engine', 'ejs');

appExpress.get("/:nome/:language", (req, res) => {
    const nome = req.params.nome;
    const language = req.params.language;
    res.render("index", {
        nome: nome,
        lang: language,
        empresa: "Guia do Programador",
        inscritos: 50
    });
});

appExpress.listen(8181, () => {
    console.log("App rodando");
});