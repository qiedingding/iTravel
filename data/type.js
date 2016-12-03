 "use strict";

/*
 Created by Zihao on 2016/11/28
 Name: Zihao Zhao
 */
const mongoCollections = require("../config/mongoCollections");
const type = mongoCollections.type;
const uuid = require('node-uuid');

 /*
 The type data structure
 8. Type
 this collction store some main key-value pair for our system. Such as user Type or image type or comment type etc.
  {
    "_id": "",
    "TypeName": ""
  }
 */

let exportedMethods = {
    getTypeById(id) {
        if (!id) return Promise.reject ("You must provide an id.");

        return type().then((typeCollection) => {
            return typeCollection.findOne({ _id: id }).then((type) => {
                if (!type) return Promise.reject (`blog with id: ${id} is not found.`);

                return type;
            });
        });
    },
    getObjectByTypeId(id) {
        if (!id) return Promise.reject ("You must provide an id.");

        return type().then((typeCollection) => {
            return typeCollection.find({ _id: id }).then((objList) => {
                if (!objList) return Promise.reject (`object with type id: ${id} is not found.`);

                return objList;
            });
        });
    },
    addType(typeName) {
        // check title and content
        if (!typeName) return Promise.reject ("You must provide a name of the type.");
        return type().then((typeCollection) => {
            let newtype = {
                _id: uuid.v4(),
                TypeName:typeName
            };
            return typeCollection.insertOne(newtype).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getTypeById(newId);
            });
        });
    },

    removeTypeById(id) {
        if (!id) return Promise.reject ("You must provide an id.");

        return type().then((typeCollection) => {
            return typeCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete type with id of ${id}.`);
                } else {
                    return {"message":"remove success!"};
                 }
            });
        });
    },
    updatetype(id, updatedtype) {
        if (!id) return Promise.reject ("You must provide an id.");

        return type().then((typeCollection) => {
            let updatedtypeData = {};
            // title
            if (updatedtype.name) {
                updatedtypeData.TypeName = updatedtype.TypeName;
            }
            
            let updateCommand = {
                $set: updatedtypeData
            };

            return typeCollection.updateOne({ _id: id }, updateCommand).then((result) => {
                return this.getTypeById(id);
            });
        });
    }
}

module.exports = exportedMethods;
