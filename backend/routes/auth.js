const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('success');
  console.log('success auth');
});

router.post('/register', (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send('already exists');
    if (!doc) {
      const encryptedPass = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPass,
      });
      await newUser.save();
      res.send('user created');
    }
  });
});

router.get('/', (req, res) => {
  console.log(req.body);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
