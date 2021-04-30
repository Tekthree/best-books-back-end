'use strict'

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  status: {type: String}
})

const UserSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String, required: true},
  books: [bookSchema]
});

module.exports = mongoose.model('users', UserSchema);
