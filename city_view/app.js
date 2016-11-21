const express = require("express");
const bodyParser = require("body-parser");
let app = express();
const static = express.static(__dirname + '/public');
const path = require("path");

let configRoutes = require("./routes");
const exphbs = require('express-handlebars');

app.use("/public", static);
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("Final Project iTravel - City Part");
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});