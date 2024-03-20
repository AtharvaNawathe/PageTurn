const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const userService = require('../services/user.service');

/**
 * Route to get the profile of the authenticated user.
 * @name GET /api/users/me
 * @function
 * @memberof module:routes/userRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {function} middleware - Authentication middleware to verify user token.
 * @param {function} callback - Route handler function.
 */
router.get('/me', authMiddleware.authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const userProfile = await userService.getUserProfile(userId);
    res.json(userProfile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
