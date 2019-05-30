const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/users', userRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentRoutes);

app.listen(PORT, function() {
    console.log("listening on PORT " + PORT);
});
