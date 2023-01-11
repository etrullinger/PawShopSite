//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Order = require('./models/Order')
const Product = require('./models/Product')

//associations could go here!
Product.belongsToMany(User, { through: 'Cart' })

User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(Order, { through: 'OrderDetails' })

module.exports = {
  db,
  models: {
    User,
    Order,
    Product
  },
}
