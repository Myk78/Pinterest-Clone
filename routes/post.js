const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pinterest');

// Define the schema for a post
const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now // Default to the current date and time
  },
  likes: {
    type: Array,
    default:[] // Default to 0 likes
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model from the schema and export it
module.exports  = mongoose.model('Post', postSchema);


