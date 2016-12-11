/*
 Created by Yiran Li on 2016/12/01
 */
"use strict";
const express = require("express");
const router = express.Router();
const data = require("../data");
const siteData = data.site;
const imageData = data.image;
const userData = data.user;
const commentData =  data.comment;
const cityData = data.city;

const path = require("path");
let notFound = path.resolve("../static/404.html");
router.get("/", (req, res) => {
    siteData.getAllSites().then((siteList) => {
        res.json(siteList);
    }).catch((e) => {
        res.sendFile(notFound);
    });
});

router.get("/siteId/:id", (req, res) => {
    siteData.getSiteById(req.params.id).then((site) => {
        imageData.getImageById(site.mainImage).then((siteMainImage) => {
            commentData.getCommentByBelongToId(req.params.id).then((commentList) => {
                cityData.getCityById(site.cityId).then((city) => {
                    let promises = [];
                    for (let i = 0, len = commentList.length; i < len; i++) {
                        promises.push(userData.getUserById(commentList[i].userId).then((user) => {
                           commentList[i].userId = user.username;
                        }));
                    }
                    Promise.all(promises).then(() => {
                        res.render("site/singleSite", {site: site, siteMainImage: siteMainImage, siteComments: commentList, city: city});
                    });
                });
            });
        });
    }).catch(() => {
        res.sendFile(notFound);
    });
});

router.get("/cityId/:id", (req, res) => {
    siteData.getSitesByCityId(req.params.id).then((siteList) => {
        res.json(siteList);
    }).catch((e) => {
        res.status(500).json({error: e});
    });
});

router.get("/photo/:siteId", (req, res) => {
    imageData.getImageBySiteId(req.params.siteId).then((imageList) => {
        res.render('image/imageList', { imageList: imageList });
    }).catch((e) => {
        res.status(500).json({error: e});
    });
});
/*
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
});*/

module.exports = router;
