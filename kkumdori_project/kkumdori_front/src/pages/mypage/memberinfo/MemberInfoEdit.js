import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Link 대신 useNavigate로 페이지 이동을 관리
import './memberinfoedit.css';
import TOS from '../../logins/tos/Tos';

const MemberInfoEdit = () => {
  const [userInfo, setUserInfo] = useState({
    userNo: '',
    username: '',
    fullname: '',
    email: '',
    tel: '', // 전화번호 추가
    bank: '',
    account: '',
    zipcode: '',
    address: '',
  });

  const [editModes, setEditModes] = useState({
    fullname: false,
    email: false,
    tel: false, // 전화번호 수정 모드 추가
    bankAccount: false,
    address: false,
  });

  const [marketingConsent, setMarketingConsent] = useState(false);
  const [advertisingConsent, setAdvertisingConsent] = useState({
    sms: false,
    email: false,
    push: false,
  });

  const [isTOSOpen, setIsTOSOpen] = useState(false);
  const [tosType, setTosType] = useState('');

  // 이메일 인증 관련 상태 추가
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [emailSentCode, setEmailSentCode] = useState('');

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 페이지 이동을 위한 useNavigate 훅 사용
  const navigate = useNavigate();

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      let token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8090/api/auth/getuser', {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          setUserInfo(response.data);
          const userNo = response.data.userNo;

          // 두 번째 API 호출
          const userResponse = await axios.get(`http://localhost:8090/api/user/${userNo}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          setUserInfo((prevState) => ({ ...prevState, ...userResponse.data }));
        } catch (error) {
          console.error('데이터를 가져오는 데 실패했습니다.', error);
        }
      } else {
        console.error("JWT 토큰이 없습니다.");
      }
    };
    fetchUserData();
  }, []);

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bank') {
      setUserInfo({ ...userInfo, [name]: value, account: '' });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  // 수정 완료 처리
  const handleSubmit = async (e, field) => {
    e.preventDefault();
    try {
      let token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
      const updatedData = { [field]: userInfo[field] };

      // 전화번호 수정 시 +1을 붙여서 저장
    if (field === 'tel' && userInfo.tel && !userInfo.tel.startsWith("+1")) {
      updatedData.tel = '+1' + userInfo.tel;
    }

      if (field === 'bankAccount') {
        updatedData.bank = userInfo.bank;
        updatedData.account = userInfo.account;
      }

      const response = await axios.put(`http://localhost:8090/api/user/${userInfo.userNo}`, updatedData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        alert(`${field} 정보가 성공적으로 수정되었습니다.`);
      }
    } catch (error) {
      console.error('정보 수정 실패:', error.response ? error.response.data : error.message);
      alert('정보 수정에 실패했습니다. 다시 시도해주세요.');
    }

    setEditModes((prev) => ({ ...prev, [field]: false }));
  };

  // 이메일 인증 전송
  const handleEmailVerification = () => {
    const token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
  
    axios.post('http://localhost:8090/api/auth/SignEmailVerificationCode', 
      { email: userInfo.email },
      { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
    )
    .then(response => {
      if (response.data.success) {
        // 인증번호가 성공적으로 전송되었을 때
        setEmailSentCode(response.data.verificationCode);  // 서버에서 반환된 인증번호 저장
        alert('이메일 인증번호가 전송되었습니다.');
        console.log("이메일로 전송된 인증번호:", response.data.verificationCode);
      } else {
        alert('이메일 인증번호 전송에 실패했습니다.');
      }
    })
    .catch(error => {
      console.error('이메일 인증 전송 오류:', error);
      alert('이메일 인증번호 전송에 실패했습니다.');
    });
  };
  

  // 이메일 인증번호 확인
  const verifyEmailCode = () => {
    console.log("입력한 인증번호:", emailVerificationCode);
    console.log("전송된 인증번호:", emailSentCode);

    if (!emailSentCode) {
      alert("인증번호가 전송되지 않았습니다.");
      return;
    }

    if (emailVerificationCode === emailSentCode) {
      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
    } else {
      alert("이메일 인증번호가 틀렸습니다.");
    }
  };

  // 주소 검색
  const handlePostcode = () => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.body.appendChild(script);

    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          setUserInfo((prevState) => ({
            ...prevState,
            zipcode: data.zonecode,
            address: `${data.address} ${prevState.address}`,
          }));
        }
      }).open();
    };
  };

  // TOS 보기
  const openTOS = (type) => {
    setTosType(type);
    setIsTOSOpen(true);
  };

  const closeTOS = () => setIsTOSOpen(false);

  // 마케팅 및 광고 동의 변경 핸들러
  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    setAdvertisingConsent((prev) => ({ ...prev, [name]: checked }));
  };

  const handleMarketingConsentChange = () => {
    setMarketingConsent((prev) => !prev);
  };

  return (
    <div className="member-info-edit">
      <h2>회원 정보 수정</h2>

      {/* 이름 */}
      <div className="form-group">
        <label>이름</label>
        {editModes.fullname ? (
          <form onSubmit={(e) => handleSubmit(e, 'fullname')}>
            <input
              type="text"
              className="input-field-sign2"
              name="fullname"
              value={userInfo.fullname}
              onChange={handleChange}
              required
            />
            <button className="emailcheck-sign" type="submit">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.fullname}</p>
            <button onClick={() => setEditModes((prev) => ({ ...prev, fullname: true }))}>수정</button>
          </div>
        )}
      </div>

    {/* 이메일 */}
<div className="form-group">
  <label>이메일</label>
  {editModes.email ? (
    <form onSubmit={(e) => handleSubmit(e, 'email')}>
      <input
        className="input-field-sign2"
        type="email"
        name="email"
        value={userInfo.email}
        onChange={handleChange}
        required
        disabled={isEmailVerified} // 인증 완료 시 비활성화
      />
      <button
        type="button"
        className="emailsendNum-sign"
        onClick={handleEmailVerification}
        disabled={isEmailVerified} // 인증 완료 시 버튼 비활성화
      >
        인증전송
      </button>
      &emsp;&emsp;&emsp;
      <button
        className="emailcheck-sign"
        type="submit"
        disabled={!isEmailVerified} // 인증 완료 전에는 비활성화
      >
        수정 완료
      </button>
      <br />
      <input
        type="text"
        className="input-field-sign2"
        maxLength="15"
        value={emailVerificationCode}
        onChange={(e) => setEmailVerificationCode(e.target.value)}
        placeholder="이메일 인증번호를 입력해주세요"
        disabled={isEmailVerified} // 인증 완료 시 비활성화
      />
      <button type="button" className="emailcheck-sign" onClick={verifyEmailCode}>
        인증확인
      </button>
    </form>
  ) : (
    <div>
      <p>{userInfo.email}</p>
      <button 
  onClick={() => {
    setEditModes((prev) => ({ ...prev, email: true }));
    setIsEmailVerified(false);  // 이메일 인증 초기화
    setEmailVerificationCode('');  // 인증번호 입력값 초기화
  }}
>수정</button>
      {/* 인증 상태에 따른 표시 */}
      {isEmailVerified && <span style={{ color: 'green' }}></span>}
    </div>
  )}
</div>


     {/* 전화번호 */}
<div className="form-group">
  <label>전화번호</label>
  {editModes.tel ? (
    <form onSubmit={(e) => handleSubmit(e, 'tel')}>
      <input
      className="input-field-sign2"
        type="text"
        name="tel"
        value={userInfo.tel && userInfo.tel.startsWith("+1") ? userInfo.tel.slice(2) : userInfo.tel} // +1 제거한 값 표시
        onChange={handleChange}
        required
        placeholder="전화번호"
      />
      <button className="emailcheck-sign" type="submit">수정 완료</button>
    </form>
  ) : (
    <div>
      <p>{userInfo.tel && userInfo.tel.startsWith("+1") ? userInfo.tel.slice(2) : userInfo.tel}</p> {/* 화면에서 +1 제거 */}
      <button onClick={() => setEditModes((prev) => ({ ...prev, tel: true }))}>수정</button>
    </div>
  )}
</div>

      {/* 은행 및 계좌번호 */}
      <div className="form-group">
        <label>은행 & 계좌번호</label>
        {editModes.bankAccount ? (
          <form onSubmit={(e) => handleSubmit(e, 'bankAccount')}>
            <select
            className="register_email_select"
              name="bank"
              value={userInfo.bank}
              onChange={handleChange}
              required
            >
              <option value="하나은행">하나은행</option>
              <option value="농협은행">농협은행</option>
              <option value="국민은행">국민은행</option>
              <option value="기업은행">기업은행</option>
              <option value="우리은행">우리은행</option>
              <option value="신한은행">신한은행</option>
            </select>
            <input
            className="input-field-sign2"
              type="text"
              name="account"
              value={userInfo.account}
              onChange={handleChange}
              required
              placeholder="계좌번호"
            />
            <button className="emailcheck-sign" type="submit">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.bank} - {userInfo.account}</p>
            <button onClick={() => setEditModes((prev) => ({ ...prev, bankAccount: true }))}>수정</button>
          </div>
        )}
      </div>

      {/* 주소 수정 */}
      <div className="form-group">
        <label>주소</label>
        {editModes.address ? (
          <form onSubmit={(e) => handleSubmit(e, 'address')}>
            <input
            className="input-field-sign2"
              type="text"
              name="zipcode"
              value={userInfo.zipcode}
              onChange={handleChange}
              placeholder="우편번호"
            />
            <button className="emailcheck-sign" type="button" onClick={handlePostcode}>주소 검색</button>
            <br />
            <input
            className="input-field-sign2"
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              placeholder="주소 (상세주소 포함)"
            />
            <button className="emailcheck-sign" type="submit">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.address}</p>
            <button onClick={() => setEditModes((prev) => ({ ...prev, address: true }))}>수정</button>
          </div>
        )}
      </div>

      {/* 비밀번호 변경하기 버튼 */}
      <div className="form-group">
      <label>비밀번호</label>
      <div className="form-group">
        <button onClick={() => navigate('/repw')}>비밀번호 변경하기</button>
      </div>
      </div>

      {/* 마케팅 동의 */}
      <div className="form-group">
        <label>수신설정</label>
        <input
          type="checkbox"
          id="marketing-consent"
          checked={marketingConsent}
          onChange={handleMarketingConsentChange}
        />
        마케팅 목적의 개인정보 수집 및 동의함
        <button onClick={() => openTOS('terms')}>자세히 보기&gt;</button>
      </div>

      {/* 광고성 정보 수신 */}
      <div className="form-group">
        <p>
          <input
            type="checkbox"
            name="sms"
            checked={advertisingConsent.sms}
            onChange={handleConsentChange}
          /> SMS
          <input
            type="checkbox"
            name="email"
            checked={advertisingConsent.email}
            onChange={handleConsentChange}
          /> 이메일
          <input
            type="checkbox"
            name="push"
            checked={advertisingConsent.push}
            onChange={handleConsentChange}
          /> 푸시알림
        </p>
        <button onClick={() => openTOS('terms')}>자세히 보기&gt;</button>
      </div>

      {/* 회원탈퇴 */}
      <button onClick={() => alert('회원탈퇴가 완료되었습니다.')}>회원탈퇴</button>

      {/* TOS 팝업 */}
      {isTOSOpen && <TOS type={tosType} onClose={closeTOS} />}
    </div>
  );
};

export default MemberInfoEdit;
