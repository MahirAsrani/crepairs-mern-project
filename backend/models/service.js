const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  washPlans: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      highlights: [{ opt: { type: String, required: true } }],
      duration: { type: String, required: true },
    },
  ],

  repair: [],

  periodic: [],
});

module.exports = mongoose.model('Service', serviceSchema);
