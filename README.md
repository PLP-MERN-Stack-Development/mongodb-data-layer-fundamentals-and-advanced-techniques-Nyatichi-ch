# MongoDB Books Collection — Query & Analytics README
# Overview

This README describes a set of MongoDB operations (queries, updates, deletes, aggregation pipelines, and indexing) for a books collection. The goal is to illustrate common tasks such as filtering, projecting, sorting, pagination, aggregating, and optimizing performance via indexes

# CRUD & Basic Queries

* You can find books by genre,  author, or books published after a certain year.

* You update a book’s price by matching on its title (using $set).

* You delete a book by matching its title.

# Filter + Projection + Sorting + Pagination

* Combined filters (e.g. inStock and publishedYear > 2010) let you narrow down results.

* Use projection to return only the fields you need (title, author, price).

* Sort by price either ascending or descending to order results meaningfully.

* Use .skip() and .limit() to serve results in pages (e.g. 5 per page).

# Aggregation Pipelines for Analytics

* Average price by genre: group by genre, compute average price and count.

* Top author: group by author, count books, sort descending, take top.

* Count by publication decade: convert year to decade label (e.g. “2010s”), group, count, and sort.

# Indexing & Performance

* Create a single-field index on title to speed up title-based lookups.

* Create a compound index on author + publishedYear to optimize queries that filter or sort by both.

* Use .explain("executionStats") before and after creating indexes to see how query plans change (collection scan vs index scan) and confirm performance improvements.

