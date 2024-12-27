import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CartButton from '../cartbutton/CartButton';
import WishlistButton from '../wishlistbutton/WishlistButton';
import ReviewList from '../reviewlist/ReviewList';
import './ProductDetail.css';

function ProductDetail() {
    const { goods_no } = useParams();  // URL에서 상품 번호(goods_no) 추출
    const [product, setProduct] = useState(null);
    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {
        // goods_no 값이 유효한지 확인
        if (!goods_no) {
            console.error("상품 번호가 유효하지 않습니다.");
            console.log("상품 번호:", goods_no);  // 값 확인
            return;
        }

        const fetchProductDetails = async () => {
            try {
                console.log("상품 번호:", goods_no);  // goods_no 값 확인
                // 상품 번호를 URL에 동적으로 삽입
                const response = await axios.get(`http://localhost:8090/api/goods/goodsDetail/${goods_no}`);
                console.log("Fetched Product Data:", response.data); // 데이터 확인
                setProduct(response.data);  // 상품 정보 저장
            } catch (error) {
                console.error('상품 상세 정보를 가져오는 데 실패했습니다.', error);
            }
        };

        fetchProductDetails();  // 상품 정보 가져오기
    }, [goods_no]);  // goods_no가 변경될 때마다 새로 fetch

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
    const shippingFee = product.shippingFee ? product.shippingFee.toLocaleString() : '배송비 정보 없음';
    const estimatedArrival = product.estimatedArrival || '도착 예정일 정보 없음';
    const seller = product.seller || '판매자 정보 없음';
    const shippingCompany = product.shippingCompany || '배송사 정보 없음';

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
                        <WishlistButton />
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
