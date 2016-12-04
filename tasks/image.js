"use strict";
/*
 Created by Qingzheng on 2016/12/01
 Name: Qingzheng Liu
 */
const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");
const data = require("../data/");

dbConnection().then(db => {
    return db.collection("image").drop().then(function() {
        return db;
    }, function() {
        return db;
    }).then((db) => {
        return db.createCollection("image");
    }).then(function(imageCollection) {

        var createImage = (name, address, createTime, type, userId, blogId, siteId, cityId, foodId) => {
            return {
                _id: uuid.v4(),
                name: name,
                address: address,
                createTime: createTime,
                type: type,
                userId: userId,
                blogId: blogId,
                siteId: siteId,
                cityId: cityId,
                foodId: foodId
            }
        }

        var listOfImages = [];

        // image_1 Beijing

        var BeijingImage = createImage("Beijing", "Beijing", "2016/12/01", "landscape", "usr1", "blog1", "site1", "city1", "food1");

        // image_2 Shanghai
        var ShanghaiImage = createImage("Shanghai", "Shanghai", "2016/12/02", "landscape", "usr2", "blog2", "site2", "city2", "food1");

        // image_3 Shenzhen
        var ShenzhenImage = createImage("Shenzhen", "Shenzhen", "2016/12/03", "landscape", "usr3", "blog3", "site3", "city3", "food1");
        // image_3 Shenzhen
        var ShenzhenImage2 = createImage("Xiamen", "Xiamen", "2016/12/03", "landscape", "usr3", "blog3", "site3", "city3", "food1");

        // image_3 Shenzhen
        var ShenzhenImage3 = createImage("Chengdu", "Chengdu", "2016/12/03", "landscape", "usr3", "blog3", "site3", "city3", "food4");


        //
        listOfImages.push(BeijingImage, ShanghaiImage, ShenzhenImage,ShenzhenImage2,ShenzhenImage3);

        return imageCollection.insertMany(listOfImages).then(() => {
            //return imageCollection.find().toArray();
            console.log("Done seeding database!");
            db.close();
        });
    });
}), (error) => {
    console.error(error);
};

