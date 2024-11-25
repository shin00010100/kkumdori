import React from 'react';
import { Link } from 'react-router-dom';

const ListContainer = () => {
  return (
    <div className="listContainer">
      <Link to='/'>
      <a href="#" className="item">
        <div className="icon">🛒</div>
        <div className="text">구매 내역 조회</div>
        <div className="right">&gt;</div>
      </a>
      </Link>
      <Link to='/wishlist'>
      <a href="#" className="item">
        <div className="icon">💖</div>
        <div className="text">위시리스트</div>
        <div className="right">&gt;</div>
      </a>
      </Link>
      <Link to='/return'>
      <a href="#" className="item">
        <div className="icon">🔄</div>
        <div className="text">취소/반품/교환 신청</div>
        <div className="right">&gt;</div>
      </a>
      </Link>
      <Link to='/recentProducts'>
      <a href="#" className="item">
        <div className="icon">👀</div>
        <div className="text">최근 본 상품</div>
        <div className="right">&gt;</div>
      </a>
      </Link>
      <Link to='/myreview'>
      <a href="#" className="item">
        <div className="icon">✍</div>
        <div className="text">내 리뷰 관리</div>
        <div className="right">&gt;</div>
      </a>
      </Link>
      <Link to='/'>
      <a href="#" class="item">
        <div class="icon">💬</div>
        <div class="text">1:1 맞춤 상담</div>
        <div class="right">&gt;</div>
      </a>
      </Link>
      <Link to='/delivery'>
      <a href="#" class="item">
        <div class="icon">🏠</div>
        <div class="text">배송지 수정</div>
        <div class="right">&gt;</div>
      </a>
      </Link>
      <Link to='/MemberInfoEdit'>
      <a href="#" class="item">
        <div class="icon">📝</div>
        <div class="text">회원 정보 수정</div>
        <div class="right">&gt;</div>
      </a>   
      </Link>
    </div>

    

    
  );
}

export default ListContainer;
