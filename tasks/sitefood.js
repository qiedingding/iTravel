"use strict";
const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const sites = data.site;
const food = data.food;

dbConnection().then((db) => {
	return db.dropDatabase().then(() => {
		return dbConnection;
	}).then((db) => {
		return sites.addSite("QianFoMountain", "N36°E117°", "JingShi road, JiNan, ShanDong", "Bus", "30￥", "6:00PM", "2016681367", "www.qianfoshan.com", "qianfoshan", "1.png", 1, ["climb","cable"],["mountain", "famous", "JiNan"], "fk_city");
	}).then((addedSite) => {
		return sites.addSite("DaMingLake", "N50°E120°", "MingHu road, JiNan, ShanDong", "Bus", "60￥", "6:00PM", "2016681367", "www.daminghu.com", "daminghu", "2.png", 1, ["boat","landscape"],["lake", "famous", "JiNan", "XiaYuHe"], "fk_city");
	}).then((addedSite) => {
		return sites.addSite("BaoTuFountain", "N45°E116°", "XiMen road, JiNan, ShanDong", "Bus", "50￥", "6:00PM", "2016681367", "www.baotuquan.com", "baotuquan", "3.png", 1, ["seal","tea"],["fountain", "famous", "JiNan"], "fk_city");
	}).then((addedSite) => {
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