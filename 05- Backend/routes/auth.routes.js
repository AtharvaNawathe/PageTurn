const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * Route to authenticate user login.
 */
router.post("/login", authController.loginUser);

module.exports = router;
