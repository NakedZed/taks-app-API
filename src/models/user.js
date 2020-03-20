// In this file we defining the Schema of the user and making a model based on it, then we exporting it.

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//Creating a schema of the user.
const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true,

  },
  password: {
    type: String
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});


// Generating the token for every user and concat it into the tokens array to be stored in the DB and the user will be able to access private routes.
// generateAuthToken is a method which will be available on each user to generate an auth token for him.
userSchema.methods.generateAuthToken = async function () {

  const user = this;
  const token = jwt.sign({
    _id: user._id.toString()
  }, 'thisismysecret')
  user.tokens = user.tokens.concat({
    token
  })
  return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;