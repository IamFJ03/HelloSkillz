const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://faheemjawaid12:Faheem12.@cluster0.njgmkgt.mongodb.net/MealFinder?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Database Connected");
    
}

module.exports = connectDB;