//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Order = require('./models/Order')
const Product = require('./models/Product')
// const Cart = require('./models/Cart')
const ProductsInCarts = require('./models/ProductsInCarts')
const ProductsInOrders = require('./models/ProductsInOrders')

//associations could go here!
// User.hasOne(Cart)
// Cart.belongsTo(User)

Product.belongsToMany(User, { through: ProductsInCarts })

User.hasMany(Order, { as: 'orders' })
Order.belongsTo(User)

Product.belongsToMany(Order, { through: ProductsInOrders })

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    ProductsInCarts,
    ProductsInOrders
  },
}
