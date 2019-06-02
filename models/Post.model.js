const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    created: {type: Date, default: Date.now},
    media: {type: String},
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    likes: [{type: Schema.Types.ObjectId, default: '[]'}],
})

module.exports = mongoose.model('Post', PostSchema);