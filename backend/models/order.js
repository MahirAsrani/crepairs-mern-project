const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [],
  orderOn: { type: Date, default: Date.now },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  payment: {
    amount: { type: Number },
    mode: { type: String },
    Paid: { type: Boolean, default: false },
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
