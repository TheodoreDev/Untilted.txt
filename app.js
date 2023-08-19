var express = require("express");
var app = express();
app.use(express.json());

const bodyParser = require("body-parser");
const {response} = require("express");
app.use(bodyParser.urlencoded({extended: false}));
app.engine('html', require('ejs').renderFile);

app.use(express.static("Ressource/img"));
app.use(express.static("Code_site/html"));
app.use(express.static("Code_site/css"));
app.use(express.static("Code_site/js"));

const {connect, get} = require("mongoose");
const config = require("./config.json");
connect(config.dbURL, {}).then(() => console.log("Connected to the database"));
const UserInformationSchema = require("./Schemas/UserInformations");

var notexist = ""
var UserName = ""

app.get('/', function(req, res) {
    res.render(__dirname + 'main.html')
});

app.post('/Home-connected', async function (req, res) {
    const {username, password} = req.body;
    let User = await UserInformationSchema.findOne({
        Username : `${username}`,
        Password : `${password}`
    })
    console.log(User)
    if(User) {
        UserName = username
        res.render(__dirname +"/Code_site/html/main_connected.html", {username: UserName})
    } else {
        notexist = "This account doesn't esxist !";
        res.render(__dirname +"/Code_site/html/registered.html", {notexist: notexist})
    }
})

app.post('/inscription-page', async function (req, res) {
    const {username, email, password, birthday} = req.body;
    let EmailExisting = await UserInformationSchema.findOne({Email : `${email}`})
    let UserExisting = await UserInformationSchema.findOne({
        Username : `${username}`,
        Password : `${password}`
    })
    if(!EmailExisting) {
        if(!UserExisting) {
            UserInformationSchema.create({
                Username : `${username}`,
                Email : `${email}`,
                Password : `${password}`,
                Birthday : `${birthday}`,
                Admin : false,
            });
            notexist = "You are well registered !"
            res.render(__dirname +"/Code_site/html/registered.html", {notexist: notexist})
        } else {
            notexist = "Username or password is already in use !"
            res.render(__dirname +"/Code_site/html/registered.html", {notexist: notexist})
        }
    }else {
        notexist = "Email is already in use !"
            res.render(__dirname +"/Code_site/html/registered.html", {notexist: notexist})
    }
})

app.post('/Home', async function(req, res) {
    res.render(__dirname + "/Code_site/html/main_connected.html", {username: UserName})
})

app.post('/Portfolios', async function(req, res) {
    res.render(__dirname + "/Code_site/html/portfolios.html", {username: UserName})
})

app.post('/Contact', async function(req, res) {
    res.render(__dirname + "/Code_site/html/contact_main.html", {username: UserName})
})

app.listen(9000, function() {
    console.log("Listening on port 9000 ...")
});