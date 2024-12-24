import React, { useState } from 'react';
import './memberinfoedit.css';

const MemberInfoEdit = () => {
  const [userInfo, setUserInfo] = useState({
    id: 'ID',
    name: '홍길동',
    birth: '2000-10-08',
    email: 'hong@gmail.com',
    phone: '010-1234-5678',
    address: '서울시 강남',
    password: '비밀번호 수정은 [비밀번호 재설정 페이지]에서 가능합니다.',
  });

  const [editModes, setEditModes] = useState({
    name: false,
    birth: false,
    email: false,
    phone: false,
    address: false,
  });

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // 수정 모드 토글
  const handleEditToggle = (field) => {
    setEditModes({
      ...editModes,
      [field]: !editModes[field],
    });
  };

  // 서버X
  const handleSubmit = (e, field) => {
    e.preventDefault();

    // 서버X 수정
    alert(`${field} 정보가 수정되었습니다.`);
    handleEditToggle(field);
  };

  return (
    <div className="member-info-edit">
      <h2>회원 정보 수정</h2>

      {/* 아이디 (수정 불가능) */}
      <div className="form-group">
        <label htmlFor="id">아이디</label>
        <div>
          <p>{userInfo.id}</p>
        </div>
      </div>

      {/* 이름 */}
      <div className="form-group">
        <label htmlFor="name">이름</label>
        {editModes.name ? (
          <form onSubmit={(e) => handleSubmit(e, 'name')}>
            <input
              type="text"
              id="name"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              required
              className="input-text"
            />
            <button type="submit" className="submit-btn-name">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.name}</p>
            <button onClick={() => handleEditToggle('name')} className="edit-btn-name">수정</button>
          </div>
        )}
      </div>

      {/* 생년월일 */}
      <div className="form-group">
        <label htmlFor="birth">생년월일</label>
        {editModes.birth ? (
          <form onSubmit={(e) => handleSubmit(e, 'birth')}>
            <input
              type="date"
              id="birth"
              name="birth"
              value={userInfo.birth}
              onChange={handleChange}
              required
              className="input-date"
            />
            <button type="submit" className="submit-btn-birth">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.birth}</p>
            <button onClick={() => handleEditToggle('birth')} className="edit-btn-birth">수정</button>
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

      {/* 전화번호 */}
      <div className="form-group">
        <label htmlFor="phone">전화번호</label>
        {editModes.phone ? (
          <form onSubmit={(e) => handleSubmit(e, 'phone')}>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              required
              className="input-tel"
            />
            <button type="submit" className="submit-btn-phone">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.phone}</p>
            <button onClick={() => handleEditToggle('phone')} className="edit-btn-phone">수정</button>
          </div>
        )}
      </div>

      {/* 주소 */}
      <div className="form-group">
        <label htmlFor="address">주소</label>
        {editModes.address ? (
          <form onSubmit={(e) => handleSubmit(e, 'address')}>
            <input
              type="text"
              id="address"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              required
              className="input-address"
            />
            <button type="submit" className="submit-btn-address">수정 완료</button>
          </form>
        ) : (
          <div>
            <p>{userInfo.address}</p>
            <button onClick={() => handleEditToggle('address')} className="edit-btn-address">수정</button>
          </div>
        )}
      </div>

      {/* 비밀번호 (수정 불가능) */}
      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <div>
          <p>{userInfo.password}</p>
          <button className="edit-btn-password">수정</button>
        </div>
      </div>

      {/* 회원탈퇴 */}
      <button className="delete-account-btn">회원탈퇴</button>
    </div>
  );
};

export default MemberInfoEdit;
