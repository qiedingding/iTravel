"use strict";
/*
 Created by Zihao on 2016/12/01
 */
const express = require('express');
const router = express.Router();
const data = require("../data");
const blogData = data.blog;



router.get("/", (req, res) => {
    blogData.getAllBlogs().then((blogList) => {
        res.render('blog/blogList', { list: blogList });
        // res.json(blogInfo);
    }, () => {
        res.sendStatus(500);
    });
});


router.get("/:title", (req, res) => {
    blogData.getBlogByTitle(req.params.title).then((blogList) => {
        res.render('blog/blogList', { list: blogList });
        // res.json(blogList);
    }).catch(() => {
        res.status(404).json({ error: "blog not found." });
    });
});

router.get("/id/:id", (req, res) => {
    blogData.getBlogById(req.params.id).then((blog) => {
        res.render('blog/blogInfo', { blog: blog });
        // res.json(blog);
    }).catch(() => {
        res.status(404).json({ error: "blog not found." });
    });
});

router.get("/userId/:userId", (req, res) => {
    blogData.getBlogByUserId(req.params.userId).then((blogList) => {
        res.render('blog/blogList', { list: blogList });
        // res.json(blogInfo);
    }, (error) => {
        res.sendStatus(404);
    });
});

router.get("/type/:type", (req, res) => {
    blogData.getBlogByType(req.params.tag).then((blogList) => {
        res.render('blog/blogList', { list: blogList });
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