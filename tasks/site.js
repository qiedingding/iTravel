"use strict";
const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const sites = data.site;
dbConnection().then((db) => {
	return db.collection("site").drop().then(function () {
		return db;
	}, function () {
		return db;
	}).then((addeddb) => {
		return sites.addSite("QianFoMountain", "N36°E117°", "JingShi road, JiNan, ShanDong", "Bus", "30￥", "6:00PM", "2016681367", "www.qianfoshan.com", "qianfoshan", "1.png", 1, ["climb","cable"],["mountain", "famous", "JiNan"], "fk_city");
	}).then((addedSite) => {
		return sites.addSite("DaMingLake", "N50°E120°", "MingHu road, JiNan, ShanDong", "Bus", "60￥", "6:00PM", "2016681367", "www.daminghu.com", "daminghu", "2.png", 1, ["boat","landscape"],["lake", "famous", "JiNan", "XiaYuHe"], "fk_city");
	}).then((addedSite) => {
		return sites.addSite("BaoTuFountain", "N45°E116°", "XiMen road, JiNan, ShanDong", "Bus", "50￥", "6:00PM", "2016681367", "www.baotuquan.com", "baotuquan", "3.png", 1, ["seal","tea"],["fountain", "famous", "JiNan"], "fk_city");
	}).then((added) => {
		console.log("Done seeding database!");
		db.close();
	});
}, (error) => {
	console.error(error);
});