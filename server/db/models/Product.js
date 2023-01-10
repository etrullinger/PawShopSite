const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    validate: {
      min: 0.00
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Product;