import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Link 대신 useNavigate로 페이지 이동을 관리
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

      {/* 아이디 */}
      <div className="form-group">
        <label>아이디</label>
        <p>{userInfo.username}</p>
      </div>

      {/* 이름 */}
      <div className="form-group">
        <label>이름</label>
        {editModes.fullname ? (
          <form onSubmit={(e) => handleSubmit(e, 'fullname')}>
            <input
              type="text"
              name="fullname"
              value={userInfo.fullname}
              onChange={handleChange}
              required
            />
            <button type="submit">수정 완료</button>
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
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
            <button type="submit">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.email}</p>
            <button onClick={() => setEditModes((prev) => ({ ...prev, email: true }))}>수정</button>
          </div>
        )}
      </div>

      {/* 전화번호 */}
      <div className="form-group">
        <label>전화번호</label>
        {editModes.tel ? (
          <form onSubmit={(e) => handleSubmit(e, 'tel')}>
            <input
              type="text"
              name="tel"
              value={userInfo.tel}
              onChange={handleChange}
              required
              placeholder="전화번호"
            />
            <button type="submit">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.tel}</p>
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
              type="text"
              name="account"
              value={userInfo.account}
              onChange={handleChange}
              required
              placeholder="계좌번호"
            />
            <button type="submit">수정 완료</button>
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
              type="text"
              name="zipcode"
              value={userInfo.zipcode}
              onChange={handleChange}
              placeholder="우편번호"
            />
            <button type="button" onClick={handlePostcode}>주소 검색</button>
            <br />
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              placeholder="주소 (상세주소 포함)"
            />
            <button type="submit">수정 완료</button>
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
