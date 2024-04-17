const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * Route to add a review for a book.
 */
router.post(
  "/:bookId/reviews",
  authMiddleware.authenticateToken,
  reviewController.createReviewForBook
);

/**
 * Route to update a review by its ID.
 */
router.put(
  "/reviews/:id",
  authMiddleware.authenticateToken,
  reviewController.updateReview
);

/**
 * Route to get a review by its ID.
 */
router.get(
  "/review/:id",
  authMiddleware.authenticateToken,
  reviewController.getReviewById
);

/**
 * Route to delete a review by its ID.
 */
router.delete("/review/:id", reviewController.deleteReviewById);

/**
 * Route to like a review by its ID.
 */
router.post(
  "/:id/like",
  authMiddleware.authenticateToken,
  reviewController.likeReviewById
);

/**
 * Route to unlike a review by its ID.
 */
router.post(
  "/:id/unlike",
  authMiddleware.authenticateToken,
  reviewController.unlikeReview
);

/**
 * Route to add a comment to a review.
 */
router.post(
  "/:id/comments",
  authMiddleware.authenticateToken,
  reviewController.addCommentToReview
);

module.exports = router;
