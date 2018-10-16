const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

var port = process.env.PORT || 8000;
var app = express();

app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    secret: "crime_app_secret",
    resave: true,
    saveUninitialized: true
}));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

var router = require("./controllers/router.js");

app.use("/", router);

app.listen(port, () => {
    console.log("this app is running on port " + port);
});