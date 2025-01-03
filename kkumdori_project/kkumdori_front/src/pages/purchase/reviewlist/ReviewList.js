import React, { useEffect, useState } from 'react';
import './ReviewList.css';
import axios from 'axios';

function ReviewList({ onReviewCountChange, goodsNo }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!goodsNo) {
            setError('상품 번호가 제공되지 않았습니다.');
            setLoading(false);
            return;
        }

        const fetchReviews = async () => {
            try {
                console.log("Fetching reviews for goodsNo:", goodsNo);
                const response = await axios.get(`http://localhost:8090/api/reviewlists?goodsNo=${goodsNo}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer YOUR_TOKEN`  // 필요시 인증 토큰 추가
                    }
                });
                console.log("Response Status:", response.status);
                console.log("Response Data:", response.data);

                if (Array.isArray(response.data)) {
                    setReviews(response.data);
                    onReviewCountChange(response.data.length);
                } else {
                    setError('리뷰 데이터 형식이 잘못되었습니다.');
                }
            } catch (error) {
                console.error("리뷰 데이터를 가져오는 데 실패했습니다.", error);
                setError('리뷰 데이터를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [goodsNo, onReviewCountChange]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="review-list">
            <h2>리뷰들</h2>
            {reviews.length === 0 ? (
                <p>이 상품에는 리뷰가 없습니다.</p>
            ) : (
                reviews.map((review) => {
                    const starRank = Number(review.starRank) || 0; // 별점 값을 숫자로 변환, 값이 없으면 0으로 처리

                    console.log("StarRank for review", review.reviewNo, ":", starRank); // 별점 확인용 로그

                    return (
                        <div key={review.reviewNo} className="review">
                            <div className="review-content-wrapper">
                                {/* 이미지 표시 */}
                                {review.image && (
                                    <img
                                        src={review.image ? `http://localhost:8090/api/images/${review.image.split('uploads/images/')[1]}` : "path/to/default/image.png"}
                                        alt={`${review.authorNo || "작성자"}의 리뷰 사진`}
                                        className="review-photo"
                                    />
                                )}

                                {/* 별점 표시 (별점 갯수에 맞게 별 표시) */}
                                <div className="review-rating">
                                    {Array.from({ length: starRank }, (_, index) => (
                                        <span
                                            key={index}
                                            className={`star ${index < starRank ? 'filled' : ''}`}
                                        >
                                            ⭐
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 제목과 내용 표시 */}
                            <h3 className="review-title">{review.title}</h3>
                            <p className="review-content">{review.content}</p>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default ReviewList;
