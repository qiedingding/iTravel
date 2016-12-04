"use strict";
/*
 Created by Qingzheng on 2016/12/01
 Name: Qingzheng Liu
 */
const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");
const data = require("../data/");

dbConnection().then(db => {
    return db.collection("comment").drop().then(function() {
        return db;
    }, function() {
        return db;
    }).then((db) => {
        return db.createCollection("comment");
    }).then(function(commentCollection) {

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

