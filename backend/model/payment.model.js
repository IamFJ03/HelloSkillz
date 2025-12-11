const mongoose = require("mongoose");
const User = require("./auth.model");
const paymentSchema = new mongoose.Schema({
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
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