/*
 Created by Yiran Li on 2016/12/01
 */
"use strict";
const express = require("express");
const router = express.Router();
const data = require("../data");
const foodData = data.food;
const imageData = data.image;
const userData = data.user;
const commentData = data.comment;
const path = require("path");
let notFound = path.resolve("../static/404.html");

router.get("/", (req, res) => {
    foodData.getAllFood().then((foodList) => {
        res.json(foodList);
    }).catch((e) => {
        res.status(500).json({error: e});
    });
});

router.get("/foodId/:id", (req, res) => {
    foodData.getFoodById(req.params.id).then((food) => {
        imageData.getImageById(food.mainImage).then((foodMainImage) => {
            commentData.getCommentByBelongToId(req.params.id).then((commentList) => {
                let promises = [];
                for (let i = 0, len = commentList.length; i < len; i++) {
                    promises.push(userData.getUserById(commentList[i].userId).then((user) => {
                       commentList[i].userId = user.username;
                    }));
                }
                Promise.all(promises).then(() => {
                    res.render("food/singleFood", {food: food, foodMainImage: foodMainImage, foodComments: commentList});
                });
            });
        });
    }).catch(() => {
        res.sendFile(notFound);
    });
});

/*router.get("/foodName/:name", (req, res) => {
    foodData.getFoodByName(req.params.name).then((food) => {
        res.json(food);
    }).catch(() => {
        res.status(404).json({error: "Food not found!"});
    });
});*/

/*router.get("/cityId/:id", (req, res) => {
    foodData.getFoodByCityId(req.params.id).then((foodList) => {
        res.json(foodList);
    }).catch((e) => {
        res.status(500).json({error: e});
    });
});*/

/*router.post("/", (req, res) => {
    let foodPostData = req.body;
    foodData.addFood(foodPostData.name, foodPostData.description, foodPostData.location, foodPostData.address, foodPostData.price, foodPostData.closingTime, foodPostData.phone, foodPostData.website, foodPostData.mainImage, foodPostData.type, foodPostData.cityId).then((newFood) => {
        res.json(newFood);
    }).catch((e) => {
        res.status(500).json({error: e});
    });
});

router.put("/:id", (req, res) => {
    let updatedData = req.body;
    let getFood = foodData.getFoodById(req.params.id);

    getFood.then(() => {
        return foodData.updateFood(req.params.id, updatedData).then((updatedFood) => {
            res.json(updatedFood);
        }).catch((e) => {
            res.status(500).json({error: e});
        });
    }).catch(() => {
        res.status(404).json({error: "Food not found!"});
    });
});

router.delete("/:id", (req, res) => {
    let getFood = foodData.getFoodById(req.params.id);

    getFood.then(() => {
        return foodData.removeFood(req.params.id).then(() => {
            res.sendStatus(200);
        }).catch((e) => {
            res.status(500).json({error: e});
        });
    }).catch(() => {
        res.status(404).json({error: "Food not found!"});
    });
});*/

module.exports = router;
