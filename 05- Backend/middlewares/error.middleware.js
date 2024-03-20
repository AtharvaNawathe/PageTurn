/**
 * Error handling middleware to catch and handle errors in the application.
 * @module middlewares/errorHandler
 * @param {Error} err - The error object.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = errorHandler;
