const Book = require("../models/book.model");

/**
 * Service function to add a new book.
 * @param {object} bookData - The book data object containing book details.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
exports.addBook = async (bookData) => {
  try {
    // Check if the ISBN already exists
    const existingBook = await Book.findOne({ isbn: bookData.isbn });
    if (existingBook) {
      throw new Error("A book with this ISBN already exists");
    }

    // Create the book object
    const book = new Book(bookData);

    // Save the book to the database
    await book.save();
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to get all books.
 * @returns {Promise<Array>} A Promise representing an array of all books.
 */
exports.getAllBooks = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to get a book by its ID.
 * @param {string} bookId - The ID of the book to retrieve.
 * @returns {Promise<object>} A Promise representing the book object.
 */
exports.getBookById = async (bookId) => {
  try {
    const book = await Book.findById(bookId);
    return book;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to update a book by its ID.
 * @param {string} bookId - The ID of the book to update.
 * @param {object} updatedBookData - The updated book data.
 * @returns {Promise<object>} A Promise representing the updated book object.
 */
exports.updateBookById = async (bookId, updatedBookData) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData);
    if (!updatedBook) {
      throw new Error("Book not found");
    }
    return updatedBook;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to delete a book by its ID.
 * @param {string} bookId - The ID of the book to delete.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
exports.deleteBookById = async (bookId) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      throw new Error("Book not found");
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to search books by title, author name, and ISBN number.
 * @param {string} query - The search query.
 * @returns {Promise<Array>} A Promise representing the array of books matching the search query.
 */
exports.searchBooks = async (query) => {
  try {
    // Perform case-insensitive search for books matching the query in title, author name, and ISBN number
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Search by title
        { authors: { $regex: query, $options: "i" } }, // Search by author name
        { isbn: { $regex: query, $options: "i" } }, // Search by ISBN number
      ],
    });
    return books;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to check if a book exists by its ID.
 * @param {string} bookId - The ID of the book to check.
 * @returns {Promise<boolean>} A Promise representing whether the book exists or not.
 */
exports.bookExists = async (bookId) => {
  try {
    const book = await Book.findById(bookId);
    console.log("Book", book);
    return !!book;
  } catch (error) {
    throw error;
  }
};
