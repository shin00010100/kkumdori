import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CartButton from '../cartbutton/CartButton';
import ReviewList from '../reviewlist/ReviewList';
import { useNavigate } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
    const { goods_no } = useParams();  // URL에서 상품 번호(goods_no) 추출
    const [product, setProduct] = useState(null);
    const [reviewCount, setReviewCount] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);  // 찜 상태 관리
    const [userInfo, setUserInfo] = useState(null);  // 사용자 정보 관리
    const navigate = useNavigate();

    // 상품 정보 및 사용자 정보 불러오기
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

                    // 두 번째 API 호출 (사용자 상세 정보)
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

        // 상품 정보 가져오기
        if (goods_no) {
            const fetchProductDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:8090/api/goods/goodsDetail/${goods_no}`);
                    setProduct(response.data);  // 상품 정보 저장
                } catch (error) {
                    console.error('상품 상세 정보를 가져오는 데 실패했습니다.', error);
                }
            };

            fetchProductDetails();
        } else {
            console.error("상품 번호가 유효하지 않습니다.");
        }
    }, [goods_no]);  // goods_no가 변경될 때마다 새로 fetch

    // 위시리스트 추가/삭제
    const handleWishlist = async () => {
        if (!userInfo) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate('/login'); // 로그인 페이지로 리디렉션
            return;
        }

        // JWT 토큰 확인
        let token = sessionStorage.getItem("jwt"); // 세션 스토리지에서 토큰 확인
        if (!token) {
            token = localStorage.getItem("jwt"); // 로컬 스토리지에서 토큰 확인
        }

        if (!token) {
            alert("로그인이 필요합니다. 로그인 페이지로 리디렉션합니다.");
            navigate('/login'); // 로그인 페이지로 리디렉션
            return;
        }

        try {
            // 위시리스트에 상품 추가 요청 (쿼리 파라미터 방식으로 변경)
            const response = await axios.post(`http://localhost:8090/api/wishlist/add?userNo=${userInfo.userNo}&goodsNo=${goods_no}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`, // 토큰 포함
                }
            });

            if (response.data === "위시리스트에 추가되었습니다.") {
                setIsWishlisted(true);  // 찜 상태 업데이트
                alert("위시리스트에 추가되었습니다.");
            } else if (response.data === "이미 위시리스트에 존재하는 상품입니다.") {
                alert("이미 위시리스트에 있는 상품입니다.");
            } else {
                alert("위시리스트에 추가하는 데 실패했습니다.");
            }
        } catch (error) {
            console.error('위시리스트 추가 오류:', error);
            alert("위시리스트에 추가하는 데 실패했습니다.");
        }
    };

    // 상품이 로딩되지 않은 경우 처리
    if (!product) {
        return <div>상품을 찾을 수 없습니다.</div>;  // 상품이 없으면 에러 메시지 출력
    }

    // 별점 렌더링 함수
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="star full">⭐</span>);
            } else if (i === fullStars && halfStar) {
                stars.push(
                    <span key={i} className="star half" style={{ position: 'relative' }}>
                        <span className="star full">⭐</span>
                        <span className="star empty">⭐</span>
                    </span>
                );
            } else {
                stars.push(<span key={i} className="star empty">⭐</span>);
            }
        }

        return stars;
    };

    const price = product.price ? product.price.toLocaleString() : '가격 정보 없음';

    return (
        <div className="product-detail-container">
            <img src="/img/event1.jpg" alt="상품 이미지" className="banner-image" />
            <div className="product-detail">
                <div className="product-image">
                    <img src={product.imagePath} alt={product.goodsName} />
                </div>
                <div className="product-info">
                    <h1>{product.goodsName}</h1>
                    <p className="rating">
                        별점: {product.starRank} / 5.0 {renderStars(product.starRank)}
                        ({reviewCount}개의 리뷰)
                    </p>
                    <p>카테고리: {product.category.categoryName}</p>
                    <p>남은 수량: {product.stock}</p>
                    <p>할인율: {product.discount}%</p>
                    <p>상품 가격: {price} 원</p>     
                    <p>상품 소개: {product.description}</p>
                    
                    <div className="purchase-actions">
                        <CartButton product={product} />
                        <button className="wishlist-button" onClick={handleWishlist}>
                            <span className="heart-icon">{isWishlisted ? "❤️" : "🤍"}</span>
                            <span className="wishlist-text">찜하기</span>
                        </button>
                    </div>

                    <div className="product-tabs">
                        <span>상품평({reviewCount})</span> |
                        <Link to="/customer-inquiry">상품 문의</Link> |
                        <Link to="/shipping-returns">배송/교환/반품 안내</Link>
                    </div>
                    <ReviewList onReviewCountChange={setReviewCount} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
