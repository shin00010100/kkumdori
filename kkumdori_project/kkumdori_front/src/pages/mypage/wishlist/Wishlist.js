import React, { useState } from 'react';
import "./wishlist.css";

const Wishlist = () => {
  // 임의의 데이터로 초기값 설정 (상품명, 가격, 이미지, 상세 설명 포함)
  const [아이템들, set아이템들] = useState([
    {
      상품명: '아이템 1',
      가격: '10,000원',
      이미지: "/img/ex01.png",
      수량: 1, // 초기 수량은 1
      선택됨: false, // 체크박스 상태 (선택되었는지 여부)
      상세설명: '이 상품은 매우 고급스럽고 편리합니다.',
    },
    {
      상품명: '아이템 2',
      가격: '20,000원',
      이미지: "/img/ex01.png",
      수량: 1,
      선택됨: false,
      상세설명: '이 상품은 최신 기술을 사용하여 제작된 제품입니다.',
    },
    {
      상품명: '아이템 3',
      가격: '30,000원',
      이미지: "/img/ex01.png",
      수량: 1,
      선택됨: false,
      상세설명: '고객들의 사랑을 받는 인기 상품입니다.',
    },
  ]);

  // 전체 선택 상태
  const [전체선택, set전체선택] = useState(false);

  // 장바구니에 담을 아이템 목록 (빈 배열로 초기화)
  const [장바구니, set장바구니] = useState([]);

  // 수량 증가 함수
  const 수량증가 = (index) => {
    const 업데이트된아이템들 = [...아이템들];
    업데이트된아이템들[index].수량 += 1;
    set아이템들(업데이트된아이템들);
  };

  // 수량 감소 함수
  const 수량감소 = (index) => {
    const 업데이트된아이템들 = [...아이템들];
    if (업데이트된아이템들[index].수량 > 1) {
      업데이트된아이템들[index].수량 -= 1;
    }
    set아이템들(업데이트된아이템들);
  };

  // 체크박스 선택 상태 변경 함수
  const 체크박스변경 = (index) => {
    const 업데이트된아이템들 = [...아이템들];
    업데이트된아이템들[index].선택됨 = !업데이트된아이템들[index].선택됨;
    set아이템들(업데이트된아이템들);
  };

  // 아이템을 삭제하는 함수
  const 아이템삭제 = (index) => {
    const 갱신된아이템들 = 아이템들.filter((_, idx) => idx !== index);
    set아이템들(갱신된아이템들);
  };

  // 전체 선택/해제 함수
  const 전체선택변경 = () => {
    const 업데이트된아이템들 = 아이템들.map((아이템) => ({
      ...아이템,
      선택됨: !전체선택,
    }));
    set아이템들(업데이트된아이템들);
    set전체선택(!전체선택); // 전체 선택 상태 토글
  };

  // 체크된 아이템만 삭제하는 함수
  const 체크된아이템삭제 = () => {
    const 갱신된아이템들 = 아이템들.filter((아이템) => !아이템.선택됨);
    set아이템들(갱신된아이템들);
  };

  // 선택된 상품을 장바구니에 추가하는 함수
  const 선택한상품장바구니담기 = () => {
    const 선택된아이템들 = 아이템들.filter((아이템) => 아이템.선택됨);
    if (선택된아이템들.length > 0) {
      // 장바구니에 추가
      set장바구니((prevState) => [...prevState, ...선택된아이템들]);
      alert('장바구니에 담긴 상품: ' + 선택된아이템들.map((아이템) => 아이템.상품명).join(', '));
    } else {
      alert('장바구니에 담을 상품을 선택해주세요.');
    }
  };

  return (
    <div className="app">
      <h1 className="app__title">나의 위시리스트</h1>

      {/* 모두 선택 체크박스와 삭제 버튼 */}
      <div className="wishlist__header">
        <input
          type="checkbox"
          checked={전체선택}
          onChange={전체선택변경}
          className="wishlist__select-all-checkbox"
        />
        <span>모두 선택</span>
        <button
          className="wishlist__delete-selected-btn"
          onClick={체크된아이템삭제}
        >
          선택된 아이템 삭제
        </button>
      </div>

      {/* 위시리스트 항목들 */}
      <div className="wishlist">
        <h2 className="wishlist__title">당신의 위시리스트 아이템</h2>
        <ul className="wishlist__list">
          {아이템들.length === 0 ? (
            <li className="wishlist__item--empty">위시리스트가 비어있습니다</li>
          ) : (
            아이템들.map((아이템, index) => (
              <li className="wishlist__item" key={index}>
                <input
                  type="checkbox"
                  checked={아이템.선택됨}
                  onChange={() => 체크박스변경(index)}
                  className="wishlist__item-checkbox"
                />
                <img
                  className="wishlist__item-image"
                  src={아이템.이미지}
                  alt={아이템.상품명}
                />
                <div className="wishlist__item-info">
                  <span className="wishlist__item-name">{아이템.상품명}</span>
                  <span className="wishlist__item-price">{아이템.가격}</span>
                  {/* 상품 상세 설명 추가 */}
                  <p className="wishlist__item-description">{아이템.상세설명}</p>

                  {/* 수량 조절 버튼 */}
                  <div className="wishlist__item-quantity">
                    <button
                      className="wishlist__item-quantity-btn minus"
                      onClick={() => 수량감소(index)}
                    >
                      -
                    </button>
                    <span className="wishlist__item-quantity-value">{아이템.수량}</span>
                    <button
                      className="wishlist__item-quantity-btn plus"
                      onClick={() => 수량증가(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="wishlist__item-remove"
                  onClick={() => 아이템삭제(index)}
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
          onClick={선택한상품장바구니담기}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
