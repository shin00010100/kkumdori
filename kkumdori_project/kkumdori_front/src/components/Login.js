import React, { useState } from "react";
import HorizonLine from "../utils/HorizontalLine.js";
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom'; // useNavigate로 변경

export default function Login() {
  const [id, setId] = useState(""); // 아이디 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [error, setError] = useState(""); // 오류 메시지 상태
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  // 아이디 변경 시 오류 메시지 초기화
  const handleIdChange = (e) => {
    setId(e.target.value);
    setError(""); // 아이디 변경 시 오류 메시지 초기화
  };

  // 비밀번호 변경 시 오류 메시지 초기화
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // 비밀번호 변경 시 오류 메시지 초기화
  };

  // 로그인 버튼 클릭 시 호출되는 함수
  const handleLogin = () => {
    // 임시로 하드코딩된 아이디와 비밀번호
    const validId = "testuser";
    const validPassword = "password123!";
  
    if (!id && !password) {
      setError("아이디와 비밀번호를 모두 입력해 주세요.");
    } else if (!id) {
      setError("아이디를 입력해 주세요.");
    } else if (!password) {
      setError("비밀번호를 입력해 주세요.");
    } else if (id === validId && password === validPassword) {
      // 로그인 성공
      alert("로그인에 성공하였습니다.");
      navigate("/main"); // 로그인 성공 후 대시보드로 이동
    } else {
      // 로그인 실패
      setError("아이디 또는 비밀번호가 잘못 되었습니다.\n아이디와 비밀번호를 정확히 입력해 주세요.");
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="Login-body-page">
      <div className="Loginpage">
        {/* Title Wrap */}
        <div className="titleWrap-login">
          Login
        </div>

        {/* 이메일 입력 */}
        <div className="contentWrap-login">
          <div className="inputTitle-login"></div>
          <div className="inputWrap-login">
            <input 
              className="inputid-login" 
              type="text" 
              placeholder="아이디" 
              value={id}
              onChange={handleIdChange}  // 아이디 입력 시 오류 메시지 초기화
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* 비밀번호 입력 */}
        <div className="contentWrap-login">
          <div className="inputTitle-login"></div>
          <div className="inputWrap-login">
            <input 
              className="inputpw-login" 
              type="password" 
              placeholder="비밀번호" 
              value={password}
              onChange={handlePasswordChange}  // 비밀번호 입력 시 오류 메시지 초기화
              onKeyDown={handleKeyDown} // 엔터키 감지
            />
          </div>
        </div>

        {/* 오류 메시지: 비밀번호 입력란 아래에 위치 */}
        {error && <div className="errorMessageWrap"><div>{error}</div></div>}

        {/* 로그인 버튼 클릭 시 handleLogin 함수 실행 */}
        <br></br>
        <div className="loginbtn">
          <button className="loginbtn-button" onClick={handleLogin}>
            로그인
          </button>
        </div>

        {/* 아이디/비밀번호 찾기 및 회원가입 링크 */}
        <div className="loginfind">
          <Link to="/idsearch">아이디 찾기</Link> | <Link to="/pwsearch">비밀번호 찾기</Link> | <Link to="/sign">회원가입</Link>
        </div>

        {/* 수평선 */}
        <div className="horizonline">
          <HorizonLine text="또는" />
        </div>

        {/* 소셜 로그인 이미지 */}
        <div className="socialImages">
          <img src="/img/kakao.png" />
          <img src="/img/google.png" />
          <img src="/img/naver.png"/>
        </div>
      </div>
    </div>
  );
}
