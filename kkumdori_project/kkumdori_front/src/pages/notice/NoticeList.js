import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NoticeList.css';

const NoticeList = ({ notices, currentPage, itemsPerPage }) => {
  const navigate = useNavigate();

  if (notices.length === 0) {
    return <p>공지사항이 없습니다.</p>;
  }

  return (
    <div>
      <p>총 {notices.length}개의 공지사항이 있습니다.</p>
      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice, index) => (
            <tr key={notice.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td
                className="notice-link"
                onClick={() => navigate(`/notice/${notice.id}`)}  // 클릭 시 해당 공지사항의 상세 페이지로 이동
              >
                {notice.title}
              </td>
              <td>{notice.author}</td>
              <td>{notice.views}</td>
              <td>{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeList;
