import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OneToOne.css";

const OneToOne = ({ addPost }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userNo: "", // 사용자 번호
    captchaInput: "",
    agree: false,
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [isAuth, setIsAuth] = useState(true);  // 로그인 상태
  const navigate = useNavigate();

  // CAPTCHA 생성 함수
  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
  }

  // fetchUserData 함수 정의 (useCallback 사용)
  const fetchUserData = useCallback(async () => {
    let token = sessionStorage.getItem("jwt");  // 세션에서 먼저 확인
    if (!token) {
      token = localStorage.getItem("jwt");  // 세션에 없으면 로컬스토리지에서 가져오기
    }

    if (!token) {
      console.log("로그인 정보가 없습니다."); // 로그인 정보가 없으면 콘솔에 출력
      setIsAuth(false);  // 로그인 상태를 false로 업데이트
      navigate("/login"); // 로그인 페이지로 리디렉션
      return;
    }

    try {
      const response = await axios.get("http://localhost:8090/api/auth/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 사용자 번호만 추출하여 formData에 설정
      const userNo = response.data.userNo;
      setFormData((prevData) => ({
        ...prevData,
        userNo: userNo, // 사용자 번호를 폼 데이터에 설정
      }));
    } catch (error) {
      console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
      alert("사용자 정보를 가져오는 데 실패했습니다.");
    }
  }, [navigate]);

  // useEffect에서 fetchUserData 호출
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]); // 의존성 배열에 fetchUserData 추가

  // 폼 데이터 핸들러
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // CAPTCHA 확인
    if (formData.captchaInput !== captcha) {
      alert("자동등록방지 문자가 일치하지 않습니다.");
      setCaptcha(generateCaptcha());
      return;
    }

    // 개인정보 동의 확인
    if (!formData.agree) {
      alert("개인정보 수집 및 이용에 동의해야 글을 작성할 수 있습니다.");
      return;
    }

    // JSON 객체 생성
    const postData = {
      title: formData.title,
      content: formData.content,
      userNo: parseInt(formData.userNo), // 사용자 번호는 숫자로 변환
    };

    console.log("Sending post data:", postData);

    try {
      // axios를 사용해 백엔드로 데이터 전송
      const response = await axios.post("http://localhost:8090/onetoone/onetoone", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("글이 성공적으로 등록되었습니다!");
        addPost(response.data); // 새 게시글 데이터를 상태에 추가
        // 폼 초기화
        setFormData({
          title: "",
          content: "",
          userNo: "",
          captchaInput: "",
          agree: false,
        });
        setCaptcha(generateCaptcha());
        navigate("/onetooneboard");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("글 작성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  if (!isAuth) {
    return null; // 로그인 상태가 아니면 아무 것도 렌더링하지 않음
  }

  return (
    <div className="onetoone-page">
      <h1>1대1 문의 글쓰기</h1>
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
            placeholder="제목을 입력하세요."
            required
          />
        </label>

        {/* 본문 */}
        <label className="label-content">
          본문:
          <textarea
            className="onetoone-textarea"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="질문 내용을 입력하세요."
            rows="5"
            required
          />
        </label>

        {/* CAPTCHA */}
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
            className="inputer"
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
        <button type="submit" className="submit-button">
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default OneToOne;
