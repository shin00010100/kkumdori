import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./QnAView.css";

const QnAView = () => {
  const { state } = useLocation(); // URL에서 전달된 state 데이터 받기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  // 만약 state가 없다면, 잘못된 접근을 했다고 알리기
  if (!state) {
    return <div>잘못된 접근입니다.</div>;
  }

  const { category, author, title, content, file } = state; // state에서 필요한 데이터 구조화

  return (
    <div className="qna-view">
      <h1>작성한 질문 보기</h1>
      <div className="question-details">
        <p><strong>카테고리:</strong> {category}</p>
        <p><strong>작성자:</strong> {author}</p>
        <p><strong>제목:</strong> {title}</p>
        <p><strong>본문:</strong> {content}</p>
        {file && (
          <div className="file-preview">
            <strong>첨부파일:</strong>
            <img src={URL.createObjectURL(file)} alt="첨부파일" className="attached-image" />
          </div>
        )}
      </div>
      <div className="buttons">
        <button onClick={() => navigate('/qnaboard')} className="back-button">
          게시판으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default QnAView;
