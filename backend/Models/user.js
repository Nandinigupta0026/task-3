const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
    default: 1000, 
  },

  
});

module.exports = mongoose.model('User', userSchema);