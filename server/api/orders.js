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
    res.status(201).send(await Order.create(req.body));
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
      order: [['orderDate', 'DESC']],
      include: [ 'products' ],
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

// POST /api/orders/:userId/:orderId
router.post("/:userId/:orderId", async (req, res, next) => {
  try {
    res.status(201).send(await ProductsInOrders.create(req.body));
  } catch (error) {
    next(error);
  };
});

module.exports = router;