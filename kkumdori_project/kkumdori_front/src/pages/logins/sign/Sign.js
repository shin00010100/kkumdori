import React, { Component } from "react";
import HLine from "../../../utils/HLine.js";
import TOS from "../tos/Tos.js";
import "./Sign.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTermsAgreed: false,
      isPrivacyAgreed: false,
      isTOSOpen: false,  // 약관 팝업 상태
      isIdChecked: false,  // 아이디 중복 확인 여부
      formData: {
        zipcode: '',
        address: '',
        address_details: '',  // 상세주소
        username: '',  // 아이디
        password: '',  // 비밀번호
        confirmPassword: '',  // 비밀번호 확인
        register_email: '',  // 이메일
        register_email_domain: '',  // 이메일 도메인
        register_bank: '',  // 은행
        register_account: '',  // 계좌
        fullname: '',  // 이름
        tel: '',  // 전화번호
        
        isEmailVerified: false,   // 이메일 인증 여부
        isPhoneVerified: false,   // 전화번호 인증 여부
        emailVerificationCode: '',  // 이메일 인증 코드 입력값
        phoneVerificationCode: '',  // 전화번호 인증 코드 입력값
        emailCodeSent: false,      // 이메일 인증 코드 전송 여부
        phoneCodeSent: false,
        emailSentCode: '',  // 전송된 이메일 인증 코드
        phoneSentCode: '',  // 전송된 전화번호 인증 코드
      },
      passwordError: '',  // 비밀번호 유효성 검사 에러 메시지
      confirmPasswordError: '',  // 비밀번호 확인 에러 메시지
    };
  }

  // 약관 동의 상태를 변경하는 함수
  handleAgreementChange = (type) => {
    this.setState((prevState) => {
      if (type === 'terms') {
        return { isTermsAgreed: !prevState.isTermsAgreed };
      } else if (type === 'privacy') {
        return { isPrivacyAgreed: !prevState.isPrivacyAgreed };
      }
    });
  };

  // 비밀번호 유효성 검사
  validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}$/;
    if (!passwordRegex.test(password)) {
      return '비밀번호 형식을 준수해 주세요.';
    }
    return '';
  };

  // 비밀번호 확인 유효성 검사
  validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== this.state.formData.password) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  handleIdCheck = () => {
    const { username } = this.state.formData;
    if (!username) {
      alert("아이디를 입력해주세요.");
    } else {
      // 아이디 중복 체크를 위한 서버 요청
      fetch(`http://localhost:8090/api/auth/check-username?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if (response.ok) {
            alert("아이디가 사용 가능합니다.");
            this.setState({ isIdChecked: true });
          } else {
            alert("이미 사용 중인 아이디입니다.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("아이디 중복 확인에 실패했습니다.");
        });
    }
  };

  sendEmailVerification = () => {
    const { register_email, register_email_domain } = this.state.formData;
    const fullEmail = `${register_email}@${register_email_domain}`;

    fetch("http://localhost:8090/api/auth/SignEmailVerificationCode", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: fullEmail }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({
            emailCodeSent: true,
            emailSentCode: data.verificationCode, // 서버가 반환한 인증번호 저장 (디버깅 용도)
          });
          console.log("이메일로 전송된 인증번호:", data.verificationCode);
          alert("이메일 인증번호가 전송되었습니다.");
        } else {
          alert("이메일 인증번호 전송에 실패했습니다.");
        }
      })
      .catch(error => {
        console.error(error);
        alert("이메일 인증번호 전송에 실패했습니다.");
      });
  };

  sendPhoneVerification = () => {
    const { tel } = this.state.formData;

    fetch("http://localhost:8090/api/auth/SignPhoneVerificationCode", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tel }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({
            phoneCodeSent: true,
            phoneSentCode: data.verificationCode, // 서버에서 반환한 인증번호 저장 (디버깅 용도)
          });
          console.log("전화번호로 전송된 인증번호:", data.verificationCode);
          alert("전화번호 인증번호가 전송되었습니다.");
        } else {
          alert("전화번호 인증번호 전송에 실패했습니다.");
        }
      })
      .catch(error => {
        console.error(error);
        alert("전화번호 인증번호 전송에 실패했습니다.");
      });
  };

  verifyEmailCode = () => {
    const { emailVerificationCode } = this.state.formData;
    const { emailSentCode } = this.state;

    console.log("입력한 인증번호:", emailVerificationCode);
    console.log("전송된 인증번호:", emailSentCode);

    if (!emailSentCode) {
      alert("인증번호가 전송되지 않았습니다.");
      return;
    }

    if (emailVerificationCode === emailSentCode) {
      this.setState({ isEmailVerified: true });
      alert("이메일 인증이 완료되었습니다.");
    } else {
      alert("이메일 인증번호가 틀렸습니다.");
    }
  };

  verifyPhoneCode = () => {
    const { phoneVerificationCode } = this.state.formData;
    const { phoneSentCode } = this.state;

    console.log("입력한 인증번호:", phoneVerificationCode);
    console.log("전송된 인증번호:", phoneSentCode);

    if (!phoneSentCode) {
      alert("인증번호가 전송되지 않았습니다.");
      return;
    }

    if (phoneVerificationCode === phoneSentCode) {
      this.setState({ isPhoneVerified: true });
      alert("전화번호 인증이 완료되었습니다.");
    } else {
      alert("전화번호 인증번호가 틀렸습니다.");
    }
  };


  // 회원가입 폼 제출
handleSubmit = (e) => {
  e.preventDefault();

  const {
    username,
    password,
    confirmPassword,
    address,
    zipcode,
    address_details,
    register_email,
    register_email_domain,
    register_bank,
    register_account,
    fullname,
    tel,
  } = this.state.formData;
  
  const fullEmail = `${register_email}@${register_email_domain}`;
  
  // 필수 항목 체크 (이메일 도메인 추가 체크)
  if (
    !username ||
    !password ||
    !confirmPassword ||
    !address ||
    !zipcode ||
    !address_details ||
    !fullEmail ||
    !register_bank ||
    register_bank === "은행 선택" ||
    !register_account ||
    !tel ||
    !fullname
  ) {
    alert("모든 필수 입력란을 채워주세요.");
    return; // 필수 항목이 비어 있으면 가입 진행 안 함
  }
  
  // 이메일 도메인 선택 여부 체크
  if (register_email_domain === "") {
    alert("이메일 도메인을 선택해주세요.");
    return; // 이메일 도메인이 선택되지 않으면 함수 종료
  }
  
  // 약관 동의 체크
  if (!this.state.isTermsAgreed || !this.state.isPrivacyAgreed) {
    alert("약관 동의를 체크해 주세요.");
    return; // 약관 동의가 안 되어 있으면 함수 종료
  }
  
  // 아이디 길이 검사
  if (username.length < 6) {
    alert("아이디는 6글자 이상이어야 합니다.");
    return;
  }
  
  // 아이디 중복 확인 체크
  if (!this.state.isIdChecked) {
    alert("아이디 중복 확인을 해주세요.");
    return;
  }
  
  // 이름 길이 및 유효성 검사
  const nameRegex = /^[a-zA-Z가-힣]+$/;
  if (fullname.length < 3) {
    alert("이름은 3자 이상이어야 합니다.");
    return;
  }
  if (!nameRegex.test(fullname)) {
    alert("이름은 영어 또는 한글로만 입력해주세요.");
    return;
  }
  
  // 계좌 선택 체크
  if (register_bank === "은행 선택" || !register_account) {
    alert("계좌를 선택해주세요.");
    return;
  }
  
  // 비밀번호와 비밀번호 확인 유효성 검사
  const passwordError = this.validatePassword(password);
  const confirmPasswordError = this.validateConfirmPassword(confirmPassword);
  
  if (passwordError || confirmPasswordError) {
    alert("비밀번호와 비밀번호 확인이 일치하지 않거나 형식이 잘못되었습니다.");
    return; // 비밀번호 유효성 검사에서 실패하면 가입 진행 안 함
  }
  
  // 이메일과 전화번호 인증 확인
  if (!this.state.isEmailVerified || !this.state.isPhoneVerified) {
    alert("이메일과 전화번호 인증을 완료해 주세요.");
    return;
  }
  
  const email = `${register_email}@${register_email_domain}`;
  const fulltel = `+1${tel}`;
  
  // 중복 체크 API 호출
  fetch(`http://localhost:8090/api/auth/check-username?username=${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("아이디가 이미 사용 중입니다.");
      }
      return fetch(`http://localhost:8090/api/auth/check-email?email=${email}`);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("이메일이 이미 사용 중입니다.");
      }
      return fetch(`http://localhost:8090/api/auth/check-tel?tel=${tel}`);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("전화번호가 이미 사용 중입니다.");
      }
  
      // 중복이 없으면 회원가입 진행
      const fullAddress = `${address} ${address_details}`;
  
      // 서버로 데이터 전송 (POST 요청)
      const userData = {
        username,
        password,
        fullname,
        tel: fulltel,
        address: fullAddress,
        zipcode,
        email,
        bank: register_bank !== "은행 선택" && register_bank !== "" ? register_bank : null,
        account: register_account || "default_value",
      };
  
      return fetch("http://localhost:8090/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
    })
    .then((response) =>
      response.ok ? response.json() : Promise.reject("회원가입 실패")
    )
    .then((data) => {
      alert("회원가입이 완료되었습니다.");
      window.location.href = "/login";
    })
        .catch((error) => {
          console.error(error);
          alert("전화번호가 이미 사용 중입니다.");
        })
        .catch((error) => { // 중복된 catch 블록
          alert(error.message);
        });
      };

  // 입력 값 변경 핸들러
  handleChange = (e) => {
    const { name, value } = e.target;

    // 'register_account' 입력값에 대해서만 숫자만 허용
    if (name === 'register_account') {
      const numericValue = value.replace(/[^0-9]/g, ''); // 숫자 외 문자 제거
      this.setState((prevState) => {
        const updatedFormData = {
          ...prevState.formData,
          [name]: numericValue, // 숫자만 업데이트
        };

        return {
          formData: updatedFormData,
        };
      });
    } else if (name === 'username') {
      // 아이디 입력 시, 영문자와 숫자만 허용
      const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, ''); // 영문자와 숫자 외 문자 제거
      this.setState((prevState) => {
        const updatedFormData = {
          ...prevState.formData,
          [name]: alphanumericValue, // 영문자와 숫자만 업데이트
        };

        return {
          formData: updatedFormData,
          isIdChecked: false,  // 아이디 변경 시 중복 확인 상태를 초기화
        };
      });
    }
    // 'tel' 필드: 전화번호는 숫자만 허용
  else if (name === 'tel') {
    const numericValue = value.replace(/[^0-9]/g, '');  // 숫자 외 문자 제거
    this.setState((prevState) => {
      const updatedFormData = {
        ...prevState.formData,
        [name]: numericValue, // 숫자만 업데이트
      };
      return { formData: updatedFormData };
    });  
    } else {
      this.setState((prevState) => {
        const updatedFormData = {
          ...prevState.formData,
          [name]: value,
        };

        // 비밀번호와 비밀번호 확인 입력 시 유효성 검사
        let passwordError = '';
        let confirmPasswordError = '';

        if (name === 'password') {
          passwordError = this.validatePassword(value);
        }

        if (name === 'confirmPassword') {
          confirmPasswordError = this.validateConfirmPassword(value);
        }

        return {
          formData: updatedFormData,
          passwordError,
          confirmPasswordError
        };
      });
    }
  };
  
  // 우편번호 찾기 함수 (Daum API)
  handlePostcode = () => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";  // Daum 우편번호 API
    document.body.appendChild(script);

    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.setState((prevState) => ({
            formData: {
              ...prevState.formData,
              zipcode: data.zonecode,  // 우편번호
              address: data.address,  // 기본 주소
            }
          }));
        }
      }).open();  // 우편번호 찾기 창 열기
    };
  };

  // 약관 팝업 열기
  openTOS = (type) => {
    this.setState({
      isTOSOpen: true,
      tosType: type
    });
  };

  // 약관 팝업 닫기
  closeTOS = () => {
    this.setState({
      isTOSOpen: false,
    });
  };
  
  render() {
    return (
      <div className="register-page">
        <form onSubmit={this.handleSubmit}>
          <div>
            <h1 className="register_title">회원가입</h1>
          </div>

         

          <HLine />

          <div className="register">
            <div>
              {/* 아이디 */}
              <div>
                <h5>아이디</h5>
                <input
                  type="text"
                  className="input-field-sign"
                  maxLength="20"
                  name="username"
                  placeholder="영문/숫자 입력 (6~20자)"
                  value={this.state.formData.username}
                  onChange={this.handleChange}
                  autoFocus
                />
                <button type="button" className="dupIdCheck" onClick={this.handleIdCheck}>
                  중복확인
                </button>
              </div>

              {/* 비밀번호 */}
              <div>
                <h5>비밀번호</h5>
                <input
                  type="password"
                  className="input-field-sign"
                  maxLength="15"
                  name="password"
                  placeholder="영문, 숫자, 특수문자 포함 6~20자"
                  value={this.state.formData.password}
                  onChange={this.handleChange}
                />
                {this.state.passwordError && (
                  <div className="sign-error-message">{this.state.passwordError}</div>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <h5>비밀번호 확인</h5>
                <input
                  type="password"
                  className="input-field-sign"
                  maxLength="15"
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  value={this.state.formData.confirmPassword}
                  onChange={this.handleChange}
                />
                {this.state.confirmPasswordError && (
                  <div className="sign-error-message">{this.state.confirmPasswordError}</div>
                )}
              </div>
              
              {/* 이름 */}
              <div>
                <h5>이름</h5>
                <input
                  type="text"
                  className="input-field-sign"
                  maxLength="20"
                  name="fullname"
                  placeholder="이름을 입력해주세요(한글/영문)"
                  value={this.state.formData.fullname}
                  onChange={this.handleChange}
                />
              </div> <br />

              {/* 전화번호 */}
              <div>
                <h5>전화번호</h5>
                <input
                  type="text"
                  className="input-field-sign"
                  maxLength="15"
                  name="tel"
                  placeholder="'+82', '-' 는 제외하고 적어주세요"
                  value={this.state.formData.tel}
                  onChange={this.handleChange}
                  disabled={this.state.isPhoneVerified}
                />
                 <button type="button" className="telsendNum-sign" onClick={this.sendPhoneVerification} 
                 disabled={this.state.isPhoneVerified}>
                  인증전송
                </button>
                <br /><br />
                <input
                  type="text"
                  className="input-field-sign"
                  maxLength="15"
                  name="phoneVerificationCode"
                  placeholder="휴대폰 인증번호를 입력해주세요"
                  value={this.state.formData.phoneVerificationCode}
                  onChange={this.handleChange}
                />
                <button type="button" className="telcheck-sign" onClick={this.verifyPhoneCode}
                disabled={this.state.isPhoneVerified}>
                  인증확인
                </button>
              </div><br />

              {/* 이메일 */}
              <div>
                <h5>e-mail</h5>
                <input
                  type="text"
                  className="input-field-sign"
                  maxLength="15"
                  name="register_email"
                  placeholder="이메일 입력란"
                  value={this.state.formData.register_email}
                  onChange={this.handleChange}
                  disabled={this.state.isEmailVerified}
                /><button type="button" className="emailsendNum-sign" onClick={this.sendEmailVerification}
                disabled={this.state.isEmailVerified}>
                인증전송
              </button>
                <div>
                @ &nbsp; 
                <select
                  className="register_email_select"
                  name="register_email_domain"
                  value={this.state.formData.register_email_domain}
                  onChange={this.handleChange}
                  disabled={this.state.isEmailVerified}
                >
                  <option value="">이메일 선택</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="hanmail.com">hanmail.com</option>
                  <option value="nate.com">nate.com</option>
                </select>
                </div>
                <br />
                <input
                  type="text"
                  className="input-field-sign"
                  maxLength="15"
                  name="emailVerificationCode"
                  placeholder="이메일 인증번호를 입력해주세요"
                  value={this.state.formData.emailVerificationCode}
                  onChange={this.handleChange}
                />
                <button type="button" className="emailcheck-sign" onClick={this.verifyEmailCode} 
                disabled={this.state.isEmailVerified}>
                  인증확인
                </button>
              </div> <br />

              {/* 계좌 */}
              <div>
                <h5>계좌</h5>
                <select
                  className="register_bank"
                  name="register_bank"
                  onChange={this.handleChange}
                  value={this.state.formData.register_bank}
                >
                  <option value="은행 선택">은행 선택</option>
                  <option value="농협">농협</option>
                  <option value="국민">국민</option>
                  <option value="카카오뱅크">카카오뱅크</option>
                  <option value="기업">기업</option>
                  <option value="토스뱅크">토스뱅크</option>
                </select>
                <input
                  type="text"
                  className="input-field-sign"
                  maxLength="20"
                  name="register_account"
                  placeholder="'-' 는 제외하고 적어주세요"
                  value={this.state.formData.register_account}
                  onChange={this.handleChange}
                />
              </div>

              {/* 주소 입력 부분 */}
              <div>
                <h5>주소</h5>
                <input
                  type="text"
                  name="postcode"
                  className="postcodify_postcode5"
                  value={this.state.formData.zipcode}
                  onChange={this.handleChange}
                  placeholder="우편번호"
                  readOnly
                />
                &nbsp;
                <button type="button" className="address-search-btn" onClick={this.handlePostcode}>
                  주소 검색
                </button>
                <br />
                <input
                  type="text"
                  name="address"
                  className="postcodify_address"
                  value={this.state.formData.address}
                  onChange={this.handleChange}
                  placeholder="주소"
                  readOnly
                />
                <input
                  type="text"
                  name="address_details"
                  className="postcodify_details"
                  value={this.state.formData.address_details}
                  onChange={this.handleChange}
                  placeholder="상세주소"
                />
              </div>

              {/* 약관 동의 섹션 */}
              <div className="terms-section">
                <h3>약관동의</h3>
                <button type="button" className="TOSbtn" onClick={() => this.openTOS('terms')}>
                  이용약관 확인
                </button>
                <button type="button" className="TOSbtn2" onClick={() => this.openTOS('privacy')}>
                  개인정보 처리방침 확인
                </button>
                <br /><br />
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.isTermsAgreed}
                      onChange={() => this.handleAgreementChange("terms")}
                    />
                    <span className={`terms-agree ${this.state.isTermsAgreed ? "checked" : ""}`}>
                      이용약관에 동의합니다. (필수)
                    </span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.isPrivacyAgreed}
                      onChange={() => this.handleAgreementChange("privacy")}
                    />
                    <span className={`terms-agree ${this.state.isPrivacyAgreed ? "checked" : ""}`}>
                      개인정보 처리방침에 동의합니다. (필수)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="sbtn-sign"
            >
              가입하기
            </button>
          </div>

        </form>

        {/* 약관 팝업 컴포넌트 */}
        <TOS onClose={this.closeTOS} isOpen={this.state.isTOSOpen} type={this.state.tosType} />
      </div>
    );
  }
}

export default Register;
