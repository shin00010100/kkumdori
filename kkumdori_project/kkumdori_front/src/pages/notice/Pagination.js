import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="pagination">
      <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>이전</button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>다음</button>
    </div>
  );
};

export default Pagination;
