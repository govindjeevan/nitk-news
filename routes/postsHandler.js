var express = require('express');
var postsRouter = express.Router();
var Post = require('../models/posts');

postsRouter.route("/")
    .get(function (req,res) {

        var q = Post.find({},'-content');
        q.exec(function (err,posts) {
            console.log(posts);
            if(err)
                res.send("Error : " + err);
            else
                res.send(posts);
        });
    })
    .post(function (req,res) {
        var newPost = new Post(req.body);
        newPost.save(function (err,user) {
            if(err) {
                res.send("DB Error : " + err);
            }
            else{
                res.send("New Post Added");
            }
        });
    });

module.exports = postsRouter;