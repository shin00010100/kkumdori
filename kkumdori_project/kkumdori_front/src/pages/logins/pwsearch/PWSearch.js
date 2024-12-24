import "./PWSearch.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HorizonLine from "../../../utils/HorizontalLine";

export default function PWSearch() {
  const [emailPrefix, setEmailPrefix] = useState(""); // 이메일 주소 앞부분
  const [emailDomain, setEmailDomain] = useState(""); // 이메일 도메인
  const [emailVerificationCode, setEmailVerificationCode] = useState(""); // 이메일 인증번호 상태
  const [generatedEmailCode, setGeneratedEmailCode] = useState(""); // 이메일 인증번호 저장
  const [emailVerificationSent, setEmailVerificationSent] = useState(false); // 이메일 인증번호 전송 여부
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false); // 휴대폰 인증번호 전송 여부
  const [phoneIdInput, setPhoneIdInput] = useState(""); // 전화번호 찾기용 아이디 상태
  const [emailIdInput, setEmailIdInput] = useState(""); // 이메일 찾기용 아이디 상태
  const [nameInput, setNameInput] = useState(""); // 이름 상태
  const [phoneNumber, setPhoneNumber] = useState(""); // 휴대폰 번호 상태
  const [generatedPhoneCode, setGeneratedPhoneCode] = useState("");
  const [phoneVerificationCode, setPhoneVerificationCode] = useState(""); // 휴대폰 인증번호 상태

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 전화번호 찾기용 아이디 입력 핸들러
  const handlePhoneIdInputChange = (e) => {
    setPhoneIdInput(e.target.value.trim()); // 입력값 양옆 공백 제거
  };

  // 이메일 찾기용 아이디 입력 핸들러
  const handleEmailIdInputChange = (e) => {
    setEmailIdInput(e.target.value.trim()); // 입력값 양옆 공백 제거
  };

  // 이름 입력 핸들러
  const handleNameInputChange = (e) => {
    setNameInput(e.target.value.trim()); // 입력값 양옆 공백 제거
  };

  // 휴대폰 번호 입력 핸들러
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value.trim()); // 입력값 양옆 공백 제거
  };

  // 이메일 입력 및 도메인 선택 핸들러
  const handleEmailPrefixChange = (e) => {
    setEmailPrefix(e.target.value.trim()); // 입력값 양옆 공백 제거
  };

  const handleEmailDomainChange = (e) => {
    setEmailDomain(e.target.value.trim()); // 입력값 양옆 공백 제거
  };

  // 인증번호 입력 핸들러 (이메일용)
  const handleEmailVerificationCodeChange = (e) => {
    setEmailVerificationCode(e.target.value.trim()); // 입력값 양옆 공백 제거
  };

  // 인증번호 입력 핸들러 (휴대폰용)
  const handlePhoneVerificationCodeChange = (e) => {
    setPhoneVerificationCode(e.target.value.trim()); // 입력값 양옆 공백 제거
  };

  // 이메일 인증번호 전송 핸들러
  const handleSendEmailVerificationCode = async () => {
    if (emailIdInput === "" || emailPrefix === "" || emailDomain === "") {
      alert("아이디와 이메일을 모두 입력해주세요.");
      return;
    }
    const email = `${emailPrefix}@${emailDomain}`; 
    try {
      const response = await fetch("http://localhost:8090/api/auth/PWsendEmailVerificationCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: emailIdInput, email: email }), 
      });
  
      if (!response.ok) {
        throw new Error("아이디와 이메일이 일치하는 사용자가 없습니다.");
      }
  
      const data = await response.json();
  
      if (data.success) {
        setEmailVerificationSent(true);
        setGeneratedEmailCode(data.verificationCode); // 전송된 인증번호 저장
        alert("인증번호가 전송되었습니다.");
      } 
      else {
        alert("아이디와 이메일이 일치하는 사용자가 없습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("아이디와 이메일이 일치하는 사용자가 없습니다.");
    }
  };

  // useEffect 추가: generatedEmailCode 값이 변경될 때마다 콘솔 로그
  useEffect(() => {
    if (generatedEmailCode) {
     console.log("전송된 이메일 인증번호:", generatedEmailCode);
    }
  }, [generatedEmailCode]);


  // 이메일 인증번호 확인 핸들러
  const handleCheckEmailVerificationCode = () => {
    if (emailIdInput === "" || !emailVerificationSent) {
      alert("아이디와 이메일을 모두 입력한 후 인증번호를 전송해주세요.");
      return;
    }

    console.log("입력한 이메일 인증번호:", emailVerificationCode); // 콘솔에 입력한 인증번호 출력
    

    if (emailVerificationCode.trim() === generatedEmailCode.trim()) { 
      console.log("인증번호가 일치합니다."); // 인증번호 일치 확인
      alert("이메일 인증번호가 확인되었습니다.");
      handleIssueToken("email");
    } else {
      alert("이메일 인증번호가 일치하지 않습니다. 다시 시도해주세요.");
    }
  };

  // 휴대폰 번호 인증번호 전송 핸들러
  const handleSendPhoneVerificationCode = async () => {
    if (phoneIdInput === "" || nameInput === "" || phoneNumber === "") {
      alert("아이디, 이름, 휴대폰 번호를 모두 입력해주세요.");
      return;
    }

    const fulltel = `+1${phoneNumber}`;
    try {
      const response = await fetch("http://localhost:8090/api/auth/PWsendPhoneVerificationCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: phoneIdInput,
          fullname: nameInput,
          tel: fulltel,
        }),
      });
  
      if (!response.ok) {
        throw new Error("아이디, 이름, 등록된 휴대폰 번호가 일치하는 사용자가 없습니다.");
      }
  
      const data = await response.json();
  
      if (data.success) {
        setGeneratedPhoneCode(data.verificationCode); // 전송된 인증번호 저장
        setPhoneVerificationSent(true);
        alert("휴대폰 인증번호가 전송되었습니다.");
      } else {
        alert("아이디, 이름, 등록된 휴대폰 번호가 일치하는 사용자가 없습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("휴대폰 인증번호 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

    // useEffect 추가: generatedPhoneCode 값이 변경될 때마다 콘솔 로그
    useEffect(() => {
      if (generatedPhoneCode) {
       console.log("전송된 휴대폰 인증번호:", generatedPhoneCode); // 콘솔에 전송된 휴대폰 인증번호 출력
      }
    }, [generatedPhoneCode]); // generatedPhoneCode가 변할 때마다 이 코드 실행

  
  const handleCheckPhoneVerificationCode = () => {
    if (phoneIdInput === "" || !phoneVerificationSent) {
      alert("아이디, 이름, 휴대폰 번호를 모두 입력한 후 인증번호를 전송해주세요.");
      return;
    }

    console.log("입력한 휴대폰 인증번호:", phoneVerificationCode); // 콘솔에 입력한 인증번호 출력

    if (phoneVerificationCode.trim() === generatedPhoneCode.trim()) {
      console.log("인증번호가 일치합니다."); // 인증번호 일치 확인
      alert("휴대폰 인증번호가 확인되었습니다.");
      handleIssueToken("phone");
    } else {
      alert("휴대폰 인증번호가 일치하지 않습니다. 다시 시도해주세요.");
    }
  };

  // 토큰 발급 API 요청
  const handleIssueToken = async (method) => {
    let requestData = {};
    if (method === "email" && emailVerificationSent) {
      requestData = {
        username: emailIdInput,
        email: `${emailPrefix}@${emailDomain}`,
      };
    } else if (method === "phone" && phoneVerificationSent) {
      requestData = {
        username: phoneIdInput,
        phone: `+1${phoneNumber}`,
      };
    }

    try {
      const response = await fetch("http://localhost:8090/api/auth/resetToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("토큰 발급에 실패했습니다.");
      }

      const data = await response.json();
      console.log("발급된 토큰:", data.token);

      // 토큰을 localStorage에 저장
      localStorage.setItem("resetToken", data.token);

      alert("토큰이 발급되었습니다.");
      navigate("/repw"); // 토큰을 URL에 담아서 비밀번호 재설정 페이지로 이동
    } catch (error) {
      console.error("에러 발생:", error);
      alert("토큰 발급에 실패했습니다.");
    }
  };

  return (
    <div className="pwsearch-body-page">
      <div className="pwsearchpage">
        <div className="loginfindpw">
          <Link to="/login">이전 화면으로</Link> | <Link to="/idsearch">아이디 찾기</Link>
        </div>

        <div className="titleWrappw">비밀번호 찾기</div>

        {/* 휴대폰 번호로 찾기 영역 */}
        <div className="kkumdoriImages-sign">
          <img src="/img/kkummark.jpg" alt="kkummark" />
          <span>휴대폰 번호로 찾기</span>
        </div>

        <div className="contentWrappw">
          <div className="inputGroup-pw">
            <div className="contentRow-pw">
              <div className="contentNum-pw">아이디</div>
              <input
                className="input-field2-sign"
                maxLength="20"
                type="text"
                placeholder="아이디를 입력해주세요"
                value={phoneIdInput}
                onChange={handlePhoneIdInputChange}
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
                onChange={handlePhoneNumberChange}
              />
              <button className="sendNum-pw" onClick={handleSendPhoneVerificationCode}>
                인증번호 전송
              </button>
            </div>

            <div className="contentRow-pw rightAlign-pw">
              <label className="contentNum-pw leftAlign-pw">인증번호 입력</label>
              <br />
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
            <div className="contentRow-pw">
              <div className="contentNum-pw">아이디</div>
              <input
                className="input-field2-sign"
                type="text"
                maxLength="20"
                placeholder="아이디를 입력해주세요"
                value={emailIdInput}
                onChange={handleEmailIdInputChange}
              />
              <br />
              <br />
              <label className="contentNum-pw">가입하신 이메일 주소를 입력해 주세요</label>
              <br />
              <input
                type="text"
                className="input-field2-sign"
                placeholder="ex) qwe123"
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
              <button className="sendNum-pw" onClick={handleSendEmailVerificationCode}>
                인증번호 전송
              </button>
            </div>

            <div className="contentRow-pw rightAlign-pw">
              <label className="contentNum-pw leftAlign-pw">인증번호 입력</label>
              <br />
              <input
                type="text"
                className="input-field2-sign"
                placeholder="인증번호를 입력해주세요"
                maxLength="15"
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
