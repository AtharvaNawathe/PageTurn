const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * Route to add a review for a book.
 * @name POST /api/books/:bookId/reviews
 * @function
 * @memberof module:routes/reviewRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.post('/:bookId/reviews', authMiddleware.authenticateToken, reviewController.createReviewForBook);


/**
 * Route to update a review by its ID.
 * @name PUT /api/reviews/:id
 * @function
 * @memberof module:routes/reviewRoutes
 * @param {string} path - Express route path.
 * @param {function} middleware - Authentication middleware to verify user token.
 * @param {function} callback - Route handler function.
 */
router.put('/reviews/:id',authMiddleware.authenticateToken, reviewController.updateReview);


/**
 * Route to get a review by its ID.
 * @name GET /api/reviews/review/:id
 * @function
 * @memberof module:routes/reviewRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.get('/review/:id', authMiddleware.authenticateToken,reviewController.getReviewById);


/**
 * Route to delete a review by its ID.
 * @name DELETE /api/reviews/review/:id
 * @function
 * @memberof module:routes/reviewRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.delete('/review/:id', reviewController.deleteReviewById);


/**
 * Route to like a review by its ID.
 * @name POST /api/reviews/:id/like
 * @function
 * @memberof module:routes/reviewRoutes
 * @param {string} path - Express route path.
 * @param {function} middleware - Authentication middleware to verify user token.
 * @param {function} callback - Route handler function.
 */
router.post('/:id/like',  authMiddleware.authenticateToken, reviewController.likeReviewById);

/**
 * Route to unlike a review by its ID.
 * @name POST /api/reviews/:id/unlike
 * @function
 * @memberof module:routes/reviewRoutes
 * @param {string} path - Express route path.
 * @param {function} middleware - Authentication middleware to verify user token.
 * @param {function} callback - Route handler function.
 */
router.post('/:id/unlike', authMiddleware.authenticateToken, reviewController.unlikeReview);

/**
 * Route to add a comment to a review.
 * @name POST /api/reviews/:id/comments
 * @function
 * @memberof module:routes/reviewRoutes
 * @param {string} path - Express route path.
 * @param {function} middleware - Authentication middleware to verify user token.
 * @param {function} callback - Route handler function.
 */
router.post('/:id/comments',authMiddleware.authenticateToken, reviewController.addCommentToReview);




module.exports = router;