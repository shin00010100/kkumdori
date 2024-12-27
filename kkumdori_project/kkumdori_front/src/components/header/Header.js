import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../utils/AuthContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuth, setIsAuth, setUser, user } = useAuth(); // setIsAuth, setUser 사용

  // 사용자 정보 가져오기 함수
  const fetchUserInfo = useCallback(async () => {
    // 세션에서 먼저 JWT 토큰을 확인하고, 없다면 로컬스토리지에서 가져옵니다.
    let token = sessionStorage.getItem("jwt");  // 세션에서 먼저 확인
    if (!token) {
      token = localStorage.getItem("jwt");  // 세션에 없으면 로컬스토리지에서 가져오기
    }

    if (!token) {
      console.log("로그인 정보가 없습니다."); // 로그인 정보가 없으면 콘솔에 출력
      setIsAuth(false);  // 로그인 상태를 false로 업데이트
      return;
    }

    try {
      const response = await fetch("http://localhost:8090/api/auth/getuser", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,  // Authorization 헤더에 JWT 토큰 추가
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("사용자 정보:", data);
        setIsAuth(true);  // 로그인 상태를 true로 업데이트
        setUser(data);    // 사용자 정보 업데이트
      } else {
        console.error("사용자 정보를 가져오는 데 실패했습니다.");
        setIsAuth(false);  // 실패 시 로그인 상태를 false로 업데이트
      }
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
      setIsAuth(false);  // 오류 발생 시 로그인 상태를 false로 업데이트
    }
  }, [setIsAuth, setUser]); // setIsAuth와 setUser를 의존성 배열에 추가

  // 로그인 상태가 변경되면 사용자 정보 가져오기
  useEffect(() => {
    if (isAuth) {
      fetchUserInfo();  // 로그인 후 자동으로 사용자 정보 가져오기
    } else {
      setUser(null);  // 로그아웃 시, 사용자 정보 초기화
    }
  }, [isAuth, fetchUserInfo, setUser]); // isAuth와 fetchUserInfo, setUser를 의존성 배열에 추가


 // 새로고침 시 localStorage와 sessionStorage에서 토큰 확인 및 로그인 상태 설정
useEffect(() => {
  // localStorage에서 토큰 확인
  const localToken = localStorage.getItem("jwt");
  // sessionStorage에서 토큰 확인
  const sessionToken = sessionStorage.getItem("jwt");

  if (sessionToken) {
      // sessionStorage에 토큰이 있으면 삭제
      sessionStorage.removeItem("jwt");
      console.log("Session token removed.");
  }

  if (localToken) {
      setIsAuth(true); // localStorage에 토큰이 있다면 로그인 상태로 설정
  } else {
      setIsAuth(false); // 토큰이 없으면 로그인 상태 false로 설정
  }
}, [setIsAuth]); // setIsAuth만 의존성으로 추가


  const handleLogout = () => {
    const kakaoClientId = 'bfd9db6caa0b2e92f3dbfac391a12ead'; // 카카오 REST API 키
    const naverLogoutUrl = "http://nid.naver.com/nidlogin.logout";
    const logoutRedirectUri = 'http://localhost:3000/login'; // 로그아웃 후 리디렉션할 URI
  
    // 카카오 로그아웃 URL 생성
    const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${kakaoClientId}&logout_redirect_uri=${encodeURIComponent(logoutRedirectUri)}`;
  
    // Google 로그아웃 URL 생성
    const googleLogoutUrl = `https://accounts.google.com/Logout?continue=https://appengine.google.com/_ah/logout?continue=${encodeURIComponent(logoutRedirectUri)}`;
  
    // 일반 로그아웃 처리 (JWT 제거)
    localStorage.removeItem("jwt");  // JWT 토큰 제거
    sessionStorage.removeItem("jwt");  // 세션 스토리지에서도 JWT 제거

    // 네이버 로그아웃 URL로 이동
    const naverLogoutRedirectUri = naverLogoutUrl;
    const naverPopup = window.open(naverLogoutRedirectUri, "_blank", "width=1,height=1");
  
    // 네이버 팝업 닫기 및 카카오/Google 로그아웃 처리
    setTimeout(() => {
      if (naverPopup) {
        naverPopup.close(); // 팝업을 자동으로 닫기
      }
      // Google 로그아웃 URL로 리디렉션
      window.location.href = googleLogoutUrl;
      // 카카오 로그아웃 URL로 리디렉션
      setTimeout(() => {
        window.location.href = kakaoLogoutUrl;
      }, 100); // Google 로그아웃 처리 후 카카오 로그아웃 URL로 이동
    }, 100); // 0.1초 후 자동으로 팝업 닫기
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
                  <span>환영합니다, <span className="name-text">관리자</span>님</span>
                ) : (
                  <span>환영합니다, <span className="name-text">{user?.fullname}</span>님</span>
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
          <Link to="/main">
            <img src="/img/logo.png" alt="사이트 로고" className="logo" />
          </Link>

          <div className="header-links">
            <div className="search-container">
              <input
                type="text"
                className="search-bar"
                placeholder="검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link
                to={`/productlist?search=${searchQuery}`}
                className="search-btn"
              >
                <img src="/img/search-icon.png" alt="검색" className="search-icon" />
              </Link>
            </div>

            {/* 마이페이지와 장바구니 */}
            <Link to="/mypage">
              <img src="/img/mypage.png" alt="마이페이지" className="header-icon" />
            </Link>
            <Link to="/cart">
              <img src="/img/cart.png" alt="장바구니" className="header-icon" />
            </Link>
          </div>
        </div>

        {/* 카테고리 바 */}
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
