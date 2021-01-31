const express = require('express');
const mongoose = require('mongoose');
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
      } else {
        res.status(404).send('only admin can peform this');
      }
    });
  } else res.status(500).send('Login required');
};

router.post('/deleteuser', isAdmin, async (req, res) => {
  const { id } = req.body;
  await User.findByIdAndDelete(id, (err) => {
    if (err) throw err;
  });
  res.send('success');
  console.log('deleted!');
});

router.get('/all', isAdmin, async (req, res) => {
  await User.find({}, (err, data) => {
    if (err) throw err;
    if (data) res.send(data);
  });
});

// get own data
router.get('/', async (req, res) => {
  await User.findById(toID(req.user.id), (err, data) => {
    if (err) throw err;
    if (data) res.send(data);
  });
});

// edit with full rights for admin
router.patch('/edit/:id', isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, isAdmin } = req.body;
    await User.findByIdAndUpdate(id, { name, email, isAdmin });
    res.send('success');
    console.log('updated!');
  } catch (error) {
    console.log(error);
  }
});

// edit own account
router.patch('/edit', async (req, res) => {
  try {
    const id = toID(req.user.id);
    const { name, email } = req.body;
    await User.findByIdAndUpdate(id, { name, email });
    res.send('success');
    console.log('updated!');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
