"use strict";
const userData = require("./users");
const cityData = require("./city");
const siteData = require("./site");
const foodData = require("./food");
const blogData = require("./blog");
const imageData = require("./image");
const commentData = require("./comment");
const typeData = require("./type");
module.exports = {
    user: userData,
    city: cityData,
    site: siteData,
    food: foodData,
    blog: blogData,
    image: imageData,
    comment: commentData,
    type: typeData
};
