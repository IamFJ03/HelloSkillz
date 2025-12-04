const express = require("express");
const router = express.Router();
// Assuming payment.controller.js is located in a folder named 'controller' one level up
const { order, fetchPayments } = require("../controller/payment.controller"); 

// This route handles the POST request to /api/payment/createOrders
// (since the router is mounted at /api/payment in server.js)
router.post("/createOrders", order); 

// This route handles the GET request to fetch payment details
router.get("/:payment_id", fetchPayments);

module.exports = router;