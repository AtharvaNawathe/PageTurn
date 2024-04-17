const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userService = require("../services/user.service");
const userController = require("../controllers/user.controller");
/**
 * Route to get the profile of the authenticated user.
 */
router.get("/me", authMiddleware.authenticateToken, async (req, res, next) => {
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
 */
router.put(
  "/me",
  authMiddleware.authenticateToken,
  userController.updateUserProfile
);

/**
 * Register a new user.
 */

router.post("/register", userController.registerUser);

/**
 * Get user by username.
 */

router.get(
  "/:username",
  authMiddleware.authenticateToken,
  userController.getUserByUsername
);

/**
 * Delete the authenticated user.
 */
router.delete(
  "/me",
  authMiddleware.authenticateToken,
  userController.deleteUser
);

/**
 * Add a book to the "Currently Reading" shelf of the authenticated user.
 */
router.post(
  "/currently-reading",
  authMiddleware.authenticateToken,
  userController.addToCurrentlyReading
);

/**
 * Add a book to the "Want to Read" shelf of the authenticated user.
 */

router.post(
  "/want-to-read",
  authMiddleware.authenticateToken,
  userController.addToWantToRead
);

/**
 * Add a book to the "Read" shelf of the authenticated user.
 */
router.post(
  "/read",
  authMiddleware.authenticateToken,
  userController.addToRead
);

/**
 * Get all users..
 */
router.get(
  "/all/users",
  authMiddleware.authenticateToken,
  userController.getAllUsers
);

/**
 * Route to get a user by ID.
 */
router.get("/getUserById/:userId", userController.getUserById);
module.exports = router;
