//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Order = require('./models/Order')
const Product = require('./models/Product')
const ProductsInCarts = require('./models/ProductsInCarts')
const ProductsInOrders = require('./models/ProductsInOrders')

//associations 
Product.belongsToMany(User, { through: ProductsInCarts })
ProductsInCarts.belongsTo(Product)

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
