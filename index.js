const express = require("express");
const appExpress = express();

appExpress.set("view engine", "ejs");
appExpress.use(express.static('public'));

appExpress.get("/", (req, res) => {
  res.render("index", {});
});

appExpress.get("/perguntar", (req, res) => {
    res.render("perguntar");
  });

appExpress.listen(8181, () => {
  console.log("App rodando");
});
