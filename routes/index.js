"use strict";
/*
 Created by lx on 2016/11/17
 Name: Xuan Li
 CWID:10409939
 Email: xli100@stevens.edu
 */

const passport = require('passport');
const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const cityRoutes = require('./city');
const siteRoutes = require("./site");
const foodRoutes = require("./food");
const blogRoutes = require("./blog");
const imageRoutes = require("./image");
const commentRoutes = require("./comment");
const xss = require('xss');

const constructorMethod = (app) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    /* ***************** user *****************     */
    app.use("/user", userRoutes);

    /* ***************** city *****************     */
    app.use("/city", cityRoutes);
    /* ***************** site *****************     */
    app.use("/site", siteRoutes);
    /* ***************** food *****************     */

    app.use("/food", foodRoutes);
    /* ***************** blog *****************     */
    app.use("/blog", blogRoutes);
    /* ***************** image ****************     */
    app.use("/image", imageRoutes);
    /* ***************** Comment **************     */
    app.use("/comment", commentRoutes);

    /* ***************** Type *****************     */


    /* ***************** passport *****************     */
    function isLoggedIn(req, res, next) {
        console.log("isLoggedIn function begin");
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {
            console.log("authenticated success");
            return next();
        }
        // if they aren't redirect them to the home page
        console.log("authenticated fail go to login page");
        res.redirect('/login');
    }
};

module.exports = constructorMethod;
