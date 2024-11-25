import React, { useState } from 'react';
import "./return.css";

// 우편번호 API
const daumPostcodeScript = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const ReturnExchangePage = () => {
  const [formData, setFormData] = useState({
    orderNumber: 'ORD123456789',  // 임의의 주문 번호
    productName: '꿈카롱',  // 임의의 상품명
    reason: '', // 사유
    customReason: '', // 사용자가 작성하는 자유 사유
    type: 'return', // 'return' or 'exchange'
    address: '', // 수거지 주소
    zipcode: '', // 우편번호
    detailAddress: '', // 상세 주소
    refundAccount: '', // 환불 계좌
    bank: '', // 선택한 은행
    phoneNumber: '', // 전화번호
    mobilePhone: '', // 휴대폰 번호
    pickupNote: '', // 수거 시 참고사항
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출을 처리할 부분
    console.log('폼 제출:', formData);
  };

  const handleCancel = () => {
    setFormData({
      orderNumber: 'ORD123456789',
      productName: '꿈카롱',
      reason: '',
      customReason: '',
      type: 'return',
      address: '',
      zipcode: '',
      detailAddress: '',
      refundAccount: '',
      bank: '',
      phoneNumber: '',
      mobilePhone: '',
      pickupNote: '',
    });
  };

  // 우편번호 찾기 함수
  const handlePostcode = () => {
    const script = document.createElement('script');
    script.src = daumPostcodeScript;
    document.body.appendChild(script);

    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          setFormData({
            ...formData,
            zipcode: data.zonecode,
            address: data.address,
          });
        }
      }).open();
    };
  };

  // 임의로 추가할 상품 데이터
  const productData = {
    productId: '123456789',
    purchaseDate: '2024-10-15',
    imageUrl: 'https://via.placeholder.com/150',
  };

  // 은행 목록
  const bankList = [
    { code: '001', name: '국민은행' },
    { code: '002', name: '하나은행' },
    { code: '003', name: '우리은행' },
    { code: '004', name: '신한은행' },
    { code: '005', name: '농협은행' },
    { code: '011', name: '카카오뱅크' },
    { code: '012', name: '토스뱅크' },
    { code: '020', name: 'IBK기업은행' },
    { code: '045', name: '씨티은행' },
  ];

  return (
    <div className="return-exchange-container">
      <h1 className="return-exchange-header">반품/교환 신청</h1>
      
      {/* 상품 정보 영역 */}
      <div className="product-info">
        <img src={productData.imageUrl} alt="상품 이미지" className="product-image" />
        <div className="product-details">
          <p><strong>상품 ID:</strong> {productData.productId}</p>
          <p><strong>구매 날짜:</strong> {productData.purchaseDate}</p>
        </div>
      </div>

      <form className="return-exchange-form" onSubmit={handleSubmit}>
        <div className="return-exchange-form-group">
          <label htmlFor="orderNumber" className="return-exchange-label">주문 번호</label>
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            className="return-exchange-input"
            disabled
            required
          />
        </div>

        <div className="return-exchange-form-group">
          <label htmlFor="productName" className="return-exchange-label">상품명</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="return-exchange-input"
            disabled
            required
          />
        </div>

        <div className="return-exchange-form-group">
          <label className="return-exchange-label">반품/교환</label>
          <div className="return-exchange-radio-group">
            <label className="return-exchange-radio">
              <input
                type="radio"
                name="type"
                value="return"
                checked={formData.type === 'return'}
                onChange={handleChange}
                className="return-exchange-radio-input"
              />
              반품
            </label>
            <label className="return-exchange-radio">
              <input
                type="radio"
                name="type"
                value="exchange"
                checked={formData.type === 'exchange'}
                onChange={handleChange}
                className="return-exchange-radio-input"
              />
              교환
            </label>
          </div>
        </div>

        {/* 사유 선택 예시 추가 */}
        <div className="return-exchange-form-group">
          <label htmlFor="reason" className="return-exchange-label">사유 선택</label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="return-exchange-select"
            required
          >
            <option value="">사유를 선택하세요</option>
            <option value="상품 불량">상품 불량</option>
            <option value="배송 지연">배송 지연</option>
            <option value="주문 실수">주문 실수</option>
            <option value="상품 마음에 안 듦">상품 마음에 안 듦</option>
            <option value="기타">기타</option>
          </select>
        </div>

        {/* 자유롭게 작성할 수 있는 사유 입력란 */}
        <div className="return-exchange-form-group">
          <label htmlFor="customReason" className="return-exchange-label">기타 사유 (자유 작성)</label>
          <textarea
            id="customReason"
            name="customReason"
            value={formData.customReason}
            onChange={handleChange}
            className="return-exchange-textarea"
            placeholder="사유를 자유롭게 작성해주세요."
            rows="4"
          />
        </div>

        {/* 은행 선택 및 계좌 입력란 (반품을 선택했을 때만 표시) */}
        {formData.type === 'return' && (
          <>
            <div className="return-exchange-form-group">
              <label htmlFor="bank" className="return-exchange-label">은행 선택</label>
              <select
                id="bank"
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                className="return-exchange-select"
                required
              >
                <option value="">은행을 선택하세요</option>
                {bankList.map((bank) => (
                  <option key={bank.code} value={bank.name}>{bank.name}</option>
                ))}
              </select>
            </div>

            <div className="return-exchange-form-group">
              <label htmlFor="refundAccount" className="return-exchange-label">환불 계좌</label>
              <input
                type="text"
                id="refundAccount"
                name="refundAccount"
                value={formData.refundAccount}
                onChange={handleChange}
                className="return-exchange-input"
                placeholder="환불 받을 계좌를 입력해주세요."
                required
              />
            </div>
          </>
        )}

        {/* 우편번호 찾기 및 주소 입력란 */}
        <div className="return-exchange-form-group">
          <label htmlFor="zipcode" className="return-exchange-label">우편번호</label>
            <div className="postcode-wrapper">
             <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="return-exchange-input"
              disabled
              required
              />
            <button type="button" onClick={handlePostcode} className="postcode-btn">우편번호 찾기</button>
          </div>
        </div>


        <div className="return-exchange-form-group">
          <label htmlFor="address" className="return-exchange-label">주소</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="return-exchange-input"
            disabled
            required
          />
        </div>

        <div className="return-exchange-form-group">
          <label htmlFor="detailAddress" className="return-exchange-label">상세 주소</label>
          <input
            type="text"
            id="detailAddress"
            name="detailAddress"
            value={formData.detailAddress}
            onChange={handleChange}
            className="return-exchange-input"
            placeholder="상세 주소를 입력하세요."
            required
          />
        </div>

        {/* 휴대폰 번호, 전화번호, 수거 시 참고사항 입력란 */}
        <div className="return-exchange-form-group">
          <label htmlFor="mobilePhone" className="return-exchange-label">휴대폰 번호</label>
          <input
            type="text"
            id="mobilePhone"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleChange}
            className="return-exchange-input"
            placeholder="휴대폰 번호를 입력해주세요."
            required
          />
        </div>

        <div className="return-exchange-form-group">
          <label htmlFor="phoneNumber" className="return-exchange-label">전화번호</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="return-exchange-input"
            placeholder="전화번호를 입력해주세요."
            required
          />
        </div>

        <div className="return-exchange-form-group">
          <label htmlFor="pickupNote" className="return-exchange-label">수거 시 참고사항</label>
          <textarea
            id="pickupNote"
            name="pickupNote"
            value={formData.pickupNote}
            onChange={handleChange}
            className="return-exchange-textarea"
            placeholder="수거 시 참고할 사항을 작성해주세요."
            rows="4"
          />
        </div>

        <div className="return-exchange-buttons">
        <div className="return-exchange-buttons">
            <button type="submit" className="return-exchange-button">신청하기</button>
            <button type="button" className="return-exchange-cancel">취소하기</button>
        </div>

        </div>
      </form>
    </div>
  );
};

export default ReturnExchangePage;
