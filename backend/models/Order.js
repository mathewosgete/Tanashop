const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.STRING, // Payment Intent ID from Stripe
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER, // in cents
    allowNull: false,
  },
  basket: {
    type: DataTypes.JSON, // Array of items
    allowNull: false,
  },
  created: {
    type: DataTypes.INTEGER, // Unix timestamp
    allowNull: false,
  }
}, {
  timestamps: true,
});

// Relationships
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = Order;
