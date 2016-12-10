"use strict";
/*
 Created by Qingzheng on 2016/12/01
 Name: Qingzheng Liu
 */

const mongoCollections = require("../config/mongoCollections");
const comment = mongoCollections.comment;
const uuid = require('node-uuid');

/*
 The comment data structure
     {
        "_id": "",
        "content": "",
        "createTime": "",
        "stars": "",
        "userId": "",
        "target": "",
        "blogId": "",
        "siteId": "",
        "cityId": ""
     }
 */

let exportedMethods = {
    getAllComments() {
        return comment().then((commentCollection) => {
            return commentCollection.find({}).toArray();
        });
    },

    getCommentById(id) {
        if (!id) return Promise.reject ("You must provide a comment id.");

        return comment().then((commentCollection) => {
            return commentCollection.findOne({ _id: id }).then((comment) => {
                if (!comment) return Promise.reject ('comment with id: ${id} is not found.');

                return comment;
            });
        });
    },

    getCommentByUserId(userId) {
        if (!userId) return Promise.reject ("You must provide a userId.");

        return comment().then((commentCollection) => {
            return commentCollection.find({ userId: userId }).toArray().then((commentList) => {
                if (!commentList) return Promise.reject ('comment named ${userId} is not found.');
                return commentList;
            });
        });
    },

    getCommentBySiteId(siteId) {
        if (!siteId) return Promise.reject ("You must provide a siteId.");

        return comment().then((commentCollection) => {
            return commentCollection.find({siteId: siteId}).toArray().then((commentList) => {
                if (!commentList) return Promise.reject ('comment named ${userId} is not found.');
                return commentList;
            });
        });
    },
    
    getCommentByBlogId(blogId) {
        if (!blogId) return Promise.reject ("You must provide a blogId.");
        return comment().then((commentCollection) => {
            return commentCollection.find({ "blogId": blogId }).toArray().then((commentList) => {
                if (!commentList) return Promise.reject ('comment with blogId of ${blogId} is not found.');
                return commentList;
            });
        }); 
    },   

    addComment(content, createTime, stars, userId, target, blogId, siteId, cityId) {
        // check content and userId
        if (!content) return Promise.reject ("You must provide content of the comment.");
        //if (!userId) return Promise.reject ("You must provide userId of the comment.");

        return comment().then((commentCollection) => {
            let newComment = {
                _id: uuid.v4(),
                content: content,
                createTime: createTime,
                stars: stars,
                userId: userId,
                target: target,
                blogId: blogId,
                siteId: siteId,
                cityId: cityId,
            };

            return commentCollection.insertOne(newComment).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getCommentById(newId);
            });
        });
    },


    removeComment(id) {
        if (!id) return Promise.reject ("You must provide an comment id.");

        return comment().then((commentCollection) => {
            return commentCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw ('Could not delete comment with id of ${id}.');
                } else {"message","remove comment success!"}
            });
        });
    },

    removeCommentStars(id, StarsToRemove) {
        if (!id) return Promise.reject("You must provide a comment id.");
        if (!StarsToRemove) return Promise.reject("You must provide star to remove.");

        return comment().then((commentCollection) => {
            return commentCollection.update({ _id: id }, { $pullAll: { "stars": StarsToRemove } }).then((result) => {
                return this.getCommentById(id);
            });
        });
    },

    updateComment(id, updatedComment) {
        if (!id) return Promise.reject ("You must provide an id.");

        return comment().then((commentCollection) => {
            let updatedCommentData = {};
            // content
            if (updatedComment.content) {
                updatedCommentData.content = updatedComment.content;
            }
            // createTime
            if (updatedComment.createTime) {
                updatedCommentData.createTime = updatedComment.createTime;
            }
            // stars
            if (updatedComment.stars) {
                updatedCommentData.stars = updatedComment.stars;
            }
            // userId
            if (updatedComment.userId) {
                updatedCommentData.userId = updatedComment.userId;
            }
            // target
            if (updatedComment.target) {
                updatedCommentData.target = updatedComment.target;
            }
            // blogId
            if (updatedComment.blogId) {
                updatedCommentData.blogId = updatedComment.blogId;
            }
            // siteId
            if (updatedComment.siteId) {
                updatedCommentData.siteId = updatedComment.siteId;
            }
            // cityId
            if (updatedComment.cityId) {
                updatedCommentData.cityId = updatedComment.cityId;
            }

            let updateCommand = {
                $set: updatedCommentData
            };

            return commentCollection.updateOne({ _id: id }, updateCommand).then((result) => {
                return this.getCommentById(id);
            });
        });
    }
}

module.exports = exportedMethods;
