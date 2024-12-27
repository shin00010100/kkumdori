import React from "react";
import "./Pagination.css"; // CSS 파일

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // 페이지가 1보다 크면 이전 버튼 활성화
  const isPrevDisabled = currentPage <= 1;
  // 페이지가 totalPages보다 작으면 다음 버튼 활성화
  const isNextDisabled = currentPage >= totalPages;

  // 이전 버튼 클릭 핸들러
  const handlePrev = () => {
    if (!isPrevDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    if (!isNextDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  // 특정 페이지 클릭 핸들러
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      {/* 이전 버튼 */}
      <button
        onClick={handlePrev}
        disabled={isPrevDisabled}
        className={`prev-button ${isPrevDisabled ? "disabled" : ""}`}
      >
        이전
      </button>

      {/* 페이지 번호 클릭 가능 영역 */}
      <div className="page-numbers">
        {totalPages > 1 && 
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))
        }
      </div>
      

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={`next-button ${isNextDisabled ? "disabled" : ""}`}
      >
        다음
      </button>
      
        {/* 페이지 번호 표시
      <span className="page-info">
        {currentPage} / {totalPages}
      </span> */}
      
    </div>
  );
};

export default Pagination;
