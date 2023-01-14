const router = require("express").Router();
const Product = require('../db/models/Product')

// GET /api/products/
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.send(products);
    } catch(error){
        next(error)
    }
});

// GET /api/products/:productId
router.get("/:productId", async (req, res, next) => {
    try{
        const product = await Product.findByPk(req.params.productId);
        res.send(product);
    } catch(error){
        next(error)
    }
});

// GET /api/products/:category
router.get("/:category", async (req, res, next) => {
    try{
        const products = await Product.findAll({
            where: {
                category: req.params.category,
            }
        });
        res.send(products)
    } catch(error){
        next(error)
    }
});

// POST /api/products
router.post('/', async (req, res, next) => {
    try {
      res.send(await Product.create(req.body));
    } catch (error) {
      next(error)
    }
  });

router.put("/:productId", async(req, res, next) => {
    try{
      const product = await Product.findByPk(req.params.productId);
      res.send(await product.update(req.body));
    } catch(error) {
      next(error);
    }
  });


// DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
    try{
      const product = await Product.findByPk(req.params.productId);
      await product.destroy();
      res.send(product);
    } catch (error){
      next(error);
    }
  });

module.exports = router