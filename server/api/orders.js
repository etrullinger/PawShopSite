const router = require("express").Router();
const { models: { ProductsInOrders, Product, Order, User }} = require('../db');

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [User, 'products' ]
    });
    res.send(orders);
  } catch (error) {
    next(error);
  };
});

// POST /api/orders
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await ProductsInOrders.create(req.body));
  } catch (error) {
    next(error);
  };
});

// GET /api/orders/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: [ 'products' ]
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:userId/:orderId
router.get("/:userId/:orderId", async (req, res, next) => {
  try {
    const products = await ProductsInOrders.findAll({
      where: {
        orderId: req.params.orderId
      },
      include: [Product, Order]
    });
    res.send(products);
  } catch (error) {
    next(error);
  };
});

// GET /api/orders/:userId/:orderId/:productId
router.get("/:userId/:orderId/:productId", async (req, res, next) => {
  try {
    const product = await ProductsInOrders.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      },
      include: [Product, Order]
    });
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;