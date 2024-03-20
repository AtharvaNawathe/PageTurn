/**
 * Middleware functions for user-related operations.
 * @module middlewares/user.middleware
 */

const mongoose = require('mongoose');

/**
 * Remove references to a deleted book from the virtual shelves of all users.
 * @param {function} next - The callback function to proceed to the next middleware function.
 * @returns {Promise<void>} A Promise indicating the completion of the middleware operation.
 */
const removeBookFromShelves = async function(next) {
  const user = this;
  try {
    await Promise.all([
      mongoose.model('User').updateMany({}, { $pull: { wantToRead: user._conditions._id } }),
      mongoose.model('User').updateMany({}, { $pull: { currentlyReading: user._conditions._id } }),
      mongoose.model('User').updateMany({}, { $pull: { read: user._conditions._id } })
    ]);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { removeBookFromShelves };
