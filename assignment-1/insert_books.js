// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt and David Thomas',
    genre: 'Programming',
    published_year: 1999,
    price: 39.99,
    in_stock: true,
    pages: 352,
    publisher: 'Addison-Wesley'
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Technology',
    published_year: 2008,
    price: 29.99,
    in_stock: true,
    pages: 464,
    publisher: 'Prentice Hall'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    published_year: 2018,
    price: 18,
    in_stock: true,
    pages: 320,
    publisher: 'Avery'
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Memoir',
    published_year: 2018,
    price: 14.50,
    in_stock: false,
    pages: 352,
    publisher: 'Random House'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Fiction',
    published_year: 1949,
    price: 12,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Sci-Fi',
    published_year: 1965,
    price: 17.99,
    in_stock: false,
    pages: 688,
    publisher: 'Chilton Books'
  },
  {
    title: 'sapiens',
    author: 'Yuval Noah Harari',
    genre: 'History',
    published_year: 2011,
    price: 21,
    in_stock: true,
    pages: 498,
    publisher: 'Harper'
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    genre: 'Memoir',
    published_year: 2018,
    price: 16,
    in_stock: true,
    pages: 448,
    publisher: 'Crown'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    genre: 'Productivity',
    published_year: 2016,
    price: 15.99,
    in_stock: true,
    pages: 296,
    publisher: 'Grand Central'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

