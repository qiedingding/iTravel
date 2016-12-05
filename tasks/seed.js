"use strict";
/*
 Created by Xuan Li on 2016/12/5

 */
const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");
const bcrypt = require("bcrypt-nodejs");
const data = require("../data/");
const blog = data.blog;
const site = data.site;
const user = data.user;
const city = data.city;
const food = data.food;
const image = data.image;
const comment = data.comment;
const type = data.type;

dbConnection().then(db => {
    return db.collection("type").drop().then(function () {
        return db;
    }, function () {
        return db;
    }).then((db) => {
        return db.createCollection("type");
    }).then(function (typeCollection) {
        let createType = (id, TypeName) => {
            return {
                _id: id,
                typeName: TypeName
            }
        };

        let listOfType = [];
        // typeForUser
        let usertype1 = createType("100001", "normal user");
        let usertype2 = createType("100002", "advanced user");
        let usertype3 = createType("100009", "super user");
        listOfType.push(usertype1, usertype2, usertype3);

        // typeForImage
        let imagetype1 = createType("200001", "user upload image");
        let imagetype2 = createType("200002", "super user upload image");
        let imagetype3 = createType("200009", "main image");
        listOfType.push(imagetype1, imagetype2, imagetype3);

        // typeForBlog
        let blogtype1 = createType("300001", "normal blog");
        let blogtype2 = createType("300002", "food blog");
        let blogtype3 = createType("300003", "view blog");
        let blogtype4 = createType("300004", "site blog");
        let blogtype5 = createType("300005", "advanced blog");
        listOfType.push(blogtype1, blogtype2, blogtype3, blogtype4, blogtype5);

        // typeForFood
        let foodtype1 = createType("400001", "famous food");
        let foodtype2 = createType("400002", "local food");
        let foodtype3 = createType("400003", "Fast food");
        let foodtype4 = createType("400004", "coffee");
        listOfType.push(foodtype1, foodtype2, foodtype3, foodtype4);

        // typeForSite
        let sitetype1 = createType("500001", "old site");
        let sitetype2 = createType("500002", "shopping site");
        let sitetype3 = createType("500003", "famous site");
        let sitetype4 = createType("500004", "nature site");
        listOfType.push(sitetype1, sitetype2, sitetype3, sitetype4);

        return typeCollection.insertMany(listOfType).then(() => {
            console.log("Done seeding for type!");
            return db.collection("user").drop().then(function () {
                return db;
            }, function () {
                return db;
            }).then((db) => {
                return db.createCollection("user");
            }).then(function (userCollection) {

                let createUser = (id,username, pwd, nickName, gender, dob, description,
                                  phone, email, image, registerTime, lastLoginTime, type, tag) => {
                    return {
                        _id:id,
                        "username": username,
                        "pwd": pwd,
                        "nickName": nickName,
                        "gender": gender,
                        "dob": dob,
                        "description": description,
                        "phone": phone,
                        "email": email,
                        "image": image,
                        "registerTime": registerTime,
                        "lastLoginTime": lastLoginTime,
                        "type": type,
                        "tag": tag
                    }
                };

                let listOfUsers = [];

                // username admin_lx
                let admin_lxTag = ["team member", "admin"];
                let admin_lxPwd = bcrypt.hashSync("xuanli9939");
                let admin_lx = createUser(5622121,"admin_lx", admin_lxPwd, "PenguingXuan", "male", "1993/09/21",
                    "admin", "5512477786", "xli100@stevens.edu", "admin-default", "2016/12/1", "2016/12/1", 100009, admin_lxTag);

                // username admin_lyr
                let admin_lyrTag = ["team member", "admin"];
                let admin_lyrPwd = bcrypt.hashSync("yiranli6200");
                let admin_lyr = createUser(5622122,"admin_lyr", admin_lyrPwd, "liyiran", "male", "1992/01/11",
                    "admin", "5512477786", "yli@stevens.edu", "admin-default", "2016/12/1", "2016/12/1", 100009, admin_lyrTag);

                // username testUser
                let testTag = ["test user", "test"];
                let testPwd = bcrypt.hashSync("test12345");
                let test1 = createUser(5622123,"test1", testPwd, "test1", "male", "1992/01/11",
                    "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1", "2016/12/1", 100001, testTag);

                let test2 = createUser(5622124,"test2", testPwd, "test2", "male", "1992/01/11",
                    "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1", "2016/12/1", 100001, testTag);

                let test3 = createUser(5622125,"test3", testPwd, "test3", "male", "1992/01/11",
                    "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1", "2016/12/1", 100001, testTag);

                let test4 = createUser(5622126,"test4", testPwd, "test4", "male", "1992/01/11",
                    "admin", "5512477786", "test@stevens.edu", "admin-default", "2016/12/1", "2016/12/1", 100001, testTag);

                // add user into array
                listOfUsers.push(admin_lx, admin_lyr);
                listOfUsers.push(test1, test2, test3, test4);
                return userCollection.insertMany(listOfUsers).then(() => {
                    console.log("Done seeding for user!");
                    return db.collection("image").drop().then(function () {
                        return db;
                    }, function () {
                        return db;
                    }).then((db) => {
                        return db.createCollection("image");
                    }).then(function (imageCollection) {
                        let createImage = (id, name, address, createTime, path,type, userId, blogId, siteId, cityId, foodId) => {
                            return {
                                _id: id,
                                name: name,
                                address: address,
                                createTime: createTime,
                                path:path,
                                type: type,
                                userId: userId,
                                blogId: blogId,
                                siteId: siteId,
                                cityId: cityId,
                                foodId: foodId
                            }
                        };

                        let listOfImages = [];

                        // image_1 Beijing

                        let BeijingImage = createImage(900001, "Beijing", "Beijing", "2016/12/01", "/public/images/beijing.jpg",200009, "landscape", "usr1", "blog1", "site1", "beijing", "food1");

                        // image_2 Shanghai
                        let ShanghaiImage = createImage(900002, "Shanghai", "Shanghai", "2016/12/02", "/public/images/shanghai.jpg", 200009,"landscape", "usr2", "blog2", "site2", "shanghai", "food1");

                        // image_3 Shenzhen
                        let ShenzhenImage = createImage(900003, "Shenzhen", "Shenzhen", "2016/12/03", "/public/images/shenszhen.jpg",200009, "landscape", "usr3", "blog3", "site3", "shenzhen", "food1");
                        // food1
                        let foodImage1 = createImage(900011, "food1", "Beijing", "2016/12/01", "/public/images/food1.jpg",200009, "food", "usr1", "blog1", "site1", "beijing", "food1");
                        // food2
                        let foodImage2 = createImage(900012, "food2", "Shenzhen", "2016/12/01", "/public/images/food1.jpg",200009, "food", "usr1", "blog1", "site1", "beijing", "food1");
                        // foo3
                        let foodImage3 = createImage(900013, "food3", "Shenzhen", "2016/12/01", "/public/images/food1.jpg",200009, "food", "usr1", "blog1", "site1", "beijing", "food1");

                        listOfImages.push(BeijingImage, ShanghaiImage, ShenzhenImage);
                        listOfImages.push(foodImage1, foodImage2, foodImage3);
                        return imageCollection.insertMany(listOfImages).then(() => {
                            console.log("Done seeding for image!");
                            return db.collection("city").drop().then(function () {
                                return db;
                            }, function () {
                                return db;
                            }).then((db) => {
                                return db.createCollection("city");
                            }).then(function (cityCollection) {
                                let createCity = (id, name, province, description, traffic, weather, history, culture, currency, mainImage, tag) => {
                                    return {
                                        _id: id,
                                        name: name,
                                        province: province,
                                        description: description,
                                        traffic: traffic,
                                        weather: weather,
                                        history: history,
                                        culture: culture,
                                        currency: currency,
                                        mainImage: mainImage,
                                        tag: tag
                                    }
                                };

                                let listOfCities = [];

                                // city_1 Beijing
                                let BeijingTag = ["capital", "tian'anmen"];
                                let BeijingCity = createCity(60020, "Beijing", "Beijing", "Beijing Description", "Beijing Traffic", "Beijing Weather", "Beijing History", "Beijing Culture", "RMB", 900001, BeijingTag);

                                // city_2 Shanghai
                                let ShanghaiTag = ["Shanghai Shibohui", "Dofangmingzhu"];
                                let ShanghaiCity = createCity(60021, "Shanghai", "Shanghai", "Shanghai Description", "Shanghai Traffic", "Shanghai Weather", "Shanghai History", "Shanghai Culture", "RMB", 900002, ShanghaiTag);

                                // city_3 Shenzhen
                                let ShenzhenTag = ["guandong", "tequ"];
                                let ShenzhenCity = createCity(60022, "Shenzhen", "Shenzhen", "Shenzhen Description", "Shenzhen Traffic", "Shenzhen Weather", "Shenzhen History", "Shenzhen Culture", "RMB", 900003, ShenzhenTag);

                                //
                                listOfCities.push(BeijingCity, ShanghaiCity, ShenzhenCity);
                                return cityCollection.insertMany(listOfCities).then(() => {
                                    console.log("Done seeding for city!");
                                    return db.collection("site").drop().then(function () {
                                        return db;
                                    }, function () {
                                        return db;
                                    }).then((addeddb) => {
                                        return site.addSite("QianFoMountain", "N36°E117°", "JingShi road, JiNan, ShanDong", "Bus", "30￥", "6:00PM", "2016681367", "www.qianfoshan.com", "qianfoshan", 900011, 1, ["climb", "cable"], ["mountain", "famous", "JiNan"], 60020);
                                    }).then((addedSite) => {
                                        return site.addSite("DaMingLake", "N50°E120°", "MingHu road, JiNan, ShanDong", "Bus", "60￥", "6:00PM", "2016681367", "www.daminghu.com", "daminghu", 900012, 1, ["boat", "landscape"], ["lake", "famous", "JiNan", "XiaYuHe"], 60021);
                                    }).then((addedSite) => {
                                        return site.addSite("BaoTuFountain", "N45°E116°", "XiMen road, JiNan, ShanDong", "Bus", "50￥", "6:00PM", "2016681367", "www.baotuquan.com", "baotuquan", 900013, 1, ["seal", "tea"], ["fountain", "famous", "JiNan"], 60022);
                                    }).then((added) => {
                                        console.log("Done seeding for site!");
                                        return db.collection("blog").drop().then(function () {
                                            return db;
                                        }, function (error) {
                                            return db;
                                        }).then((db) => {
                                            return db.createCollection("blog");
                                        }).then(function (blogCollection) {
                                            let createBlog = function (id, title, content, mainImage, conclusions, type, tag, userId, siteId) {
                                                return {
                                                    _id: id,
                                                    title: title,
                                                    content: content,
                                                    createTime: new Date("<YYYY-mm-dd>"),
                                                    mainImage: mainImage,
                                                    conclusions: conclusions,
                                                    type: type,
                                                    tag: tag,
                                                    userId: userId,
                                                    siteId: siteId
                                                }
                                            };

                                            let list = [];
                                            // blog_1 Beijing
                                            let blog1 = createBlog(50331, "blog1", "content1", 900001,"conclusions", 300001,["tag1", "tag2"],5622121);

                                            // blog_2 Shanghai
                                            let blog2 = createBlog(50332, "blog2", "content2", 900001, "conclusions", 300001,["tag1", "tag2"],5622121);

                                            // blod_3 Shenzhen
                                            let blog3 = createBlog(50333, "blog3", "content3", 900001, "conclusions", 300001,["tag1", "tag2"],5622121);

                                            list.push(blog1, blog2, blog3);
                                            return blogCollection.insertMany(list).then(() => {
                                                console.log("Done seeding for blog!");
                                                return db.collection("comment").drop().then(function () {

                                                    return db;
                                                }, function () {
                                                    return db;
                                                }).then((db) => {
                                                    return db.createCollection("comment");
                                                }).then(function (commentCollection) {
                                                    let createComment = (content, createTime, stars, userId, target, blogId, siteId, cityId) => {
                                                        return {
                                                            _id: uuid.v4(),
                                                            content: content,
                                                            createTime: createTime,
                                                            stars: stars,
                                                            userId: userId,
                                                            target: target,
                                                            blogId: blogId,
                                                            siteId: siteId,
                                                            cityId: cityId,
                                                        }
                                                    };

                                                    let listOfComments = [];

                                                    let BeijingComment = createComment("good", "2016/12/01", "5", "usr1", "target1", 50331, "site1", "city1");

                                                    let ShanghaiComment = createComment("just soo", "2016/12/02", "3", "usr2", "target2", 50332, "site2", "city2");

                                                    let ShenzhenComment = createComment("boring", "2016/12/03", "1", "usr3", "target3", 50333, "site3", "city3");

                                                    //
                                                    listOfComments.push(BeijingComment, ShanghaiComment, ShenzhenComment);
                                                    return commentCollection.insertMany(listOfComments).then(() => {
                                                        console.log("Done seeding for comment!");
                                                        return db.collection("food").drop().then(function () {
                                                            return db;
                                                        }, function () {
                                                            return db;
                                                        }).then((addeddb) => {
                                                            return food.addFood("BaZiRou", "bengrouganfan", "N36°E117°", "YaoShan", "20￥", "9:30PM", "18615213327", "www.bazirou.com", 900011, 400001, 60020);
                                                        }).then((addedFood) => {
                                                            return food.addFood("TianMo", "salty vegetable porridge", "N36°E117°", "XiaoTan", "1.5￥", "10:00AM", "18615213327", "www.tianmo.com", 900012, 400001 ,60021);
                                                        }).then((addedFood) => {
                                                            return food.addFood("YouXuan", "fried dough", "N36°E117°", "FuRongJie", "0.5￥", "10:30PM", "18615213327", "www.youxuan.com", 900013, 400001,60021);
                                                        }).then((added) => {
                                                            console.log("Done seeding for food!");
                                                            console.log("Done seeding database!");
                                                            db.close();
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }, (error) => {
        console.error(error);
    });
});

