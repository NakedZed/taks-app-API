// In this file we defining the Schema of the user and making a model based on it, then we exporting it.

const mongoose = require('mongoose');
const validator = require('validator');

//Creating a schema of the user.
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
