'use strict'

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  status: {type: String}
})

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true},
  book: [bookSchema]
});

module.exports = mongoose.model('users', UserSchema);
