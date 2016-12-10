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
var path = require('path'),fs = require('fs');
var multer  = require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      //console.log(__dirname);
      cb(null, path.join(__dirname,'/..','/public/images')); // get the right path!
  },
  filename: function (req, file, cb) {
    //console.log("file@@@",file);
    let idx =file.mimetype.indexOf('/')
    let type = file.mimetype.substring(idx+1);
    type = type.toLowerCase();
    
    cb(null, 'public/images'+ uuid.v1()+ '.' + type);
  }
})

function fileFilter (req,file,cb){
    var type = file.mimetype;
    var typeArray = type.split("/");
    if (typeArray[0] == "video" || typeArray[0] == "image") {
        cb(null, true);
    }else {
        cb(null, false);
    }
}

var upload = multer({ storage: storage, dest:"public/uploads", fileFilter:fileFilter});

router.get("/", (req, res) => {
    blogData.getAllBlogs().then((blogList) => {
        console.log(blogList);
        return (blogList);
        //res.render('blog/blogList', { blogList: blogList });
        // res.json(blogInfo);
    })
    .then((blogList)=>{
        var promises = [];

        for (let i = 0, len = blogList.length; i < len; i++) {
            promises.push(imageData.getImageById(blogList[i].mainImage).then((image) => {
                
            }));
        }
            Promise.all(promises).then(() => returnValue.clist = clist).then(
    })
});

router.get("/new", (req,res)=>{
    res.render('blog/blogNew', {});
});

router.post("/new",upload.single('images'),(req,res)=>{
    console.log("POST /blog/new!");
    console.log(req.body); //get all text content
    console.log(req.file); // get all files content
    let blogInfo = req.body;
    if (!blogInfo) {
        res.status(400).json({ error: "You must provide data to create a new blog." });
        return;
    }

    if (!blogInfo.title) {
        res.status(400).json({ error: "You must at least provide title of the blog." });
        return;
    }

    if (!blogInfo.content) {
        res.status(400).json({ error: "You must at least provide content of the blog." });
        return;
    }
       
    blogData.addBlog(blogInfo)
        .then((newblog) => {
            return newblog._id;
        })
        .then((id)=>{
           let updatedblog = {}
           imageData.addImage(imageInfo.name, imageInfo.address, imageInfo.createTime, imageInfo.type, imageInfo.userId, imageInfo.blogId, imageInfo.siteId, imageInfo.cityId)
           updatedblog.mainImage = req.file.filename;
           return blogData.updateBlog(id,updatedblog);
        })
        .then((blogInfo)=>{
            console.log(blogInfo);
            res.status(200).json(blogInfo);
        })
        .catch(function(e) {
            console.log(e); // "oh, no!"
            res.status(400).json(e);
        });
   // res.status(200).json({"success":"success!"});
});

router.get("/:title", (req, res) => {
    //console.log("title: ",req.params.title);
    blogData.getBlogByTitle(req.params.title).then((blog) => {
        //console.log(blog);
        res.render('blog/blogInfo', { blog: blog });
    }).catch(() => {
        res.status(404).json({ error: "blog not found." });
    });
});

router.get("/id/:id", (req, res) => {
    blogData.getBlogById(req.params.id).then((blog) => {
        console.log(blog);
        res.render('blog/blogInfo', { blog: blog });
    }).catch((e) => {
        console.log(e);
        res.status(404).json({ error: e });
    });
});

router.get("/userId/:userId", (req, res) => {
    blogData.getBlogByUserId(req.params.userId).then((blogList) => {
        res.render('blog/blogList', { blogList: blogList });
        // res.json(blogInfo);
    }, (error) => {
        res.sendStatus(404);
    });
});

router.get("/type/:type", (req, res) => {
    blogData.getBlogByType(req.params.tag).then((blogList) => {
        res.render('blog/blogList', { blogList: blogList });
        // res.json(blogInfo);
    }).catch(() => {
        res.status(404).json({ error: "blog not found." });
    });
});

router.post("/", (req, res) => {
    let blogInfo = req.body;

    if (!blogInfo) {
        res.status(400).json({ error: "You must provide data to create a new blog." });
        return;
    }
    if (!blogInfo.title) {
        res.status(400).json({ error: "You must at least provide title of the blog." });
        return;
    }
    if (!blogInfo.contnet) {
        res.status(400).json({ error: "You must at least provide content of the blog." });
        return;
    }
    blogData.addBlog(blogInfo.title, blogInfo.content, blogInfo.mainImage, blogInfo.conclusions, blogInfo.type, blogInfo.tag, blogInfo.userId, blogInfo.siteId)
        .then((newblog) => {
            res.json(newblog);
        }, () => {
            res.sendStatus(500);
        });
});

router.put("/:id", (req, res) => {
    let blogInfo = req.body;

    if (!blogInfo) {
        res.status(400).json({ error: "You must provide data to update a blog." });
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
        res.status(404).json({ error: "blog not found." });
    });

});

router.put("/tag/:id", (req, res) => {
    let tagInfo = req.body.tag;

    if (!tagInfo) {
        res.status(400).json({ error: "You must provide tag data to post." });
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
        res.status(404).json({ error: "blog not found." });
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
        res.status(404).json({ error: "blog not found." });
    });
});

router.delete("/tag/:id", (req, res) => {
    let tagInfo = req.body.tag;

    if (!tagInfo) {
        res.status(400).json({ error: "You must provide tag to delete." });
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
        res.status(404).json({ error: "blog not found." });
    });
});

module.exports = router;


// { fieldname: 'images',
//   originalname: '3a954c74df5a72e424bde752408074c4.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'public/uploads/',
//   filename: 'f22de968cc5fef6c9593fae541755704',
//   path: 'public/uploads/f22de968cc5fef6c9593fae541755704',
//   size: 8054 }
// router.post('/upload', upload.single('images'), function (req, res) {
//     console.log("/blog/upload!")
//     console.log(req.file)
//     //var ext = path.extname(req.file.mimetype).toLowerCase()
//     res.status(200).json({"success":"success!"});
// });