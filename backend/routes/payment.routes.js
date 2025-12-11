const express = require("express");
const { Authenticate} = require("../controller/auth.controller");
const router = express.Router();
const { order, fetchPayments } = require("../controller/payment.controller"); 

router.post("/createOrders", order); 

router.get("/:payment_id",Authenticate, fetchPayments);

module.exports = router;