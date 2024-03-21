const reviewService = require("../services/review.service");

/**
 * Controller function to create a new review for a book.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */

exports.createReviewForBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;
    const { rating, content } = req.body;
    const newReview = await reviewService.createReviewForBook(
      bookId,
      userId,
      rating,
      content
    );

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to update a review.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
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
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
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
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
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
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
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
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
exports.likeReviewById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Extract user ID from token
        await reviewService.likeReviewById(id, userId);
        res.status(200).json({ message: 'Review liked successfully' });
    } catch (error) {
        next(error);
    }
};


/**
 * Controller function to unlike a review.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
exports.unlikeReview = async (req, res, next) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user.id; // Extract user ID from authenticated user

        await reviewService.unlikeReview(reviewId, userId);

        res.status(200).json({ message: 'Review unliked successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller function to add a comment to a review.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
exports.addCommentToReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const userId = req.user.id; // User ID extracted by auth middleware

        await reviewService.addCommentToReview(id, userId, comment);

        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        next(error);
    }
};


