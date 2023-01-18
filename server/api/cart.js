const router = require("express").Router();
const ProductsInCarts = require("../db/models/ProductsInCarts");
const Product = require("../db/models/Product");

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
            include: [Product]
        });
        res.send(products);
    } catch(error){
        next(error);
    };
});

// PUT /api/cart/:userId/:productId
router.put("/:userId/:productId", async (req, res, next) => {
    try {
        const productInCart = await ProductsInCarts.findOne({
            where: {
                userId: req.params.userId,
                productId: req.params.productId
            }
        });
        res.send(await productInCart.update(req.body));
    } catch (error) {
        next(error);
    };
});

// DELETE /api/cart/:userId/:productId
router.delete('/:userId/:productId', async (req, res, next) => {
    try {
        const productInCart = await ProductsInCarts.findOne({
            where: {
                userId: req.params.userId,
                productId: req.params.productId
            },
        });
        await productInCart.destroy();
        res.send(productInCart);
    } catch (error) {
        next(error);
    };
});

module.exports = router