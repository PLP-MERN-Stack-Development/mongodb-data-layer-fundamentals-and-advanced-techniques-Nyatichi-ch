
 // 1. Find all books:
     db.books.find({ genre: "Memoir" })

  //2. Find books by a specific author:
    db.books.find({ author: "Michelle Obama" })
 
 // 3. Find books published after 1950:
    db.books.find({ published_year: { $gt: 2011 } })
 
 // 4. update the price of a book:
    db.books.updateOne(
      { title: "The Alchemist" },
      { $set: { price: 14.99 } }
    )

  // 5.Delete a book
  db.books.deleteOne({ title: "Technology" })

  
  // 1.books that are both in stock and published after 2010
  db.books.find(
  {
    inStock: true,
    publishedYear: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
)

// 2.projection to return only the title, author, and price fields

// 3.sorting to display books by price (both ascending and descending)
db.books.find(
  { inStock: true, publishedYear: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: 1 })


db.books.find(
  { inStock: true, publishedYear: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: -1 })


// 4.limit` and `skip` methods to implement pagination (5 books per page)
const pageSize = 5;
const pageNum = 1;  // or 2, 3, etc.

db.books.find(
  { inStock: true, publishedYear: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
)
.sort({ price: 1 })   // or sort({ price: -1 })
.skip((pageNum - 1) * pageSize)
.limit(pageSize)



//4. AGGREGATE 
// 1.Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",                // group key: genre
      averagePrice: { $avg: "$price" },
      count: { $sum: 1 }            // optionally, also count how many books in that genre
    }
  },
  {
    $project: {
      _id: 0,
      genre: "$_id",
      averagePrice: 1,
      count: 1
    }
  }
])

//2.author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 1
  },
  {
    $project: {
      _id: 0,
      author: "$_id",
      bookCount: 1
    }
  }
])

//3.grouping books by publication decade and counting

db.books.aggregate([
  {
    $project: {
      // compute a decade label from publishedYear, e.g. 1990, 2000, 2010, etc.
      decade: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$publishedYear", 10] } }, 10 ] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      decade: "$_id",
      count: 1
    }
  },
  {
    $sort: { decade: 1 }   // sort by decade ascending (e.g. "1980s", "1990s", ...)
  }
])


// 5. INDEXING
// 1. index on the `title` field for faster searches
    db.books.createIndex({ title: 1 })

// 2. Compound index on `author` and `published_year`
    db.books.find({ author: "X" , publishedYear: { $gt: 2010 } })

// 3. Explain
db.books.find({ title: "The Alchemist" }).explain("executionStats")





  