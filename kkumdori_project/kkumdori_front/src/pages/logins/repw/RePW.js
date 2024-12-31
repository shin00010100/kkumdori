import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./RePW.css";

export default function RePW() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true); // 비밀번호 유효성 상태 추가

  const navigate = useNavigate();

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    // 비밀번호 확인란에 입력 시 즉시 검사
    if (confirmPasswordValue !== newPassword) {
      setIsPasswordMismatch(true);
    } else {
      setIsPasswordMismatch(false);
    }

    if (validatePassword(newPassword)) {
      setIsPasswordValid(true);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=~`'"{};:,.<>?]).{6,20}$/;
    return regex.test(password);
  };


  const handleResetPassword = async () => {
    const token = sessionStorage.getItem("resetToken");

if (!token) {
  alert("유효한 토큰이 없습니다.");
  navigate("/main");
  return;
}
  
    if (newPassword === confirmPassword) {
      if (validatePassword(newPassword)) {
        try {
          const resetRequest = {
            newPassword: newPassword, // 새 비밀번호
            token: token // resetToken 또는 jwt 토큰
          };
  
          const response = await fetch("http://localhost:8090/api/auth/resetPassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(resetRequest),
          });
  
          if (response.ok) {
            alert("비밀번호가 성공적으로 재설정되었습니다.");
            sessionStorage.removeItem("resetToken");
            navigate("/main");
          } else {
            alert("비밀번호 재설정에 실패했습니다.");
          }
        } catch (error) {
          console.error("비밀번호 재설정 중 오류 발생:", error);
          alert("서버와의 연결에 문제가 발생했습니다.");
        }
      } else {
        setIsPasswordValid(false);
      }
    } else {
      setIsPasswordMismatch(true);
    }
  };

  return (
    <div className="repwsearch-body-page">
      <div className="repwsearchpage">
        {/* 아이디 찾기 관련 링크 */}
        <div className="loginfindrepw">
          <Link to="/pwsearch">이전 화면으로</Link>
        </div>

        {/* Title Wrap */}
        <div className="titleWraprepw">비밀번호 재설정</div>

        {/* 비밀번호 재설정 영역 */}
        <div className="kkumdoriImages-sign">
          <img src="/img/kkummark.jpg" alt="kkummark" />
          <span>비밀번호 재설정</span>
        </div>

        <div className="contentWraprepw">
          {/* 새 비밀번호 입력 영역 */}
          <div className="inputGroup-repw">
            <div className="contentRow-repw">
              <div className="contentNum-repw">새 비밀번호</div>
              <input
                className="input-field3-sign"
                type="password"
                placeholder="영문/숫자/특수문자 포함 6~20글자"
                maxLength="20"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>

            {/* 비밀번호 확인 입력 영역 */}
            <div className="contentRow-repw">
              <div className="contentNum-repw">비밀번호 확인</div>
              <input
                className="input-field3-sign"
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {/* 비밀번호 일치하지 않을 때 빨간 글씨로 오류 메시지 */}
              {isPasswordMismatch && (
                <div className="repw-error-message" style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
              {/* 비밀번호 유효성 검사 실패 시 오류 메시지 */}
              {!isPasswordValid && newPassword && (
                <div className="repw-error-message" style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                  비밀번호는 영문, 숫자, 특수문자가 각각 1개 이상 포함되어야 하고, 6~20자여야 합니다.
                </div>
              )}
            </div>

            {/* 비밀번호 재설정 버튼 */}
            <div className="contentRow-repw rightAlign-repw">
              <button className="repw-btn" onClick={handleResetPassword}>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
