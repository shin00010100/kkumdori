import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Pay.css';

const Pay = () => {
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || []; // 전달받은 상품 정보

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zipcode: '',
    address: '',
    detailAddress: '',
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업창 상태
  const [paymentMethod, setPaymentMethod] = useState(''); // 선택된 결제 방식

  // 총 결제 금액 계산 함수
  const calculateTotalPrice = () => {
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // 우편번호 찾기 함수
  const handlePostcode = () => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.body.appendChild(script);

    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          const fullAddress = data.address;
          const extraAddress = data.addressType === 'R' ? data.bname : '';

          setFormData({
            ...formData,
            zipcode: data.zonecode,
            address: fullAddress + (extraAddress ? ` ${extraAddress}` : ''),
            detailAddress: '',
          });
        },
      }).open();
    };
  };

  // 내 정보 가져오기 함수
  const handleFetchMyInfo = () => {
    setFormData({
      name: '홍길동', // 예시 데이터
      phone: '010-1234-5678',
      zipcode: '12345',
      address: '서울특별시 강남구 테헤란로',
      detailAddress: '1003호',
    });
  };

  // 팝업 열기 함수
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // 팝업 닫기 함수
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // 결제 방식 선택 처리 함수
  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setIsPopupOpen(false); // 팝업 닫기
  };

  return (
    <div className="payment-page">
      <h1>결제 페이지</h1>

      {/* 주문 상품 요약 */}
      <div className="order-summary">
        <h2>주문 상품</h2>
        {selectedItems.map((item, index) => (
          <div className="order-item" key={index}>
            <img src={item.image} alt={item.name} className="product-img" />
            <div className="product-info">
              <p>상품명: {item.name}</p>
              <p>가격: {item.price.toLocaleString()}원</p>
              <p>개수: {item.quantity}개</p>
            </div>
          </div>
        ))}
        <div className="total-price">
          총 결제 금액: {calculateTotalPrice().toLocaleString()}원
        </div>
      </div>

      {/* 배송 정보 */}
      <div className="shipping-info">
        <h2>배송 정보</h2>
        <button className="fetch-my-info-button" onClick={handleFetchMyInfo}>
          내 정보 가져오기
        </button>
        <label>
          이름:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          전화번호:
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </label>
        <label>
          우편번호:
          <div className="address-container">
            <input
              type="text"
              value={formData.zipcode}
              onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
              disabled
            />
            <button type="button" onClick={handlePostcode}>
              우편번호 찾기
            </button>
          </div>
        </label>
        <label>
          주소:
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled
            />
        </label>
        <label>
          상세 주소:
          <input
            type="text"
            value={formData.detailAddress}
            onChange={(e) => setFormData({ ...formData, detailAddress: e.target.value })}
          />
        </label>
      </div>

      {/* 결제 버튼 */}
      <button className="payment-button" onClick={handleOpenPopup}>
        결제하기
      </button>

      {/* 팝업창 */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>결제 방식 선택</h2>
            <button onClick={() => handlePaymentSelect('카드')}>카드 결제</button>
            <button onClick={() => handlePaymentSelect('꿈돌이머니')}>꿈돌이 머니</button>
            <button onClick={() => handlePaymentSelect('휴대폰')}>카카오 페이</button>
            <button className="close-popup" onClick={handleClosePopup}>
              취소
            </button>
          </div>
        </div>
      )}

      {/* 선택된 결제 방식 표시 */}
      {paymentMethod && (
        <div className="selected-payment-method">
          선택된 결제 방식: {paymentMethod}
        </div>
      )}
    </div>
  );
};

export default Pay;
