import React, { useState } from 'react';
import './OneToOneAdmin.css';

const OneToOneAdmin = () => {
  const [answer, setAnswer] = useState({
    author: '',
    date: '',
    content: '',
  });

  const [answerInput, setAnswerInput] = useState('');

  const question = {
    title: '예시 질문 제목',
    author: '질문자 홍길동',
    date: '2024-11-12',
    content: '이곳에 질문 내용을 입력합니다.',
  };

  // 답변하기 버튼 클릭 시 답변 추가
  const handleAnswerSubmit = () => {
    if (answerInput.trim() === '') {
      alert('답변 내용을 입력해주세요.');
      return;
    }
    setAnswer({
      author: '관리자',
      date: new Date().toISOString().split('T')[0],
      content: answerInput,
    });
    setAnswerInput('');
  };

  return (
    <div className="one-to-one-page">
      <h1>1대1 상담 답변하기</h1>

      {/* 질문 정보 */}
      <div className="question-section">
        <h2>질문 정보</h2>
        <p><strong>제목:</strong> {question.title}</p>
        <p><strong>질문자:</strong> {question.author}</p>
        <p><strong>작성 날짜:</strong> {question.date}</p>
        <p><strong>질문 내용:</strong></p>
        <div className="question-content">{question.content}</div>
      </div>

      {/* 답변 정보 */}
      <div className="answer-section">
        <h2>답변</h2>
        {answer.content ? (
          <div>
            <p><strong>답변자:</strong> {answer.author}</p>
            <p><strong>작성 날짜:</strong> {answer.date}</p>
            <p><strong>답변 내용:</strong></p>
            <div className="answer-content">{answer.content}</div>
          </div>
        ) : (
          <p className="no-answer">답변이 아직 없습니다.</p>
        )}
      </div>

      {/* 답변하기 */}
      <div className="answer-form">
        <h2>답변 작성</h2>
        <textarea
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
          placeholder="답변 내용을 입력하세요."
          rows="5"
        />
        <button className="submit-answer-button" onClick={handleAnswerSubmit}>
          답변하기
        </button>
      </div>
    </div>
  );
};

export default OneToOneAdmin;
