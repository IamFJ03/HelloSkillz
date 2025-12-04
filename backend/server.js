// Load environment variables FIRST before any other module might use them
require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const app = express();

// Assuming these files exist in your project structure
const authRouter = require("./routes/auth.routes");
const paymentRouter = require("./routes/payment.routes"); 
const connectDB = require("./connectDB"); // Assuming this exists

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Mount the routers
app.use("/api/authentication", authRouter);
app.use("/api/payment", paymentRouter);

// Simple root check
app.get("/", (req, res) => {
    res.send("Server is running.");
});

app.listen(5000, () => {
    console.log("Server Started on port 5000");
    // Ensure connectDB is called after server starts
    connectDB(); 
});