const Review = require("../models/review.model");
const User = require("../models/user.model");
const Book = require("../models/book.model");

/**
 * Service function to create a review for a book.
 * @param {string} bookId - The ID of the book being reviewed.
 * @param {string} userId - The ID of the user creating the review.
 * @param {number} rating - The rating given by the user for the book.
 * @param {string} content - The content of the review.
 * @returns {Promise<Review>} A Promise that resolves with the newly created review.
 * @throws {Error} If an error occurs while creating the review.
 */
exports.createReviewForBook = async (bookId, userId, rating, content) => {
  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    // Check if the user has already written a review for the book
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview) {
      throw new Error("User has already written a review for this book");
    }

    // Create review document
    const newReview = new Review({
      book: bookId,
      user: userId,
      rating,
      content,
    });

    // Save the review
    await newReview.save();
    
    // Calculate the new average review rating for the book
    const existingReviews = await Review.find({ book: bookId });
    const totalRatings = existingReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / existingReviews.length;

    // Update the average review field in the Book model
    book.averageReview = averageRating;
    await book.save();

    return newReview;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to update a review.
 * @param {string} id - The ID of the review to update.
 * @param {number} rating - The updated rating for the review.
 * @param {string} content - The updated content for the review.
 * @returns {Promise<Review>} A Promise that resolves with the updated review.
 * @throws {Error} If an error occurs while updating the review.
 */
exports.updateReview = async (id, rating, content) => {
  try {
    // Find the review by its ID and update its properties
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, content },
      { new: true }
    );

    if (!updatedReview) {
      throw new Error("Review not found");
    }

    return updatedReview;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to get a review by its ID.
 * @param {string} id - The ID of the review to retrieve.
 * @returns {Promise<Review>} A Promise that resolves with the review.
 * @throws {Error} If an error occurs while retrieving the review.
 */
exports.getReviewById = async (id) => {
  try {
    const review = await Review.findById(id);
    if (!review) {
      throw new Error("Review not found");
    }
    return review;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to get all reviews for a book.
 * @param {string} bookId - The ID of the book to get reviews for.
 * @returns {Promise<Review[]>} A Promise that resolves with an array of reviews.
 * @throws {Error} If an error occurs while retrieving the reviews.
 */
exports.getReviewsForBook = async (bookId) => {
  try {
    const reviews = await Review.find({ book: bookId });
    return reviews;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to delete a review by its ID.
 * @param {string} reviewId - The ID of the review to delete.
 * @returns {Promise<void>} A Promise representing the completion of the delete operation.
 * @throws {Error} If an error occurs while deleting the review.
 */
exports.deleteReviewById = async (reviewId) => {
  try {
    await Review.findByIdAndDelete(reviewId);
  } catch (error) {
    throw error;
  }
};
/**
 * Service function to like a review by its ID.
 * @param {string} reviewId - The ID of the review to like.
 * @param {string} userId - The ID of the user liking the review.
 * @returns {Promise<void>} A Promise representing the completion of the like operation.
 * @throws {Error} If an error occurs while liking the review.
 */

exports.likeReviewById = async (reviewId, userId) => {
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error("Review not found");
    }
    if (!review.likes.includes(userId)) {
      review.likes.push(userId);
      review.likeCount += 1;
      await review.save();
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to unlike a review by its ID.
 * @param {string} reviewId - The ID of the review to unlike.
 * @param {string} userId - The ID of the user unliking the review.
 * @returns {Promise<void>} A Promise representing the completion of the unlike operation.
 * @throws {Error} If an error occurs while unliking the review.
 */
exports.unlikeReview = async (reviewId, userId) => {
  // Check if the review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new Error("Review not found");
  }

  // Check if the user has already liked the review
  if (!review.likes.includes(userId)) {
    throw new Error("You have not liked this review");
  }

  // Remove the user ID from the list of likes
  review.likes.pull(userId);
  review.likeCount -= 1;
  await review.save();
};

/**
 * Service function to add a comment to a review.
 * @param {string} reviewId - The ID of the review to add the comment to.
 * @param {string} userId - The ID of the user adding the comment.
 * @param {string} comment - The content of the comment.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 * @throws {Error} If an error occurs while adding the comment.
 */
exports.addCommentToReview = async (reviewId, userId, comment) => {
  // Check if the review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new Error("Review not found");
  }

  // Add the comment to the review
  review.comments.push({ user: userId, comment });
  review.commentCount += 1; // Increment comment count
  await review.save();
};
