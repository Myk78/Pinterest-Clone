const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pinterest');

// Define the schema for a post
const postSchema = new mongoose.Schema({
  Postimage: {
    type: String,
    required: true,
    trim: true
  },
  Posttext: {
    type: String,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  Createdat: {
    type: Date,
    default: Date.now // Default to the current date and time
  },
  likes: {
    type: Array,
    default:[] // Default to 0 likes
  }
});

// Create the model from the schema and export it
module.exports  = mongoose.model('Post', postSchema);


