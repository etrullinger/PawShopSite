const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  invoiceId: {
    type: Sequelize.STRING
  },
  orderDate: {
    type: Sequelize.DATE
  }
})

module.exports = Order;