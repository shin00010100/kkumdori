import React, { useState } from "react";
import "./SearchBar.css"; // CSS 파일

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // 검색어를 onSearch 함수에 전달
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="상품을 검색하세요..."
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchBar;
  