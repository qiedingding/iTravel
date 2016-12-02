/*
 Created by Yiran Li on 2016/12/01
 */
"use strict";

const mongoCollections = require("../config/mongoCollections");
const food = mongoCollections.food;
const uuid = require('node-uuid');

let exportedMethods = {
	getAllFood() {
		return food().then((foodCollection) => {
			return foodCollection.find({}, {name: 1, address: 1, price: 1, _id: 0}).toArray().then((foodArr) => {
				return foodArr;
			});
		});
	},
	
	getFoodById(id) {
		if(!id) reject("You must provide a correct id to search for!");
		return food().then((foodCollection) => {
			return foodCollection.findOne({_id: id}).then((food) => {
				if(!food) reject("Could not find the food with id of" + id + "!");
				return food;
			});
		});
	},

	getFoodByName(name) {
		if(!name) reject("You must provide a correct name to search for!");
		return food().then((foodCollection) => {
			return foodCollection.findOne({name: name}).then((food) => {
				if(!food) reject("Could not find the food with id of" + name + "!");
				return food;
			});
		});
	},

	addFood(name, description, location, address, price, closingTime, phone, website, mainImage, type, cityId) {
		if(!name || typeof name !== "string") reject("You must provide a correct name for the food!");
		if(!description || typeof description !== "string") reject("You must provide the correct description for the food!");
		if(!location) reject("You must provide the correct location for the food!");
		if(!address || typeof address !== "string") reject("You must provide the correct address for the food!");
		//if(!price) reject("You must provide the correct price for the food!");
		//if(!closingTime) reject("You must provide the correct closingTime for the food!");
		//if(!phone) reject("You must provide the correct phone number for the food store!");
		//if(!website) reject("You must provide the correct website for the food website!");
		//if(!mainImage) reject("You must provide the correct food image!");
		if(!type || isNaN(type)) reject("You must provide the correct type for the food!");
		//if(!cityId || typeof cityId !== "string") reject("You must provide the belonging city for the food!");
		return food().then((foodCollection) => {
			let newFood = {
				_id: uuid.v4(),
				name: name,
				description: description,
				location: location,
				address: address,
				price: price,
				closingTime: closingTime,
				phone: phone,
				website: website,
				mainImage: mainImage,
				type: type,
				cityId: cityId
			};

			return foodCollection.insertOne(newFood).then((newInsertInformation) => {
				return newInsertInformation.insertedId;
			}).then((newId) => {
				return this.getFoodById(newId);
			});
		});
	},

	updateFood(id, updatedFood) {
		if(!id) reject("You must provide a correct id to update!");
		return food().then((foodCollection) => {
			let updatedPostData = {};

			if(updatedFood.name) {
				updatedPostData.name = updatedFood.name;
			}

			if(updatedFood.description) {
				updatedPostData.description = updatedFood.description;
			}

			if(updatedFood.location) {
				updatedPostData.location = updatedFood.location;
			}

			if(updatedFood.address) {
				updatedPostData.address = updatedFood.address;
			}

			if(updatedFood.price) {
				updatedPostData.price = updatedFood.price;
			}

			if(updatedFood.closingTime) {
				updatedPostData.closingTime = updatedFood.closingTime;
			}

			if(updatedFood.phone) {
				updatedPostData.phone = updatedFood.phone;
			}

			if(updatedFood.website) {
				updatedPostData.website = updatedFood.website;
			}

			if(updatedFood.mainImage) {
				updatedPostData.mainImage = updatedFood.mainImage;
			}

			if(updatedFood.type) {
				updatedPostData.type = updatedFood.type;
			}

			if(updatedFood.cityId) {
				updatedPostData.cityId = updatedFood.cityId;
			}

			let updateCommand = {
				$set: updatedPostData
			};

			return foodCollection.updateOne({_id: id}, updateCommand).then((result) => {
				return this.getFoodById(id);
			});
		});
	},

	removeFood(id) {
		if(!id) reject("You must provide a correct id to delete!");
		return food().then((foodCollection) => {
			return foodCollection.removeOne({_id: id}).then((deletionInfo) => {
				if(deletionInfo.deletedCount === 0) {
					reject("Could not delete food with id of" + id + "!");
				}
			});
		});
	}
};


module.exports = exportedMethods;
