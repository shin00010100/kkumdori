import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './wishlist.css';

const Wishlist = () => {
  const [items, setItems] = useState([]);  // 위시리스트 아이템들
  const [selectAll, setSelectAll] = useState(false);  // 전체 선택
  const [ setUserInfo] = useState(null);  // 사용자 정보
  const [loading, setLoading] = useState(true);  // 로딩 상태

  // 사용자 정보 및 위시리스트 아이템 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      let token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
      if (token) {
        try {
          // 첫 번째 API 호출: 사용자 정보 가져오기
          const response = await axios.get('http://localhost:8090/api/auth/getuser', {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          setUserInfo(response.data);  // 사용자 정보 저장
          const userNo = response.data.userNo;

          // 해당 사용자 번호로 위시리스트 가져오기
          const wishlistResponse = await axios.get('http://localhost:8090/api/mywishlist', {
            headers: { 'Authorization': `Bearer ${token}` },
            params: { userNo },
          });

          // 위시리스트 아이템 저장
          console.log('Fetched wishlist:', wishlistResponse.data); // 응답 데이터 확인
          setItems(wishlistResponse.data);  
          setLoading(false);  // 로딩 완료
        } catch (error) {
          console.error('데이터를 가져오는 데 실패했습니다.', error);
          setLoading(false);  // 로딩 완료
        }
      } else {
        console.error("JWT 토큰이 없습니다.");
        setLoading(false);  // 로딩 완료
      }
    };

    fetchUserData();
  }, [setUserInfo]);  // 컴포넌트가 마운트 될 때만 실행

  // 수량 증가 함수
  const increaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    setItems(updatedItems);
  };

  // 수량 감소 함수
  const decreaseQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    }
    setItems(updatedItems);
  };

  // 체크박스 상태 변경 함수
  const toggleCheckbox = (index) => {
    const updatedItems = [...items];
    updatedItems[index].selected = !updatedItems[index].selected;
    setItems(updatedItems);
  };

  // 아이템 삭제 함수
  const deleteItem = async (index) => {
    const itemToDelete = items[index];
    try {
      const token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
      // DELETE 요청: 위시리스트 아이템 삭제
      await axios.delete(`http://localhost:8090/api/mywishlist/${itemToDelete.wishlistNo}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const updatedItems = items.filter((_, idx) => idx !== index);
      setItems(updatedItems);  // 삭제 후 아이템 리스트 업데이트
    } catch (error) {
      console.error('아이템을 삭제하는 데 실패했습니다.', error);
    }
  };

  // 전체 선택/해제 함수
  const toggleSelectAll = () => {
    const updatedItems = items.map((item) => ({
      ...item,
      selected: !selectAll,
    }));
    setItems(updatedItems);
    setSelectAll(!selectAll);  // 전체 선택 상태 토글
  };

  // 체크된 아이템만 삭제하는 함수
  const deleteSelectedItems = async () => {
    const selectedItems = items.filter((item) => item.selected);
    try {
      const token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
      // 선택된 아이템 삭제
      await Promise.all(selectedItems.map(item => 
        axios.delete(`http://localhost:8090/api/mywishlist/${item.wishlistNo}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        })
      ));
      // 선택된 아이템 삭제 후 리스트 갱신
      const updatedItems = items.filter((item) => !item.selected);
      setItems(updatedItems);
    } catch (error) {
      console.error('선택된 아이템을 삭제하는 데 실패했습니다.', error);
    }
  };

  // 장바구니 담기 함수
  const addSelectedToCart = () => {
    const selectedItems = items.filter((item) => item.selected);
    if (selectedItems.length > 0) {
      // 장바구니에 이미 있는 아이템을 중복으로 추가하지 않도록 처리
      const updatedItems = selectedItems.map((item) => ({
        ...item,
        quantity: item.quantity,  // 수량도 함께 전달
      }));

      alert('Added to cart: ' + updatedItems.map((item) => item.goods.goodsName).join(', '));
    } else {
      alert('Please select items to add to the cart.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중 표시
  }

  return (
    <div className="app">
      <h1 className="app__title">나의 위시리스트</h1>

      {/* 전체 선택 및 삭제 버튼 */}
      <div className="wishlist__header">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
          className="wishlist__select-all-checkbox"
        />
        <span>모두 선택</span>
        <button
          className="wishlist__delete-selected-btn"
          onClick={deleteSelectedItems}
        >
          선택된 아이템 삭제
        </button>
      </div>

      {/* 위시리스트 아이템들 */}
      <div className="wishlist">
        <h2 className="wishlist__title">당신의 위시리스트 아이템</h2>
        <ul className="wishlist__list">
          {items.length === 0 ? (
            <li className="wishlist__item--empty">위시리스트가 비어있습니다</li>
          ) : (
            items.map((item, index) => (
              <li className="wishlist__item" key={index}>
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleCheckbox(index)}
                  className="wishlist__item-checkbox"
                />
                <img
                  className="wishlist__item-image"
                  src={item.goods.imagePath || 'default-image.jpg'}
                  alt={item.goods.goodsName || '상품'}
                />
                <div className="wishlist__item-info">
                  <span className="wishlist__item-name">{item.goods.goodsName}</span>
                  <span className="wishlist__item-price">
                    {item.goods.price ? item.goods.price.toLocaleString() : '가격 정보 없음'}
                  </span>
                  <p className="wishlist__item-description">
                    {item.goods.description || '설명 정보 없음'}
                  </p>

                  {/* 수량 조절 버튼 */}
                  <div className="wishlist__item-quantity">
                    <button
                      className="wishlist__item-quantity-btn minus"
                      onClick={() => decreaseQuantity(index)}
                    >
                      - 
                    </button>
                    <span className="wishlist__item-quantity-value">{item.quantity}</span>
                    <button
                      className="wishlist__item-quantity-btn plus"
                      onClick={() => increaseQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="wishlist__item-remove"
                  onClick={() => deleteItem(index)}
                >
                  삭제
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* 장바구니 담기 버튼 */}
      <div className="wishlist__footer">
        <button
          className="wishlist__add-to-cart-btn"
          onClick={addSelectedToCart}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
