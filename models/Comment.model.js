const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    created: {type: Date, default: Date.now},
    username: {type: mongoose.Types.ObjectId, ref: "User"},
    text: {type: String},
})

module.exports = mongoose.model('Comment', CommentSchema);