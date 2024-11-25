import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 사용
import './mypage.css';

const ListContainer = () => {
  return (
    <div className="listContainer">
      <Link to="/order-history" className="item"> {/* 구매 내역 조회 */}
        <div className="icon">🛒</div>
        <div className="text">구매 내역 조회</div>
        <div className="right">&gt;</div>
      </Link>

      <Link to="/Wishlistpage" className="item"> {/* 위시리스트 */}
        <div className="icon">❤️</div>
        <div className="text">위시리스트</div>
        <div className="right">&gt;</div>
      </Link>

      <Link to="/Returnpage" className="item"> {/* 취소/반품/교환 신청 */}
        <div className="icon">🔄</div>
        <div className="text">취소/반품/교환 신청</div>
        <div className="right">&gt;</div>
      </Link>

      <Link to="/RecentProducts" className="item"> {/* 최근 본 상품 */}
        <div className="icon">👀</div>
        <div className="text">최근 본 상품</div>
        <div className="right">&gt;</div>
      </Link>

      <Link to="/Myreview" className="item"> {/* 내 리뷰 관리 */}
        <div className="icon">✍️</div>
        <div className="text">내 리뷰 관리</div>
        <div className="right">&gt;</div>
      </Link>

      <Link to="/OnetoOne" className="item"> {/* 1:1 맞춤 상담 */}
        <div className="icon">💬</div>
        <div className="text">1:1 맞춤 상담</div>
        <div className="right">&gt;</div>
      </Link>

      <Link to="/Deliverypage" className="item"> {/* 배송지 수정 */}
        <div className="icon">🏠</div>
        <div className="text">배송지 수정</div>
        <div className="right">&gt;</div>
      </Link>

      <Link to="/Memberinfo" className="item"> {/* 회원 정보 수정 */}
        <div className="icon">📝</div>
        <div className="text">회원 정보 수정</div>
        <div className="right">&gt;</div>
      </Link>
    </div>
  );
};

export default ListContainer;
