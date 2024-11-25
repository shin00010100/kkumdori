import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    // 스크롤 여부 감지 함수
    const checkContentHeight = () => {
      const contentHeight = document.body.scrollHeight; // 전체 콘텐츠 높이
      const windowHeight = window.innerHeight; // 현재 창 높이
      setIsFixed(contentHeight <= windowHeight); // 콘텐츠가 창보다 작으면 고정
    };

    checkContentHeight(); // 초기 상태 체크
    window.addEventListener('resize', checkContentHeight); // 창 크기 변경 시 상태 업데이트

    return () => window.removeEventListener('resize', checkContentHeight); // 클린업
  }, []);

  return (
    <footer className={isFixed ? 'fixed' : 'static'}>
      <a href="#about">회사 소개</a>
      <a href="#location">찾아오시는 길</a>
      <a href="#contact">연락처</a>
    </footer>
  );
};

export default Footer;
