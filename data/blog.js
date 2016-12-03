"use strict";

/*
 Created by Zihao on 2016/11/28
 Name: Zihao Zhao
 */

const mongoCollections = require("../config/mongoCollections");
const blog = mongoCollections.blog;
const uuid = require('node-uuid');

/*
 The blog data structure
 5.Blog
 {
 "_id": "",
 "title": "",
 "content": "",
 "createTime": "",
 "mainImage": "",
 "conclusions": "",
 "type": "",
 "tag": [],
 "userId": "",
 "siteId": []
 }
 */

let exportedMethods = {
    getAllBlogs() {
        return blog().then((blogCollection) => {
            return blogCollection.find({}).toArray();
        });
    },

    getBlogById(id) {
        if (!id) return Promise.reject ("You must provide an id.");

        return blog().then((blogCollection) => {
            return blogCollection.findOne({ _id: id }).then((blog) => {
                if (!blog) return Promise.reject (`blog with id: ${id} is not found.`);

                return blog;
            });
        });
    },

    getBlogByTitle(title) {
        if (!title) return Promise.reject ("You must provide a blog title.");

        return blog().then((blogCollection) => {
            return blogCollection.find({ title: title }).toArray().then((blogList) => {
                if (!blogList) return Promise.reject (`blog title ${name} is not found.`);
                return blogList;
            });
        });
    },

    getBlogByUserId(userId) {
        if (!userId) return Promise.reject ("You must provide a userId.");

        return blog().then((blogCollection) => {
            return blogCollection.find({ "userId": userId }).toArray().then((blogList) => {
                if (!blogList) return Promise.reject (`blog with userId of ${userId} is not found.`);
                return blogList;
            });
        });
    },

    getBlogByType(type) {
        if (!type) return Promise.reject ("You must provide a type.");

        return blog().then((blogCollection) => {
            return blogCollection.find({ type: type }).toArray().then((blogList) => {
                if (!blogList) return Promise.reject (`blog with type of ${province} is not found.`);
                return blogList;
            });
        });
    },

    addBlog(title, content, mainImage, conclusions, type, tag, userId, siteId) {
        // check title and content
        if (!title) return Promise.reject ("You must provide a title of the blog.");
        if (!content) return Promise.reject("You must provide content of the blog.")
        return blog().then((blogCollection) => {
            let newblog = {
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
            };

            return blogCollection.insertOne(newblog).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getblogById(newId);
            });
        });
    },

    addTagIfNotExists(id, newTag) {
        if (!id) return Promise.reject ("You must provide a blog id.");
        if (!newTag) return Promise.reject("You must provide a tag.");
        return blog().then((blogCollection) => {
            return blogCollection.update({ _id: id }, { $addToSet: { "tag": newTag } }).then((result) => {
                return this.getblogById(id);
            });
        });
    },

    removeBlog(id) {
        if (!id) return Promise.reject ("You must provide an id.");

        return blog().then((blogCollection) => {
            return blogCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete blog with id of ${id}.`);
                } else {
                    return {"message":"remove success!"};
                }
            });
        });
    },

    removeBlogTag(id, TagToRemove) {
        if (!id) return Promise.reject("You must provide a blog id.");
        if (!TagToRemove) return Promise.reject("You must provide tag to remove.");

        return blog().then((blogCollection) => {
            return blogCollection.update({ _id: id }, { $pullAll: { "tag": TagToRemove } }).then((result) => {
                return this.getBlogById(id);
            });
        });
    },

    updateBlog(id, updatedblog) {
        if (!id) return Promise.reject ("You must provide an id.");

        return blog().then((blogCollection) => {
            let updatedblogData = {};
            // title
            if (updatedblog.title) {
                updatedblogData.title = updatedblog.title;
            }
            // content
            if (updatedblog.content) {
                updatedblogData.content = updatedblog.content;
            }
            // createTime
            if (updatedblog.createTime) {
                updatedblogData.createTime = updatedblog.createTime;
            }
            // mainImage
            if (updatedblog.mainImage) {
                updatedblogData.mainImage = updatedblog.mainImage;
            }
            // conclusions
            if (updatedblog.conclusions) {
                updatedblogData.conclusions = updatedblog.conclusions;
            }
            // type
            if (updatedblog.type) {
                updatedblogData.type = updatedblog.type;
            }
            // tag
            if (updatedblog.tag) {
                updatedblogData.tag = updatedblog.tag;
            }
            // siteId
            if (updatedblog.siteId) {
                updatedblogData.siteId = updatedblog.siteId;
            }
            let updateCommand = {
                $set: updatedblogData
            };

            return blogCollection.updateOne({ _id: id }, updateCommand).then((result) => {
                return this.getBlogById(id);
            });
        });
    }
}

module.exports = exportedMethods;