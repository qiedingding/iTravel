"use strict";
/*
 Created by lx on 2016/11/17
 Name: Xinyu Ge
 */
const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");

dbConnection().then(db => {
    return db.collection("city").drop().then(function() {
        return db;
    }, function() {
        return db;
    }).then((db) => {
        return db.createCollection("city");
    }).then(function(cityCollection) {

        var createCity = (name, province, description, traffic, weather, history, culture, currency, mainImage, tag) => {
            return {
                _id: uuid.v4(),
                name: name,
                province: province,
                description: description,
                traffic: traffic,
                weather: weather,
                history: history,
                culture: culture,
                currency: currency,
                mainImage: mainImage,
                tag: tag
            }
        }

        var listOfCities = [];

        // city_1 Beijing
        var BeijingTag = ["capital", "tian'anmen"];
        var BeijingCity = createCity("Beijing", "Beijing", "Beijing Description", "Beijing Traffic", "Beijing Weather", "Beijing History", "Beijing Culture", "RMB", "Beijing Image", BeijingTag);

        // city_2 Shanghai
        var ShanghaiTag = ["Shanghai Shibohui", "Dofangmingzhu"];
        var ShanghaiCity = createCity("Shanghai", "Shanghai", "Shanghai Description", "Shanghai Traffic", "Shanghai Weather", "Shanghai History", "Shanghai Culture", "RMB", "Shanghai Image", ShanghaiTag);

        // city_3 Shenzhen
        var ShenzhenTag = ["guandong", "tequ"];
        var ShenzhenCity = createCity("Shenzhen", "Shenzhen", "Shenzhen Description", "Shenzhen Traffic", "Shenzhen Weather", "Shenzhen History", "Shenzhen Culture", "RMB", "Shenzhen Image", ShenzhenTag);

        //
        listOfCities.push(BeijingCity, ShanghaiCity, ShenzhenCity);

        return cityCollection.insertMany(listOfCities).then(() => {
            return cityCollection.find().toArray();
        });
    });
});

module.exports = router;
