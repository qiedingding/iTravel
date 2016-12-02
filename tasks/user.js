"use strict";
/*
 Created by lx on 2016/12/1
 Name: Xuan Li
 */
const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");
const bcrypt = require("bcrypt-nodejs");

dbConnection().then(db => {
    return db.collection("user").drop().then(function () {
        return db;
    }, function () {
        return db;
    }).then((db) => {
        return db.createCollection("user");
    }).then(function (userCollection) {

        let createUser = (username, pwd, nickName, gender, dob, description,
                          phone, email, image, registerTime, lastLoginTime, type, tag) => {
            return {
                _id: uuid.v4(),
                "username": username,
                "pwd": pwd,
                "nickName": nickName,
                "gender": gender,
                "dob": dob,
                "description": description,
                "phone": phone,
                "email": email,
                "image": image,
                "registerTime": registerTime,
                "lastLoginTime": lastLoginTime,
                "type": type,
                "tag": tag
            }
        };

        let listOfUsers = [];

        // username admin_lx
        let admin_lxTag = ["team member", "admin"];
        let admin_lxPwd = bcrypt.hashSync("xuanli9939");
        let admin_lx = createUser("admin_lx", admin_lxPwd, "PenguingXuan", "male", "1993/09/21",
            "admin", "5512477786", "xli100@stevens.edu", "admin-default", "2016/12/1","2016/12/1",9,admin_lxTag);

        // username admin_lyr
        let admin_lyrTag = ["team member", "admin"];
        let admin_lyrPwd = bcrypt.hashSync("yiranli6200");
        let admin_lyr = createUser("admin_lyr", admin_lyrPwd, "liyiran", "male", "1992/01/11",
            "admin", "5512477786", "yli@stevens.edu", "admin-default", "2016/12/1","2016/12/1",9,admin_lyrTag);

        // username testUser
        let testTag = ["test user", "test"];
        let testPwd = bcrypt.hashSync("test12345");
        let test1 = createUser("test1", testPwd, "test1", "male", "1992/01/11",
            "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1","2016/12/1",1,testTag);

        let test2 = createUser("test2", testPwd, "test2", "male", "1992/01/11",
            "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1","2016/12/1",1,testTag);

        let test3= createUser("test3", testPwd, "test3", "male", "1992/01/11",
            "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1","2016/12/1",1,testTag);

        let test4 = createUser("test4", testPwd, "test4", "male", "1992/01/11",
            "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1","2016/12/1",1,testTag);

        // add user into array
        listOfUsers.push(admin_lx, admin_lyr);
        listOfUsers.push(test1,test2,test3,test4);
        // add user into our database
        return userCollection.insertMany(listOfUsers).then(() => {
            return userCollection.find().toArray();
        });
    });
});
