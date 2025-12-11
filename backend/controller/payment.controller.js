require("dotenv").config();
const payment = require("../model/payment.model");
const Razorpay = require("razorpay");
const KEY_ID = "rzp_test_RTJBBXdu6qLigb";
const KEY_SECRET = "gtq2TNSaoDGv1XkKhdPFERYc";

const order = async (req, res) => {
    console.log("KEY_ID:", process.env.KEY_ID);
    console.log("KEY_SECRET:", process.env.KEY_SECRET);

    try {
        const razorpay = new Razorpay({
            key_id: KEY_ID,
            key_secret: KEY_SECRET
        });

        console.log("REQ BODY:", req.body);

        const options = {
            amount: req.body.amount,
            currency: req.body.currency,
            receipt: "receipt#1",
            payment_capture: 1
        };

        const orderData = await razorpay.orders.create(options);
        console.log("created order:", orderData);

        res.json({
            order_id: orderData.id,
            orderAmount: orderData.amount,
            currency: orderData.currency
        });
    } catch (error) {
        console.error("Razorpay order error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const fetchPayments = async (req, res) => {
    try {
        const { payment_id } = req.params;

        const razorpay = new Razorpay({
            key_id: KEY_ID,
            key_secret: KEY_SECRET
        });

        const paymentDetails = await razorpay.payments.fetch(payment_id);
        console.log("payment details:", paymentDetails);
        if (paymentDetails.captured) {
            const paymentInfo = await payment.create({
                User: req.user.id,
                payment_id: paymentDetails.id,
                amount: paymentDetails.amount,
                currency: payment.currency,
                status: paymentDetails.status,
                captured: paymentDetails.captured
            });
            res.json(paymentInfo);
        }
    } catch (error) {
        console.error("Fetch payment error:", error);
        res.status(500).json({ message: "Network Error While Fetching Payment" });
    }
};

module.exports = { order, fetchPayments };
