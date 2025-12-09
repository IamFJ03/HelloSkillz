const mongoose = require("mongoose");
const User = require("./auth.model");
const UserAccessSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userAccess:{
        type:Number,
        required: false
    }
});

const UserAccess = new mongoose.model("UserAccess", UserAccessSchema);

module.exports = UserAccess;