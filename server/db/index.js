//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Cart = require('./models/Cart')
const Order = require('./models/Order')
const Product = require('./models/Product')

//associations could go here!
User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(Product)

User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(Order, { through: 'OrderDetails' })

module.exports = {
  db,
  models: {
    User,
    Cart,
    Order,
    Product
  },
}
