"use strict";
/*
 Created by lx on 2016/11/26
 Name: Xuan Li
 CWID:10409939
 Email: xli100@stevens.edu
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserData = require('../data/users');
const bcrypt = require("bcrypt-nodejs");

module.exports = function (passport) {
    // signup Strategy logic
    passport.use('local-register', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            console.log("username = " + username);
            console.log("password = " + password);
            UserData.getUserByName(username).then((user) => {
                if (user != null) {
                    return done(null, false, req.flash('error', 'That username is already taken.'));
                } else {
                    let newUser = UserData.register(username, password);
                    return newUser.then((newUser) => {
                        return done(null, newUser);
                    });
                }
            });
        }));
    // local Strategy logic
    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            UserData.getUserByName(username).then((user) => {
                if (!user) {
                    return done(null, false, {message: 'Incorrect username and password.'});
                }
                return bcrypt.compare(password, user.pwd, function (error, res) {
                    if (res === true) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                });
            });
        })
    );
};
