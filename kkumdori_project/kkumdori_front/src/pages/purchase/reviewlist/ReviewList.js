import React, { useEffect } from 'react';
import './ReviewList.css';

function ReviewList({ onReviewCountChange }) {
    const reviews = [
        { id: 1, user: "이현서", comment: "상품이 매우 훌륭합니다", rating: 5, photo: "path/to/photo1.jpg" },
        { id: 2, user: "정태식", comment: "만족하면서 쓰고 있어요", rating: 4, photo: "path/to/photo2.jpg" },
        { id: 3, user: "최현성", comment: "약간 기스가 있는데 상품은 좋아요", rating: 3.5 },
        { id: 4, user: "나 최현성 아니다", comment: "기대한 거 보다 별로에요", rating: 1, photo: "path/to/photo2.jpg" }
    ];

    useEffect(() => {
        onReviewCountChange(reviews.length);
    }, [reviews.length, onReviewCountChange]);

    return (
        <div className="review-list">
            <h2>리뷰들</h2>
            {reviews.map((review) => (
                <div key={review.id} className="review">
                    <p><strong>{review.user}</strong>: ⭐ {review.rating}</p>
                    {review.photo && <img src={review.photo} alt={`${review.user}의 리뷰 사진`} className="review-photo" />}
                    <p>{review.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default ReviewList;
