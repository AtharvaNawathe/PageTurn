const bookService = require('../services/book.service');
const Book = require('../models/book.model');
/**
 * Controller function to add a new book.
 * @param {object} req - The request object.
 */
exports.addBook = async (req, res, next) => {
  try {
    const { isbn, title, authors, genre, description, publishedDate, coverImage, language, publisher, edition } = req.body;
        const missingFields = [];
        if (!isbn) missingFields.push('ISBN');
        if (!title) missingFields.push('Title');
        if (!authors || authors.length === 0) missingFields.push('Authors');
        if (!genre) missingFields.push('Genre');
        if (!description) missingFields.push('Description');
        if (!language) missingFields.push('Language');
        if (!publisher) missingFields.push('Publisher');
    
        if (missingFields.length > 0) {
          return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }
    const bookData = {
      isbn,
      title,
      authors,
      genre,
      description,
      publishedDate,
      coverImage,
      language,
      publisher,
      edition
    };
    await bookService.addBook(bookData);
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get all books.
 */
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};



/**
 * Controller function to get a book by its ID.
 */
exports.getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await bookService.getBookById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to update a book by its ID.
 */
exports.updateBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const updatedBookData = req.body;
    const updatedBook = await bookService.updateBookById(bookId, updatedBookData);
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to delete a book by its ID.
 */
exports.deleteBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    await bookService.deleteBookById(bookId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to search books by title, author name, and ISBN number.
 */
exports.searchBooks = async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    const books = await bookService.searchBooks(query);
    res.json(books);
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to get books with the same genre as the user's interests.
 */
exports.getSimilarBooks = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const books = await bookService.getSimilarBooks(userId);
    res.json(books);
  } catch (error) {
    next(error);
  }
};
