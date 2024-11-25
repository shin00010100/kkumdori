// src/components/RecentProducts.js

import React, { useState } from 'react';

const RecentProducts = () => {
  const initialProducts = [
    { id: 1, name: "최근 본 상품 1", image: "https://via.placeholder.com/100", price: 10000 },
    { id: 2, name: "최근 본 상품 2", image: "https://via.placeholder.com/100", price: 15000 },
    { id: 3, name: "최근 본 상품 3", image: "https://via.placeholder.com/100", price: 20000 },
    { id: 4, name: "최근 본 상품 4", image: "https://via.placeholder.com/100", price: 25000 },
    { id: 5, name: "최근 본 상품 5", image: "https://via.placeholder.com/100", price: 30000 },
    { id: 6, name: "최근 본 상품 6", image: "https://via.placeholder.com/100", price: 35000 },
    { id: 7, name: "최근 본 상품 7", image: "https://via.placeholder.com/100", price: 40000 },
    { id: 8, name: "최근 본 상품 8", image: "https://via.placeholder.com/100", price: 45000 },
    { id: 9, name: "최근 본 상품 9", image: "https://via.placeholder.com/100", price: 50000 },
    { id: 10, name: "최근 본 상품 10", image: "https://via.placeholder.com/100", price: 55000 },
    { id: 11, name: "최근 본 상품 11", image: "https://via.placeholder.com/100", price: 60000 },
    { id: 12, name: "최근 본 상품 12", image: "https://via.placeholder.com/100", price: 65000 },
    { id: 13, name: "최근 본 상품 13", image: "https://via.placeholder.com/100", price: 70000 },
    { id: 14, name: "최근 본 상품 14", image: "https://via.placeholder.com/100", price: 75000 },
    { id: 15, name: "최근 본 상품 15", image: "https://via.placeholder.com/100", price: 80000 },
    { id: 16, name: "최근 본 상품 16", image: "https://via.placeholder.com/100", price: 85000 },
    { id: 17, name: "최근 본 상품 17", image: "https://via.placeholder.com/100", price: 90000 },
    { id: 18, name: "최근 본 상품 18", image: "https://via.placeholder.com/100", price: 95000 },
    { id: 19, name: "최근 본 상품 19", image: "https://via.placeholder.com/100", price: 100000 },
    { id: 20, name: "최근 본 상품 20", image: "https://via.placeholder.com/100", price: 105000 },
  ];

  const [recentProducts, setRecentProducts] = useState(initialProducts);
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleDelete = (id) => {
    const updatedProducts = recentProducts.filter(product => product.id !== id);
    setRecentProducts(updatedProducts);
  };

  const productsToShow = recentProducts.slice(0, visibleCount);

  return (
    <div className="recent-products">  {/* 여기서 recent-products 클래스를 추가 */}
      <h2>최근 본 상품 관리</h2>
      <ul>
        {productsToShow.map((product) => (
          <li key={product.id} className="product-item"> {/* 추가적인 클래스도 여기 사용할 수 있음 */}
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.price.toLocaleString()}원</p>
              <button className="delete-btn" onClick={() => handleDelete(product.id)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>

      {visibleCount < recentProducts.length && (
        <button className="show-more-btn" onClick={handleShowMore}>더보기</button>
      )}
    </div>
  );
};

export default RecentProducts;
