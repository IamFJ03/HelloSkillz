const express = require("express");
const {addToCart,fetchCart, deleteFromCart} = require("../controller/cart.controller");
const {Authenticate} = require("../controller/auth.controller");
const router = express.Router();

router.post("/addtocart",Authenticate, addToCart);
router.get("/fetchcart", Authenticate, fetchCart);
router.delete("/deleteMeal",Authenticate, deleteFromCart);

module.exports = router;