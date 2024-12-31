import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const [userNo, setUserNo] = useState(null);

  // 사용자 정보 및 장바구니 아이템 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      let token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
      if (token) {
        try {
          // 사용자 정보 가져오기
          const response = await axios.get('http://localhost:8090/api/auth/getuser', {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          setUserNo(response.data.userNo); // userNo 저장

          // 해당 사용자 번호로 장바구니 아이템 가져오기
          const cartResponse = await axios.get(`http://localhost:8090/cart/items`, {
            headers: { 'Authorization': `Bearer ${token}` },
            params: { userNo: response.data.userNo },
          });
          setCartItems(cartResponse.data); // 장바구니 아이템 상태 업데이트
        } catch (error) {
          console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
        }
      } else {
        console.log('토큰이 없습니다. 로그인이 필요합니다.');
        navigate('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
      }
    };

    fetchUserData();
  }, [navigate]); // 토큰이 변경될 때마다 사용자 정보와 장바구니 데이터를 새로 불러옴

  // 상품 수량 변경 함수
  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      // 서버에 수량 변경 요청 보내기
      await axios.put(`http://localhost:8090/api/cart/update/${id}`, { quantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartNo === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('수량 변경에 실패했습니다.', error);
    }
  };

  // 상품 삭제 함수
  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/cart/remove/${id}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.cartNo !== id));
    } catch (error) {
      console.error('상품 삭제에 실패했습니다.', error);
    }
  };

  // 상품 체크박스 상태 변경 함수
  const handleCheckboxChange = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartNo === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // 전체 선택/해제 함수
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, checked: !selectAll })));
  };

  // 총액 계산 함수
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.checked) {
        return total + item.goods.price * item.quantity;
      }
      return total;
    }, 0);
  };

  // 할인 계산
  const calculateDiscount = () => calculateTotal() * 0.1; // 10% 할인

  // 최종 결제 금액 계산
  const calculateFinalTotal = () => {
    const total = calculateTotal();
    return total - calculateDiscount(); // 배송비 제거
  };

  // 결제 페이지로 이동
  const handleCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.checked);

    if (selectedItems.length === 0) {
      alert('결제할 상품을 선택해주세요!');
      return;
    }

    // 결제 시 userNo와 selectedItems를 같이 보냄
    navigate('/Pay', { state: { selectedItems, userNo } });
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
            <div key={item.cartNo} className="cart-item">
              <img src={item.goods.imagePath} alt={item.goods.goodsName} />
              <div className="cart-item-details">
                <h2>{item.goods.goodsName}</h2>
                <p>{item.goods.price} 원</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.cartNo, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.cartNo, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item.cartNo)}
                  />
                  <label>선택</label>
                </div>
                <button className="remove-item" onClick={() => handleRemoveItem(item.cartNo)}>
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
