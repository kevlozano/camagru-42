const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

var User = require('./models/User.model');

//endpoints
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
        res.json();
    });
});

userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save().then(user => {
        res.status(200).json({'user': 'user added succesfully'});
    })
    .catch(err => {
        res.status(400).send('adding new user failed');
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
                res.status(400).send("update not possible");
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


app.use('/users', userRoutes);

app.listen(PORT, function() {
    console.log("listening on PORT " + PORT);
});
