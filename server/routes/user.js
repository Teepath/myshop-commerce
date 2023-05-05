const express = require("express");
const 
  getUser = require("../controller/user.js");
const  verifyToken = require ("../middleware/auth.js");

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);


module.exports = router;