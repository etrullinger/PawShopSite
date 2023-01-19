const router = require("express").Router();
const { models: { ProductsInCarts, Product }} = require('../db')

// GET /api/cart
router.get("/", async (req, res, next) => {
    try {
        const products = await ProductsInCarts.findAll();
        res.send(products);
    } catch(error){
        next(error);
    };
});

// POST /api/cart
router.post("/", async (req, res, next) => {
    try {
        res.status(201).send(await ProductsInCarts.create(req.body));
    } catch (error) {
        next(error);
    };
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

// DELETE /api/cart/:userId
router.get("/:userId", async (req, res, next) => {
    try {
        const productsInCart = await ProductsInCarts.findAll({
            where: {
                userId: req.params.userId
            }
        });
        await productsInCart.destroy();
        res.send(productsInCart);
    } catch (error) {
        next(error);
    };
});

// GET /api/cart/:userId/:productId
router.get("/:userId/:productId", async (req, res, next) => {
    try {
        const productInCart = await ProductsInCarts.findOne({
            where: {
                userId: req.params.userId,
                productId: req.params.productId
            },
            include: [Product]
        });
        res.send(productInCart);
    } catch (error) {
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
            },
            include: [Product]
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
            include: [Product]
        });
        await productInCart.destroy();
        res.send(productInCart);
    } catch (error) {
        next(error);
    }
});

module.exports = router