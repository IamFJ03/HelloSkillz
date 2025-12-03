const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./connectDB")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())


app.listen(5000, () => {
    console.log("Server Started");
    connectDB();
})