/**
 * Created by user on 7/14/2017.
 */
var express = require('express');
var aboutRouter = express.Router();

aboutRouter.get("/",function (req,res) {
    console.log("inside the aboutHandler");
    res.send("A very sample application to have fun and learn bout the superheroes.");
});

module.exports = aboutRouter;