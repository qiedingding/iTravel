"use strict";
/*
 Created by lx on 2016/11/17
 Name: Xinyu Ge
 */
const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");
const data = require("../data/");
const sites = data.site;
const food = data.food;

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
    }).then((addedCity) => {
    	return sites.addSite("QianFoMountain", "N36°E117°", "JingShi road, JiNan, ShanDong", "Bus", "30￥", "6:00PM", "2016681367", "www.qianfoshan.com", "qianfoshan", "1.png", 1, ["climb","cable"],["mountain", "famous", "JiNan"], "fk_city");
    }).then((addedSite) => {
     	return sites.addSite("DaMingLake", "N50°E120°", "MingHu road, JiNan, ShanDong", "Bus", "60￥", "6:00PM", "2016681367", "www.daminghu.com", "daminghu", "2.png", 1, ["boat","landscape"],["lake", "famous", "JiNan", "XiaYuHe"], "fk_city");
    }).then((addedSite) => {
        return sites.addSite("BaoTuFountain", "N45°E116°", "XiMen road, JiNan, ShanDong", "Bus", "50￥", "6:00PM", "2016681367", "www.baotuquan.com", "baotuquan", "3.png", 1, ["seal","tea"],["fountain", "famous", "JiNan"], "fk_city");
    }).then((addedSite) => {
        return food.addFood("BaZiRou", "bengrouganfan", "N36°E117°", "YaoShan", "20￥", "9:30PM", "18615213327", "www.bazirou.com", "4.png", 2, "fk_city");
    }).then((addedFood) => {
        return food.addFood("TianMo", "salty vegetable porridge", "N36°E117°", "XiaoTan", "1.5￥", "10:00AM", "18615213327", "www.tianmo.com", "5.png", 2, "fk_city");
    }).then((addedFood) => {
        return food.addFood("YouXuan", "fried dough", "N36°E117°", "FuRongJie", "0.5￥", "10:30PM", "18615213327", "www.youxuan.com", "6.png", 2, "fk_city");
    }).then((added) => {
        console.log("Done seeding database!");
        db.close();
   });
}), (error) => {
     console.error(error);
};

