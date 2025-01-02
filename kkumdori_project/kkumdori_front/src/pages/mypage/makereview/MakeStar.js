import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate 추가
import './makestar.css';

const MakeStar = () => {
  const location = useLocation();
  const product = location.state?.product; // location에서 product 정보 가져오기
  const navigate = useNavigate();  // useNavigate 훅 사용

  const [userInfo, setUserInfo] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [file, setFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [title, setTitle] = useState('');
  
  // 미리보기 이미지
  const previewImage = file ? URL.createObjectURL(file) : null;

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
  }, []);

  // 별점 선택 이벤트
  const handleStarHover = (rating) => {
    setSelectedRating(rating);
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    console.log('Selected Rating:', rating);
  };

  // 파일 업로드 처리
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

  // 리뷰 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
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
    formData.append('title', title);
    formData.append('content', reviewText);
    formData.append('starRank', selectedRating);
    if (file) {
      formData.append('file', file);
    }

    const authorNo = userInfo ? userInfo.userNo : null;
    if (authorNo) {
      formData.append('authorNo', authorNo);
    }

    // 상품 번호 체크
    const goodsNo = product && product.goodsNo ? product.goodsNo : null;

    console.log('상품 정보:', product); // 상품 객체 전체 출력
    console.log('상품 번호:', goodsNo); // 상품 번호 출력

    if (goodsNo) {
      formData.append('goodsNo', goodsNo);
    } else {
      console.error("상품 번호가 누락되었습니다.");
      alert("상품 번호가 누락되었습니다.");
      return;  // 상품 번호가 없으면 리뷰를 제출하지 않음
    }

    try {
      const token = localStorage.getItem('jwt');

      const response = await axios.post('http://localhost:8090/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log('리뷰 제출 성공:', response.data);
      alert('리뷰가 등록되었습니다.');

      // 폼 초기화
      setSelectedRating(null);
      setReviewText('');
      setFile(null);
      setTitle('');

      // 'mypage'으로 리디렉션
      navigate('/mypage'); 
    } catch (error) {
      console.error('리뷰 제출 실패:', error);
      alert('리뷰 등록에 실패했습니다.');
    }
  };

  return (
    <div className="text-center py-20">
      <div className="star-product-info mb-8">
        {product ? (
          <>
            <img
              src={`http://localhost:8090/api/images/${product.imagePath.split('uploads/images/')[1]}`}
              alt="상품 이미지"
              className="star-img"
            />
            <h2 className="font-semibold text-xl mt-4">상품명: {product.productName}</h2>
          </>
        ) : (
          <p>상품 정보가 없습니다.</p>
        )}
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
      <div className="mb-4">
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
      </div>

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
    <img src={previewImage} alt="Uploaded preview" className="star-preview-image" />
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
