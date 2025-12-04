const {SignUp, Login} = require("../controller/auth.controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();
router.post("/signup", upload.none(),SignUp);
router.post("/login", Login);

module.exports = router;