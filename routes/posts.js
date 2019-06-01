const express = require('express');
const postsRoutes = express.Router();
const nodemailer = require('nodemailer');
const emailPass = require('../config/keys').emailPass;

var Post = require('../models/Post.model');

// posts endpoints
postsRoutes.route('/').get(function(req, res) {
    Post.find(function(err, posts) {
        if (err)
            res.json(err);
        else
            res.json(posts);
    });
});

postsRoutes.route('/gallery').get(function(req, res) {
    Post.find().sort({"created": -1}).exec(function(err, posts) {
        if (err)
            res.json(err);
        else
            res.json(posts);
    });
});

postsRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Post.findById(id, function(err, post) {
        res.json(post);
    });
});

postsRoutes.route('/add').post(function(req, res) {
    let post = new Post(req.body);
    post.save().then(user => {
        res.status(200).json({'post': 'post added succesfully'});
    })
    .catch(err => {
        res.status(400).send('adding new post failed: ' + err);
    });
});

postsRoutes.route('/email').post(function(req, res) {
    let from = 'camagruklozano@gmail.com';
    let to = req.body.email;
    let subject = req.body.subject;
    let text = req.body.text;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: from,
            pass: emailPass
        }
    });

    var mailoptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailoptions, function(err, info) {
        if (err)
            console.log(err);
        else
            console.log('email sent: ' + info.response);
    });
    res.send("worked");
});

//like
postsRoutes.route('/update/:id/:userid').post(function(req, res) {
    Post.findById(req.params.id, function (err, post) {
        if(!post)
            res.status(404).send('Post not found');
        else {
            post.likes = req.params.userid;

            post.save().then( () => {
                res.send("like added!");
            })
            .catch(err => {
                res.status(400).send("update not possible due to " + err);
            });
        }
    });
});

postsRoutes.route('/delete/:id').delete(function(req, res) {
    Post.findById(req.params.id).remove(function(err, post) {
        if (err)
            res.send(err);
        else
            res.send("successfully deleted");
    });
});

module.exports = postsRoutes;