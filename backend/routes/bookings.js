const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../models/booking');
const router = express.Router();
const User = require('../models/user');
const toID = mongoose.Types.ObjectId;

const isAdmin = (req, res, next) => {
  const { user } = req;
  if (user) {
    User.findOne({ email: user.email }, (err, doc) => {
      if (err) throw err;
      if (doc.isAdmin) {
        next();
      } else res.send('only admin can peform this');
    });
  } else res.send('login required');
};

router.get('/', isAdmin, async (req, res) => {
  await Booking.find({})
    .populate('user_id')
    .exec((err, data) => {
      if (err) throw err;
      if (data) res.send(data);
    });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  await Booking.find({ user_id: toID(id) })
    .populate('user_id')
    .exec((err, data) => {
      if (err) throw err;
      if (data) res.send(data);
    });
});

router.post('/add', async (req, res) => {
  try {
    const id = toID(req.user.id);

    await User.findById(id, async (err, doc) => {
      if (err) throw err;
      if (doc) {
        console.log(req.body);
        const newBooking = new Booking({
          service: {
            serviceType: req.body.serviceType,
            plan: req.body.plan,
          },
          vehicle: {
            name: req.body.vehicle && req.body.vehicle,
            brand: req.body.vehicleBrand,
            vehicleType: req.body.vehicleType,
          },
          scheduleDate: req.body.date,
          scheduleTime: req.body.time,
          location: req.body.country,
          payment: {
            amount: req.body.price,
            mode: req.body.paymentMethod,
          },
          user_id: id,
        });
        await newBooking.save();
        res.send('Booking made');
      }
    });
  } catch (error) {
    res.send('error not loggedin' + error);
  }
});

module.exports = router;
