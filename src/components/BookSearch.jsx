import React, { useState } from "react";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});

  const searchBooks = async (searchQuery) => {
    if (cache[searchQuery]) {
      setResults(cache[searchQuery]);
    } else {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`
      );
      const data = await response.json();
      console.log(data);
      const searchResults = data.docs;
      setResults(searchResults);
      setCache({ ...cache, [searchQuery]: searchResults });
    }
  };

  const handleAddToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    bookshelf.push(book);
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Search</h1>
      <div className="flex mb-6">
        <input
          type="text"
          className="flex-grow p-3 border border-gray-300 rounded-l shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={() => searchBooks(query)}
          className="px-4 py-3 bg-blue-600 text-white rounded-r shadow hover:bg-blue-700 transition-colors duration-300"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((book) => (
          <div
            key={book.key}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-1">
              {book.author_name ? book.author_name.join(", ") : "No author"}
            </p>
            <p className="text-gray-500 mb-4">
              {book.first_publish_year
                ? `First published: ${book.first_publish_year}`
                : "No publication year"}
            </p>
            <button
              onClick={() => handleAddToBookshelf(book)}
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors duration-300"
            >
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
