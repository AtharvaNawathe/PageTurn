const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const bookController = require("../controllers/book.controller");
const reviewController = require("../controllers/review.controller");
/**
 * Route to add a new book.
 */
router.post(
  "/",
  authMiddleware.authenticateToken,
  adminMiddleware.authenticateAdmin,
  bookController.addBook
);

/**
 * Route to get all books.
 */
router.get("/", bookController.getAllBooks);

/**
 * Route to get a book by its ID.
 */
router.get(
  "/getBookById/:id",
  authMiddleware.authenticateToken,
  bookController.getBookById
);

/**
 * Route to update a book by its ID.
 */
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  adminMiddleware.authenticateAdmin,
  bookController.updateBookById
);

/**
 * Route to delete a book by its ID.
 */
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  adminMiddleware.authenticateAdmin,
  bookController.deleteBookById
);

/**
 * Route to search books by title, author name, and ISBN number.
 */
router.get("/search", bookController.searchBooks);

/**
 * Route to get reviews for a book by its ID.
 */
router.get("/:id/reviews", reviewController.getReviewsForBook);

/**
 * Route to get books with the same genre as the user's interests.
 */
router.get("/similar/:userId", bookController.getSimilarBooks);

module.exports = router;
