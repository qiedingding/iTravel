"use strict";
/*
 Created by lx on 2016/11/25
 Name: Xuan Li
 CWID:10409939
 Email: xli100@stevens.edu
 */

const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const bcrypt = require("bcrypt-nodejs");
/*
 The users data structure
 {
 "_id":	"",
 "username":	"",
 "pwd":	"",
 "nickName":	"",
 "gender":	"",
 "dob":	"",
 "description":	"",
 "phone":	"",
 "email":	"",
 "image":	"",
 "registerTime":	"",
 "lastLoginTime":	"",
 "type":	"",
 "tag":	[]
 }
 */

let exportedMethods = {
    getAllUsers() {
        return user().then((userCollection) => {
            return userCollection.find({}).toArray();
        });
    },
    getUserById(id) {
        if (!id) return Promise.reject("You must provide an id.");
        return user().then((userCollection) => {
            return userCollection.findOne({_id: id}).then((user) => {
                if (!user) return Promise.reject(`User with id: ${id} is not found.`);
                return user;
            });
        });
    },
    getUserByName(name) {
        if (!name) return Promise.reject("You must provide a name.");
        return user().then((userCollection) => {
            return userCollection.find({name: name}).toArray().then((user) => {
                if (!user) return Promise.resolve(null);
                else return Promise.resolve(user);
            }).catch((error)=> {
                Promise.reject(error);
            });
        });
    },
    getUserByTag(tag) {
        if (!tag) return Promise.reject("You must provide a tag.");
        return user().then((userCollection) => {
            return userCollection.find({"tag": tag}).toArray().then((userList) => {
                if (!userList) return Promise.resolve(null);
                else return Promise.resolve(userList);
            }).catch((error)=> {
                Promise.reject(error);
            });
        });
    },
};

module.exports = exportedMethods;