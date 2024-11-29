import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import initialNotices from '../data/initialNotices'; // 데이터 파일에서 임포트
import './NoticeDetail.css';

const NoticeDetail = () => {
  const { id } = useParams(); // 공지사항 ID 가져오기
  const navigate = useNavigate();
  const notice = initialNotices.find((notice) => notice.id === parseInt(id)); // 공지사항 찾기

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="notice-detail-container">
      <h1 className="notice-title">{notice.title}</h1>
      <p className="notice-date">작성 날짜: {notice.date}</p>
      <div className="notice-content">{notice.content}</div>
      <div className="notice-buttons">
        <button onClick={() => navigate('/notice')} className="list-button">
          목록
        </button>
        <button
          onClick={() => navigate(`/notice/edit/${notice.id}`)}  // 수정 페이지로 이동
          className="edit-button"
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default NoticeDetail;
