import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import products from '../../data/product';
import CartButton from '../cartbutton/CartButton';
import WishlistButton from '../wishlistbutton/WishlistButton';
import ReviewList from '../reviewlist/ReviewList';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [reviewCount, setReviewCount] = useState(0);

    const product = products.find(product => product.id === parseInt(id));
    if (!product) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

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
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="rating">
                        별점: {product.rating} / 5.0 {renderStars(product.rating)}
                        ({reviewCount}개의 리뷰)
                    </p>
                    <p>{price} 원</p>
                    <p>배송비: {shippingFee} 원</p>
                    <p>도착 예정 날짜: {estimatedArrival}</p>
                    <p>판매자: {seller}</p>
                    <p>배송사: {shippingCompany}</p>

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
