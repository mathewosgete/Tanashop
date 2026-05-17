require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// POST /api/payments/create
router.post('/create', async (req, res) => {
  try {
    const total = req.query.total;
    
    if (!total) {
      return res.status(400).json({ error: 'Total amount is required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
