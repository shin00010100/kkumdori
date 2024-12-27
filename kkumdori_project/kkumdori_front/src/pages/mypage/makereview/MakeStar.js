import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './makestar.css';

const MakeStar = () => {
  const [userInfo, setUserInfo] = useState(null);  // 사용자 정보 상태
  const [selectedRating, setSelectedRating] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [file, setFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [title, setTitle] = useState('');

  // JWT 토큰에서 사용자 정보 가져오기 (useEffect 사용)
  useEffect(() => {
    const fetchUserData = async () => {
      let token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
      if (token) {
        try {
          // 첫 번째 API 호출: 사용자 정보 가져오기
          const response = await axios.get('http://localhost:8090/api/auth/getuser', {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          setUserInfo(response.data);  // 사용자 정보 상태 업데이트
          const userNo = response.data.userNo;

          // 두 번째 API 호출: 사용자 상세 정보 가져오기
          const userResponse = await axios.get(`http://localhost:8090/api/user/${userNo}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          // 사용자 정보 상태 업데이트 (기존 데이터와 합침)
          setUserInfo((prevState) => ({ ...prevState, ...userResponse.data }));
        } catch (error) {
          console.error('데이터를 가져오는 데 실패했습니다.', error);
        }
      } else {
        console.error("JWT 토큰이 없습니다.");
      }
    };

    fetchUserData();
  }, []);  // 의존성 배열이 비어 있으므로, 컴포넌트 마운트 시 한 번만 실행됨

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRating) {
      alert('평점을 선택해주세요.');
      return;
    }
    if (reviewText.length < 15) {
      alert('리뷰는 15자 이상 작성해주세요.');
      return;
    }
    if (!title) {
      alert('제목을 작성해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);  // 제목
    formData.append('content', reviewText);  // 내용
    formData.append('starRank', selectedRating);  // 별점
    if (file) {
      formData.append('file', file);  // 파일
    }

    // userNo는 userInfo에서 가져오기
    const authorNo = userInfo ? userInfo.userNo : null;  // userInfo가 있으면 userNo 사용
    if (authorNo) {
      formData.append('authorNo', authorNo);  // 작성자 번호 추가
    }

    try {
      const token = localStorage.getItem('jwt');  // JWT 토큰 가져오기

      // 백엔드 URL 수정
      const response = await axios.post('http://localhost:8090/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,  // Authorization 헤더에 JWT 추가
        },
        withCredentials: true,  // 쿠키 포함
      });

      console.log('Review Submitted:', response.data);
      alert('리뷰가 등록되었습니다.');

      setSelectedRating(null);
      setReviewText('');
      setFile(null);
      setTitle('');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('리뷰 등록에 실패했습니다.');
    }
  };

  const previewImage = file ? URL.createObjectURL(file) : null;

  return (
    <div className="text-center py-20">
      <div className="star-product-info mb-8">
        <img
          src="/img/ex01.png"
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

      {/* 제목 입력 필드 */}
      <label htmlFor="title" className="block mb-2 font-medium text-gray-900">
        리뷰 제목을 작성해주세요
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="star-title-input mb-4 p-2 border rounded w-full"
        placeholder="리뷰 제목을 작성해주세요"
      />

      {/* 리뷰 내용 */}
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

      {/* 파일 업로드 */}
      <div className="mt-5">
        <p className="block mb-2 font-medium text-gray-900">사진을 등록해주세요</p>
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
          <label htmlFor="upload" className="cursor-pointer w-full h-full">
            <input
              id="upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* 파일 미리보기 */}
        {previewImage && (
          <div className="mt-4">
            <img src={previewImage} alt="Uploaded preview" className="w-48 h-48 object-cover" />
          </div>
        )}
      </div>

      {/* 리뷰 등록 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!reviewText || !selectedRating || !title || !userInfo}
        className={`make-star-submit-btn ${!reviewText || !selectedRating || !title || !userInfo ? 'bg-gray-300 cursor-not-allowed' : 'bg-transparent hover:bg-gray-500'} font-bold`}
      >
        리뷰 등록하기
      </button>
    </div>
  );
};

export default MakeStar;
