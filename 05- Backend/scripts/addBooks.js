const axios = require('axios');

// Book data
const books = [
  {
    "isbn": "9780141439846",
    "title": "Jane Eyre",
    "authors": ["Charlotte Brontë"],
    "genre": "fiction",
    "description": "Jane Eyre is a novel by English writer Charlotte Brontë, published under the pen name 'Currer Bell', on 16 October 1847.",
    "publishedDate": "1847-10-16",
    "coverImage": "https://example.com/jane-eyre.jpg",
    "language": "English",
    "publisher": "Smith, Elder & Co.",
    "edition": "1st"
  },
  {
    "isbn": "9780060935467",
    "title": "To Kill a Mockingbird",
    "authors": ["Harper Lee"],
    "genre": "fiction",
    "description": "To Kill a Mockingbird is a novel by Harper Lee published in 1960.",
    "publishedDate": "1960-07-11",
    "coverImage": "https://example.com/to-kill-a-mockingbird.jpg",
    "language": "English",
    "publisher": "J. B. Lippincott & Co.",
    "edition": "1st"
  },
  {
    "isbn": "9780451524935",
    "title": "Animal Farm",
    "authors": ["George Orwell"],
    "genre": "fiction",
    "description": "Animal Farm is an allegorical novella by George Orwell, first published in England on 17 August 1945.",
    "publishedDate": "1945-08-17",
    "coverImage": "https://example.com/animal-farm.jpg",
    "language": "English",
    "publisher": "Secker and Warburg",
    "edition": "1st"
  },
  {
    "isbn": "9780060256654",
    "title": "Where the Wild Things Are",
    "authors": ["Maurice Sendak"],
    "genre": "children",
    "description": "Where the Wild Things Are is a 1963 children's picture book by American writer and illustrator Maurice Sendak.",
    "publishedDate": "1963-04-02",
    "coverImage": "https://example.com/where-the-wild-things-are.jpg",
    "language": "English",
    "publisher": "Harper & Row",
    "edition": "1st"
  },
  {
    "isbn": "9781451673319",
    "title": "The Great Gatsby",
    "authors": ["F. Scott Fitzgerald"],
    "genre": "fiction",
    "description": "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.",
    "publishedDate": "1925-04-10",
    "coverImage": "https://example.com/the-great-gatsby.jpg",
    "language": "English",
    "publisher": "Charles Scribner's Sons",
    "edition": "1st"
  },
  {
    "isbn": "9780307353169",
    "title": "The Road",
    "authors": ["Cormac McCarthy"],
    "genre": "fiction",
    "description": "The Road is a post-apocalyptic novel by American writer Cormac McCarthy, published in 2006.",
    "publishedDate": "2006-09-26",
    "coverImage": "https://example.com/the-road.jpg",
    "language": "English",
    "publisher": "Alfred A. Knopf",
    "edition": "1st"
  },
  {
    "isbn": "9780140283334",
    "title": "The Catcher in the Rye",
    "authors": ["J.D. Salinger"],
    "genre": "fiction",
    "description": "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.",
    "publishedDate": "1951-07-16",
    "coverImage": "https://example.com/the-catcher-in-the-rye.jpg",
    "language": "English",
    "publisher": "Little, Brown and Company",
    "edition": "1st"
  },
  {
    "isbn": "9780061120084",
    "title": "The Alchemist",
    "authors": ["Paulo Coelho"],
    "genre": "fiction",
    "description": "The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988.",
    "publishedDate": "1988-01-01",
    "coverImage": "https://example.com/the-alchemist.jpg",
    "language": "Portuguese",
    "publisher": "HarperTorch",
    "edition": "1st"
  },
  {
    "isbn": "9780141185077",
    "title": "The Picture of Dorian Gray",
    "authors": ["Oscar Wilde"],
    "genre": "fiction",
    "description": "The Picture of Dorian Gray is a Gothic and philosophical novel by Oscar Wilde, first published complete in the July 1890 issue of Lippincott's Monthly Magazine.",
    "publishedDate": "1890-07-20",
    "coverImage": "https://example.com/the-picture-of-dorian-gray.jpg",
    "language": "English",
    "publisher": "Lippincott's Monthly Magazine",
    "edition": "1st"
  },
  {
    "isbn": "9780062567591",
    "title": "The Sun Also Rises",
    "authors": ["Ernest Hemingway"],
    "genre": "fiction",
    "description": "The Sun Also Rises is a 1926 novel by American writer Ernest Hemingway that portrays American and British expatriates who travel from Paris to the Festival of San Fermín in Pamplona to watch the running of the bulls and the bullfights.",
    "publishedDate": "1926-10-22",
    "coverImage": "https://example.com/the-sun-also-rises.jpg",
    "language": "English",
    "publisher": "Charles Scribner's Sons",
    "edition": "1st"
  },
];

// Function to add a single book
async function addBook(bookData) {
  try {
    const response = await axios.post('http://localhost:3000/api/books/', bookData,{
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmNhODVmMzYxODYyOTRlYjVkMDQyMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMTA1NzUzMCwiZXhwIjoxNzExMDYxMTMwfQ.hDeAj8Ka9yWJrVKRzCQ4-S_LFS4G7JFvWUigTi6iP9k'
        }
    });
    console.log(`Book added successfully: ${bookData.title}`);
  } catch (error) {
    console.error(`Error adding book ${bookData.title}: ${error.message}`);
  }
}

// Function to add multiple books
async function addMultipleBooks(books) {
  for (const bookData of books) {
    await addBook(bookData);
  }
}

// Call the function to add multiple books
addMultipleBooks(books);
