const express = require('express');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Category = require('../models/category');
const router = express.Router();
const User = require('../models/user');
const toID = mongoose.Types.ObjectId;
const path = require('path');

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

router.get('/', async (req, res) => {
  try {
    await Category.find({}, (err, doc) => {
      if (err) res.status(400).send('categories not found');
      if (doc) res.send(doc);
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name } = req.body;
    let myFile;
    req.files && (myFile = req.files.catImage);
    console.log(req.body);
    let newFile;

    if (myFile) {
      const extName = path.extname(myFile.name);
      const baseName = path.basename(myFile.name, extName);
      // Use the mv() method to place the file somewhere on your server
      newFile = baseName + nanoid(5) + extName;
      myFile.mv('./uploads/media/categories/' + newFile);
    }
    const c = new Category({
      name: name,
      image: 'http://localhost:5000/uploads/media/categories/' + newFile,
    });

    await c.save();
    res.send('Category Added');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
