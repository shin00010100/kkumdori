import React from 'react';

const ShippingStatusContainer = () => {
  return (
    <div className="shippingStatusContainer">
      <div className="title">주문/배송조회</div>
      <div className="status">
        <div className="item">
          <div>
            <div className="green number">6</div>
            <div className="text">장바구니</div>
          </div>
          <div className="icon"> &gt; </div>
        </div>
        <div className="item">
          <div>
            <div className="number">0</div>
            <div className="text">결제완료</div>
          </div>
          <div className="icon"> &gt; </div>
        </div>
        <div className="item">
          <div>
            <div className="green number">1</div>
            <div className="text">배송중</div>
          </div>
          <div className="icon"> &gt; </div>
        </div>
        <div className="item">
          <div>
            <div className="green number">3</div>
            <div className="text">구매확정</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingStatusContainer;
