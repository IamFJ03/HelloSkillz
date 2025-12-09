const express = require("express");
const { updateAccess, getUserAccess} = require("../controller/recipe.controller");
const { Authenticate } = require("../controller/auth.controller");
const router = express.Router();

router.post("/updateAccess",Authenticate, updateAccess);
router.post("/getAccess", getUserAccess);

module.exports = router;