const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  service: { type: String, required: true },
  vehicle: {
    name: { type: String },
    brand: { type: String },
    vehicleType: { type: String },
  },
  completed: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  bookedOn: { type: Date, default: Date.now },
  scheduleDate: { type: Date, required: true },
  scheduleTime: { type: String, required: true },
  price: { type: Number },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
