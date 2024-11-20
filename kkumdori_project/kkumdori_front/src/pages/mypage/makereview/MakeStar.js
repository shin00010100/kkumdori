import React, { useState } from 'react';
import './makestar.css';

const MakeStar = () => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [file, setFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleStarHover = (rating) => {
    setSelectedRating(rating);
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    console.log('Selected Rating:', rating);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    console.log('Uploaded file:', uploadedFile);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);

    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      console.log('Dropped file:', uploadedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRating) {
      alert('평점을 선택해주세요.');
      return;
    }
    if (reviewText.length < 15) {
      alert('리뷰는 15자 이상 작성해주세요.');
      return;
    }

    console.log('Review Submitted:', { selectedRating, reviewText, file });

    // 상태 초기화
    setSelectedRating(null);
    setReviewText('');
    setFile(null);
  };

  // 이미지 미리보기
  const previewImage = file ? URL.createObjectURL(file) : null;

  return (
    <div className="text-center py-20">
      {/* 상품 정보 섹션 */}
      <div className="star-product-info mb-8">
        <img
          src="/img/ex01.png" // 임의로 상품 이미지 URL 설정
          alt="상품 이미지"
          className="star-img"
        />
        <h2 className="font-semibold text-xl mt-4">상품명: 꿈카롱</h2>
        <p className="text-gray-500">구매일: 2024년 11월 8일</p>
      </div>

      <p>구매하신 상품은 어떠셨나요?</p>
      <p>평점을 남겨주세요</p>
      <div className="flex justify-center items-center">
        {[1, 2, 3, 4, 5].map((rating) => (
          <svg
            key={rating}
            xmlns="http://www.w3.org/2000/svg"
            fill={selectedRating && rating <= selectedRating ? 'orange' : 'lightgray'}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8 mt-2 flex cursor-pointer"
            onMouseEnter={() => handleStarHover(rating)}
            onClick={() => handleStarClick(rating)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ))}
      </div>

      <label htmlFor="message" className="block mb-2 font-medium text-gray-900">
        상세 리뷰를 작성해주세요
      </label>
      <textarea
        id="message"
        rows="4"
        minLength={15}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="star-textarea"
        placeholder="어떤 점이 좋았나요? 품질은 어떤가요? 15자 이상 작성해주세요."
      ></textarea>

      <div className="mt-5">
        <p className="block mb-2 font-medium text-gray-900">사진을 등록해주세요</p>

        {/* 파일 업로드 영역 */}
        <div
          className={`rounded-md border-4 ${isDragActive ? 'border-blue-500' : 'border-gray-300'} bg-gray-50 p-6 shadow-lg w-64 h-40 mt-2 transition-all duration-300 ease-in-out`}
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 mb-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p className="text-gray-500 text-lg">파일을 드래그하거나 클릭하여 업로드</p>
          </div>

          {/* Label을 클릭하면 input[type="file"]이 활성화됩니다 */}
          <label htmlFor="upload" className="cursor-pointer w-full h-full">
            <input
              id="upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* 미리보기 이미지 */}
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-20 h-20 mt-2 mx-auto"
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="make-star-submit-btn bg-transparent hover:bg-gray-500 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
      >
        등록하기
      </button>
    </div>
  );
};

export default MakeStar;
