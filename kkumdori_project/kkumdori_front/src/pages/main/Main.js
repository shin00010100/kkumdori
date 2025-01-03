import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // axios 추가
import "./Main.css";

const API_BASE_URL = "http://localhost:8090/api";

const Main = () => {
  // 상태 관리
  const [showPopup, setShowPopup] = useState(true); // 팝업 배너 표시 여부
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태
  const [eventImages, setEventImages] = useState([]); // 배너 이미지
  const [popupBanner, setPopupBanner] = useState(null); // 팝업 배너
  const [imageIndex, setImageIndex] = useState(0); // 현재 표시 중인 배너 인덱스

  // API 호출로 배너 및 팝업 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 배너 데이터 가져오기
        const bannerResponse = await axios.get(`${API_BASE_URL}/banners`);
        const sortedBanners = bannerResponse.data.sort((a, b) => a.displayOrder - b.displayOrder);
        setEventImages(
          sortedBanners.map((banner) => ({
            imagePath: banner.imagePath,
            link: banner.link,
            order: banner.displayOrder,
          }))
        );
  
        // 팝업 데이터 가져오기
        const popupResponse = await axios.get(`${API_BASE_URL}/popups`);
        const activePopup = popupResponse.data.find((popup) => popup.isActive); // 활성 팝업만
        setPopupBanner(activePopup || null);
      } catch (err) {
        console.error("데이터를 가져오는 중 오류 발생:", err);
      }
    };
  
    fetchData();
  
    // 로컬 스토리지 확인
    if (localStorage.getItem("dismissedPopup") === "true") {
      setShowPopup(false);
    }
  
    // resetToken 제거
    sessionStorage.removeItem("resetToken");
  }, []);
  
  useEffect(() => {
    console.log("Event Images:", eventImages); // 디버깅용
    console.log("Popup Images:", popupBanner)
  }, [eventImages, popupBanner]);

  // 배너 변경
  const handleClick = (index) => {
    setImageIndex(index);
  };

  // 팝업 닫기
  const handleClosePopup = () => {
    if (isChecked) {
      localStorage.setItem("dismissedPopup", "true");
    }
    setShowPopup(false);
  };

  return (
    <div className="main-container">
      {/* 이벤트 배너 */}
      {eventImages.length > 0 && (
        <div className="event-banner">
          <img
        src={
          eventImages[imageIndex].imagePath
            ? `http://localhost:8090/api/images/${eventImages[imageIndex].imagePath.split('uploads/images/')[1]}`
            : "path/to/default/image.png"
        }
        alt={`Event Banner ${imageIndex + 1}`}
        onClick={() => {
          const link = eventImages[imageIndex].link;
          if (link) {
            window.open(link, "_blank"); // 새 탭에서 링크 열기
          }
        }}
        className="event-image"
        style={{ cursor: "pointer" }} // 클릭 가능한 스타일 추가
        />
        <div className="event-title">오늘의 이벤트</div>
        <div className="banner-buttons">
          {eventImages.map((_, index) => (
            <button
              key={index}
              className={`banner-button ${imageIndex === index ? "active" : ""}`}
              onClick={() => handleClick(index)}
            >
              {index + 1} {/* 버튼 순서 표시 */}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2x2 배열의 상품 이미지들 */}
      {/* <div className="main-product-grid">
        <div className="main-product-item">
          <Link to="/productList">
            <img src="/img/recommended.jpg" alt="추천 상품" />
            <div className="product-label">추천 상품</div>
          </Link>
        </div>
        <div className="main-product-item">
          <Link to="/productList">
            <img src="/img/event-product.jpg" alt="이벤트 상품" />
            <div className="product-label">이벤트 상품</div>
          </Link>
        </div>
        <div className="main-product-item">
          <Link to="/productList">
            <img src="/img/new-product.jpg" alt="신상품" />
            <div className="product-label">신상품</div>
          </Link>
        </div>
        <div className="main-product-item">
          <Link to="/productList">
            <img src="/img/discount-product.jpg" alt="할인 상품" />
            <div className="product-label">할인 상품</div>
          </Link>
        </div>    
      </div> */}

      <div className="main-product-item">
          <Link to="/productList">
            <img src="/img/kkumdori_mainpage.png" alt="상품" />
            <div className="product-label">모든 상품 보러가기!</div>
          </Link>
      </div>

      {/* 팝업 배너 */}
      {showPopup && popupBanner && (
        <div className="popup-banner">
          <img
                src={popupBanner.imagePath ? `http://localhost:8090/api/images/${popupBanner.imagePath.split('uploads/images/')[1]}` : "path/to/default/image.png"}
                alt={popupBanner.goodsName}
                onClick={() => {
                  if (popupBanner.link) {
                    window.open(popupBanner.link, "_blank"); // 팝업 링크 새 탭에서 열기
                  }
                }}
                className="product-image"
                style={{ cursor: "pointer" }} // 클릭 가능한 스타일 추가
              />
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
