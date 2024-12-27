import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchbar/SearchBar";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]); // 상품 리스트
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [error, setError] = useState(null); // 에러 상태
  const [totalItems, setTotalItems] = useState(0); // 총 상품 개수
  const itemsPerPage = 10; // 한 페이지당 표시할 상품 수

  // 서버에서 상품 리스트와 관련 데이터를 가져옴
  useEffect(() => {
    const fetchProducts = async () => {
      console.log(`Fetching products with query: ${searchQuery}, page: ${currentPage}, size: ${itemsPerPage}`);
      try {
        const response = await fetch(
          `/api/goods/goodslist?query=${searchQuery}&page=${currentPage}&size=${itemsPerPage}`,
          { method: "GET" }
        );

        console.log("Response Status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response Data:", data);

        // 응답 데이터 구조 반영
        if (data && data.products) {
          setProducts(data.products); // 상품 리스트 설정
          setTotalItems(data.totalItems); // 총 상품 개수 설정
        } else {
          setError("Invalid data structure");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchQuery, currentPage]); // 검색어 또는 페이지 변경 시 호출

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    console.log(`Search query updated to: ${query}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(`Page changed to: ${pageNumber}`);
  };

  // totalPages 계산
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

  return (
    <div className="product-list">
      <SearchBar onSearch={handleSearch} />
      {error && <div className="error-message">Error: {error}</div>} {/* 에러 메시지 */}
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.goodsNo} className="product-item">
              <Link to={`/productDetail/${product.goodsNo}`}>
                <img
                  src={product.imagePath ? `http://localhost:8090/api/images/${product.imagePath.replace('uploads/images/', '')}` : "path/to/default/image.png"}
                  alt={product.goodsName}
                  className="product-image"
                />
              </Link>
              <h3>{product.goodsName}</h3>
              <p>{product.price} 원</p>
            </div>
          ))
        ) : (
          <div>상품이 없습니다.</div>
        )}
      </div>
      <br></br> <br></br>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
