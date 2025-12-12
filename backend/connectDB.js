const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.DBString)
    console.log("Database Connected");
    
}

module.exports = connectDB;