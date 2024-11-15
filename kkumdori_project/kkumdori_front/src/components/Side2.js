import React from 'react';
import './Side2.css';

const Side2 = () => (
  <aside className="side2">
    <div className="menu">
      {/* 최근 본 상품 박스 */}
      <div className="ad-banner1">
        <div className="ad-title">최근 본 상품 제목</div>
        <img src="/img/recent-product.jpg" alt="최근 본 상품" />
        <button className="view-button">상품 보기</button>
      </div>

      {/* 이달의 추천 상품 박스 (Side1에서 이동) */}
      <div className="ad-banner2">
        <img src="/img/ad-banner.jpg" alt="광고 배너" />
        <div className="ad-title">이달의 추천상품</div>
        <div className="ad-content">대충 상품 설명</div>
        <button className="product-button">상품 보기</button>
      </div>
    </div>
  </aside>
);

export default Side2;
