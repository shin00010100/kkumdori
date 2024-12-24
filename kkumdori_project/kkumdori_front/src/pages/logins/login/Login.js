import React, { useState } from "react";
import HorizonLine from "../../../utils/HorizontalLine.js";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../../../utils/AuthContext.js"; 

export default function Login() {
  const [id, setId] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 
  const { setIsAuth, setUser } = useAuth(); 

  // 아이디 변경 시 오류 메시지 초기화
  const handleIdChange = (e) => {
    setId(e.target.value);
    setError(""); 
  };

  // 비밀번호 변경 시 오류 메시지 초기화
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); 
  };

  // 입력값 검증 함수
  const validateInputs = () => {
    if (!id && !password) return "아이디와 비밀번호를 모두 입력해 주세요.";
    if (!id) return "아이디를 입력해 주세요.";
    if (!password) return "비밀번호를 입력해 주세요.";
    return null;
  };

  // 로그인 처리 함수
  const handleLogin = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      const response = await fetch("http://localhost:8090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: id, password: password }),
      });

      if (response.ok) {
        const data = await response.json();

        // 로그인 성공 시 JWT 토큰을 로컬스토리지에 저장
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify({ fullname: data.fullname, role: data.role }));

        // AuthContext 상태 업데이트
        setIsAuth(true); // 인증 상태를 true로 설정
        setUser({ fullname: data.fullname, role: data.role }); // 사용자 정보 설정

        alert("로그인에 성공하였습니다.");
        navigate("/main"); // 로그인 후 대시보드로 이동
      } else {
        setError("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      setError("로그인 실패. 다시 시도해 주세요.");
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
        <div className="titleWrap-login">Login</div>

        <div className="contentWrap-login">
          <div className="inputWrap-login">
            <input
              className="inputid-login"
              type="text"
              placeholder="아이디"
              value={id}
              onChange={handleIdChange}
              onKeyDown={handleKeyDown} 
              autoFocus
            />
          </div>
        </div>

        <div className="contentWrap-login">
          <div className="inputWrap-login">
            <input
              className="inputpw-login"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown} 
            />
          </div>
        </div>

        {error && <div className="errorMessageWrap"><div>{error}</div></div>}

        <div className="loginbtn">
          <button className="loginbtn-button" onClick={handleLogin}>
            로그인
          </button>
        </div>

        <div className="loginfind">
          <Link to="/idsearch">아이디 찾기</Link> | <Link to="/pwsearch">비밀번호 찾기</Link> | <Link to="/sign">회원가입</Link>
        </div>

        <div className="horizonline">
          <HorizonLine text="또는" />
        </div>

        <div className="socialImages">
          <img src="/img/kakao.png" alt="Kakao" />
          <img src="/img/google.png" alt="Google" />
          <img src="/img/naver.png" alt="Naver"/>
        </div>
      </div>
    </div>
  );
}
