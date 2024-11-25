import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QnABoard.css";

const QnABoard = ({ posts }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handlePostClick = (post) => {
    navigate('/qnaview', { state: post });
  };

  const filteredPosts = posts.filter(post => {
    const postDate = new Date(post.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const matchesDateRange = (!startDate || postDate >= start) && (!endDate || postDate <= end);
    const matchesSearchTerm = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDateRange && matchesSearchTerm;
  });

  return (
    <div className="board-container">
        {/* 상단 텍스트 버튼 */}
        <div className="nav-buttons">
                <button onClick={() => navigate("/qnaboard")} className="nav-button">Q&A</button>
                <button onClick={() => navigate("/onetooneboard")} className="nav-button">1대1</button>
                <button onClick={() => navigate("/notice")} className="nav-button">공지사항</button>
                <button onClick={() => navigate("/faqboard")} className="nav-button">FAQ</button>
            </div>
      <h1>Q&A 게시판</h1>
      <div className="buttons">
        <button onClick={() => navigate("/qna")}>글쓰기</button>
      </div>
      <div className="date-filter">
        <label htmlFor="start-date">시작 날짜:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="date-input"
        />
        <label htmlFor="end-date">종료 날짜:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="date-input"
        />
      </div>
      <div className="search-filter">
        <label htmlFor="search">제목 검색:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          placeholder="제목을 입력하세요"
        />
      </div>
      <ul className="post-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <li key={index} onClick={() => handlePostClick(post)}>
              <h3>{post.title}</h3>
              <p>{post.date}</p>
              <p>{post.content}</p>
              <p>조회수: {post.views}</p>
              <p>작성자: {post.author}</p>
            </li>
          ))
        ) : (
          <li>게시글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default QnABoard;
