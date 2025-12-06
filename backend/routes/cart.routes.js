const express = require("express");
const {addToCart, deleteFromCart} = require("../controller/cart.controller");
const {Authenticate} = require("../controller/auth.controller");
const router = express.Router();

router.post("/addtocart",Authenticate, addToCart);
router.delete("/deleteMeal", deleteFromCart);

module.exports = router;