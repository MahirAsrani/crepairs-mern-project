const express = require('express');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Order = require('../models/order');
const router = express.Router();
const User = require('../models/user');
const toID = mongoose.Types.ObjectId;
const Razorpay = require('razorpay');
const crypto = require('crypto');
const product = require('../models/product');
const nodemailer = require('nodemailer');
const easyinvoice = require('easyinvoice');
const fs = require('fs');
const order = require('../models/order');

//fetch orders
router.get('/', async (req, res) => {
  try {
    order.find({}, (err, doc) => {
      if (err) console.log(err);
      if (doc) res.send(doc);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    order.find({ user_id: toID(req.params.id) }, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        res.send(doc);
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// new order

router.post('/new', async (req, res) => {
  try {
    const {
      email,
      cart,
      name,
      phone,
      address,
      locality,
      city,
      pincode,
      country,
      paymentMethod,
    } = req.body;
    await User.findOne({ email }, async (err, doc) => {
      if (err) throw err;
      if (doc) {
        let isPaid = false;

        if (req.body.paymentMethod === 'Online') {
          let expectedSignature = crypto
            .createHmac('sha256', 'mPXvcK4LTbamGbBqGEP9wA0N')
            .update(
              req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id
            )
            .digest('hex');
          // console.log('sig' + req.body.razorpay_signature);
          // console.log('sig' + expectedSignature);

          if (expectedSignature === req.body.razorpay_signature) isPaid = true;
          else res.status(400).send('Payment verification failed');
        }

        const newOrder = new Order({
          products: cart,
          name,
          phone,
          address: `${address}, ${locality}, ${city}, ${pincode}, ${country}`,
          payment: {
            amount: cart.reduce((total, { price }) => total + price, 0),
            mode: paymentMethod,
            Paid: isPaid ? true : false,
          },
          user_id: doc._id,
        });
        await newOrder.save();
        const date = new Date();
        const invociedata = {
          currency: 'INR',
          taxNotation: 'GST',
          marginTop: 50,
          marginRight: 50,
          marginLeft: 50,
          marginBottom: 25,
          background: fs.readFileSync('./uploads/pdf-bg.png', 'base64'),
          sender: {
            company: 'crepairs',
            address: 'Sample Street 123',
            zip: '110091',
            city: 'Delhi',
            country: 'INDIA',
          },
          client: {
            company: name,
            address: `${address}, ${locality}`,
            zip: pincode,
            city: city,
            country: country,
          },
          invoiceNumber: nanoid(10),
          invoiceDate: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
          products: cart.map((c) => {
            return {
              quantity: 1,
              description: c.name,
              tax: 18,
              price: c.price,
            };
          }),
          bottomNotice: 'Thank you for ordering with crepairs.',
        };

        const result = await easyinvoice.createInvoice(invociedata);

        let mailer = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
            user: 'crepairs@hotmail.com',
            pass: 'carMCA21',
          },
        });

        mailer.sendMail(
          {
            from: 'crepairs@hotmail.com',
            to: email,
            subject: 'Your order has been placed',
            html: `<h2>Hello ${name}, Your order has been placed, <br/> Please find the attached invoice pdf</h2>`,
            attachments: [
              {
                filename: 'invoice.pdf',
                content: result.pdf,
                encoding: 'base64',
              },
            ],
          },
          (err, info) => {
            if (err) console.log(err);
            if (info) console.log(info);
          }
        );

        res.send('Order success');
      }
    });
  } catch (error) {
    res.send('error not loggedin' + error);
  }
});

const razorpay = new Razorpay({
  key_id: 'rzp_test_G4UmS4waS0JFhP',
  key_secret: 'mPXvcK4LTbamGbBqGEP9wA0N',
});

router.post('/razorpay', async (req, res) => {
  const payment_capture = 1;
  const prod_ids = req.body.products;

  try {
    product.find({ _id: { $in: prod_ids } }, 'price', async (err, doc) => {
      if (doc) {
        const options = {
          currency: 'INR',
          receipt: nanoid(10),
          payment_capture,
          amount: doc.reduce((total, { price }) => total + price, 0) * 100,
        };

        const response = await razorpay.orders.create(options);
        res.send({
          id: response.id,
          currency: response.currency,
          amount: response.amount,
        });
      }
    });
  } catch (err) {
    console.log('error ' + err);
  }
});

module.exports = router;
