const {SignUp, Login, Authenticate, me, logout} = require("../controller/auth.controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();
router.post("/signup", upload.none(),SignUp);
router.post("/login", Login);
router.post("/logout", logout);
router.get("/me",Authenticate, me);

module.exports = router;