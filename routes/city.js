"use strict";
/*
 Created by lx on 2016/11/17
 Name: Xinyu Ge
 */
const express = require('express');
const router = express.Router();
const data = require("../data");
const cityData = data.city;
const siteData = data.site;
const imageData = data.image;
const foodData = data.food;

// router get 顺序？

// // get-1: Return all the tags of all cities.
// router.get("/tags/", (req, res) => {
//     cityData.getAllCities().then((cityList) => {
//         let tags = [];
//         cityList.forEach((city) => {
//             city.tag.forEach((tag) => {
//                 tags.push(tag);
//             })
//         })
//         // 如何输出tag不重复？
//         res.render('city/tagList', { list: tags });
//         // res.json(tags);
//     }, () => {
//         res.sendStatus(500);
//     });
// });

// get-2: Return all the cities(name, province, country), such as "Wuhan, Hubei, China".
router.get("/", (req, res) => {
    cityData.getAllCities().then((cityList) => {
        cityList.forEach((city) => {
            imageData.getImageById(city.mainImage).then((image) => {
                city.image = image;
            });
        });
        res.render('city/listCity', { cityList: cityList });
        // res.json(cityList);
    }, () => {
        res.sendStatus(500);
    });
});

// get-3: Return the city information of the given city name.
router.get("/:name", (req, res) => {
    let cityItem = {};
    cityData.getCityByName(req.params.name).then((city) => {
        cityItem.city = city;
    }).then(() => {
        imageData.getImageById(cityItem.city.mainImage).then((image) => {
                cityItem.city.image = image;
        }).then(() => {
            siteData.getSitesByCityId(cityItem.city._id).then((siteList) => {
                cityItem.site = siteList;
            }).then(() => {
                cityItem.site.forEach((site) => {
                    imageData.getImageById(site.mainImage).then((image) => {
                        site.image = image;
                    });
                });
            }).then(() => {
                foodData.getFoodByCityId(cityItem.city._id).then((foodList) => {
                    cityItem.food = foodList;
                }).then(() => {
                    cityItem.food.forEach((food) => {
                        imageData.getImageById(food.mainImage).then((image) => {
                            food.image =image;
                        });
                    });
                    res.render('city/singleCity', { cityItem: cityItem });
                });
            });
        });
    // res.json(cityList);
    }).catch(() => {
        res.status(404).json({ error: "City not found." });
    });
});

// get-4: Return the city information of the given city id.
router.get("/id/:id", (req, res) => {
    let cityItem = {};
    cityData.getCityById(parseInt(req.params.id)).then((city) => {
        cityItem.city = city;
    }).then(() => {
        imageData.getImageById(cityItem.city.mainImage).then((image) => {
                cityItem.city.image = image;
        }).then(() => {
            siteData.getSitesByCityId(cityItem.city._id).then((siteList) => {
                cityItem.site = siteList;
            }).then(() => {
                cityItem.site.forEach((site) => {
                    imageData.getImageById(site.mainImage).then((image) => {
                        site.image = image;
                    });
                });
            }).then(() => {
                foodData.getFoodByCityId(cityItem.city._id).then((foodList) => {
                    cityItem.food = foodList;
                }).then(() => {
                    cityItem.food.forEach((food) => {
                        imageData.getImageById(food.mainImage).then((image) => {
                            food.image =image;
                        });
                    });
                    res.render('city/singleCity', { cityItem: cityItem });
                });
            });
        });
    // res.json(cityList);
    }).catch(() => {
        res.status(404).json({ error: "City not found." });
    });
});

// get-5: Return all the cities(names) of the given province.
router.get("/province/:province", (req, res) => {
    cityData.getCityByProvince(req.params.province).then((cityList) => {
        res.render('city/cityList', { list: cityList });
        // res.json(cityInfo);
    }, (error) => {
        res.sendStatus(404);
    });
});

// get-6: Return all the cities(names) which have the given city tag.
router.get("/tag/:tag", (req, res) => {
    cityData.getCityByTag(req.params.tag).then((cityList) => {
        res.render('city/cityList', { list: cityList });
        // res.json(cityInfo);
    }).catch(() => {
        res.status(404).json({ error: "City not found." });
    });
});

// post-1: Add a city(at least provide a city name).
router.post("/", (req, res) => {
    let cityInfo = req.body;

    if (!cityInfo) {
        res.status(400).json({ error: "You must provide data to create a new city." });
        return;
    }
    if (!cityInfo.name) {
        res.status(400).json({ error: "You must at least provide name of the city." });
        return;
    }
    cityData.addCity(cityInfo.name, cityInfo.province, cityInfo.description, cityInfo.traffic, cityInfo.weather, cityInfo.history, cityInfo.culture, cityInfo.currency, cityInfo.mainImage, cityInfo.tag)
        .then((newCity) => {
            res.json(newCity);
        }, () => {
            res.sendStatus(500);
        });
});

// put-1: Update city with the given city id.
router.put("/:id", (req, res) => {
    let cityInfo = req.body;

    if (!cityInfo) {
        res.status(400).json({ error: "You must provide data to update a city." });
        return;
    }
    let getCity = cityData.getCityById(req.params.id).then(() => {
        return cityData.updateCity(req.params.id, cityInfo)
            .then((updatedCity) => {
                res.json(updatedCity);
            }, () => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "City not found." });
    });

});

// put-2: Add tag(s) to city with the given city id if the tag(s) do(does) not exist.
router.put("/tag/:id", (req, res) => {
    let tagInfo = req.body.tag;

    if (!tagInfo) {
        res.status(400).json({ error: "You must provide tag data to post." });
        return;
    }

    let getCity = cityData.getCityById(req.params.id).then(() => {

        tagInfo.forEach((tag) => {
            return cityData.addTagIfNotExists(req.params.id, tag)
                .then((updatedCity) => {
                    res.json(updatedCity);
                }, () => {
                    res.sendStatus(500);
                });
        });
    }).catch(() => {
        res.status(404).json({ error: "City not found." });
    });

});

// delete-1: Delete city with the given city id.
router.delete("/:id", (req, res) => {
    let city = cityData.getCityById(req.params.id).then(() => {
        return cityData.removeCity(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "City not found." });
    });
});

// delete-2: Delete tag(s) of city with the given city id.
router.delete("/tag/:id", (req, res) => {
    let tagInfo = req.body.tag;

    if (!tagInfo) {
        res.status(400).json({ error: "You must provide tag to delete." });
        return;
    }
    let city = cityData.getCityById(req.params.id).then(() => {
        return cityData.removeCityTag(req.params.id, tagInfo)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "City not found." });
    });
});

module.exports = router;
