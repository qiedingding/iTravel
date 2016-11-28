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


    passport.use('local-register', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            console.log("username = " + username);
            console.log("password = " + password);
            process.nextTick(function () {
                UserData.findOne(username).then((user)=> {
                    console.log(user);
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('error', 'That username is already taken.'));
                    } else {
                        console.log(123);
                        var newUser = register(username, password);
                        return newUser.then((newUser)=> {
                            console.log(123);
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            console.log("loginBegin" + username + " pwd = " + password);
            UserData.findByUserName(username).then((user)=> {/*
             var u = JSON.stringify(user);
             console.log("UserData.findByUserName success" + u);
             */
                if (!user) {
                    console.log("findByUserName !user--------------------");
                    return done(null, false, {message: 'Incorrect username and password.'});
                }
                var userJSON = JSON.parse(user);

                console.log("UserData.findByUserName success      password =  " + userJSON.password);

                // let compare = bcrypt.compareSync(userJSON.password, userJSON.password); // true
                return bcrypt.compare(password, userJSON.password, function (error, res) {
                    if (res === true) {
                        console.log("maches the hash");
                        return done(null, user);
                    } else {
                        console.log("not maches the hash");
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                });


            });

        })
    );


};