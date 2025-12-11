const express = require("express");
const router = express.Router();
const { order, fetchPayments } = require("../controller/payment.controller"); 

router.post("/createOrders", order); 

router.get("/:payment_id", fetchPayments);

module.exports = router;