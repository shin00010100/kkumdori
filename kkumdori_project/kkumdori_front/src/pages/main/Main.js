import React, { useState } from 'react';
import './Main.css';

const Main = () => {
  // 팝업 배너 표시 여부 상태
  const [showPopup, setShowPopup] = useState(true);
  // 체크박스 상태 관리
  const [isChecked, setIsChecked] = useState(false);

  // 이미지 변경을 위한 상태 관리
  const [imageIndex, setImageIndex] = useState(0);

  const eventImages = [
    '/img/event1.jpg', // 첫 번째 이벤트 이미지
    '/img/event2.jpg', // 두 번째 이벤트 이미지
    '/img/event3.jpg', // 세 번째 이벤트 이미지
  ];

  const handleClick = (index) => {
    setImageIndex(index);
  };

  const handleClosePopup = () => {
    if (isChecked) {
      localStorage.setItem('dismissedPopup', 'true'); // 체크박스가 선택되었으면 로컬 스토리지에 저장
    }
    setShowPopup(false);
  };

  // 팝업 배너가 오늘 하루 보지 않기 체크박스와 함께 표시되는지 확인
  React.useEffect(() => {
    if (localStorage.getItem('dismissedPopup') === 'true') {
      setShowPopup(false);
    }
  }, []);

  return (
    <div className="main-container">
      {/* 이벤트 배너 */}
      <div className="event-banner">
        <img src={eventImages[imageIndex]} alt="Event Banner" />
        <div className="event-title">오늘의 이벤트</div>
        {/* 숫자 버튼들 */}
        <div className="banner-buttons">
          {eventImages.map((_, index) => (
            <button
              key={index}
              className={`banner-button ${imageIndex === index ? 'active' : ''}`}
              onClick={() => handleClick(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 2x2 배열의 상품 이미지들 */}
      <div className="main-product-grid">
        <div className="main-product-item">
          <img src="/img/recommended.jpg" alt="추천 상품" />
          <div className="product-label">추천 상품</div>
        </div>
        <div className="main-product-item">
          <img src="/img/event-product.jpg" alt="이벤트 상품" />
          <div className="product-label">이벤트 상품</div>
        </div>
        <div className="main-product-item">
          <img src="/img/new-product.jpg" alt="신상품" />
          <div className="product-label">신상품</div>
        </div>
        <div className="main-product-item">
          <img src="/img/discount-product.jpg" alt="할인 상품" />
          <div className="product-label">할인 상품</div>
        </div>
      </div>

      {/* 팝업 배너 */}
      {showPopup && (
        <div className="popup-banner">
          <img src="/img/popup-banner.jpg" alt="Popup Banner" />
          <span className="close-button" onClick={handleClosePopup}>
            [X]
          </span>
          <div className="dismiss-checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            오늘 하루 보지 않기
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
