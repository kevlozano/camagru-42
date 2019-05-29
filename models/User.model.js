const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    created: {type: Date, default: Date.now},
    username: {type: String, trim: true, unique: true, minlength: 6, maxlength: 16, match: /^[a-z0-9-_]+$/},
    password: {type: String, required: true},
    email: {type: String},
    images: [{type: Schema.Types.ObjectId, ref: 'Post', default: '[]'}],
})

module.exports = mongoose.model('User', UserSchema);