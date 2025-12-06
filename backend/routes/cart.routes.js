const express = require("express");
const {addToCart, deleteFromCart} = require("../controller/cart.controller");
const router = express.Router();

router.post("/addtocart", addToCart);
router.delete("/deleteMeal", deleteFromCart);

module.exports = router;