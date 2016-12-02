"use strict";

const mongoCollections = require("../config/mongoCollections");
const sites = mongoCollections.site;
const uuid = require('node-uuid');

let exportedMethods = {
	getAllSites() {
		return sites().then((siteCollection) => {
			return siteCollection.find({}, {name: 1, address: 1, price: 1, _id: 0}).toArray().then((siteArr) => {
				return siteArr;
			});
		});
	},
	
	getSiteById(id) {
		if(!id) reject("You must provide a correct id to search for!");
		return sites().then((siteCollection) => {
			return siteCollection.findOne({_id: id}).then((site) => {
				if(!site) reject("Could not find the site with id of" + id + "!");
				return site;
			});
		});
	},

	getSiteByName(name) {
		if(!name) reject("You must provide a correct name to search for!");
		return sites().then((siteCollection) => {
			return siteCollection.findOne({name: name}).then((site) => {
				if(!site) reject("Could not find the site with id of" + name + "!");
				return site;
			});
		});
	},

	addSite(name, location, address, commute, price, closingTime, phone, website, description, mainImage, type, tips, tag, cityId) {
		if(!name || typeof name !== "string") reject("You must provide a correct name for the site!");
		if(!location) reject("You must provide the correct location for the site!");
		if(!address || typeof address !== "string") reject("You must provide the correct address for the site!");
		//if(!commute || typeof commute !== "string") reject("You must provide the correct commute method for the site!");
		//if(!price) reject("You must provide the correct price for the site!");
		//if(!closingTime) reject("You must provide the correct closingTime for the site!");
		//if(!phone) reject("You must provide the correct phone number for the site!");
		//if(!website) reject("You must provide the correct website for the site!");
		if(!description || typeof description !== "string") reject("You must provide the correct description for the site!");
		//if(!mainImage) reject("You must provide the correct site image!");
		if(!type || isNaN(type)) reject("You must provide the correct type for the site!");
		//if(!tips || !Array.isArray(tips)) reject("You must provide the correct visiting tips for the site!");
		//if(!tag || !Array.isArray(tag)) reject("You must provide the correct corresponding tags for the site!");
		//if(!cityId || typeof cityId !== "string") reject("You must provide the belonging city for the site!");
		return sites().then((siteCollection) => {
			let newSite = {
				_id: uuid.v4(),
				name: name,
				location: location,
				address: address,
				commute: commute,
				price: price,
				closingTime: closingTime,
				phone: phone,
				website: website,
				description: description,
				mainImage: mainImage,
				type: type,
				tips: tips,
				tag: tag,
				cityId: cityId
			};

			return siteCollection.insertOne(newSite).then((newInsertInformation) => {
				return newInsertInformation.insertedId;
			}).then((newId) => {
				return this.getSiteById(newId);
			});
		});
	},

	updateSite(id, updatedSite) {
		if(!id) reject("You must provide a correct id to update!");
		return sites().then((siteCollection) => {
			let updatedPostData = {};

			if(updatedSite.name) {
				updatedPostData.name = updatedSite.name;
			}

			if(updatedSite.location) {
				updatedPostData.location = updatedSite.location;
			}

			if(updatedSite.address) {
				updatedPostData.address = updatedSite.address;
			}

			if(updatedSite.commute) {
				updatedPostData.commute = updatedSite.commute;
			}

			if(updatedSite.price) {
				updatedPostData.price = updatedSite.price;
			}

			if(updatedSite.closingTime) {
				updatedPostData.closingTime = updatedSite.closingTime;
			}

			if(updatedSite.phone) {
				updatedPostData.phone = updatedSite.phone;
			}

			if(updatedSite.website) {
				updatedPostData.website = updatedSite.website;
			}

			if(updatedSite.description) {
				updatedPostData.description = updatedSite.description;
			}

			if(updatedSite.mainImage) {
				updatedPostData.mainImage = updatedSite.mainImage;
			}

			if(updatedSite.type) {
				updatedPostData.type = updatedSite.type;
			}

			if(updatedSite.tips) {
				updatedPostData.tips = updatedSite.tips;
			}

			if(updatedSite.tag) {
				updatedPostData.tag = updatedSite.tag;
			}

			if(updatedSite.cityId) {
				updatedPostData.cityId = updatedSite.cityId;
			}

			let updateCommand = {
				$set: updatedPostData
			};

			return siteCollection.updateOne({_id: id}, updateCommand).then((result) => {
				return this.getSiteById(id);
			});
		});
	},

	removeSite(id) {
		if(!id) reject("You must provide a correct id to delete!");
		return sites().then((siteCollection) => {
			return siteCollection.removeOne({_id: id}).then((deletionInfo) => {
				if(deletionInfo.deletedCount === 0) {
					reject("Could not delete site with id of" + id + "!");
				}
			});
		});
	}
};


module.exports = exportedMethods;
