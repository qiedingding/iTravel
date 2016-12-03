"use strict";
/*
 Created by Qingzheng on 2016/12/01
 Name: Qingzheng Liu
 */
const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");
const data = require("../data/");
const sites = data.site;
const food = data.food;

dbConnection().then(db => {
    return db.collection("image").drop().then(function() {
        return db;
    }, function() {
        return db;
    }).then((db) => {
        return db.createCollection("image");
    }).then(function(imageCollection) {

        var createImage = (name, address, createTime, type, userId, blogId, siteId, imageId) => {
            return {
                _id: uuid.v4(),
                name: name,
                address: address,
                createTime: createTime,
                type: type,
                userId: userId,
                blogId: blogId,
                siteId: siteId,
                imageId: imageId
            }
        }

        var listOfImages = [];

        // image_1 Beijing

        var BeijingImage = createImage("Beijing", "Beijing", "2016/12/01", "landscape", "usr1", "blog1", "site1", "image1");

        // image_2 Shanghai
        var ShanghaiImage = createImage("Shanghai", "Shanghai", "2016/12/02", "landscape", "usr2", "blog2", "site2", "image2");

        // image_3 Shenzhen
        var ShenzhenImage = createImage("Shenzhen", "Shenzhen", "2016/12/03", "landscape", "usr3", "blog3", "site3", "image3");

        //
        listOfImages.push(BeijingImage, ShanghaiImage, ShenzhenImage);

        return imageCollection.insertMany(listOfImages).then(() => {
            return imageCollection.find().toArray();
        });
    }).then(() => {
        return db.collection("comment").drop();
    }).then(() => {
        return db.createCollection("comment");
    }).then(function(commentCollection){

        var createComment = (content, createTime, stars, userId, target, blogId, siteId, cityId) => {
            return {
                _id: uuid.v4(),
                content: content,
                createTime: createTime,
                stars: stars,
                userId: userId,
                target: target,
                blogId: blogId,
                siteId: siteId,
                cityId: cityId,
            }
        }

        var listOfComments = [];

        // image_1 Beijing

        var BeijingComment = createComment("good", "2016/12/01", "5", "usr1", "target1", "blog1", "site1", "city1");

        // image_2 Shanghai
        var ShanghaiComment = createComment("just soo", "2016/12/02", "3", "usr2", "target2", "blog2", "site2", "city2");

        // image_3 Shenzhen
        var ShenzhenComment = createComment("boring", "2016/12/03", "1", "usr3", "target3", "blog3", "site3", "city3");

        //
        listOfComments.push(BeijingComment, ShanghaiComment, ShenzhenComment);
        return commentCollection.insertMany(listOfComments).then(() => {
            console.log("Done seeding database!");
            db.close();
        });

    });
}), (error) => {
    console.error(error);
};

