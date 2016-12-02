"use strict";

/*
 Created by Qingzheng on 2016/12/01
 Name: Qingzheng Liu
 */

const mongoCollections = require("../config/mongoCollections");
const image = mongoCollections.image;
const uuid = require('node-uuid');

/*
 The image data structure
 6.image 
 {
    "_id": "",
    "name": "",
    "address": "",
    "createTime": "",
    "type": "",
    "userId": "",
    "blogId": "",
    "siteId": "",
    "cityId": ""
  }
 */

let exportedMethods = {
    getAllImages() {
        return image().then((imageCollection) => {
            return imageCollection.find({}).toArray();
        });
    },

    getImageById(id) {
        if (!id) return Promise.reject ("You must provide an id.");

        return image().then((imageCollection) => {
            return imageCollection.findOne({ _id: id }).then((image) => {
                if (!image) return Promise.reject (`image with id: ${id} is not found.`);

                return image;
            });
        });
    },    
    
    getImageByName(name) {
        if (!name) return Promise.reject ("You must provide a image name.");

        return image().then((imageCollection) => {
            return imageCollection.find({ name: name }).toArray().then((imageList) => {
                if (!imageList) return Promise.reject (`image named ${name} is not found.`);
                return imageList;
            });
        });
    },

    getImageByUserId(userId) {
        if (!userId) return Promise.reject ("You must provide a userId.");

        return image().then((imageCollection) => {
            return imageCollection.find({ "userId": userId }).toArray().then((imageList) => {
                if (!imageList) return Promise.reject (`image with userId of ${userId} is not found.`);
                return imageList;
            });
        }); 
    },

    getImageByBlogId(blogId) {
        if (!blogId) return Promise.reject ("You must provide a blogId.");

        return image().then((imageCollection) => {
            return imageCollection.find({ "blogId": blogId }).toArray().then((imageList) => {
                if (!imageList) return Promise.reject (`image with blogId of ${blogId} is not found.`);
                return imageList;
            });
        }); 
    },    
    

    addImage(name, address, createTime, type, userId, blogId, siteId, cityId) {
        // check name
        if (!name) return Promise.reject ("You must provide a name of the image.");
        if (!content) return Promise.reject("You must provide content of the image.")
        return image().then((blogCollection) => {
            let newImage = {
                _id: uuid.v4(),
                name: name,
                address: address,
                createTime: createTime,
                type: type,
                userId: userId,
                blogId: blogId,
                siteId: siteId,
                cityId: cityId
            };

            return imageCollection.insertOne(newImage).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getImageById(newId);
            });
        });
    },

    removeImage(id) {
        if (!id) return Promise.reject ("You must provide an image id.");

        return image().then((imageCollection) => {
            return imageCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw ('Could not delete image with id of ${id}.');
                } else {
                    return {"message":"remove image success!"};
                 }
            });
        });
    },

    updateImage(id, updatedImage) {
        if (!id) return Promise.reject ("You must provide an id.");

        return image().then((blogCollection) => {
            let updatedImageData = {};
            // name
            if (updatedImage.name) {
                updatedImageData.name = updatedImage.name;
            }
            // address
            if (updatedImage.address) {
                updatedImageData.address = updatedImage.address;
            }
            // createTime
            if (updatedImage.createTime) {
                updatedImageData.createTime = updatedImage.createTime;
            }
            // type
            if (updatedImage.type) {
                updatedImageData.type = updatedImage.type;
            }
            // userId
            if (updatedImage.userId) {
                updatedImageData.userId = updatedImage.userId;
            }
            // blogId
            if (updatedImage.blogId) {
                updatedImageData.blogId = updatedImage.blogId;
            }
            // siteId
            if (updatedImage.siteId) {
                updatedImageData.siteId = updatedImage.siteId;
            }
            // cityId
            if (updatedImage.cityId) {
                updatedImageData.cityId = updatedImage.cityId;
            }
            let updateCommand = {
                $set: updatedImageData
            };

            return imageCollection.updateOne({ _id: id }, updateCommand).then((result) => {
                return this.getImageById(id);
            });
        });
    }
}

module.exports = exportedMethods;
