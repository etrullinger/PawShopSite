const router = require("express").Router();
const { Product, User } = require('../db');

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
router.get('/users', async(req, res, next) => {
  try{
    res.send(await User.findAll());
  } catch (error){
    next(error)
  }
});
// router.get('/', async (req, res, next) => {
//   try {
//     const loggedInUser = await User.findByToken(req.headers.authorization);
//     if(loggedInUser.admin){
//       const users = await User.findAll({
//         attributes: ['id', 'email', 'firstName', 'lastName']
//       });
//       res.send(users);
//     }
//   } catch(error) {
//     next(error)
//   }
// })

// add a new product
// POST /api/admin/products
router.post('/products', async (req, res, next) => {
  try {
    res.send(await Product.create(req.body));
  } catch (error) {
    next(error)
  }
});

// delete an existing product
// DELETE /api/admin/products/:productId
router.delete('/products/:productId', async (req, res, next) => {
  try{
    const product = await Product.findByPk(req.params.productId);
    await product.destroy();
    res.send(product);
  } catch (error){
    next(error);
  }
});

// edit an existing product
// PUT /api/admin/products/:productId
router.put("/products/:productId", async(req, res, next) => {
  try{
    const product = await Product.findByPk(req.params.productId);
    res.send(await product.update(req.body));
  } catch(error) {
    next(error);
  }
});


module.exports = router;
