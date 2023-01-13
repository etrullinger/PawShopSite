const router = require("express").Router();
const Product = require('../db/models/Product')
const User = require('../db/models/User');

// GET /api/admin/products
router.get('/products', async (req, res, next) => {
  try{
    res.send(await Product.findAll());
  } catch (error) {
    next (error)
  }
});

// view all users
// GET /api/admin/users
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'admin', 'firstName', 'lastName']
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})


module.exports = router;
