import React, { useState } from 'react';
import ButtonGroup from '../../../components/buttongroup/ButtonGroup';
import UploadImage from '../../../components/uploadimage/UploadImage';
import './RegistGoods.css';

function RegistGoods() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageSelect = (file) => {
    setImage(file); // 이미지 파일을 상태로 저장
  };

  const handleSubmit = () => {
    // 데이터 전송자리
    console.log({
      productName,
      category,
      price,
      description,
      image,
    });
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
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div>
            <label>카테고리:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">선택해주세요</option>
              <option value="category1">카테고리 1</option>
              <option value="category2">카테고리 2</option>
              {/* 필요에 따라 추가 카테고리를 넣어주세요 */}
            </select>
          </div>

          <div>
            <label>판매가:</label>
            <input
              type="number"
              step="10"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 상품 설명란과 버튼 */}
      <div className='product-content-container'>
        <label>상품 설명란</label>
        <textarea
          className='regist-textarea'
          placeholder="상품에 대한 설명을 입력해 주세요..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <ButtonGroup
        onSubmit={handleSubmit}
        submitText="등록"
      />
    </div>
  );
}

export default RegistGoods;