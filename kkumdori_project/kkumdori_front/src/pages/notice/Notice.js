import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.js';
import NoticeList from './NoticeList.js';
import Pagination from './Pagination.js';
import initialNotices from '../data/initialNotices.js';
import './Notice.css';

const Notice = () => {
  const [notices, setNotices] = useState([]); // 공지사항 데이터 상태
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 정렬 기준 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 컴포넌트가 마운트될 때 초기 데이터를 설정
  useEffect(() => {
    setNotices(initialNotices); // 초기 데이터를 상태에 설정
  }, []); // 빈 배열로 의존성 배열을 설정하여 컴포넌트가 처음 렌더링될 때만 실행

  if (notices.length === 0) {
    return <p>공지사항이 없습니다.</p>; // notices가 없을 때 처리
  }

  const totalPages = Math.ceil(notices.length / itemsPerPage);

  // 검색된 공지사항 필터링
  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 정렬 로직
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date) - new Date(a.date); // 최신순 정렬
    }
    if (sortBy === 'popular') {
      return b.views - a.views; // 조회수 기준 내림차순 정렬
    }
    return 0;
  });

  // 번호를 시간 순으로 재배정
  const renumberedNotices = sortedNotices.map((notice, index) => ({
    ...notice,
    number: filteredNotices.length - index, // 가장 오래된 공지가 1번이 되도록 설정
  }));

  // 페이지네이션 적용 (현재 페이지에 맞는 공지사항만 표시)
  const currentNotices = renumberedNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="notice-container">
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        sortBy={sortBy} 
        setSortBy={setSortBy} 
      />
      <NoticeList 
        notices={currentNotices} 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
      />
      <Pagination 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalPages={totalPages} 
      />
    </div>
  );
};

export default Notice;
