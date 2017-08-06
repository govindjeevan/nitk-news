/**
 * Created by user on 7/14/2017.
 */
var express = require("express");
var postRouter = express.Router();
var Post = require("../models/posts");
postRouter.route("/:title")
    .get(function(req,res){
        Post.findOne({'title' : req.params.title},function (err,post) {
            if(err)
                res.send('DB Err : ' + err);
            else
                res.send(post);
            console.log(post);

        })
    })
    .post(function(req,res){
        Post.update({'title' : req.params.title},req.body,function (err) {
            if(err)
                res.send(error);
            else
                res.send("Post Updated!");
        });
    });
module.exports = postRouter;
