import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  // 장바구니에 담긴 상품들 (예시 데이터)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: '추천 상품', price: 100, image: '/img/recommended.jpg', quantity: 1, checked: false },
    { id: 2, name: '이벤트 상품', price: 200, image: '/img/event-product.jpg', quantity: 1, checked: false },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  // 상품 수량 변경 함수
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // 상품 삭제 함수
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 상품 체크박스 상태 변경 함수
  const handleCheckboxChange = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // 전체 선택/해제 함수
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, checked: !selectAll }))
    );
  };

  // 총액 계산 함수
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.checked) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  // 할인 및 배송비 계산
  const calculateDiscount = () => calculateTotal() * 0.1; // 10% 할인
  const calculateShipping = () => 5000; // 고정 배송비 5000원
  const calculateFinalTotal = () => {
    const total = calculateTotal();
    return total - calculateDiscount() + calculateShipping();
  };
  
// 결제 페이지로 이동
const handleCheckout = () => {
  const selectedItems = cartItems.filter((item) => item.checked);

  if (selectedItems.length === 0) {
    alert('결제할 상품을 선택해주세요!');
    return;
  }

  navigate('/Pay', {
    state: {
      selectedItems,
      finalTotal: calculateFinalTotal(), // 최종 결제 금액 전달
    },
  });
};

  return (
    <div className="cart-container">
      <h1>장바구니</h1>

      {/* 모두 선택 체크박스 */}
      <div className="select-all">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <label>모두 선택</label>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>장바구니에 상품이 없습니다.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>{item.price} 원</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <label>선택</label>
                </div>
                <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 주문 예상 금액 계산 창 */}
      <div className="order-summary">
        <h2>주문 예상 금액</h2>
        <div className="summary-item">
          <p>총 상품 가격</p>
          <p>{calculateTotal()} 원</p>
        </div>
        <div className="summary-item discount">
          <p>총 할인 (-)</p>
          <p>{calculateDiscount()} 원</p>
        </div>
        <div className="summary-item shipping">
          <p>총 배송비 (+)</p>
          <p>{calculateShipping()} 원</p>
        </div>
        <div className="summary-item total">
          <p>최종 결제 금액</p>
          <p>{calculateFinalTotal()} 원</p>
        </div>
      </div>

      <div className="checkout">
        <button onClick={handleCheckout}>결제하기</button>
      </div>
    </div>
  );
};

export default Cart;
