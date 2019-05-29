const express = require('express');
const commentRoutes = express.Router();

var Comment = require('../models/Comment.model');

//comments routes
commentRoutes.route('/').get(function(req, res) {
    Comment.find(function(err, comment) {
        res.json(comment);
    });
});

commentRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Comment.findById(id, function(err, user) {
        res.json(user);
    });
});

commentRoutes.route('/add').post(function(req, res) {
    let comment = new Comment(req.body);
    comment.save().then(comment => {
        res.status(200).json({'comment': 'comment added succesfully'});
    })
    .catch(err => {
        res.status(400).send('adding new comment failed: ' + err);
    });
});

module.exports = commentRoutes;