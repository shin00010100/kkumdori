// import React, { useState } from "react";
// import ProductList from "./ProductList";
// import Side2 from "./Side2";

// const ProductPage = () => {
//   const [recentProducts, setRecentProducts] = useState([]); // 최근 본 상품 목록 상태

//   // 최근 본 상품 목록을 갱신하는 함수
//   const updateRecentlyViewed = (product) => {
//     setRecentProducts((prevProducts) => {
//       // 상품이 이미 최근 본 목록에 없으면 추가, 최대 5개까지 유지
//       const updatedProducts = [product, ...prevProducts].slice(0, 5);
//       return updatedProducts;
//     });
//   };

//   return (
//     <div className="product-page">
//       {/* 최근 본 상품을 갱신하는 함수와 목록을 Side2에 전달 */}
//       <Side2 recentProducts={recentProducts} />
//       {/* 상품 클릭 시 갱신되는 함수 전달 */}
//       <ProductList onProductClick={updateRecentlyViewed} />
//     </div>
//   );
// };

// export default ProductPage;
