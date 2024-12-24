import React from 'react';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import Side1 from '../side/Side.js';
import Side2 from '../quick/quick.js'; // Side2 추가
import ScrollToTopButton from '../scrolltotopbutton/ScrollToTopButton.js'; // ScrollToTopButton 추가
import './Layout.css';

const Layout = ({ children }) => (
  <>
    <Header />
    <Side1 /> {/* 왼쪽 사이드 메뉴 */}
    <Side2 /> {/* 오른쪽 사이드 메뉴 */}
    <main className="main-content">
      {children}
    </main>
    <Footer />
    <ScrollToTopButton /> {/* 맨 위로 가기 버튼 */}
  </>
);

export default Layout;
