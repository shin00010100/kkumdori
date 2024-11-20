import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 추가
import './Header.css';

const Header = () => (
  <>
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
          <Link to="/Login"><a>로그인</a></Link>
          <Link to="sign"><a href="#signup">회원가입</a></Link>
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
  </>
);

export default Header;
