import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OneToOne.css";

const OneToOne = ({ addPost }) => {
  const [formData, setFormData] = useState({
    category: "",
    author: "",
    password: "",
    title: "",
    content: "",
    file: null,
    captchaInput: "",
    agree: false,
  });

  const [fileName, setFileName] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [fileUrl, setFileUrl] = useState(null);
  const navigate = useNavigate();

  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
  }

  const handleChange = (e) => {
    const { name, value, files, checked, type } = e.target;

    if (name === "file" && files) {
      setFileName(files[0].name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.captchaInput !== captcha) {
      alert("자동등록방지 문자가 일치하지 않습니다.");
      setCaptcha(generateCaptcha());
      return;
    }

    if (!formData.agree) {
      alert("개인정보 수집 및 이용에 동의해야 글을 작성할 수 있습니다.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: `${formData.category} : ${formData.title}`,
      date: new Date().toISOString().split("T")[0],
      content: formData.content,
      author: formData.author || "익명",
      views: 0,
      fileUrl,
      type: "OneToOne", // 타입 지정
    };

    addPost(newPost); // 부모 컴포넌트의 addPost 함수 호출

    alert("글이 성공적으로 등록되었습니다!");
    setFormData({
      category: "",
      author: "",
      password: "",
      title: "",
      content: "",
      file: null,
      captchaInput: "",
      agree: false,
    });
    setFileName("");
    setCaptcha(generateCaptcha());

    navigate("/onetooneboard");
  };

  return (
    <div className="one-to-one-page">
      <h1>1대1 상담 글쓰기</h1>
      <form onSubmit={handleSubmit} className="write-form">
        {/* 폼 필드들 */}
        <label className="label-category">
          말머리:
          <select
            className="ontooneselect"
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

        <label className="label-author">
          작성자:
          <input
            className="inputer"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="이름을 입력하세요."
            required
          />
        </label>

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

        <label className="label-title">
          제목:
          <input
            type="text"
            name="title"
            className="inputer"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요."
            required
          />
        </label>

        <label className="label-content">
          본문:
          <textarea
            className="qna-textarea"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="문의 내용을 입력하세요."
            rows="5"
            required
          />
        </label>

        <label className="label-file">
          첨부파일:
          <input
            className="inputer"
            type="file"
            name="file"
            onChange={handleChange}
          />
          {fileName && <div className="file-name">첨부된 파일: {fileName}</div>}
        </label>

        <label className="label-captcha">
          <br />
          <br />
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
            className="inputer"
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            placeholder="자동등록방지 문자를 입력하세요."
            required
          />
        </label>

        <div className="privacy-agreement">
          <p>
            회사는 비회원의 게시글 등록 시 콘텐츠 등록 및 고객 문의 응대 등을
            원활하게 진행하기 위해 아래와 같은 개인정보를 수집하고 있습니다.
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

        <button type="submit" className="submit-button">
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default OneToOne;
