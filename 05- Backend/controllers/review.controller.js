const reviewService = require("../services/review.service");

/**
 * Controller function to create a new review for a book.
 */
exports.createReviewForBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;
    const { rating, content } = req.body;

    // Validate rating
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating value" });
    }

    // Validate content
    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ error: "Review content is required" });
    }

    const newReview = await reviewService.createReviewForBook(
      bookId,
      userId,
      rating,
      content
    );

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to update a review.
 */
exports.updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, content } = req.body;

    const updatedReview = await reviewService.updateReview(id, rating, content);

    res
      .status(200)
      .json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get a review by its ID.
 */
exports.getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("ID :", id);
    const review = await reviewService.getReviewById(id);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get reviews for a book.
 */
exports.getReviewsForBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviews = await reviewService.getReviewsForBook(id);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to delete a review by its ID.
 */
exports.deleteReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await reviewService.deleteReviewById(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to like a review by its ID.
 */
exports.likeReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Extract user ID from token
    await reviewService.likeReviewById(id, userId);
    res.status(200).json({ message: "Review liked successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to unlike a review.
 */
exports.unlikeReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id; 

    await reviewService.unlikeReview(reviewId, userId);

    res.status(200).json({ message: "Review unliked successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to add a comment to a review.
 */
exports.addCommentToReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.user.id; // User ID extracted by auth middleware

    await reviewService.addCommentToReview(id, userId, comment);

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    next(error);
  }
};
