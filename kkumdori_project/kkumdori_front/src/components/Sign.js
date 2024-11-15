import React, { Component } from "react";
import HorizonLine from "../utils/HorizontalLine.js";
import TOS from "./Tos.js";
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
        addressDetails: '',  // 상세주소
        registerId: '',  // 아이디
        password: '',  // 비밀번호
        confirmPassword: '',  // 비밀번호 확인
        register_email: '',  // 이메일
        register_email_domain: '',  // 이메일 도메인
        register_bank: '',  // 은행
        register_account: '',  // 계좌
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

  // 중복확인 버튼 클릭 핸들러
  handleIdCheck = () => {
    const { registerId } = this.state.formData;
    if (!registerId) {
      alert("아이디를 입력해주세요.");
    } else {
      // 실제 아이디 중복 체크 로직은 서버와 연동되어야 합니다.
      alert("아이디가 사용 가능합니다.");
      this.setState({ isIdChecked: true });  // 중복 확인 완료 상태로 설정
    }
  };

  // 회원가입 폼 제출
  handleSubmit = (e) => {
    e.preventDefault();

    const {
      registerId,
      password,
      confirmPassword,
      address,
      zipcode,
      addressDetails,
      register_email,
      register_email_domain,
      register_bank,
      register_account
    } = this.state.formData;

    const fullEmail = register_email && register_email_domain ? `${register_email}@${register_email_domain}` : "";

    // 필수 항목 체크 (이메일 도메인 추가 체크)
    if (!registerId || !password || !confirmPassword || !address || !zipcode || !addressDetails || !fullEmail || !register_bank || register_bank === "은행 선택" || !register_account) {
      alert("모든 필수 입력란을 채워주세요.");
      return;  // 필수 항목이 비어 있으면 가입 진행 안 함
    }

    // 이메일 도메인 선택 여부 체크
    if (register_email_domain === "") {
      alert("이메일 도메인을 선택해주세요.");
      return;  // 이메일 도메인이 선택되지 않으면 함수 종료
    }

    // 약관 동의 체크
    if (!this.state.isTermsAgreed || !this.state.isPrivacyAgreed) {
      alert("약관 동의를 체크해 주세요.");
      return; // 약관 동의가 안 되어 있으면 함수 종료
    }

    // 계좌 선택 체크
    if (register_bank === "은행 선택") {
      alert("계좌를 선택해주세요.");
      return; // 계좌가 선택되지 않으면 함수 종료
    }

    // 아이디 중복 확인 체크
    if (!this.state.isIdChecked) {
      alert("아이디 중복 확인을 해주세요.");
      return; // 중복 확인이 되지 않으면 함수 종료
    }

    // 가입 완료 로직
    alert("회원가입이 완료되었습니다.");
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

        return { formData: updatedFormData };
      });
    } else if (name === 'registerId') {
      // 아이디 입력 시, 영문자와 숫자만 허용
      const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, ''); // 영문자와 숫자 외 문자 제거
      this.setState((prevState) => {
        const updatedFormData = {
          ...prevState.formData,
          [name]: alphanumericValue, // 영문자와 숫자만 업데이트
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

          <div className="socialImages">
            <img src="/img/kakao.png" alt="Kakao" />
            <img src="/img/google.png" alt="Google" />
            <img src="/img/naver.png" alt="Naver" />
          </div>

          <HorizonLine text="또는" />

          <div className="register">
            <div>
              {/* 아이디 */}
              <div>
                <h5>아이디</h5>
                <input
                  type="text"
                  className="input-field-sign"
                  maxLength="20"
                  name="registerId"
                  placeholder="영문/숫자 입력 (6~20자)"
                  value={this.state.formData.registerId}
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
                />
                @
                <select
                  className="register_email_select"
                  name="register_email_domain"
                  value={this.state.formData.register_email_domain}
                  onChange={this.handleChange}
                >
                  <option value="">이메일 선택</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="hanmail.com">hanmail.com</option>
                  <option value="nate.com">nate.com</option>
                </select>
              </div>

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
                  name="addressDetails"
                  className="postcodify_details"
                  value={this.state.formData.addressDetails}
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