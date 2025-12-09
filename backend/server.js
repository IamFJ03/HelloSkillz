require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const app = express();

const authRouter = require("./routes/auth.routes");
const paymentRouter = require("./routes/payment.routes"); 
const cartRouter = require("./routes/cart.routes");
const recipeRouter = require("./routes/recipe.routes");
const connectDB = require("./connectDB");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api/authentication", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/payment", paymentRouter);


app.listen(5000, () => {
    console.log("Server Started on port 5000");
    connectDB(); 
});