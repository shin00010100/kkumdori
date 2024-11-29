import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="검색어 입력"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button className="search-button">검색</button>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)} 
        className="sort-select"
      >
        <option value="latest">최신순</option>
        <option value="popular">인기순</option>
      </select>
    </div>
  );
};

export default SearchBar;
