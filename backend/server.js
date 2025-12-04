const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth.routes");
const connectDB = require("./connectDB")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use("/api/authentication", authRouter);

app.listen(5000, () => {
    console.log("Server Started");
    connectDB();
})