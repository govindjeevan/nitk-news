
var mongoose = require("mongoose");
//var tag = require("./tags");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    author : {type : String,
        required : true},
    content : {type :String,
        required: true},
    upvotes : {type : Number},


});

module.exports = mongoose.model('Comment', commentSchema);