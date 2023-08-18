var express = require("express");
var app = express();
app.use(express.json());

const bodyParser = require("body-parser");
const {response} = require("express");
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("Ressource/img"));
app.use(express.static("Code_site/html"));
app.use(express.static("Code_site/css"));
app.use(express.static("Code_site/js"));

app.get('/', function(req, res) {
    res.sendFile('main.html', {root: __dirname})
});

app.listen(9000, function() {
    console.log("Listening on port 9000 ...")
});