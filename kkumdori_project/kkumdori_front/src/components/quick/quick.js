import React, { useState, 
  // useEffect
 } from 'react';
import { Link } from 'react-router-dom';
import './quick.css';

const Side2 = () => {
  const [recentProducts,
    //  setRecentProducts
    ] = useState([]);  // 초기값을 빈 배열로 설정
  const [error, 
    // setError
  ] = useState(null);

  // // 최근 본 상품을 서버에서 가져오는 함수
  // const fetchRecentlyViewed = async () => {
  //   let token = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");  // JWT 토큰 가져오기

  //   if (!token) {
  //     console.error("JWT token is missing");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:8090/api/goods/recently-viewed", {
  //       method: "GET",
  //       headers: {
  //         "Authorization": `Bearer ${token}`,  // Authorization 헤더에 JWT 토큰 추가
  //         "Content-Type": "application/json"
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch recently viewed products");
  //     }

  //     const data = await response.json();
  //     // 콘솔로 데이터 확인
  //     console.log("Recently Viewed Products:", data);

  //     setRecentProducts(data);  // 최근 본 상품 목록 상태 업데이트
  //   } catch (error) {
  //     setError(error.message);  // 에러 처리
  //     console.error("Error fetching recently viewed products:", error);
  //   }
  // };

  // // 컴포넌트가 처음 렌더링될 때 최근 본 상품을 불러옴
  // useEffect(() => {
  //   fetchRecentlyViewed();
  // }, []);

  return (
    <aside className="side2">
      <div className="menu">
        {/* 최근 본 상품 박스 */}
        <div className="ad-banner1">
          <div className="ad-title">최근 본 상품</div>
          {error && <div className="error-message">{error}</div>}  {/* 에러 메시지 출력 */}
          <div className="recent-products">
            {recentProducts.length > 0 ? (
              recentProducts.map((product, index) => (
                <div key={index} className="recent-product-item">
                  <img
                    src={product.imageUrl || '/img/default-product.jpg'}
                    alt={product.name}
                  />
                  <div>{product.name}</div>
                  <Link to={`/productDetail/${product.id}`}>
                    <button className="view-button">상품 보기</button>
                  </Link>
                </div>
              ))
            ) : (
              <div>최근 본 상품이 없습니다.</div>
            )}
          </div>
        </div>

        {/* 이달의 추천 상품 박스 */}
        <div className="ad-banner2">
          <img src="/img/ad-banner.jpg" alt="광고 배너" />
          <div className="ad-title">이달의 추천상품</div>
          <div className="ad-content">대충 상품 설명</div>
          <Link to="/productList" state={{ image: '/img/ad-banner.jpg' }}>
            <button className="product-button">상품 보기</button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Side2;
