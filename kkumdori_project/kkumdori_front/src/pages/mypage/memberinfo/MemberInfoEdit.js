import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './memberinfoedit.css';
import TOS from '../../logins/tos/Tos'; // TOS 컴포넌트를 임포트

const MemberInfoEdit = () => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    username: '',
    email: '',
    bank: '',
    account: '',
    zipcode: '',
    address: '',
    addressDetails: ''
  });

  const [editModes, setEditModes] = useState({
    username: false,
    email: false,
    bankAccount: false,  // bank와 account를 하나로 묶음
    zipcode: false,
    address: false,
    addressDetails: false,
    addressEdit: false, // 주소 수정을 위한 상태 추가
  });

  const [isTOSOpen, setIsTOSOpen] = useState(false);
  const [tosType, setTosType] = useState('');  // 약관 종류 (terms 또는 privacy)
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [advertisingConsent, setAdvertisingConsent] = useState({
    sms: false,
    email: false,
    push: false,
  });

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = 'hong@example.com';  // 이메일로 데이터를 가져옴
        const response = await axios.get(`http://localhost:8090/api/user/${encodeURIComponent(email)}`);
        setUserInfo(response.data);  // 응답 데이터로 상태 업데이트
      } catch (error) {
        console.error('데이터를 가져오는 데 실패했습니다.', error);
      }
    };
    fetchUserData();
  }, []);  // 빈 배열을 두어 한 번만 실행

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 은행을 선택할 때 계좌번호를 초기화
    if (name === 'bank') {
      setUserInfo({
        ...userInfo,
        [name]: value,
        account: ''  // 계좌번호를 초기화
      });
    } else {
      setUserInfo({
        ...userInfo,
        [name]: value,
      });
    }
  };

  const handleMarketingConsentChange = () => {
    setMarketingConsent(!marketingConsent);
  };

  const handleAdvertisingConsentChange = (e) => {
    const { id, checked } = e.target;
    setAdvertisingConsent((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const handlePostcode = () => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";  // Daum 우편번호 API
    document.body.appendChild(script);

    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          setUserInfo((prevState) => ({
            ...prevState,
            zipcode: data.zonecode,  // 우편번호
            address: data.address,  // 기본 주소
          }));
        }
      }).open();  // 우편번호 찾기 창 열기
    };
  };

  // 주소 수정 토글
  const handleAddressEditToggle = () => {
    setEditModes((prevModes) => ({
      ...prevModes,
      addressEdit: !prevModes.addressEdit,  // 주소 수정 모드 토글
    }));
  };

  // 주소 수정 완료 후 수정 버튼으로 돌아가는 함수
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setEditModes((prevModes) => ({
      ...prevModes,
      addressEdit: false,  // 수정 완료 후 수정 모드 종료
    }));
  };

  // 사용자 정보 수정 요청 함수
  const handleSubmit = async (e, field) => {
    e.preventDefault();
  
    const updatedData = { ...userInfo };
  
    try {
      const response = await axios.put(
        `http://localhost:8090/api/user/${userInfo.email}`,
        updatedData
      );
  
      if (response.status === 200) {
        alert(`${field} 정보가 성공적으로 수정되었습니다.`);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('권한이 없습니다. 로그인을 확인하세요.');
      } else {
        console.error('정보 수정 실패:', error);
        alert('정보 수정에 실패했습니다. 다시 시도해주세요.');
      }
    }
  
    handleEditToggle(field);
  };

  const handleEditToggle = (field) => {
    setEditModes((prevModes) => ({
      ...prevModes,
      [field]: !prevModes[field],  // 수정 모드 토글
    }));
  };

  const openTOS = (type) => {
    setTosType(type);
    setIsTOSOpen(true);
  };

  const closeTOS = () => {
    setIsTOSOpen(false);
  };

  const handleDeleteAccount = () => {
    const confirmation = window.confirm('정말로 회원탈퇴하시겠습니까?');
    if (confirmation) {
      // 회원탈퇴 API 호출 로직
      alert('회원탈퇴가 완료되었습니다.');
    }
  };

  return (
    <div className="member-info-edit">
      <h2>회원 정보 수정</h2>

      <div className="form-group">
        <label htmlFor="id">아이디</label>
        <div>
          <p>{userInfo.id}</p>
        </div>
      </div>

      {/* 이름 */}
      <div className="form-group">
        <label htmlFor="username">이름</label>
        {editModes.username ? (
          <form onSubmit={(e) => handleSubmit(e, 'username')}>
            <input
              type="text"
              id="username"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              required
              className="input-text"
            />
            <button type="submit" className="submit-btn-username">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.username}</p>
            <button onClick={() => handleEditToggle('username')} className="edit-btn-username">수정</button>
          </div>
        )}
      </div>

      {/* 이메일 */}
      <div className="form-group">
        <label htmlFor="email">이메일</label>
        {editModes.email ? (
          <form onSubmit={(e) => handleSubmit(e, 'email')}>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
              className="input-email"
            />
            <button type="submit" className="submit-btn-email">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.email}</p>
            <button onClick={() => handleEditToggle('email')} className="edit-btn-email">수정</button>
          </div>
        )}
      </div>

      {/* 은행과 계좌번호 통합 */}
      <div className="form-group">
        <label htmlFor="bank">은행 & 계좌번호</label>
        {editModes.bankAccount ? (
          <form onSubmit={(e) => handleSubmit(e, 'bankAccount')}>
            <div>
              <select
                id="bank"
                name="bank"
                value={userInfo.bank}
                onChange={handleChange}
                required
                className="input-select"
              >
                <option value="하나은행">하나은행</option>
                <option value="농협은행">농협은행</option>
                <option value="국민은행">국민은행</option>
                <option value="기업은행">기업은행</option>
                <option value="우리은행">우리은행</option>
                <option value="신한은행">신한은행</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                id="account"
                name="account"
                value={userInfo.account}
                onChange={handleChange}
                required
                className="input-text"
                placeholder="계좌번호"
              />
            </div>
            <button type="submit" className="submit-btn-bankAccount">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.bank} - {userInfo.account}</p>
            <button onClick={() => handleEditToggle('bankAccount')} className="edit-btn-bankaccount">수정</button>
          </div>
        )}
      </div>

      {/* 주소 수정 */}
      <div className="form-group">
        <label htmlFor="address">주소</label>
        {editModes.addressEdit ? (
          <form onSubmit={handleAddressSubmit}>
            {/* 우편번호 */}
            <input
              type="text"
              name="zipcode"
              className="postcodify_postcode5"
              value={userInfo.zipcode}
              onChange={handleChange}
              placeholder="우편번호"
            />
            &nbsp;
            <button
              type="button"
              className="address-search-btn"
              onClick={handlePostcode}
            >
              주소 검색
            </button>
            <br />
            {/* 기본 주소 */}
            <input
              type="text"
              name="address"
              className="postcodify_address"
              value={userInfo.address}
              onChange={handleChange}
              placeholder="주소"
            />
            {/* 상세 주소 */}
            <input
              type="text"
              name="addressDetails"
              className="postcodify_details"
              value={userInfo.addressDetails}
              onChange={handleChange}
              placeholder="상세주소"
            />
            <button type="submit" className="submit-btn-address">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.address} {userInfo.addressDetails}</p>
            <button onClick={handleAddressEditToggle} className="edit-btn-address">수정</button>
          </div>
        )}
      </div>

      {/* 마케팅 동의 */}
      <div className="form-group">
        <label htmlFor="marketing-consent">
          수신설정
        </label>
        <p>
          <input
            type="checkbox"
            id="marketing-consent"
            checked={marketingConsent}
            onChange={handleMarketingConsentChange}
            className="checkbox"
          />
          마케팅 목적의 개인정보 수집 및 동의함
        </p>
        <button
          type="button"
          onClick={() => openTOS('terms')}
          className="view-terms-btn"
        >
          자세히 보기&gt;
        </button>
      </div>

      {/* 광고성 정보 수신 */}
      <div className="form-group">
        <p>
          <input
            type="checkbox"
            id="sms"
            checked={advertisingConsent.sms}
            onChange={handleAdvertisingConsentChange}
            className="checkbox"
          />
          SMS
          <input
            type="checkbox"
            id="email"
            checked={advertisingConsent.email}
            onChange={handleAdvertisingConsentChange}
            className="checkbox"
          />
          이메일
          <input
            type="checkbox"
            id="push"
            checked={advertisingConsent.push}
            onChange={handleAdvertisingConsentChange}
            className="checkbox"
          />
          푸시알림
        </p>
        <button
          type="button"
          onClick={() => openTOS('terms')}
          className="view-terms-btn"
        >
          자세히 보기&gt;
        </button>
      </div>

      {/* 회원탈퇴 */}
      <button className="delete-account-btn" onClick={handleDeleteAccount}>
        회원탈퇴
      </button>

      {/* TOS 팝업 */}
      {isTOSOpen && <TOS type={tosType} onClose={closeTOS} />}
    </div>
  );
};

export default MemberInfoEdit;
