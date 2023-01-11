const router = require("express").Router();
const Product = require("../db/models/Product");

// GET /api/cart/
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll({
            where: {

            }
        });
        res.send(products);
    } catch(error){
        next(error)
    }
});

module.exports = router