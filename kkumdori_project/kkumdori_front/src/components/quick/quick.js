import React from 'react';
import { Link } from 'react-router-dom';
import './quick.css';

const Side2 = () => (
  <aside className="side2">
    <div className="menu">
      {/* 최근 본 상품 박스 */}
      <div className="ad-banner1">
        <div className="ad-title">최근 본 상품 제목</div>
        <img src="/img/recent-product.jpg" alt="최근 본 상품" />
        <Link
          to="/productList"
          state={{ image: '/img/recent-product.jpg' }} // 최근 본 상품 이미지 경로 전달
        >
          <button className="view-button">상품 보기</button>
        </Link>
      </div>

      {/* 이달의 추천 상품 박스 */}
      <div className="ad-banner2">
        <img src="/img/ad-banner.jpg" alt="광고 배너" />
        <div className="ad-title">이달의 추천상품</div>
        <div className="ad-content">대충 상품 설명</div>
        <Link
          to="/productList"
          state={{ image: '/img/ad-banner.jpg' }} // 추천 상품 이미지 경로 전달
        >
          <button className="product-button">상품 보기</button>
        </Link>
      </div>
    </div>
  </aside>
);

export default Side2;
