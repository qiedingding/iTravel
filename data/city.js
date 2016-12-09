"use strict";
/*
 Created by lx on 2016/11/25
 Name: Xinyu Ge
 */

const mongoCollections = require("../config/mongoCollections");
const city = mongoCollections.city;
const uuid = require('node-uuid');

/*
 The city data structure
 {
 "_id": "",
 "name":    "",
 "location":    "",
 "description": "",
 "traffic": "",
 "weather": "",
 "history": "",
 "culture": "",
 "currency":    "",
 "mainImage":   "",
 "tag": [],
 }
 */

let exportedMethods = {
    getAllCities() {
        return city().then((cityCollection) => {
            return cityCollection.find({}).toArray();
        });
    },

    getCityById(id) {
        if (!id) return Promise.reject ("You must provide an id.");

        return city().then((cityCollection) => {
            return cityCollection.findOne({ _id: id }).then((city) => {
                if (!city) return Promise.reject (`City with id: ${id} is not found.`);

                return city;
            });
        });
    },

    getCityByName(name) {
        if (!name) return Promise.reject ("You must provide a city name.");

        return city().then((cityCollection) => {
            return cityCollection.findOne({ name: name }).then((city) => {
                if (!city) return Promise.reject (`City named ${name} is not found.`);
                return city;
            });
        });
    },

    getCityByTag(tag) {
        if (!tag) return Promise.reject ("You must provide a tag.");

        return city().then((cityCollection) => {
            return cityCollection.find({ "tag": tag }).toArray().then((cityList) => {
                if (!cityList) return Promise.reject (`City with tag ${tag} is not found.`);
                return cityList;
            });
        });
    },

    getCityByProvince(province) {
        if (!province) return Promise.reject ("You must provide a province.");

        return city().then((cityCollection) => {
            return cityCollection.find({ province: province }).toArray().then((cityList) => {
                if (!cityList) return Promise.reject (`City located in ${province} province is not found.`);
                return cityList;
            });
        });
    },

    addCity(name, province, description, traffic, weather, history, culture, currency, mainImage, tag) {
        // Only check name
        if (!name) return Promise.reject ("You must provide name of the city.");

        return city().then((cityCollection) => {
            let newCity = {
                _id: uuid.v4(),
                name: name,
                province: province,
                description: description,
                traffic: traffic,
                weather: weather,
                history: history,
                culture: culture,
                currency: currency,
                mainImage: mainImage,
                tag: tag
            };

            return cityCollection.insertOne(newCity).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getCityById(newId);
            });
        });
    },

    addTagIfNotExists(id, newTag) {
        if (!id) return Promise.reject ("You must provide a city id.");
        if (!newTag) return Promise.reject("You must provide a tag.");
        return city().then((cityCollection) => {
            return cityCollection.update({ _id: id }, { $addToSet: { "tag": newTag } }).then((result) => {
                return this.getCityById(id);
            });
        });
    },

    removeCity(id) {
        if (!id) return Promise.reject ("You must provide an id.");

        return city().then((cityCollection) => {
            return cityCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete city with id of ${id}.`);
                } else { }
            });
        });
    },

    removeCityTag(id, TagToRemove) {
        if (!id) return Promise.reject("You must provide a city id.");
        if (!TagToRemove) return Promise.reject("You must provide tag to remove.");

        return city().then((cityCollection) => {
            return cityCollection.update({ _id: id }, { $pullAll: { "tag": TagToRemove } }).then((result) => {
                return this.getCityById(id);
            });
        });
    },

    updateCity(id, updatedCity) {
        if (!id) return Promise.reject ("You must provide an id.");

        return city().then((cityCollection) => {
            let updatedCityData = {};
            // name
            if (updatedCity.name) {
                updatedCityData.name = updatedCity.name;
            }
            // province
            if (updatedCity.province) {
                updatedCityData.province = updatedCity.province;
            }
            // description
            if (updatedCity.description) {
                updatedCityData.description = updatedCity.description;
            }
            // traffic
            if (updatedCity.traffic) {
                updatedCityData.traffic = updatedCity.traffic;
            }
            // weather
            if (updatedCity.weather) {
                updatedCityData.weather = updatedCity.weather;
            }
            // history
            if (updatedCity.history) {
                updatedCityData.history = updatedCity.history;
            }
            // culture
            if (updatedCity.culture) {
                updatedCityData.culture = updatedCity.culture;
            }
            // currency
            if (updatedCity.currency) {
                updatedCityData.currency = updatedCity.currency;
            }
            // mainImage
            if (updatedCity.mainImage) {
                updatedCityData.mainImage = updatedCity.mainImage;
            }
            // tag
            if (updatedCity.tag) {
                updatedCityData.tag = updatedCity.tag;
            }

            let updateCommand = {
                $set: updatedCityData
            };

            return cityCollection.updateOne({ _id: id }, updateCommand).then((result) => {
                return this.getCityById(id);
            });
        });
    }
}

module.exports = exportedMethods;
