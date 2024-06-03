import React, { useState, useEffect } from "react";

function Bookshelf() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(savedBooks);
  }, []);

  const handleRemoveFromBookshelf = (book) => {
    const newBookshelf = bookshelf.filter((b) => b.key !== book.key);
    setBookshelf(newBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(newBookshelf));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookshelf</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookshelf.map((book, index) => (
          <div
            key={index}
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
              onClick={() => handleRemoveFromBookshelf(book)}
              className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition-colors duration-300"
            >
              Remove from Bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookshelf;
