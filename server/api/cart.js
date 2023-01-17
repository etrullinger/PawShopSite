const router = require("express").Router();
const ProductsInCarts = require("../db/models/ProductsInCarts");

// GET /api/cart
router.get("/", async (req, res, next) => {
    try {
        const products = await ProductsInCarts.findAll();
        res.send(products);
    } catch (error) {
        next(error);
    }
});

// GET /api/cart/:userId
router.get("/:userId", async (req, res, next) => {
    try {
        const products = await ProductsInCarts.findAll({
            where: {
                userId: req.params.userId
            },
        });
        res.send(products);
    } catch(error){
        next(error)
    }
});

module.exports = router