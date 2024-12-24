import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import ButtonGroup from '../../../components/buttongroup/ButtonGroup';
import UploadImage from '../../../components/uploadimage/UploadImage';
import './RegistGoods.css';
import { useNavigate } from 'react-router-dom';

function RegistGoods() {
  const [goodsName, setGoodsName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // navigate 함수 초기화

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('카테고리 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageSelect = (file) => {
    setImage(file); // 이미지 파일을 상태로 저장
  };

  const validateFields = () => {
    if (!goodsName.trim()) return '상품명을 입력해 주세요.';
    if (!category) return '카테고리를 선택해 주세요.';
    if (!price || price <= 0) return '유효한 판매가를 입력해 주세요.';
    if (!stock || stock <= 0) return '유효한 수량을 입력해 주세요.';
    if (!description.trim()) return '상품 설명을 입력해 주세요.';
    if (!image) return '이미지를 업로드해 주세요.';
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError); // 오류 메시지 설정
      return;
    }

    try {
      const token = localStorage.getItem("jwt"); // JWT 토큰 가져오기
      // FormData를 사용해 이미지 포함 데이터 전송
      const formData = new FormData();
      formData.append('goodsName', goodsName);
      formData.append('categoryNo', category);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('description', description);
      formData.append('image', image);
      const response = await axios.post('http://localhost:8090/api/goods', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('상품 등록 성공:', response.data);
      navigate(-1);
      alert('상품이 등록되었습니다.');
    } catch (error) {
      console.error('상품 등록 실패:', error);
      setError('상품 등록에 실패했습니다.');
    }
  };

  return (
    <div className="regist-goods-container">
      <h2>새로운 상품 등록</h2>
      <div className="regist-goods-content">
        {/* 왼쪽: 이미지 업로드 */}
        <div className="upload-image-container">
          <UploadImage onImageSelect={handleImageSelect} />
        </div>

        {/* 오른쪽: 상품 정보 입력 필드 */}
        <div className="product-info-container">
          <div>
            <label>상품명:</label>
            <input
              type="text"
              value={goodsName}
              onChange={(e) => {
                setGoodsName(e.target.value);
                setError(''); // 입력 시 오류 초기화
              }}
            />
          </div>

          <div>
            <label>카테고리:</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setError(''); // 입력 시 오류 초기화
              }}
            >
              <option value="">선택해주세요</option>
              {categories.map((cat) => (
                <option key={cat.categoryNo} value={cat.categoryNo}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>판매가:</label>
            <input
              type="number"
              step="10"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setError(''); // 입력 시 오류 초기화
              }}
            />
          </div>

          <div>
            <label>수량:</label>
            <input
              type="number"
              step="1"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
                setError(''); // 입력 시 오류 초기화
              }}
            />
          </div>
        </div>
      </div>

      {/* 상품 설명란과 버튼 */}
      <div className="product-content-container">
        <label>상품 설명란</label>
        <textarea
          className="regist-textarea"
          placeholder="상품에 대한 설명을 입력해 주세요..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError(''); // 입력 시 오류 초기화
          }}
        ></textarea>
      </div>

      {/* 오류 메시지 */}
      {error && <div className="error-message">{error}</div>}

      <ButtonGroup onSubmit={handleSubmit} submitText="등록" />
    </div>
  );
}

export default RegistGoods;