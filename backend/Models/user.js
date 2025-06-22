const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    default: 'user',
  },

  wallet: {
    type: Number,
    default: 1000, // credited on signup
  },
});

module.exports = mongoose.model('User', userSchema);