"use strict";
/*
 Created by Qingzheng on 2016/12/01
 Name: Qingzheng Liu
 */
const express = require('express');
const router = express.Router();
const data = require("../data");
const imageData = data.image;
const path = require("path");
let notFound = path.resolve("../static/404.html");
// get-1: Return all the images
router.get("/", (req, res) => {
    imageData.getAllImages().then((imageList) => {
         //res.render("",imageList);
         res.render('image/imageList', { imageList: imageList });
    }).catch((e) => {
        res.sendFile(notFound);
    });
});

// get-2: Return the image information of the given image name.
router.get("/:name", (req, res) => {
    imageData.getImageByName(req.params.name).then((image) => {
        res.render('image/imageList', { list: imageList });
         //res.json(image);
    }).catch((err) => {
        console.log(err);
        res.sendFile(notFound);
    });
});

// get-3: Return the image information of the given image id.
router.get("/id/:id", (req, res) => {
    console.log("id");
    imageData.getImageById(req.params.id).then((image) => {
        //console.log("1111111111111111111111")
        res.render('image/imageList', { list: imageList });
         res.json(image);
    }).catch((err) => {
        console.log(err);
        res.sendFile(notFound);
    });
});

// get-4: Return all the image information of the given user id
router.get("/userId/:userId", (req, res) => {
    imageData.getImageByUserId(req.params.userId).then((imageList) => {
        res.render('image/imageList', { list: imageList });
       //res.json(imageList);
    }, (error) => {
        res.sendFile(notFound);
    });
});

// get-5: Return all the image information of the given blog id
router.get("/blogId/:blogId", (req, res) => {
    imageData.getImageByBlogId(req.params.blogId).then((imageList) => {
        res.render('image/imageList', { list: imageList });
        //res.json(imageList);
    }).catch(() => {
        res.sendFile(notFound);
    });
});

// get-6: Return all the image information of the given site id
router.get("/siteId/:siteId", (req, res) => {
    imageData.getImageBySiteId(req.params.siteId).then((imageList) => {
        res.render('image/imageList', { imageList: imageList });
        //res.json(imageList);
    }).catch(() => {
        res.sendFile(notFound);
    });
});

// get-7: Return all the image information of the given city id
router.get("/cityId/:cityId", (req, res) => {
    imageData.getImageByCityId(req.params.cityId).then((imageList) => {
        res.render('image/imageList', { list: imageList });
        //res.json(imageList);
    }).catch(() => {
        res.sendFile(notFound);
    });
});

// get-8: Return all the image information of the given food id
router.get("/foodId/:foodId", (req, res) => {
    imageData.getImageByFoodId(req.params.foodId).then((imageList) => {
        //res.render('image/imageList', { list: imageList });
        res.json(imageList);
    }).catch(() => {
        res.sendFile(notFound);
    });
});

// post-1: Add an image(at least provide a image name).
router.post("/", (req, res) => {
    let imageInfo = req.body;

    if (!imageInfo) {
        res.status(400).json({ error: "You must provide data to create a new image." });
        return;
    }
    if (!imageInfo.name) {
        res.status(400).json({ error: "You must at least provide name of the image." });
        return;
    }
    imageData.addImage(imageInfo.name, imageInfo.address, imageInfo.createTime, imageInfo.type, imageInfo.userId, imageInfo.blogId, imageInfo.siteId, imageInfo.cityId)
        .then((newImage) => {
            res.json(newImage);
        }, () => {
            res.sendStatus(500);
        });
});

/*
// put-1: Update image with the given image id.
router.put("/:id", (req, res) => {
    let imageInfo = req.body;

    if (!imageInfo) {
        res.status(400).json({ error: "You must provide data to update a image." });
        return;
    }
    let getImage = imageData.getImageById(req.params.id).then(() => {
        return imageData.updateImage(req.params.id, imageInfo)
            .then((updatedImage) => {
                res.json(updatedImage);
            }, () => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "image not found." });
    });

});


// delete-1: Delete image with the given image id.
router.delete("/:id", (req, res) => {
    let image = imageData.getImageById(req.params.id).then(() => {
        return imageData.removeImage(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "image not found." });
    });
});
*/



module.exports = router;