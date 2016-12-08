"use strict";
/*
 Created by lx on 2016/11/17
 Name: Xuan Li
 CWID:10409939
 Email: xli100@stevens.edu
 */

const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.user;
const passport = require('passport');


/* ***************** user *****************     */
// private page
router.get("/", isLoggedIn, function (req, res, next) {
    res.redirect('/user/private');
});
// redirect to login page
router.get("/login", (req, res) => {
    res.render("user/login", {message: req.flash('error')});
});
// register to register page
router.get("/signup", (req, res) => {
    res.render("user/signup", {message: req.flash('error')});
});
//user send login request
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/index', // redirect to the secure profile section
    failureRedirect: '/user/login', // redirect back to the login page if there is an error
    failureFlash: true // allow flash messages
}));
//user send login request
router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/user/private', // redirect to the secure profile section
    failureRedirect: '/user/register', // redirect back to the login page if there is an error
    failureFlash: true // allow flash messages
}));
// show user information, need check if user has login
router.get("/private", isLoggedIn, function (req, res, next) {
    console.log("login success, go to the private page");
    let user = req.user;
    res.render("layouts/private", {"user": user});
});

// middleware, to check if user has login
function isLoggedIn(req, res, next) {
    console.log("isLoggedIn function begin");
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log("authenticated success");
        return next();
    }
    // if they aren't redirect them to the home page
    console.log("authenticated fail go to login page");
    res.redirect('/user/login');
}

module.exports = router;
