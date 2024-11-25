import React from 'react';
import { Link } from 'react-router-dom';
import './mypage.css';

const SummaryContainer = () => {
  return (
    <div>
      <div className="summaryContainer">
        <div className="item">
          <div className="productImage">
            <img src="https://via.placeholder.com/100" alt="상품 이미지1" />
          </div>
          <div className="productDetails">
            <div className="productDate">2024/11/01</div>
            <div className="productName">상품명: 최근 구매 상품1</div>
            <div className="productPrice">가격: ₩ 35,000</div>
            <div className="productQuantity">수량: 1</div>
            <div className="productActions">
              <button className="actionBtn"><a href="https://www.cjlogistics.com/ko/tool/parcel/tracking" target="_blank" rel="noopener noreferrer">배송조회</a></button>
              <Link to="/Returnpage"><button className="actionBtn">교환/반품</button></Link>
              <Link to="/Review"><button className="actionBtn">리뷰작성</button></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="summaryContainer">
        <div className="item">
          <div className="productImage">
            <img src="https://via.placeholder.com/100" alt="상품 이미지2" />
          </div>
          <div className="productDetails">
            <div className="productDate">2024/10/14</div>
            <div className="productName">상품명: 최근 구매 상품2</div>
            <div className="productPrice">가격: ₩ 27,500</div>
            <div className="productQuantity">수량: 3</div>
            <div className="productActions">
              <button className="actionBtn"><a href="https://www.cjlogistics.com/ko/tool/parcel/tracking" target="_blank" rel="noopener noreferrer">배송조회</a></button>
              <Link to="/Returnpage"><button className="actionBtn">교환/반품</button></Link>
              <Link to="/Review"><button className="actionBtn">리뷰작성</button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="summaryContainer">
        <div className="item">
          <div className="productImage">
            <img src="https://via.placeholder.com/100" alt="상품 이미지3" />
          </div>
          <div className="productDetails">
            <div className="productDate">2024/09/11</div>
            <div className="productName">상품명: 최근 구매 상품3</div>
            <div className="productPrice">가격: ₩ 12,700</div>
            <div className="productQuantity">수량: 5</div>
            <div className="productActions">
              <button className="actionBtn"><a href="https://www.cjlogistics.com/ko/tool/parcel/tracking" target="_blank" rel="noopener noreferrer">배송조회</a></button>
              <Link to="/Returnpage"><button className="actionBtn">교환/반품</button></Link>
              <Link to="/Review"><button className="actionBtn">리뷰작성</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryContainer;
