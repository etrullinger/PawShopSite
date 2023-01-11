const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define("cart", {
    // this will give us a cartId

    // the associations will provide us a userId in cart table
})

module.exports = Cart;