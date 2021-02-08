const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  phone: { type: String },
  Address: {
    Building: { type: String },
    Street: { type: String },
    City: { type: String },
    Pincode: { type: String },
    Country: { type: String },
  },
  resetToken: { type: String },
  resetTime: { type: String },
});

module.exports = mongoose.model('User', userSchema);
