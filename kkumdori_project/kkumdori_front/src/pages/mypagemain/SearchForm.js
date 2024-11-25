import React from 'react';
import './mypage.css';

const SearchForm = () => {
  return (
    <div className="searchContainer">
      <form method="get" action="/search" role="search">
        <label htmlFor="user-search">주문내역 검색 기능</label>
        <input
          className='mypage-searchform'
          type="search"
          id="user-search"
          name="query"
          placeholder="여기에 검색할 상품을 작성해주세요!"
          aria-label="사이트 내용을 통해 검색"
        />
        <button className="searchbtn" type="submit">
          검색
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
