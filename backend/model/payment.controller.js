const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    payment_id:{
        type: String,
        require: false
    },
    amount:{
        type: Number,
        require: false
    },
    currency:{
        type: String,
        require: false
    },
    status:{
        type: String,
        require: false
    },
    captured:{
        type: String,
        require: false
    },
});

const payment = new mongoose.model("paymentModel", paymentSchema);
module.exports = payment;