/*
 Created by Yiran Li on 2016/12/01
 */
"use strict";
const express = require("express");
const router = express.Router();
const data = require("../data");
const siteData = data.site;

router.get("/", (req, res) => {
	siteData.getAllSites().then((siteList) => {
		res.json(siteList);
	}).catch((e) => {
		res.status(500).json({error: e});
	});
});

router.get("/siteId/:id", (req, res) => {
	siteData.getSiteById(req.params.id).then((site) => {
		res.json(site);
	}).catch(() => {
		res.status(404).json({error: "Site not found!"});
	});
});

router.get("/siteName/:name", (req, res) => {
	siteData.getSiteByName(req.params.name).then((site) => {
		res.json(site);
	}).catch(() => {
		res.status(404).json({error: "Site not found!"});
	});
});

router.post("/", (req, res) => {
	let sitePostData = req.body;
	siteData.addSite(sitePostData.name, sitePostData.location, sitePostData.address, sitePostData.commute, sitePostData.price, sitePostData.closingTime, sitePostData.phone, sitePostData.website, sitePostData.description, sitePostData.mainImage, sitePostData.type, sitePostData.tips, sitePostData.tag, sitePostData.cityId).then((newSite) => {
		res.json(newSite);
	}).catch((e) => {
		res.status(500).json({error: e});
	});
});

router.put("/:id", (req, res) => {
	let updatedData = req.body;
	let getSite = siteData.getSiteById(req.params.id);

	getSite.then(() => {
		return siteData.updateSite(req.params.id, updatedData).then((updatedSite) => {
			res.json(updatedSite);
		}).catch((e) => {
			res.status(500).json({error: e});
		});
	}).catch(() => {
			res.status(404).json({error: "Site not found!"});
	});
});

router.delete("/:id", (req, res) => {
	let getSite = siteData.getSiteById(req.params.id);

	getSite.then(() => {
		return siteData.removeSite(req.params.id).then(() => {
			res.sendStatus(200);
		}).catch((e) => {
			res.status(500).json({error: e});
		});
	}).catch(() => {
		res.status(404).json({error: "Site not found!"});
	});
});

module.exports = router;
