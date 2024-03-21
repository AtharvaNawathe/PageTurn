const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const userService = require('../services/user.service');
const userController = require('../controllers/user.controller')
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

/**
 * Update the profile of the currently authenticated user.
 * @name PUT /api/users/me
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.put('/me', authMiddleware.authenticateToken, userController.updateUserProfile);


/**
 * Register a new user.
 * @name POST /api/users/register
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Express route path.
 * @param {function} middleware - Express middleware.
 * @param {function} callback - Route handler function.
 */

router.post('/register', userController.registerUser);

/**
 * Get user by username.
 * @name GET /api/users/:username
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.get('/:username',authMiddleware.authenticateToken, userController.getUserByUsername);

/**
 * Delete the authenticated user.
 * @name DELETE /api/users/me
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Express route path.
 * @param {function} middleware - Authentication middleware to verify user token.
 * @param {function} callback - Route handler function.
 */
router.delete('/me', authMiddleware.authenticateToken, userController.deleteUser);

/**
 * Add a book to the "Currently Reading" shelf of the authenticated user.
 * @name POST /api/users/currently-reading
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Express route path.
 * @param {function} middleware - Authentication middleware to verify user token.
 * @param {function} callback - Route handler function.
 */
router.post('/currently-reading', authMiddleware.authenticateToken, userController.addToCurrentlyReading);

/**
 * Add a book to the "Want to Read" shelf of the authenticated user.
 * @name POST /api/users/want-to-read
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Express route path.
 * @param {function} middleware - Authentication middleware to verify user token.
 * @param {function} callback - Route handler function.
 */

router.post('/want-to-read', authMiddleware.authenticateToken, userController.addToWantToRead);

/**
 * Add a book to the "Read" shelf of the authenticated user.
 * @name POST /api/users/read
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Express route path.
 * @param {function} middleware - Authentication middleware to verify user token.
 * @param {function} callback - Route handler function.
 */
router.post('/read', authMiddleware.authenticateToken, userController.addToRead)

/**
 * Get all users.
 * @name GET /api/users/all/users
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Express route path.
 * @param {function} middleware - Authentication middleware to verify user token.
 * @param {function} callback - Route handler function.
 */
router.get('/all/users',authMiddleware.authenticateToken, userController.getAllUsers);


module.exports = router;
