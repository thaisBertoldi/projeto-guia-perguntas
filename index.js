const express = require("express");
const appExpress = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const modelPergunta = require("./database/Pergunta");
const modelResposta = require("./database/Resposta");

connection
    .authenticate()
    .then(() => {
        console.log('Conexão ok');
    })
    .catch((err) => {
        console.log(err);
    })

appExpress.set("view engine", "ejs");
appExpress.use(express.static('public'));

appExpress.use(bodyParser.urlencoded({extended: false}));
appExpress.use(bodyParser.json());

appExpress.get("/", (req, res) => {
    modelPergunta.findAll({ raw: true, order: [
        ['id', 'DESC'] // ASC = crescente || DESC = decrescente
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

appExpress.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

appExpress.post("/salvarpergunta", (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    modelPergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

appExpress.get("/pergunta/:id", (req, res) => {
    const id = req.params.id;
    modelPergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if(pergunta != undefined) {
            modelResposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        }else {
            res.redirect("/");
        }
    })
})

appExpress.post("/responder", (req, res) => {
    const corpo = req.body.corpo;
    const perguntaId = req.body.pergunta;
    modelResposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    })
});

appExpress.listen(8181, () => {
  console.log("App rodando");
});
