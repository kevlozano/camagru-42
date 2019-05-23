const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    created: {type: Date, default: Date.now},
    media: {type: String},
    username: {type: mongoose.Types.ObjectId, ref: "User"},
    likes: {type: Number, default: 0},
    comments: [{type: mongoose.Types.ObjectId, ref: "Comment"}],
})

module.exports = mongoose.model('Post', PostSchema);