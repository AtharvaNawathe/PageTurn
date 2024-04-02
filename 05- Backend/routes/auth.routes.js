const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * Route to authenticate user login.
 * @name POST /api/auth/login
 * @function
 * @memberof module:routes/authRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.post("/login", authController.loginUser);

module.exports = router;
