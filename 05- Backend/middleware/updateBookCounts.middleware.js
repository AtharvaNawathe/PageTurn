const User = require('../models/user.model');
const Book = require('../models/book.model');

/**
 * Middleware to update book counts when a user modifies their virtual shelf.
 * @param {function} next - The callback function to proceed to the next middleware function.
 * @returns {Promise<void>} A Promise indicating the completion of the middleware operation.
 */
const updateBookCounts = async function(next) {
  const user = this;
  try {
    // Get the IDs of books being added or removed from the virtual shelf
    const bookIds = [...user.wantToRead, ...user.currentlyReading, ...user.read];
    // Update book counts for each book in the virtual shelf
    await Promise.all(bookIds.map(async (bookId) => {
      const book = await Book.findById(bookId);
      if (!book) return; // Book not found, skip
      book.usersCurrentlyReading = await User.countDocuments({ currentlyReading: bookId });
      book.usersWantToRead = await User.countDocuments({ wantToRead: bookId });
      book.usersRead = await User.countDocuments({ read: bookId });
      await book.save();
    }));
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = updateBookCounts;
