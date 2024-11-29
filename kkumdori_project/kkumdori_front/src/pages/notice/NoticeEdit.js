import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './NoticeEdit.css';

const NoticeEdit = ({ notices, setNotices }) => {
  const { id } = useParams(); // 공지사항 ID 가져오기
  const navigate = useNavigate();

  const [notice, setNotice] = useState(null); // 공지사항 상태 초기화
  const [title, setTitle] = useState(""); // 제목 상태 초기화
  const [content, setContent] = useState(""); // 내용 상태 초기화
  const [loading, setLoading] = useState(true); // 로딩 상태 초기화

  useEffect(() => {
    const foundNotice = notices.find((notice) => notice.id === parseInt(id));
    if (foundNotice) {
      setNotice(foundNotice); // 찾은 공지사항을 상태에 설정
      setTitle(foundNotice.title); // 제목 상태 초기화
      setContent(foundNotice.content); // 내용 상태 초기화
      setLoading(false); // 로딩 상태 종료
    } else {
      // 공지사항이 없을 경우 처리
      console.error("해당 ID의 공지사항을 찾을 수 없습니다.");
      navigate('/'); // 공지사항이 없으면 목록 페이지로 리디렉션
    }
  }, [id, notices, navigate]);

  // 로딩 중이거나 공지사항이 없을 때 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!notice) {
    return <div>해당 공지사항을 찾을 수 없습니다.</div>;
  }

  const handleSave = () => {
    // 공지사항 데이터 업데이트
    const updatedNotices = notices.map((n) =>
      n.id === notice.id ? { ...n, title, content } : n
    );
    setNotices(updatedNotices); // 상태 업데이트

    // 수정 완료 후 해당 공지사항 페이지로 이동
    navigate(`/notice/${notice.id}`);
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 수정하지 않고 상세 페이지로 돌아감
    navigate(`/notice/${notice.id}`);
  };

  return (
    <div className="notice-edit-container">
      <h1>공지사항 수정</h1>
      <div>
        <label>제목:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>내용:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="notice-edit-buttons">
        <button onClick={handleCancel} className="cancel-button">
          취소
        </button>
        <button onClick={handleSave} className="save-button">
          저장
        </button>
      </div>
    </div>
  );
};

export default NoticeEdit;
