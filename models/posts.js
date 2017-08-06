
var mongoose = require("mongoose");
//var tag = require("./tags");
//var comment = require("./comment");
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title : {type : String,
        required : true},
    content : {type :String,
        required: true},
    author : {type :String,
        required: true},
    upvotes : {type : Number},
    comments : [{body : String, author: String}]


});

module.exports = mongoose.model('Post', postSchema);