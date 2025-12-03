const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
username:{
    type: String,
    required: false
},
email:{
    type: String,
    required: false
},
password:{
    type: String,
    required: false
},
});

const User = new mongoose.model("ProjectUser", userModel);
module.exports = User;