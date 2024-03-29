const express = require('express');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Product = require('../models/product');
const Category = require('../models/category');
const router = express.Router();
const User = require('../models/user');
const toID = mongoose.Types.ObjectId;
const path = require('path');
const { findById } = require('../models/product');

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
    await Product.find({}, (err, doc) => {
      if (err) res.status(400).send('not found');
      if (doc) res.send(doc);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findById(toID(id), (err, doc) => {
      if (err) res.status(400).send('not found');
      if (doc) res.send(doc);
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name, desc, category, price } = req.body;

    await Category.findById(toID(category), async (err, doc) => {
      if (err) res.status(400).send('not found');
      if (doc) {
        let myFile;
        req.files && (myFile = req.files.img);
        let newFile;

        if (myFile) {
          const extName = path.extname(myFile.name);
          const baseName = path.basename(myFile.name, extName);
          // Use the mv() method to place the file somewhere on your server
          newFile = baseName + nanoid(5) + extName;
          myFile.mv('./uploads/media/products/' + newFile);
        }
        const c = new Product({
          name: name,
          price: price,
          description: desc,
          image: 'http://localhost:5000/uploads/media/products/' + newFile,
        });
        doc.products.push(c._id);
        await c.save();
        await doc.save();

        res.send('Product Added');
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
