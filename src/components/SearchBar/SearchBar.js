import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = () => {
    // Call the onSearch prop to pass the input and category to the parent component
    onSearch(input, category);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-input">
        <i className="fab fa-jedi-order search-icon"></i>
        <input
          placeholder="Search Star Wars..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <select value={category} onChange={handleCategoryChange}>
        <option value="">Select a Category</option>
        <option value="films">Movies</option>
        <option value="people">People</option>
        <option value="planets">Planets</option>
        <option value="starships">Starships</option>
        <option value="species">Species</option>
        <option value="vehicles">Vehicles</option>
      </select>
      <button className="search-button" onClick={handleSearch}>
        <i className="fa fa-book-journal-whills"></i> Search
      </button>
    </div>
  );
};

export default SearchBar;
