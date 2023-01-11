//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Order = require('./models/Order')
const Product = require('./models/Product')
const Cart = require('./models/Cart')

//associations could go here!
// Product.belongsToMany(User, { through: 'Cart' })
User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(Product, { as: 'products' })
Product.belongsToMany(Cart, { through: 'ProductsInCarts' })

User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(Order, { through: 'ProductsInOrders' })

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    Cart
  },
}
