"use strict";
/*
 Created by Zihao on 2016/12/01
 */
const express = require('express');
const router = express.Router();
const data = require("../data");
const blogData = data.blog;
const imageData = data.image;
const uuid = require('node-uuid');
const bodyParser = require("body-parser");
const path = require('path'), fs = require('fs');
const multer = require('multer');
const userData = data.user;
const commentData = data.comment;
let notFound = path.resolve("../static/404.html");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/..', '/public/images')); // get the right path!
    },
    filename: function (req, file, cb) {
        let idx = file.mimetype.indexOf('/')
        let type = file.mimetype.substring(idx + 1);
        type = type.toLowerCase();

        cb(null, uuid.v1() + '.' + type);
    }
})

function fileFilter(req, file, cb) {
    var type = file.mimetype;
    var typeArray = type.split("/");
    if (typeArray[0] == "video" || typeArray[0] == "image") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({storage: storage, dest: "public/uploads", fileFilter: fileFilter});

router.get("/", (req, res) => {
    blogData.getAllBlogsWithImage().then((blogList) => {
        console.log("all blog: ", blogList);
        res.render('blog/blogList', {blogList: blogList});
    })
        .catch(e => {
            res.sendFile(notFound);
        });
});

router.get("/new",isLoggedIn, (req, res) => {
    res.render('blog/blogNew', {});
});

router.post("/new", isLoggedIn, upload.single('images'), (req, res) => {
    console.log("POST /blog/new!");
    //console.log(req.body); //get all text content
    //console.log(req.file); // get all files content
    let blogInfo = req.body;
    if (!blogInfo) {
        res.status(400).json({error: "You must provide data to create a new blog."});
        return;
    }
    if (!blogInfo.title) {
        res.status(400).json({error: "You must at least provide title of the blog."});
        return;
    }
    if (!blogInfo.content) {
        res.status(400).json({error: "You must at least provide content of the blog."});
        return;
    }
    blogInfo.userId= req.user._id;
    blogData.addBlog(blogInfo)
        .then((newblog) => {
            return newblog;
        })
        .then((newblog) => {
            let imageInfo ={
                name: newblog.title,
                path: '/public/images/' + req.file.filename,
                type: "blog",
                userId: req.user._id,
                blogId: newblog._id
            }
            return imageData.addImage(imageInfo).then(image => {
                var info = [newblog._id, image];
                return info;
            });
        })
        .then(info => {
            let updatedblog = {};
            let id = info[0];
            let imageId = info[1]._id;
            updatedblog.mainImage = imageId;
            return blogData.updateBlog(id, updatedblog);
        })
        .then((blogInfo) => {
            res.status(200).json(blogInfo);
        })
        .catch(function (e) {
            console.log(e); // "oh, no!"
            res.status(400).json(e);
        });
});

router.get("/:title", (req, res) => {
    blogData.getBlogByTitle(req.params.title).then((blog) => {
        res.render('blog/blogInfo', {blog: blog});
    }).catch(() => {
        res.sendFile(notFound);
    });
});

router.get("/id/:id", (req, res) => {
    blogData.getBlogByIdWithImage(req.params.id).then((blog) => {
        commentData.getCommentByBelongToId(req.params.id).then((commentList) => {
            let promises = [];
            for (let i = 0, len = commentList.length; i < len; i++) {
                promises.push(userData.getUserById(commentList[i].userId).then((user) => {
                    commentList[i].userId = user.username;
                }));
            }
            Promise.all(promises).then(() => {
                res.render('blog/blogInfo', {blog: blog, blogComments: commentList});
            });
        })
    }).catch((e) => {
        console.log(e);
        res.sendFile(notFound);
    });
});

// router.get("/userId/:userId", (req, res) => {
//     blogData.getBlogByUserId(req.params.userId).then((blogList) => {
//         res.render('blog/blogList', {blogList: blogList});
//     }, (error) => {
//         res.sendFile(notFound);
//     });
// });

// router.get("/type/:type", (req, res) => {
//     blogData.getBlogByType(req.params.tag).then((blogList) => {
//         res.render('blog/blogList', {blogList: blogList});
//         // res.json(blogInfo);
//     }).catch(() => {
//         res.sendFile(notFound);
//     });
// });

// router.post("/",isLoggedIn, (req, res) => {
//     let blogInfo = req.body;

//     if (!blogInfo) {
//         res.status(400).json({error: "You must provide data to create a new blog."});
//         return;
//     }
//     if (!blogInfo.title) {
//         res.status(400).json({error: "You must at least provide title of the blog."});
//         return;
//     }
//     if (!blogInfo.contnet) {
//         res.status(400).json({error: "You must at least provide content of the blog."});
//         return;
//     }
//     blogData.addBlog(blogInfo.title, blogInfo.content, blogInfo.mainImage, blogInfo.conclusions, blogInfo.type, blogInfo.tag, blogInfo.userId, blogInfo.siteId)
//         .then((newblog) => {
//             res.json(newblog);
//         }, () => {
//             res.sendFile(notFound);
//         });
// });
/*
router.put("/:id", (req, res) => {
    let blogInfo = req.body;

    if (!blogInfo) {
        res.status(400).json({error: "You must provide data to update a blog."});
        return;
    }
    let getblog = blogData.getBlogById(req.params.id).then(() => {
        return blogData.updateBlog(req.params.id, blogInfo)
            .then((updatedblog) => {
                res.json(updatedblog);
            }, () => {
                res.sendStatus(500);
            });
    }).catch(() => {
 res.sendFile(notFound);
    });

});

router.put("/tag/:id", (req, res) => {
    let tagInfo = req.body.tag;

    if (!tagInfo) {
        res.status(400).json({error: "You must provide tag data to post."});
        return;
    }

    let getblog = blogData.getblogById(req.params.id).then(() => {

        tagInfo.forEach((tag) => {
            return blogData.addTagIfNotExists(req.params.id, tag)
                .then((updatedblog) => {
                    res.json(updatedblog);
                }, () => {
                    res.sendStatus(500);
                });
        });
    }).catch(() => {
 res.sendFile(notFound);
    });

});

router.delete("/:id", (req, res) => {
    let blog = blogData.getblogById(req.params.id).then(() => {
        return blogData.removeBlog(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log(error)
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({error: "blog not found."});
    });
});

router.delete("/tag/:id", (req, res) => {
    let tagInfo = req.body.tag;

    if (!tagInfo) {
        res.status(400).json({error: "You must provide tag to delete."});
        return;
    }
    let blog = blogData.getblogById(req.params.id).then(() => {
        return blogData.removeBlogTag(req.params.id, tagInfo)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({error: "blog not found."});
    });
});*/
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log("authenticated success");
        return next();
    }
    // if they aren't redirect them  the home page
    console.log("authenticated fail go to login page");
    res.redirect('/user/login');
}

module.exports = router;


// { fieldname: 'images',
//   originalname: '3a954c74df5a72e424bde752408074c4.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'public/uploads/',
//   filename: 'f22de968cc5fef6c9593fae541755704.jpg',
//   path: 'public/uploads/f22de968cc5fef6c9593fae541755704.jpg',
//   size: 8054 }
// router.post('/upload', upload.single('images'), function (req, res) {
//     console.log("/blog/upload!")
//     console.log(req.file)
//     //var ext = path.extname(req.file.mimetype).toLowerCase()
//     res.status(200).json({"success":"success!"});
// });