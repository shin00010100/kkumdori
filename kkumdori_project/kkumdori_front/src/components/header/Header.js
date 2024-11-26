import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 추가
import './Header.css';
import { getUserRole } from '../../utils/auth';
import { useAuth } from '../../utils/AuthContext';

const Header = () => {
  const { isAuth, user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    alert("로그아웃되었습니다.");
  };
  const userRole = getUserRole();
  return(
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
          {userRole === "admin" && (
            <Link to="/admin">관리자</Link>
          )}

        {isAuth ? (
          <>
            <span>안녕하세요, {userRole === "admin" ? "관리자" : "사용자"}님</span>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/Login">로그인</Link>
            <Link to="sign">회원가입</Link>
          </>
        )}
          <a href="#community">커뮤니티</a>
        </div>
      </div>

      {/* 로고, 검색창, 마이페이지, 장바구니 */}
      <div className="logo-container">
        {/* 로고 (Main.js로 이동) */}
        <div className="logo-container">
          <Link to="/main">
            <img src="/img/logo.png" alt="사이트 로고" className="logo" />
          </Link>
        </div>

        {/* 검색창 */}
        <div className="header-links">
          <div className="search-container">
            <input type="text" className="search-bar" placeholder="검색" />
            <button className="search-btn">
              <img src="/img/search-icon.png" alt="검색" className="search-icon" />
            </button>
          </div>

          {/* 마이페이지와 장바구니 (Cart.js로 이동) */}
          <Link to="/Mypage">
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
}

export default Header;
