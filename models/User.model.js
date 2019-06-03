const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    created: {type: Date, default: Date.now},
    username: {type: String, trim: true, unique: true, minlength: 6, maxlength: 16, match: /^[a-z0-9-_]+$/},
    password: {type: String, required: true, match: /^(?=.*\d).{4,8}/},
    email: {type: String, match: 	
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    images: [{type: Schema.Types.ObjectId, ref: 'Post', default: '[]'}],
    isValidated: {type: Boolean, default: false},
    receiveEmails: {type: Boolean, default: true},
})

module.exports = mongoose.model('User', UserSchema);