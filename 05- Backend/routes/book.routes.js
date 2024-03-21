const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const bookController = require('../controllers/book.controller');
const reviewController = require('../controllers/review.controller');
/**
 * Route to add a new book.
 * @name POST /api/books
 * @function
 * @memberof module:routes/bookRoutes
 * @inner
 * @param {string} path - Express route path.
 * @param {callback} middleware - Middleware to authenticate admin users.
 * @param {callback} callback - Route handler function.
 */
router.post('/', authMiddleware.authenticateToken, adminMiddleware.authenticateAdmin, bookController.addBook);


/**
 * Route to get all books.
 * @name GET /api/books
 * @function
 * @memberof module:routes/bookRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.get('/', authMiddleware.authenticateToken, bookController.getAllBooks);

/**
 * Route to get a book by its ID.
 * @name GET /api/books/:id
 * @function
 * @memberof module:routes/bookRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.get('/getBookById/:id',authMiddleware.authenticateToken, bookController.getBookById);



/**
 * Route to update a book by its ID.
 * @name PUT /api/books/:id
 * @function
 * @memberof module:routes/bookRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.put('/:id', authMiddleware.authenticateToken, adminMiddleware.authenticateAdmin,bookController.updateBookById);



/**
 * Route to delete a book by its ID.
 * @name DELETE /api/books/:id
 * @function
 * @memberof module:routes/bookRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.delete('/:id', authMiddleware.authenticateToken, adminMiddleware.authenticateAdmin,bookController.deleteBookById);


/**
 * Route to search books by title, author name, and ISBN number.
 * @name GET /api/books/search
 * @function
 * @memberof module:routes/bookRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.get('/search', bookController.searchBooks);



/**
 * Route to get reviews for a book by its ID.
 * @name GET /api/books/:id/reviews
 * @function
 * @memberof module:routes/reviewRoutes
 * @param {string} path - Express route path.
 * @param {function} callback - Route handler function.
 */
router.get('/:id/reviews', reviewController.getReviewsForBook);

module.exports = router;
