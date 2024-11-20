import React, { useState } from "react";
import "./IDSearch.css";
import { Link } from "react-router-dom";
import HorizonLine from "../../../utils/HorizontalLine";

export default function IDSearch() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [name, setName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [foundId, setFoundId] = useState("");

  // 인증번호 생성 함수
  const generateVerificationCode = () => {
    const code = Math.random().toString(36).substr(2, 8).toUpperCase(); 
    return code;
  };

  const handlePhoneNumberChange = (e) => {
    // 숫자만 허용
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자 외의 문자를 모두 제거
    setPhoneNumber(value);
  };
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneVerificationCodeChange = (e) => setPhoneVerificationCode(e.target.value);
  const handleEmailVerificationCodeChange = (e) => setEmailVerificationCode(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleSendVerificationCode = (type) => {
    if (type === "phone") {
      if (!name || !phoneNumber) {
        alert("이름, 등록한 휴대폰 번호를 모두 입력해 주세요.");
      } else {
        const code = generateVerificationCode();  
        alert(`인증번호가 전송되었습니다. 인증번호: ${code}`);
      }
    } else if (type === "email") {
      if (!email) {
        alert("이메일을 입력해 주세요.");
      } else {
        const code = generateVerificationCode();  
        alert(`인증번호가 전송되었습니다. 인증번호: ${code}`);
      }
    }
  };

  const handleCheckPhoneVerificationCode = () => {
    if (!phoneVerificationCode) {
      alert("아이디, 휴대폰 번호를 모두 입력한 후 인증번호를 전송해주세요.");
    } else {
      const foundUserId = "testuser";
      setFoundId(foundUserId);
      setIsVerified(true);
      alert(`휴대폰 인증번호가 확인되었습니다.`);
    }
  };

  const handleCheckEmailVerificationCode = () => {
    if (!emailVerificationCode) {
      alert("이메일을 입력한 후 인증번호를 전송해주세요.");
    } else {
      const foundUserId = "testuser";
      setFoundId(foundUserId);
      setIsVerified(true);
      alert(`이메일 인증번호가 확인되었습니다.`);
    }
  };

  return (
    <div className="idsearch-body-page">
      <div className="idsearchpage">
        <div className="loginfindid">
          <Link to="/login">이전 화면으로</Link> | <Link to="/pwsearch">비밀번호 찾기</Link>
        </div>
        <div className="titleWrapid">아이디 찾기</div>

        <div className="kkumdoriImages-sign">
        <img src="/img/kkummark.jpg" alt="kkummark" />
          <span>휴대폰 번호로 찾기</span>
        </div>

        <div className="contentWrapid">
          <div className="inputGroup-id">
            <div className="contentRow-id">
              <div className="contentNum-id">이름</div>
              <input
                className="input-field2-sign"
                type="text"
                maxLength="10"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div className="divider"></div>

            <div className="contentRow-id">
              <div className="contentNum-id">등록한 휴대폰 번호</div>
              <input
                className="input-field2-sign"
                type="text"
                maxLength="11"
                placeholder="'-' 는 제외하고 적어주세요"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}  // 수정된 핸들러 사용
              />
              <button className="sendNum-id" onClick={() => handleSendVerificationCode("phone")}>
                인증번호 전송
              </button>
            </div>

            <div className="contentRow-id rightAlign-id">
              <label className="contentNum-id leftAlign-id">인증번호 입력</label>
              <br />
              <input
                type="text"
                className="input-field2-sign"
                maxLength="15"
                placeholder="휴대폰 인증번호를 입력해주세요"
                value={phoneVerificationCode}
                onChange={handlePhoneVerificationCodeChange}
              />
              <button className="check-id" onClick={handleCheckPhoneVerificationCode}>
                확인
              </button>
            </div>
          </div>
        </div>

        <HorizonLine text="또는" />

        <div className="kkumdoriImages-sign">
          <img src="/img/kkummark.jpg" alt="kkummark" />
          <span>가입된 이메일로 찾기</span>
        </div>

        <div className="contentWrapid">
          <div className="inputGroup-id">
            <div className="contentRow-id">
              <label className="contentNum-id">가입하신 이메일 주소를 입력해 주세요</label>
              <br />
              <input
                type="text"
                className="input-field2-sign"
                maxLength="50"
                placeholder="ex) qwer123"
                value={email}
                onChange={handleEmailChange}
              />
              @
              <select className="idsearch_email_select">
                <option value="이메일 선택">이메일 선택</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="hanmail.com">hanmail.com</option>
                <option value="nate.com">nate.com</option>
              </select>
              <button className="sendNum-id" onClick={() => handleSendVerificationCode("email")}>
                인증번호 전송
              </button>
            </div>

            <div className="contentRow-id rightAlign-id">
              <label className="contentNum-id leftAlign-id">인증번호 입력</label>
              <br />
              <input
                type="text"
                className="input-field2-sign"
                maxLength="15"
                placeholder="이메일 인증번호를 입력해주세요"
                value={emailVerificationCode}
                onChange={handleEmailVerificationCodeChange}
              />
              <button className="check-id" onClick={handleCheckEmailVerificationCode}>
                확인
              </button>
            </div>
          </div>
        </div>

        {isVerified && foundId && (
          <div className="id-popup">
            <div className="id-popup-content">
              <p>당신의 아이디는 <strong>{foundId}</strong> 입니다.</p>
              <button onClick={() => setIsVerified(false)}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
