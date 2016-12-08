"use strict";
/*
 Created by lx on 2016/10/28
 Name: Xuan Li
 CWID:10409939
 Email: xli100@stevens.edu
 */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const statics = express.static(__dirname + '/public');
const configRoutes = require("./routes");

const exphbs = require('express-handlebars');
const passport = require('passport');
const cookieParser	= require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const Handlebars = require('handlebars');
const path = require("path");

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
        
            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    },
    partialsDir: [
        'views/partials/'
    ]
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

app.use("/public", statics);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' , resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/config')(passport); // pass passport for configuration
require('./routes/index.js')(app, passport);

app.engine('handlebars', handlebarsInstance.engine);

/*
let views = [
    path.join(__dirname, 'views'),
];
*/

//app.set('views', views);

app.set('view engine', 'handlebars');


configRoutes(app);

app.listen(3000, () => {
    console.log("Final Project iTravel");
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
