import React, { useState } from "react";
import "./IDSearch.css";
import { Link } from "react-router-dom";
import HorizonLine from "../../../utils/HorizontalLine";

export default function IDSearch() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDomain, setSelectedDomain] = useState(""); // 선택된 도메인 상태
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [name, setName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [foundId, setFoundId] = useState(""); // 찾은 아이디 상태
  const [sentVerificationCode, setSentVerificationCode] = useState(""); // 전송된 인증번호 상태

  // 핸들러들
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자 외의 문자를 모두 제거
    setPhoneNumber(value);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneVerificationCodeChange = (e) => setPhoneVerificationCode(e.target.value);
  const handleEmailVerificationCodeChange = (e) => setEmailVerificationCode(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleDomainChange = (e) => setSelectedDomain(e.target.value); // 선택된 도메인 상태 업데이트

  // 인증번호 전송 함수
const handleSendVerificationCode = (type) => {
  if (type === "phone") {
    if (!name || !phoneNumber) {
      alert("이름, 등록한 휴대폰 번호를 모두 입력해 주세요.");
    } else {
      const fulltel = `+82${phoneNumber}`;

      // 백엔드 API 호출
      fetch("http://localhost:8090/api/auth/IDsendPhoneVerificationCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: name,
          tel: fulltel,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSentVerificationCode(data.verificationCode); // 전송된 인증번호 상태 저장
            console.log("전송된 인증번호:", data.verificationCode);
            alert(`휴대폰 인증번호가 전송되었습니다.`);
          } else {
            alert(data.message); // 실패 메시지
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("휴대폰 인증번호 전송에 실패했습니다.");
        });
    }
    } else if (type === "email") {
      if (!email || !selectedDomain) {
        alert("이메일을 입력해 주세요.");
      } else {
        const fullEmail = `${email}@${selectedDomain}`;

        // 이메일 인증번호 전송을 위한 백엔드 API 호출
        fetch("http://localhost:8090/api/auth/IDsendEmailVerificationCode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: fullEmail,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setSentVerificationCode(data.verificationCode); // 전송된 인증번호 상태 저장
              console.log("전송된 인증번호:", data.verificationCode); // 전송된 인증번호 로그 출력
              alert(`인증번호가 전송되었습니다.`);
            } else {
              alert(data.message); // 실패 메시지
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("이메일 인증번호 전송에 실패했습니다.");
          });
      }
    }
  };


  // 전화번호 인증번호 확인 함수
  const handleCheckPhoneVerificationCode = () => {
    const trimmedInput = phoneVerificationCode.trim(); // 입력한 인증번호의 공백 제거
    const trimmedCode = sentVerificationCode.trim(); // 전송된 인증번호의 공백 제거

  if (!trimmedInput) {
    alert("인증번호를 입력해주세요.");
  } else if (trimmedInput === trimmedCode) {
    // 인증번호가 일치하면 이름과 전화번호로 사용자 검색 API 호출
    const fulltel = `+82${phoneNumber}`;

    fetch("http://localhost:8090/api/auth/IDCheckPhoneVerificationCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: name,
        tel: fulltel,
        code: trimmedInput,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 오류 또는 인증 실패");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setFoundId(data.message); // 서버에서 반환된 username을 저장
          setIsVerified(true); // 인증 성공 상태
          console.log("입력한 인증번호:", trimmedInput); // 입력한 인증번호 로그 출력
          console.log("인증번호가 확인되었습니다."); // 로그 출력
          alert(`인증번호가 확인되었습니다.`);
        } else {
          alert(data.message); // 실패 메시지 표시
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("인증번호 확인에 실패했습니다.");
      });
  } else {
    alert("인증번호가 일치하지 않습니다.");
    console.log("입력한 인증번호:", trimmedInput); // 인증번호 불일치 로그
    console.log("전송된 인증번호:", trimmedCode); // 전송된 인증번호 로그
  }
};


  // 이메일 인증번호 확인 함수
  const handleCheckEmailVerificationCode = () => {
    const trimmedInput = emailVerificationCode.trim(); // 입력값의 양옆 공백 제거
    const trimmedCode = sentVerificationCode.trim(); // 전송된 인증번호의 양옆 공백 제거

    if (!trimmedInput) {
      alert("인증번호를 입력해주세요.");
    } else if (trimmedInput === trimmedCode) {
      // 인증번호가 일치하면 아이디를 찾는 API 호출
      const fullEmail = `${email}@${selectedDomain}`;

      fetch("http://localhost:8090/api/auth/IDcheckEmailVerificationCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: fullEmail,
          code: trimmedInput,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("서버 오류 또는 인증 실패");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setFoundId(data.message); // 서버에서 반환한 username 저장
            setIsVerified(true);
            console.log("입력한 인증번호:", trimmedInput); // 입력한 인증번호 로그 출력
            console.log("인증번호가 확인되었습니다."); // 인증번호 일치 메시지 로그 출력
            alert(`이메일 인증번호가 확인되었습니다.`);
          } else {
            alert(data.message); // 실패 메시지
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("인증번호 확인에 실패했습니다.");
        });
    } else {
      alert("인증번호가 일치하지 않습니다.");
      console.log("입력한 인증번호:", trimmedInput); // 인증번호 불일치 로그 출력
      console.log("전송된 인증번호:", trimmedCode); // 전송된 인증번호 로그 출력
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
                onChange={handlePhoneNumberChange} // 수정된 핸들러 사용
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
                placeholder="ex) qwe123"
                value={email}
                onChange={handleEmailChange}
              />
              @
              <select className="idsearch_email_select" value={selectedDomain} onChange={handleDomainChange}>
                <option value="">이메일 선택</option>
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
      </div>
    </div>
  );
}