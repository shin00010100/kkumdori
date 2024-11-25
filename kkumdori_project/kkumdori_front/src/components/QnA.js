import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QnA.css';

const QnA = ({ addPost }) => {
  const [formData, setFormData] = useState({
    category: '',
    author: '',
    title: '',
    content: '',
    file: null,
    captchaInput: '',
    agree: false,
  });

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const navigate = useNavigate();

  function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  }

  const handleChange = (e) => {
    const { name, value, files, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.captchaInput !== captcha) {
      alert('자동등록방지 문자가 일치하지 않습니다.');
      setCaptcha(generateCaptcha());
      return;
    }

    if (!formData.agree) {
      alert('개인정보 수집 및 이용에 동의해야 질문을 작성할 수 있습니다.');
      return;
    }

    const newPost = {
      title: formData.title,
      date: new Date().toISOString().split('T')[0],
      content: formData.content,
      views: 0,
      author: formData.author,
      category: formData.category,
      file: formData.file, // 파일 데이터 추가
    };

    addPost(newPost); // 부모에서 받은 addPost를 호출하여 게시글 추가
    navigate('/qnaboard'); // QnABoard 페이지로 이동

    setFormData({
      category: '',
      author: '',
      title: '',
      content: '',
      file: null,
      captchaInput: '',
      agree: false,
    });
    setCaptcha(generateCaptcha());
  };

  return (
    <div className="qna-page">
      <h1>Q&A 질문 작성</h1>
      <form onSubmit={handleSubmit} className="write-form">
        {/* 카테고리 */}
        <label className="label-category">
          카테고리:
          <select
            className='qna-select'
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">선택하세요</option>
            <option value="문의">문의</option>
            <option value="요청">요청</option>
            <option value="불만">불만</option>
          </select>
        </label>

        {/* 작성자 */}
        <br/><br/>
        <label className="label-author">
          작성자:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="이름을 입력하세요."
            required
          />
        </label>

        {/* 비밀번호 */}
        <br/><br/>
        <label className="label-password">
          비밀번호:
          <input 
            type="password"
            name="password"
            className="inputer"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요."
            required
          />
        </label>

        {/* 제목 */}
        <br/><br/>
        <label className="label-title">
          제목:
          <input
            type="text"
            name="title"
            className="inputer"
            value={formData.title}
            onChange={handleChange}
            placeholder="질문의 제목을 입력하세요."
            required
          />
        </label>

        {/* 본문 */}
        <br/><br/>
        <label className="label-content">
          본문:<br/>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="질문 내용을 입력하세요."
            rows="5"
            required
          /><br/>
        </label>

        {/* 첨부파일 */}
        <label className="label-file">
          첨부파일:
          <input
            className="inputer"
            type="file"
            name="file"
            onChange={handleChange}
          />
        </label>

        {/* CAPTCHA */}
        <br/><br/>
        <label className="label-captcha">
          자동등록방지:
          <div className="captcha-container">
            <span className="captcha">{captcha}</span>
            <button
              type="button"
              className="refresh-captcha"
              onClick={() => setCaptcha(generateCaptcha())}
            >
              새로고침
            </button>
          </div>
          <input 
            type="text" 
            className='inputer'
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            placeholder="자동등록방지 문자를 입력하세요."
            required
          />
        </label>

        {/* 개인정보 수집 동의 */}
        <div className="privacy-agreement">
          <p>
            회사는 비회원의 게시글 등록 시 콘텐츠 등록 및 고객 문의 응대 등을 원활하게 진행하기 위해 아래와 같은 개인정보를 수집하고 있습니다.
          </p>
          <ul>
            <li>수집항목: 이름, 비밀번호, 닉네임, 휴대폰번호, 이메일, IP</li>
            <li>수집/이용목적: 게시글 접수 및 결과 회신</li>
            <li>이용기간: 개인정보 수집 및 이용목적 달성 시 까지</li>
          </ul>
          <label className="agree-checkbox">
            <input
              className="inputer"
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            개인정보 수집 및 이용에 동의합니다.
          </label>
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className="submit-button">질문 작성 완료</button>
      </form>
    </div>
  );
};

export default QnA;
