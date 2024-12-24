import React, { useState } from "react";
import { Link } from "react-router-dom";  // Link 컴포넌트 추가
import products from "../../data/product";  // Product.js에서 불러온 상품 데이터
import Pagination from "../pagination/Pagination";  // 페이지네이션 컴포넌트
import SearchBar from "../searchbar/SearchBar";  // 검색바 컴포넌트
import "./ProductList.css";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // searchQuery 상태 추가
  const itemsPerPage = 10;

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // 검색할 때 첫 페이지로 돌아가기
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="product-list">
      <SearchBar onSearch={handleSearch} /> {/* 검색바에서 onSearch를 ProductList.js의 handleSearch로 전달 */}
      <div className="products">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-item">
            <Link to={`/productDetail/${product.id}`}> {/* 상품 상세 페이지로 이동 */}
              <img
                src={product.image}  // 이미지 경로
                alt={product.name}
              />
            </Link>

            <h3>{product.name}</h3>
            <p>{product.price} 원</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
