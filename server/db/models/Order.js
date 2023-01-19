const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  invoiceId: {
    type: Sequelize.STRING
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: Sequelize.DECIMAL(10,2),
    validate: {
      min: 0.00
    }
  }
})

module.exports = Order;