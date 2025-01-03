import React, { useState } from "react";
import './myreview.css';

function MyReview() {
  // 빈 리뷰 목록 상태
  const [reviews, setReviews] = useState([]); // 리뷰 목록 상태
  const [editIndex, setEditIndex] = useState(null); // 수정할 리뷰의 인덱스
  const [editReview, setEditReview] = useState(""); // 수정할 리뷰 내용
  const [editRating, setEditRating] = useState(5); // 수정할 별점
  const [editProductName, setEditProductName] = useState(""); // 수정할 상품명
  const [editImageUrl, setEditImageUrl] = useState(""); // 수정할 이미지 URL
  const [editSellerReply, setEditSellerReply] = useState(""); // 수정할 판매자 답변

  // 리뷰 삭제 함수
  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  // 수정 모드 활성화
  const handleEditReview = (index) => {
    setEditIndex(index);
    const reviewToEdit = reviews[index];
    setEditReview(reviewToEdit.reviewText);
    setEditRating(reviewToEdit.rating);
    setEditProductName(reviewToEdit.productName);
    setEditImageUrl(reviewToEdit.imageUrl);
    setEditSellerReply(reviewToEdit.sellerReply);
  };

  // 수정 저장 함수
  const handleSaveEditReview = () => {
    if (editReview.trim() !== "") {
      const updatedReviews = reviews.map((review, index) =>
        index === editIndex
          ? {
              ...review,
              productName: editProductName,  // 상품명은 수정하지 않음
              rating: editRating,
              reviewText: editReview,
              imageUrl: editImageUrl, // 이미지 URL 수정
              sellerReply: review.sellerReply,  // 판매자 답변은 그대로 유지
            }
          : review
      );
      setReviews(updatedReviews);
      setEditIndex(null); // 수정 모드 종료
      setEditReview(""); // 입력 필드 초기화
      setEditRating(5); // 별점 초기화
      setEditProductName(""); // 상품명 초기화
      setEditImageUrl(""); // 이미지 URL 초기화
      setEditSellerReply(""); // 판매자 답변 초기화
    }
  };

  // 별점 클릭 시 설정 함수
  const handleRatingChange = (newRating) => {
    setEditRating(newRating);
  };

  // 별점 표시 함수
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "filled" : "empty"}
          onClick={() => handleRatingChange(i)}  // 클릭시 해당 별점을 설정
          onMouseEnter={() => setEditRating(i)}  // 마우스를 올리면 해당 별점을 강조
          onMouseLeave={() => setEditRating(rating)}  // 마우스를 벗어나면 원래 별점으로 되돌리기
          style={{ cursor: 'pointer', fontSize: '20px', color: i <= rating ? '#FFD700' : '#ccc' }}  // 색상과 커서 스타일 추가
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // 이미지 파일을 선택했을 때 URL로 변환하여 미리보기
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImageUrl(reader.result);  // 이미지 URL을 상태로 저장
      };
      reader.readAsDataURL(file);  // 파일을 읽어서 data URL 형식으로 변환
    }
  };

  // 가격 합계 계산
  const totalPrice = reviews.reduce((sum, review) => sum + review.price * review.quantity, 0);

  return (
    <div className="myreview">
      <h1>리뷰 관리</h1>

      {/* 리뷰 목록 */}
      <div>
        <ul className="my-review-list">
          {reviews.map((review, index) => (
            <li key={index} className="review-item">
              <div className="review-header">
                <img src={review.imageUrl} alt={review.productName} width="100" />
                <div className="review-info">
                  <h2>{review.productName}</h2>
                  <div>{renderStars(review.rating)}</div>
                  <p>가격: {review.price.toLocaleString()} 원</p>
                  <p>구매 수량: {review.quantity}</p>
                  <p>합계: {(review.price * review.quantity).toLocaleString()} 원</p>
                </div>
              </div>
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editProductName}
                    onChange={(e) => setEditProductName(e.target.value)}
                    disabled // 상품명 수정 불가
                    className="edit-input"
                  />
                  <textarea
                    value={editReview}
                    onChange={(e) => setEditReview(e.target.value)}
                    className="edit-textarea"
                  />
                  <div>{renderStars(editRating)}</div>
                  {/* 숨겨진 파일 입력을 커스텀 버튼으로 대체 */}
                  <label className="image-upload-btn">
                    이미지 수정
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: "none" }}  // 실제 파일 입력을 숨김
                    />
                  </label>
                  {/* 이미지 미리보기 */}
                  {editImageUrl && (
                    <div>
                      <h4>이미지 미리보기:</h4>
                      <img src={editImageUrl} alt="미리보기" style={{ maxWidth: "200px", marginTop: "10px" }} />
                    </div>
                  )}
                  {/* 판매자 댓글은 수정할 수 없도록 disabled 처리 */}
                  <textarea
                    value={editSellerReply}
                    onChange={(e) => setEditSellerReply(e.target.value)}
                    disabled
                    placeholder="판매자 답변을 입력할 수 없습니다."
                    className="seller-reply-textarea"
                  />
                  <button className="save-edit-btn" onClick={handleSaveEditReview}>저장</button>
                </div>
              ) : (
                <div>
                  <p>{review.reviewText}</p>
                  {review.sellerReply && (
                    <div className="seller-reply">
                      <strong>판매자 답변:</strong> {review.sellerReply}
                    </div>
                  )}
                  <div className="review-actions">
                    <button className="edit-review-btn" onClick={() => handleEditReview(index)}>수정</button>
                    <button className="delete-review-btn" onClick={() => handleDeleteReview(index)}>삭제</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 가격 합계 출력 */}
      <div className="total-price">
        <h3>전체 가격 합계: {totalPrice.toLocaleString()} 원</h3>
      </div>
    </div>
  );
}

export default MyReview;
