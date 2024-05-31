const mongoose = require('mongoose');

// Define a Mongoose schema for your user model
const userSchema = new mongoose.Schema({
  facebookId: String,
  name: String,
  email: String
});

// Create a Mongoose model from your schema
const User = mongoose.model('User', userSchema);

module.exports = User;