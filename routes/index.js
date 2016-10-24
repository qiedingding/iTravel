"use strict";
/*
 Created by lx on 2016/10/19
 Name: Xuan Li
 CWID:10409939
 Email: xli100@stevens.edu
 */
// listen to a location , like a transfer department

const recipesRoutes = require("./recipes");
const commentsRoutes = require("./comments");

const constructorMethod = (app) => {
    app.use("/recipes", recipesRoutes);
    app.use("/comments", commentsRoutes);
    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
