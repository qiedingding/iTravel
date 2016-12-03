"use strict";
const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const food = data.food;

dbConnection().then((db) => {
	return db.collection("food").drop().then(() => {
		return dbConnection;
	}).then((db) => {
		return food.addFood("BaZiRou", "bengrouganfan", "N36°E117°", "YaoShan", "20￥", "9:30PM", "18615213327", "www.bazirou.com", "4.png", 2, "fk_city");
	}).then((addedFood) => {
		return food.addFood("TianMo", "salty vegetable porridge", "N36°E117°", "XiaoTan", "1.5￥", "10:00AM", "18615213327", "www.tianmo.com", "5.png", 2, "fk_city");
	}).then((addedFood) => {
		return food.addFood("YouXuan", "fried dough", "N36°E117°", "FuRongJie", "0.5￥", "10:30PM", "18615213327", "www.youxuan.com", "6.png", 2, "fk_city");
	}).then((added) => {
		console.log("Done seeding database!");
		db.close();
	});
}, (error) => {
	console.error(error);
});