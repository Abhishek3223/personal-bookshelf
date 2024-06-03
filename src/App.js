import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookSearch from './components/BookSearch';
import Bookshelf from './components/Bookshelf';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white flex justify-between">
          <Link to="/" className="text-lg font-bold">Search Books</Link>
          <Link to="/bookshelf" className="text-lg font-bold">My Bookshelf</Link>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<BookSearch />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
