import React, { useState, useEffect } from "react";
import HorizonLine from "../../../utils/HorizontalLine.js";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/AuthContext.js";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // 자동 로그인 체크박스 상태
  const navigate = useNavigate();
  const { setIsAuth, setUser } = useAuth();

  const handleGoogleLoginClick = () => {
    window.google.accounts.id.initialize({
      client_id: "7747546491-3j85b2eb2548vf2d3p8kri9t83obfrii.apps.googleusercontent.com",  // 구글 클라이언트 ID 입력
      callback: (response) => {
        const googleAccessToken = response.credential;
        fetch("http://localhost:8090/api/auth/login/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: googleAccessToken }),
        })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("currentUser", JSON.stringify({
            fullname: data.fullname,
            role: data.role,
          })); // 사용자 정보 저장
          setIsAuth(true);
          setUser({ fullname: data.fullname, role: data.role });
          alert("구글 로그인에 성공하였습니다.");
          navigate("/main");
        })
        .catch((err) => {
          console.error("구글 로그인 중 에러 발생:", err);
          setError("구글 로그인 중 문제가 발생했습니다.");
        });
      },
    });
    
    window.google.accounts.id.prompt();  // 로그인 프롬프트 표시
  };

  // 카카오 로그인 함수
  const handleKakaoLogin = async () => {
    try {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("e05c72e34a97a05070985a9422b9542f"); // 카카오 앱 키 입력
      }

      window.Kakao.Auth.login({
        success: async (authObj) => {
          const kakaoAccessToken = authObj.access_token;

          // 카카오톡 로그인 후 받아온 access_token을 백엔드에 전달
          const response = await fetch("http://localhost:8090/api/auth/login/kakao", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: kakaoAccessToken }), // 카카오 access_token 전달
          });

          if (response.ok) {
            const data = await response.json();
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem("jwt", data.token);
            storage.setItem("currentUser", JSON.stringify({
              fullname: data.fullname,
              role: data.role,
            })); // 사용자 정보 저장

            setIsAuth(true);
            setUser({ fullname: data.fullname, role: data.role });

            Object.keys(localStorage).forEach((key) => {
              if (key.includes("kakao")) {
                localStorage.removeItem(key); // "kakao"가 들어간 키를 제거
              }
            });

            alert("카카오톡 로그인에 성공하였습니다.");
            navigate("/main");
          } else {
            setError("카카오톡 로그인 실패");
          }
        },
        fail: (err) => {
          console.error("카카오 로그인 실패", err);
          setError("카카오 로그인 실패");
        },
      });
    } catch (err) {
      console.error("카카오 로그인 중 에러 발생:", err);
      setError("카카오 로그인 중 문제가 발생했습니다.");
    }
  };

  // 네이버 로그인 함수
  const handleNaverLogin = async () => {
    try {
      const naverLoginUrl = "https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=G8xSn1hL4ylD1f0cVlPS&redirect_uri=http://localhost:3000/naver-callback";
      // 네이버 로그인 페이지로 리디렉션
      window.location.href = naverLoginUrl;
    } catch (err) {
      console.error("네이버 로그인 중 에러 발생:", err);
      setError("네이버 로그인 중 문제가 발생했습니다.");
    }
  };

  // 기존 로그인 처리 함수
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
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("jwt", data.token);
        storage.setItem("currentUser", JSON.stringify({
          fullname: data.fullname,
          role: data.role,
        })); // 사용자 정보 저장

        setIsAuth(true);
        setUser({ fullname: data.fullname, role: data.role });

        alert("로그인에 성공하였습니다.");
        navigate("/main");
      } else {
        setError("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setError("로그인 실패. 다시 시도해 주세요.");
    }
  };

  const validateInputs = () => {
    if (!id && !password) return "아이디와 비밀번호를 모두 입력해 주세요.";
    if (!id) return "아이디를 입력해 주세요.";
    if (!password) return "비밀번호를 입력해 주세요.";
    return null;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("e05c72e34a97a05070985a9422b9542f");
    }
  }, []);

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
              onChange={(e) => setId(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="rememberMeWrap">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">로그인 상태 유지</label>
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
          <img
            src="/img/kakao.png"
            alt="Kakao"
            onClick={handleKakaoLogin}
            style={{ cursor: "pointer" }}
          />
          <img
            src="/img/google.png"
            alt="Google"
            onClick={handleGoogleLoginClick}
            style={{ cursor: "pointer" }}
          />
          <img
            src="/img/naver.png"
            alt="Naver"
            onClick={handleNaverLogin}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
