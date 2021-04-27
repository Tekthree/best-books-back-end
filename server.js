'use-strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());

const PORT = 3002

mongoose.connect('mongodb://localhost:27017/cats', { useNewUrlParser: true, useUnifiedTopology: true }).then(results => console.log(results, 'connected to database')).catch(err => console.error(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

const User = require('./models/user');

const bob = new User({ email: 'hullo@420.com', book: [{ name: 'hey1'}, { description: 'good'}, {status: 'here'} ]});
bob.save();

app.get('./user', getAllUsers)

function getAllUsers(request, response) {
  const name = request.query.name;
  console.log({name});
  User.find({ name }), (err, user) => {
    if (err) return console.error(err);
    console.log({person: user})
    response.send(user[0].book);
  }
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));