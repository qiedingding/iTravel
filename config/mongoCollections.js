
"use strict";
const dbConnection = require("./mongoConnection");
/*
 Created by lx on 2016/10/17
 Name: Xuan Li
 CWID:10409939
 Email: xli100@stevens.edu
 */
/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                return db.collection(collection);
            });
        }

        return _col;
    }
}

/* Now, you can list your collections here: */
module.exports = {
    user : getCollectionFn("user"),
    city : getCollectionFn("city"),
    site : getCollectionFn("site"),
    food : getCollectionFn("food"),
    blog : getCollectionFn("blog"),
    image : getCollectionFn("image"),
    comment : getCollectionFn("comment"),
    type : getCollectionFn("type"),
};

