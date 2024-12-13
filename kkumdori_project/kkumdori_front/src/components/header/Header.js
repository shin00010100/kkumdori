import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link 컴포넌트를 추가
import './Header.css';
import { useAuth } from '../../utils/AuthContext'; // useAuth 훅 사용

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
  const { isAuth, user, logout } = useAuth(); // useAuth 훅으로 로그인 상태와 사용자 정보 가져오기
  console.log(user);
  const navigate = useNavigate(); // useNavigate 사용

  const handleLogout = () => {
    logout();
    alert("로그아웃되었습니다.");
    navigate("/login"); // 로그인 후 대시보드로 이동
  };

  return (
    <div>
      {/* 이달의 추천상품 광고 배너 */}
      <div className="banner">
        <p>이달의 추천상품 광고 배너</p>
      </div>

      <header className="Header">
        {/* 소셜 미디어 링크와 네비게이션 */}
        <div className="header-top">
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/img/logo_facebook.png" alt="Facebook" className="social-icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/img/logo_instagram.png" alt="Instagram" className="social-icon" />
            </a>
            <a href="https://www.naver.com" target="_blank" rel="noopener noreferrer">
              <img src="/img/logo_naver.png" alt="Naver" className="social-icon" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="/img/logo_youtube.png" alt="YouTube" className="social-icon" />
            </a>
          </div>

          <div className="nav-links">
            {user?.role === "admin" && <Link to="/admin">관리자</Link>} 
            <a href="#notice">공지사항</a> 
            {user?.role === "user" && <Link to="/mypage">마이페이지</Link>}
            {isAuth ? (
  <>
    {user?.role === "admin" ? (
      <span>환영합니다, <span class="name-text">관리자</span>님</span> // 관리자일 경우
    ) : (
      <span>환영합니다, <span class="name-text">{user?.fullname}</span>님</span> // 일반 사용자일 경우
    )}
    <button className="logout_button" onClick={handleLogout}>로그아웃</button>
  </>
) : (
  <>
    <Link to="/login">로그인</Link>
    <Link to="/sign">회원가입</Link>
  </>
)}
          </div>
        </div>

        {/* 로고, 검색창, 마이페이지, 장바구니 */}
        <div className="logo-container">
          <div className="logo-container">
            <Link to="/main">
              <img src="/img/logo.png" alt="사이트 로고" className="logo" />
            </Link>
          </div>

          <div className="header-links">
            <div className="search-container">
              <input
                type="text"
                className="search-bar"
                placeholder="검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
              />
              <Link
                to={`/productlist?search=${searchQuery}`} // 검색어를 URL 파라미터로 전달
                className="search-btn"
              >
                <img src="/img/search-icon.png" alt="검색" className="search-icon" />
              </Link>
            </div>

            {/* 마이페이지와 장바구니 (Cart.js로 이동) */}
            <Link to="/mypage">
              <img src="/img/mypage.png" alt="마이페이지" className="header-icon" />
            </Link>
            <Link to="/cart">
              <img src="/img/cart.png" alt="장바구니" className="header-icon" />
            </Link>
          </div>
        </div>

        {/* 카테고리 바 추가 */}
        <div className="category-bar">
          <ul className="category-list">
            <li><Link to="/category/electronics">카테고리A</Link></li>
            <li><Link to="/category/fashion">카테고리B</Link></li>
            <li><Link to="/category/books">카테고리C</Link></li>
            <li><Link to="/category/home">카테고리D</Link></li>
            <li><Link to="/category/toys">카테고리E</Link></li>
            <li><Link to="/category/beauty">카테고리F</Link></li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
