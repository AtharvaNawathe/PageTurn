const bookService = require('../services/book.service');

/**
 * Controller function to add a new book.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.addBook = async (req, res, next) => {
  try {
    const { isbn, title, authors, genre, description, publishedDate, coverImage, language, publisher, edition } = req.body;
        // Validate required fields
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
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
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
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
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
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
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
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
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
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
exports.searchBooks = async (req, res, next) => {
  try {
    const query = req.query.q; // Get the search query from request query parameters
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    const books = await bookService.searchBooks(query);
    res.json(books);
  } catch (error) {
    next(error);
  }
};