const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User.model');

userRoutes.route('/login').post(function(req, res) {
    let username = req.body.username.toLowerCase();
    User.findOne({'username' : new RegExp(username)}, function(err, user) {
        if (err)
            res.send("err: " + err);
        else {
            let psswd = req.body.password;
            if (bcrypt.compareSync(psswd, user.password)) {
                console.log("user and password good");
                res.send(user.id);
            }
            else {
                res.send("false");
                }
                
        }
    });
});

userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

userRoutes.route('/add').post(function(req, res) {
    let psswd = bcrypt.hashSync(req.body.password, 10, function(err, hash) {
        if (err)
            res.send("err hashing: " + err);
    });
    let user = new User ({
        username: req.body.username.toLowerCase(),
        password: psswd,
        email: req.body.email.toLowerCase()
    });
    user.save().then(user => {
        res.status(200).json({'user': 'user added succesfully'});
    })
    .catch(err => {
        res.status(400).send('adding new user failed due to ' + err);
    });
});

//make sure you send the right data
userRoutes.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function (err, user) {
        if(!user)
            res.status(404).send('User not found');
        else {
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;

            user.save().then(user => {
                res.json(user);
            })
            .catch(err => {
                res.status(400).send("update not possible due to " + err);
            });
        }
    });
});

userRoutes.route('/delete/:id').delete(function(req, res) {
    User.findById(req.params.id).remove(function(err, user) {
        if (err)
            res.send(err);
        else
            res.send("successfully deleted");
    });
});

module.exports = userRoutes;