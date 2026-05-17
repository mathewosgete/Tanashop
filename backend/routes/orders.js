const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');

// POST /api/orders
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { id, amount, basket, created } = req.body;
    
    const newOrder = await Order.create({
      id,
      amount,
      basket,
      created,
      userId: req.user.userId
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.userId },
      order: [['created', 'DESC']]
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
