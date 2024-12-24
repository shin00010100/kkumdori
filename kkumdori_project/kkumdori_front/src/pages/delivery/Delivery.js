import React, { useState } from 'react';
import './delivery.css';

function DeliveryAddressManager() {
  const initialAddresses = [
    { id: 1, name: '홍길동', address: '서울시 강남구 테헤란로 123', phone: '010-1234-5678', deliveryMethod: '택배', zipcode: '12345', detailAddress: '203동 101호', isDefault: false },
    { id: 2, name: '김철수', address: '부산시 해운대구 센텀북대로 456', phone: '010-2345-6789', deliveryMethod: '편의점 픽업', zipcode: '23456', detailAddress: '상가 3층 305호', isDefault: false },
    { id: 3, name: '이영희', address: '대구시 수성구 동대구로 789', phone: '010-3456-7890', deliveryMethod: '직접 수령', zipcode: '34567', detailAddress: '빌딩 2층 202호', isDefault: true },
  ];

  const [addresses, setAddresses] = useState(initialAddresses);
  const [isEditing, setIsEditing] = useState({}); // 수정 모드 상태를 다루는 변수
  const [isAdding, setIsAdding] = useState(false); // 추가 모드 상태
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    phone: '',
    deliveryMethod: '택배',
    zipcode: '',
    detailAddress: '',
    isDefault: false
  }); // 새로운 배송지 데이터를 저장하는 상태

  // 수정 모드 토글 핸들러
  const toggleEditMode = (addressId) => {
    setIsEditing((prev) => ({
      ...prev,
      [addressId]: !prev[addressId],
    }));
  };

  // 배송지 삭제 핸들러
  const deleteAddress = (addressId) => {
    const updatedAddresses = addresses.filter(address => address.id !== addressId);
    setAddresses(updatedAddresses);
  };

  // 배송지 정보 업데이트 핸들러
  const updateAddressField = (addressId, field, value) => {
    const updatedAddresses = addresses.map(address =>
      address.id === addressId ? { ...address, [field]: value } : address
    );
    setAddresses(updatedAddresses);
  };

  // 우편번호 찾기 함수
  const findPostcode = (addressId) => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";  // Daum 우편번호 API
    document.body.appendChild(script);

    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 주소와 우편번호 자동 입력
          const fullAddress = data.address;
          const extraAddress = data.addressType === 'R' ? data.bname : '';  // 상세 주소 추가

          if (addressId === null) {
            // 새로운 배송지 추가할 때 자동 입력
            setNewAddress((prev) => ({
              ...prev,
              zipcode: data.zonecode,  // 우편번호
              address: fullAddress + (extraAddress ? ' ' + extraAddress : ''),  // 기본 주소 + 상세 주소
              detailAddress: '동 1층 101호',  // 자동으로 채워질 상세 주소 (임의)
            }));
          } else {
            // 기존 배송지 수정 시 자동 입력
            setAddresses((prevAddresses) =>
              prevAddresses.map((address) =>
                address.id === addressId
                  ? {
                      ...address,
                      zipcode: data.zonecode,  // 우편번호
                      address: fullAddress + (extraAddress ? ' ' + extraAddress : ''),  // 기본 주소 + 상세 주소
                      detailAddress: '동 1층 101호',  // 자동으로 채워질 상세 주소 (임의)
                    }
                  : address
              )
            );
          }
        },
      }).open();  // 우편번호 찾기 창 열기
    };
  };

  // 기본배송지 설정 핸들러
  const toggleDefaultAddress = (addressId) => {
    const updatedAddresses = addresses.map(address =>
      address.id === addressId
        ? { ...address, isDefault: !address.isDefault }
        : { ...address, isDefault: false } // 기본배송지는 한 개만 설정되도록
    );
    setAddresses(updatedAddresses);
  };

  // 새로운 배송지 추가 핸들러
  const addNewAddress = () => {
    const newId = addresses.length ? Math.max(...addresses.map(addr => addr.id)) + 1 : 1; // 새로운 id는 기존 최대 id + 1
    // 기본배송지 설정 중복 방지
    const newAddressData = { ...newAddress, id: newId, isDefault: false };
    setAddresses([...addresses, newAddressData]);
    setIsAdding(false); // 폼 닫기
    setNewAddress({ name: '', address: '', phone: '', deliveryMethod: '택배', zipcode: '', detailAddress: '', isDefault: false }); // 폼 초기화
  };

  // 배송지 목록에서 기본배송지와 아닌 것을 분리하여 정렬
  const sortedAddresses = [
    ...addresses.filter(address => address.isDefault),
    ...addresses.filter(address => !address.isDefault),
  ];

  return (
    <div className="delivery-address-manager">
      <h1>배송지 관리</h1>

      {/* 배송지 목록 */}
      <ul className="address-list">
        {sortedAddresses.map((address) => (
          <li key={address.id} className="address-item">
            <div className="address-info">
              {isEditing[address.id] ? (
                <>
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) => updateAddressField(address.id, 'name', e.target.value)}
                    className="address-input"
                  />
                </>
              ) : (
                <strong>{address.name}</strong> // 수정 모드가 아닐 때는 이름만 출력
              )}
              <br />
              {isEditing[address.id] ? (
                <>
                  <div className="address-form-group">
                    <label htmlFor="zipcode" className="address-label">우편번호</label>
                    <div className="postcode-wrapper">
                      <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        value={address.zipcode}
                        onChange={(e) => updateAddressField(address.id, 'zipcode', e.target.value)}
                        className="address-input"
                        disabled
                        required
                      />
                      <button type="button" onClick={() => findPostcode(address.id)} className="postcode-btn">우편번호 찾기</button>
                    </div>
                  </div>

                  <div className="address-form-group">
                    <label htmlFor="address" className="address-label">주소</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={address.address}
                      onChange={(e) => updateAddressField(address.id, 'address', e.target.value)}
                      className="address-input"
                      required
                    />
                  </div>

                  <div className="address-form-group">
                    <label htmlFor="detailAddress" className="address-label">상세 주소</label>
                    <input
                      type="text"
                      id="detailAddress"
                      name="detailAddress"
                      value={address.detailAddress}  // 자동으로 채워진 상세 주소
                      onChange={(e) => updateAddressField(address.id, 'detailAddress', e.target.value)}
                      className="address-input"
                      placeholder="상세 주소를 입력하세요."
                      required
                    />
                  </div>

                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => updateAddressField(address.id, 'phone', e.target.value)}
                    className="address-input"
                  /><br />
                  <select
                    value={address.deliveryMethod}
                    onChange={(e) => updateAddressField(address.id, 'deliveryMethod', e.target.value)}
                    className="address-select"
                  >
                    <option value="택배">택배</option>
                    <option value="직접">직접 수령하겠습니다.</option>
                    <option value="경비실">경비실에서 수령하겠습니다.</option>
                    <option value="편의점">편의점에서 수령하겠습니다.</option>
                  </select>

                  <div className="default-checkbox">
                    <input
                      type="checkbox"
                      checked={address.isDefault}
                      onChange={() => toggleDefaultAddress(address.id)}
                    />
                    <label>기본 배송지</label>
                  </div>
                </>
              ) : (
                <>
                  {address.address}<br />
                  {address.zipcode}<br />
                  {address.detailAddress}<br />
                  {address.phone}<br />
                  <strong>수령 방법: </strong>{address.deliveryMethod}
                  <br />
                  {address.isDefault && <span className="default-label">[기본배송지]</span>}
                </>
              )}
            </div>

            {/* 수정 / 저장 버튼 */}
            <button onClick={() => toggleEditMode(address.id)} className="address-btn edit-btn">
              {isEditing[address.id] ? '저장' : '수정'}
            </button>
            <button onClick={() => deleteAddress(address.id)} className="address-btn delete-btn">삭제</button>
          </li>
        ))}
      </ul>

      {/* "배송지 추가" 버튼 */}
      {!isAdding && (
        <button onClick={() => setIsAdding(true)} className="address-btn add-btn">
          배송지 추가
        </button>
      )}

      {/* 새로운 배송지 추가 폼 */}
      {isAdding && (
        <div className="add-address-form">
          <h2>새로운 배송지 추가</h2>
          <div className="address-form-group">
            <label className="address-label">이름</label>
            <input
              type="text"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              className="address-input"
              required
            />
          </div>

          <div className="address-form-group">
            <label className="address-label">주소</label>
            <input
              type="text"
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              className="address-input"
              required
            />
          </div>

          <div className="address-form-group">
            <label className="address-label">우편번호</label>
            <input
              type="text"
              value={newAddress.zipcode}
              onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })}
              className="address-input"
              required
            />
            <button type="button" onClick={() => findPostcode(null)} className="postcode-btn">우편번호 찾기</button>
          </div>

          <div className="address-form-group">
            <label className="address-label">상세 주소</label>
            <input
              type="text"
              value={newAddress.detailAddress}
              onChange={(e) => setNewAddress({ ...newAddress, detailAddress: e.target.value })}
              className="address-input"
              required
            />
          </div>

          <div className="address-form-group">
            <label className="address-label">전화번호</label>
            <input
              type="text"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              className="address-input"
              required
            />
          </div>

          <div className="address-form-group">
            <label className="address-label">수령 방법</label>
            <select
              value={newAddress.deliveryMethod}
              onChange={(e) => setNewAddress({ ...newAddress, deliveryMethod: e.target.value })}
              className="address-select"
            >
              <option value="택배">택배</option>
              <option value="직접">직접 수령하겠습니다.</option>
              <option value="경비실">경비실에서 수령하겠습니다.</option>
              <option value="편의점">편의점에서 수령하겠습니다.</option>
            </select>
          </div>

          <div className="default-checkbox">
            <input
              type="checkbox"
              checked={newAddress.isDefault}
              onChange={() => setNewAddress({ ...newAddress, isDefault: !newAddress.isDefault })}
            />
            <label>기본 배송지</label>
          </div>

          {/* 제출 버튼 */}
          <button onClick={addNewAddress} className="address-btn save-btn">
            추가
          </button>
        </div>
      )}
    </div>
  );
}

export default DeliveryAddressManager;
