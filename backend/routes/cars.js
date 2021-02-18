const express = require('express');
const mongoose = require('mongoose');
const Vehicle = require('../models/vehicle');
const router = express.Router();
const toID = mongoose.Types.ObjectId;
const { nanoid } = require('nanoid');
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
  await Vehicle.find({}).exec((err, data) => {
    if (err) throw err;
    if (data) res.send(data);
  });
});

router.post('/brand/add', async (req, res) => {
  try {
    const myFile = req.files.sampleFile;
    const brand = req.body.brand;
    if (!brand) throw res.status(400).send('brand name required');

    await Vehicle.findOne({ brand: brand }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.status(400).send(brand + ' already exists');
      if (!doc) {
        let newFile;

        if (myFile) {
          const extName = path.extname(myFile.name);
          const baseName = path.basename(myFile.name, extName);
          // Use the mv() method to place the file somewhere on your server
          newFile = baseName + nanoid(5) + extName;
          myFile.mv('./uploads/media/' + newFile);
        }

        const newBrand = new Vehicle({
          brand: brand,
          brandImage: 'http://localhost:5000/uploads/media/' + newFile,
        });

        await newBrand.save();
        res.send('Brand Added');
      }
    });
  } catch (error) {
    res.send('error not loggedin' + error);
  }
});

router.post('/addbrand', async (req, res) => {
  const brandName = req.body.name;
  const myFile = req.files.brandIcon;
  try {
    Vehicle.findOne({ brand: brandName }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.status(400).send(brandName + ' already exists');
      if (!doc) {
        let newFile;

        if (myFile) {
          const extName = path.extname(myFile.name);
          const baseName = path.basename(myFile.name, extName);
          // Use the mv() method to place the file somewhere on your server
          newFile = baseName + nanoid(5) + extName;
          myFile.mv('./uploads/media/brands/' + newFile);
        }

        const newBrand = new Vehicle({
          brand: brandName,
          brandImage: 'http://localhost:5000/uploads/media/brands/' + newFile,
        });

        await newBrand.save();
        res.send('Brand Added');
      }
    });
  } catch (error) {
    res.send('error' + error);
  }
});

module.exports = router;
