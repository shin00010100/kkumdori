import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm'; // SearchForm 컴포넌트 임포트
import './mypage.css';

const SummaryContainer = () => {
  // 상품 데이터 상태로 관리
  const [posts, setPosts] = useState([
    { id: 1, title: '첫 번째 상품', date: '2024-11-1', content: '이것은 첫 번째 상품입니다.' },
    { id: 2, title: '두 번째 상품', date: '2024-10-1', content: '이것은 두 번째 상품입니다.' },
    { id: 3, title: '세 번째 상품', date: '2024-9-1', content: '이것은 세 번째 상품입니다.' },
    { id: 4, title: '네 번째 상품', date: '2024-8-1', content: '이것은 네 번째 상품입니다.' },
    { id: 5, title: '다섯 번째 상품', date: '2024-7-1', content: '이것은 다섯 번째 상품입니다.' },
    { id: 6, title: '여섯 번째 상품', date: '2024-6-1', content: '이것은 여섯 번째 상품입니다.' },
  ]);

  const [filteredPosts, setFilteredPosts] = useState(posts); // 필터링된 데이터 상태

  // `SearchForm`에서 필터링된 데이터를 `SummaryContainer`로 전달받아 업데이트
  const handleFilter = (filteredData) => {
    setFilteredPosts(filteredData); // 필터링된 결과를 상태로 업데이트
  };

  return (
    <div>
      {/* SearchForm에 필터링 함수 전달 */}
      <SearchForm posts={posts} onFilter={handleFilter} />

      <div className="summaryContainer">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="item">
              <div className="productImage">
                <img src="https://via.placeholder.com/100" alt="상품 이미지" />
              </div>
              <div className="productDetails">
                <div className="productDate">{post.date}</div>
                <div className="productName">상품명: {post.title}</div>
                <div className="productContent">{post.content}</div>
                <div className="productActions">
                  <button className="actionBtn">
                    <a
                      href="https://www.cjlogistics.com/ko/tool/parcel/tracking"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      배송조회
                    </a>
                  </button>
                  <Link to="/Returnpage">
                    <button className="actionBtn">교환/반품</button>
                  </Link>
                  <Link to="/Review">
                    <button className="actionBtn">리뷰작성</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>검색된 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SummaryContainer;
