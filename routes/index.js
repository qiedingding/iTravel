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
const path = require("path");
const data = require("../data");
const cityData = data.city;
const blogData = data.blog;
const imageData = data.image;
let notFound = path.resolve("./static/404.html");
//
const constructorMethod = (app) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    /* ***************** about *****************     */
    app.use("/about", (req, res) => {
       res.render("about");
    });
    // res.sendFile(notFound);
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
    /* ***************** MainPage **************     */
    app.use("/", (req, res) => {
        let returnValue ={};
        cityData.getAllCities().then((citylist) => {
            let clist = [];
            let createCityDTO = (id, name, mainImage,description) => {
                return {
                    _id: id,
                    mainImage: mainImage,
                    description: description,
                    name: name
                }
            };
            let promises = [];
            for (let i = 0, len = citylist.length; i < len && i<3; i++) {
                promises.push(imageData.getImageById(citylist[i].mainImage).then((image) => {
                    let c = null;
                    if(!image){
                         c = createCityDTO(citylist[i]._id, citylist[i].name, null,citylist[i].description);
                    }else{
                        c = createCityDTO(citylist[i]._id, citylist[i].name, image,citylist[i].description);
                    }
                    clist.push(c);
                }));
            }
            Promise.all(promises).then(() => {
                returnValue.clist = clist;
                return returnValue
            })
        })
        .then(() => {
            let blist = [];
            blogData.getAllBlogsWithImage().then((bloglist) => {
                for (let i = 0, len = bloglist.length; i < len && i<3; i++) {
                    blist.push(bloglist[i]);
                }
                returnValue.blist = blist;
            })
        })
        .then(()=>{
              res.render('index',{returnValue:returnValue});
        })
        .catch(e=>{
            res.sendFile(notFound);
        });
    });
    /* ***************** not found *****************     */
    app.use("/*", (req, res,next) => {
        res.sendFile(notFound);
    });
    // Handle 404
    app.use(function(req, res) {
        res.status(404);
        res.sendFile(notFound);
    });

    // Handle 500
    app.use(function(error, req, res, next) {
        res.status(500);
        res.sendFile(notFound);
    });
    /* ***************** passport *****************     */
    function isLoggedIn(req, res, next) {
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
