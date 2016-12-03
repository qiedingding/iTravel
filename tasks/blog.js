"use strict";
/*
 Created by Zihao Zhao on 2016/12/1
 */
const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");
const blogData = require("../data/blog");
//console.log(blogData);
dbConnection().then(db => {
    return db.collection("blog").drop().then(function(status) {
        console.log("should be true: ",status);
        return db;
    }, function(error) {
        console.log("error in drop blog!")
        //console.log(error);
        return db;
    }).then((db) => {
        console.log("create blog collection!")
        return db.createCollection("blog");
    }).then(function(blogCollection) {
        console.log(blogCollection);
        console.log("in blogCollection");
        //blogData.addBlog(title, content, createTime, mainImage, conclusions, type, tag, userId, siteId)
        var createBlog = function(title, content, mainImage, conclusions,type, tag, userId, siteId){
            console.log("create blog data with", title);
            return {
                _id: uuid.v4(),
                title: title,
                content: content,
                createTime: new Date("<YYYY-mm-dd>"),
                mainImage: mainImage,
                conclusions: conclusions,
                type: type,
                tag: tag,
                userId: userId,
                siteId: siteId
            }
        };

        var list = [];
        // blog_1 Beijing
        var blog1 = createBlog("blog1", "content1", {tag: ["tag1","tag2"]});

        // blog_2 Shanghai
        var blog2 = createBlog("blog2", "content2", {tag:["tag1","tag2"]});

        // blod_3 Shenzhen
        var blog3 = createBlog("blog3", "content3", {tag:["tag1","tag2"]});

        list.push(blog1, blog2, blog3);
        return blogCollection.insertMany(list).then(() => {
            console.log("insertMany");
            return blogCollection.find().toArray();
        });
    })
    .then((list)=>{
        console.log("list stored in collection: ")
        //console.log(list);
        db.close();
    })
    .catch(error=>{
        console.log("Error here: ");
        console.log(error);
    });
});

