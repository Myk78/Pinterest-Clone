var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

// Define the schema for a user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  posts: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  dp: {
    type: String, // URL or path to the display picture
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

userSchema.plugin(plm);

// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);



