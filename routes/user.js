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
//user send register request
router.post('/register', function(req, res){
    userData.getUserByName(req.body.username).then((user) => {
        console.log(req.body.username + " "+req.body.password+" "+req.body.email);
        if (user != null) {
            return done(null, false, req.flash('error', 'That username has been taken.'));
        } else {
            let newUser = UserData.register(req.body.username, req.body.password,req.body.email);
            return newUser.then((newUser) => {
                console.log(123);
                return done(null, newUser);
            });
        }
    });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
// show user information, need check if user has login
router.get("/profile", isLoggedIn, function (req, res, next) {
    console.log("login success, go to the private page");
    let user = req.user;
    res.render("user/profile", {"user": user});
});

// middleware, to check if user has login
function isLoggedIn(req, res, next) {
    console.log("isLoggedIn function begin");
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log("authenticated success");
        return next();
    }
    // if they aren't redirect them tggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggo the home page
    console.log("authenticated fail go to login page");
    res.redirect('/user/login');
}

module.exports = router;
