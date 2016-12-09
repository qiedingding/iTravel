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
const date = require('date-and-time');
const uuid = require('node-uuid');
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
        if (!id) return Promise.reject("You must provide a id.");
        return user().then((userCollection) => {
            return userCollection.find({_id: id}).toArray().then((user) => {
                if (!user || user.length === 0) return Promise.resolve(null);
                else return Promise.resolve(user[0]);
            }).catch((error) => {
                Promise.reject(error);
            });
        });
    },
    getUserByName(username) {
        if (!username) return Promise.reject("You must provide a name.");
        return user().then((userCollection) => {
            return userCollection.find({username: username}).toArray().then((user) => {
                if (!user || user.length === 0) return Promise.resolve(null);
                else {
                    let now = new Date();
                    now = date.format(now, 'YYYY/MM/DD HH:mm:ss');
                    //  console.log(user);
                    let set = {"lastLoginTime": now};
                    return userCollection.update({"_id": user[0]._id}, {$set: set}).then(() => {
                        return this.getUserById(user[0]._id);
                    }).catch((error) => {
                        Promise.reject(error);
                    });
                }
            }).catch((error) => {
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
            }).catch((error) => {
                Promise.reject(error);
            });
        });
    },
    register(username, password,email) {
        return user().then((userCollection) => {
            if (!username || username === undefined || password === undefined || !password ||email === undefined || !email)
                return Promise.reject("You must provide enough parameter to add a user");
            let now1 = new Date();
            let now2 = date.format(now1, 'YYYY/MM/DD HH:mm:ss');
            password = bcrypt.hashSync(password);
            let newUser = {
                _id: uuid.v4(),
                username: username,
                pwd: password,
                nickName: "",
                gender: "",
                dob: "",
                description: "",
                phone: "",
                email: email,
                image: "",
                registerTime: now2,
                lastLoginTime: now2,
                type: 1,
                tag: []
            };
            return userCollection.insertOne(newUser).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getUserById(newId);
            });
        });

    },
    removeUser(id) {
        return user().then((userCollection) => {
            return userCollection.removeOne({_id: id}).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    Promise.reject("Could not delete users");
                }
            });
        });
    },
    // not finish yet, still need working on it
    updateUser(id, body) {
        if (!body || body === undefined)
            return Promise.reject("You must provide an body to update");
        return user().then((userCollection) => {
            let set = null;
            if (!body) {
                Promise.reject("poster and comment information is missing");
            } else {
                set = {
                    "body.$.poster": poster,
                    "body.$.comment": comment
                };
            }
            return userCollection.update({_id: id, "comments._id": commentId,}, {$set: set}).then(() => {
                return this.getUserById(id);
            });
        });
    }
};

module.exports = exportedMethods;
