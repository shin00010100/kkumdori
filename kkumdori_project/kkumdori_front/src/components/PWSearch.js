import "./PWSearch.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HorizonLine from "../utils/HorizontalLine";

// 랜덤 8자리 인증번호 생성 함수
const generateVerificationCode = () => {
  const code = Math.random().toString(36).substr(2, 8).toUpperCase();  // 8자리 랜덤 문자열 생성
  return code;
};

export default function PWSearch() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailPrefix, setEmailPrefix] = useState(""); // 이메일 주소 앞부분
  const [emailDomain, setEmailDomain] = useState(""); // 이메일 도메인
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");  // 휴대폰 인증번호 상태
  const [emailVerificationCode, setEmailVerificationCode] = useState("");  // 이메일 인증번호 상태
  const [generatedPhoneCode, setGeneratedPhoneCode] = useState(""); // 휴대폰 인증번호 저장
  const [generatedEmailCode, setGeneratedEmailCode] = useState(""); // 이메일 인증번호 저장

  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false); // 휴대폰 인증번호 전송 여부
  const [emailVerificationSent, setEmailVerificationSent] = useState(false); // 이메일 인증번호 전송 여부
  const [idInput, setIdInput] = useState("");  // 아이디 상태
  const [nameInput, setNameInput] = useState("");  // 이름 상태

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 아이디 입력 핸들러
  const handleIdInputChange = (e) => {
    setIdInput(e.target.value);
  };

  // 이름 입력 핸들러
  const handleNameInputChange = (e) => {
    setNameInput(e.target.value);
  };

  // 이메일 입력 및 도메인 선택 핸들러
  const handleEmailPrefixChange = (e) => {
    setEmailPrefix(e.target.value);
  };

  const handleEmailDomainChange = (e) => {
    setEmailDomain(e.target.value);
  };

  // 휴대폰 번호 입력 핸들러 (수정된 부분)
  const handlePhoneNumberChange = (e) => {
    // 숫자만 허용 (정규식을 이용하여 숫자만 남김)
    const value = e.target.value.replace(/[^0-9]/g, "");  // 숫자 외의 문자를 모두 제거
    setPhoneNumber(value);
  };

  // 인증번호 입력 핸들러 (휴대폰용)
  const handlePhoneVerificationCodeChange = (e) => {
    setPhoneVerificationCode(e.target.value);
  };

  // 인증번호 입력 핸들러 (이메일용)
  const handleEmailVerificationCodeChange = (e) => {
    setEmailVerificationCode(e.target.value);
  };

  // 휴대폰 번호 인증번호 전송 핸들러
  const handleSendPhoneNumberVerificationCode = () => {
    // 아이디, 이름, 전화번호 입력 체크
    if (idInput === "" || nameInput === "" || phoneNumber === "") {
      alert("아이디, 이름, 휴대폰 번호를 모두 입력해주세요.");
      return;
    }

    const code = generateVerificationCode();
    alert(`휴대폰 번호로 인증번호가 전송되었습니다. 인증번호: ${code}`);
    setGeneratedPhoneCode(code);  // 생성된 인증번호 저장
    setPhoneVerificationSent(true); // 인증번호 전송 상태 업데이트
  };

  // 이메일 인증번호 전송 핸들러
  const handleSendVerificationCode = async () => {
    // 아이디, 이메일 입력 체크
    if (idInput === "" || emailPrefix === "" || emailDomain === "") {
      alert("아이디와 이메일을 모두 입력해주세요.");
      return;
    }

    const email = emailPrefix + "@" + emailDomain; // 이메일 주소 결합
    const code = generateVerificationCode();
    setGeneratedEmailCode(code);  // 생성된 인증번호 저장
    setEmailVerificationSent(true); // 인증번호 전송 상태 업데이트

    alert(`인증번호가 ${email}로 전송되었습니다. 인증번호: ${code}`);
    
    // 인증번호 입력 필드 초기화
    setEmailVerificationCode("");  // 이메일 인증번호 입력 필드 초기화
  };

  const handleCheckPhoneVerificationCode = () => {
    // 인증번호 전송 여부 확인
    if (idInput === "" || nameInput === "") {
      alert("아이디, 이름, 휴대폰 번호를 모두 입력한 후 인증번호를 전송해주세요.");
      return;
    }

    if (!phoneVerificationSent) {
      alert("휴대폰 인증번호를 먼저 전송해주세요.");
      return;
    }

    if (phoneVerificationCode === generatedPhoneCode) {
      alert("휴대폰 인증번호가 확인되었습니다.");
      navigate("/repw"); // 인증번호 확인되면 비밀번호 재설정 페이지로 이동
    } else {
      alert("휴대폰 인증번호가 일치하지 않습니다. 다시 시도해주세요.");
    }
  };

  const handleCheckEmailVerificationCode = () => {
    if (idInput === "" || !emailVerificationSent) {
      alert("아이디, 이메일을 모두 입력한 후 인증번호를 전송해주세요.");
      return;
    }

    if (emailVerificationCode === generatedEmailCode) {
      alert("이메일 인증번호가 확인되었습니다.");
      navigate("/repw"); // 인증번호 확인되면 비밀번호 재설정 페이지로 이동
    } else {
      alert("이메일 인증번호가 일치하지 않습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="pwsearch-body-page">
      <div className="pwsearchpage">
        {/* 아이디 찾기 관련 링크 */}
        <div className="loginfindpw">
          <Link to="/login">이전 화면으로</Link> | <Link to="/idsearch">아이디 찾기</Link>  
          {/* | <Link to="/repw">비밀번호 재설정</Link> */}
        </div>

        {/* Title Wrap */}
        <div className="titleWrappw">비밀번호 찾기</div>

        {/* 휴대폰 번호로 찾기 영역 */}
        <div className="kkumdoriImages-sign">
          <img src="/img/kkummark.jpg" alt="kkummark" />
          <span>휴대폰 번호로 찾기</span>
        </div>

        <div className="contentWrappw">
          <div className="inputGroup-pw">
            {/* 이름과 휴대폰 번호 묶음 */}
            <div className="contentRow-pw">
              <div className="contentNum-pw">아이디</div>
              <input
                className="input-field2-sign"
                maxLength="20"
                type="text"
                placeholder="아이디를 입력해주세요"
                value={idInput}
                onChange={handleIdInputChange}
              />
              <div className="contentNum-pw">이름</div>
              <input
                className="input-field2-sign"
                type="text"
                maxLength="10"
                placeholder="이름을 입력해주세요"
                value={nameInput}
                onChange={handleNameInputChange}
              />
            </div>

            <div className="contentRow-pw">
              <div className="contentNum-pw">등록한 휴대폰 번호</div>
              <input
                className="input-field2-sign"
                type="text"
                maxLength="11"
                placeholder="'-' 는 제외하고 적어주세요"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}  // 수정된 핸들러 사용
              />
              <button className="sendNum-pw" onClick={handleSendPhoneNumberVerificationCode}>
                인증번호 전송
              </button>
            </div>

            <div className="contentRow-pw rightAlign-pw">
              <label className="contentNum-pw leftAlign-pw">인증번호 입력</label><br />
              <input
                type="text"
                className="input-field2-sign"
                placeholder="인증번호를 입력해주세요"
                maxLength="15"
                value={phoneVerificationCode}
                onChange={handlePhoneVerificationCodeChange}
              />
              <button className="check-pw" onClick={handleCheckPhoneVerificationCode}>
                확인
              </button>
            </div>
          </div>
        </div>

        <HorizonLine text="또는" />

        {/* 가입된 이메일로 찾기 영역 */}
        <div className="kkumdoriImages-sign">
          <img src="/img/kkummark.jpg" alt="kkummark" />
          <span>가입된 이메일로 찾기</span>
        </div>

        <div className="contentWrappw">
          <div className="inputGroup-pw">
            {/* 이메일 주소 묶음 */}
            <div className="contentRow-pw">
              <div className="contentNum-pw">아이디</div>
              <input
                className="input-field2-sign"
                type="text"
                maxLength="20"
                placeholder="아이디를 입력해주세요"
                value={idInput}
                onChange={handleIdInputChange}
              />
              <br />
              <br />
              <label className="contentNum-pw">가입하신 이메일 주소를 입력해 주세요</label><br />
              <input
                type="text"
                className="input-field2-sign"
                placeholder="ex) qwer123"
                maxLength="50"
                value={emailPrefix}
                onChange={handleEmailPrefixChange}
              />
              @
              <select className="pwsearch_email_select" value={emailDomain} onChange={handleEmailDomainChange}>
                <option value="">이메일 선택</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="hanmail.com">hanmail.com</option>
                <option value="nate.com">nate.com</option>
              </select>
              <button className="sendNum-pw" onClick={handleSendVerificationCode}>
                인증번호 전송
              </button>
            </div>

            <div className="contentRow-pw rightAlign-pw">
              <label className="contentNum-pw leftAlign-pw">인증번호 입력</label><br />
              <input
                type="text"
                className="input-field2-sign"
                maxLength="15"
                placeholder="인증번호를 입력해주세요"
                value={emailVerificationCode}
                onChange={handleEmailVerificationCodeChange}
              />
              <button className="check-pw" onClick={handleCheckEmailVerificationCode}>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
