import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Notice.css";

const Notice = ({ addPost }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  // 폼 데이터 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // JSON 객체 생성
    const postData = {
      title: formData.title,
      content: formData.content,
      author: 1, // author 값을 무조건 1로 설정
    };

    console.log("Sending post data:", postData);

    try {
      // axios를 사용해 백엔드로 데이터 전송
      const response = await axios.post("http://localhost:8090/notice/notice", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("공지사항이 성공적으로 등록되었습니다!");
        addPost(response.data); // 새 공지사항 데이터를 상태에 추가
        // 폼 초기화
        setFormData({
          title: "",
          content: "",
        });
        navigate("/noticeboard");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("공지사항 작성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <div className="notice-page">
      <h1>공지사항 작성</h1>
      <form onSubmit={handleSubmit} className="write-form">
        {/* 제목 */}
        <label className="label-title">
          제목:
          <input
            type="text"
            name="title"
            className="inputer"
            value={formData.title}
            onChange={handleChange}
            placeholder="공지사항 제목을 입력하세요."
            required
          />
        </label>

        {/* 본문 */}
        <label className="label-content">
          본문:
          <textarea
            className="notice-textarea"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="공지사항 내용을 입력하세요."
            rows="5"
            required
          />
        </label>

        {/* 제출 버튼 */}
        <button type="submit" className="submit-button">
          공지사항 등록
        </button>
      </form>
    </div>
  );
};

export default Notice;
