import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HLine from "../../utils/HLine.js";
import './Pay.css';


const Pay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || []; // 전달받은 상품 정보

  console.log("Pay 페이지로 전달된 데이터:", selectedItems);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zipcode: '',
    address: '',
    detailAddress: '',
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업창 상태
  const [paymentMethod, setPaymentMethod] = useState(''); // 선택된 결제 방식
  const [userNo, setUserNo] = useState(null); // 사용자 번호 저장



  // 총 결제 금액 계산 함수 (할인율 포함)
const calculateTotalPrice = () => {
  return selectedItems.reduce((total, item) => {
    return total + item.price * item.quantity; // 할인 전 총 결제 금액
  }, 0);
};

// 할인 금액 계산 함수
const calculateDiscountedPrice = () => {
  return selectedItems.reduce((total, item) => {
    const originalPrice = item.price * item.quantity; // 원래 가격
    const discountedPrice = item.price * (1 - item.discount / 100) * item.quantity; // 할인된 가격
    return total + (originalPrice - discountedPrice); // 할인 금액 계산
  }, 0);
};

// 총 결제 금액 계산 함수 (할인율 적용 후)
const calculateTotalPrice2 = () => {
  return selectedItems.reduce((total, item) => {
    const discountedPrice = item.price * (1 - item.discount / 100); // 할인된 가격
    return total + discountedPrice * item.quantity; // 할인된 가격으로 총합 계산
  }, 0);
};


  // 사용자 정보 가져오기 함수
  const fetchUserNo = useCallback(async () => {
    let token = sessionStorage.getItem('jwt'); // 세션에서 먼저 확인
    if (!token) {
      token = localStorage.getItem('jwt'); // 세션에 없으면 로컬스토리지에서 가져오기
    }

    if (!token) {
      console.log('로그인 정보가 없습니다.');
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8090/api/auth/getuser', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰 추가
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('사용자 정보:', data);

        // userNo를 상태에 저장
        setUserNo(data.userNo);
      } else {
        console.error('사용자 정보를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  }, [navigate]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("결제 수단을 선택해주세요.");
      return;
    }

    const token = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const orderData = {
      user_no: userNo,
      order_address: `${formData.address} ${formData.detailAddress}`.trim(),
      order_time: new Date().toISOString(),
    };
  
    try {
      // Step 1: Create Order
      const orderResponse = await fetch("http://localhost:8090/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      
      if (!orderResponse.ok) {
        alert("주문 생성에 실패했습니다.");
        return;
      }
      
      const orderResult = await orderResponse.json();  // 서버에서 반환된 JSON 데이터
      console.log("주문 생성 결과:", orderResult);  // 이 데이터에서 order_no가 있는지 확인
      
      const orderNo = orderResult?.orderNo; // 대소문자 정확히 맞추기
          
      // Step 2: Create Order Products
      const orderProductData = selectedItems.map((item) => {
        return {
          order_product_quantity: item.quantity,
          order_price: item.price * (1 - item.discount / 100),
          order_no: orderNo,  // 서버에서 받은 order_no 사용
          goods_no: item.goodsNo,
        };
      });
      
      console.log("주문 상품 데이터:", orderProductData);

const response = await fetch("http://localhost:8090/api/order_product/insert", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(orderProductData), // 모든 상품 데이터를 한 번에 전달
});

if (!response.ok) {
  alert("주문 상품 등록에 실패했습니다.");
  return;
}
  
      // Step 3: Create Payment
      const paymentData = {
        amount: calculateTotalPrice2(),
        status: "completed",
        payment_time: new Date().toISOString(),
        updated_time: new Date().toISOString(),
        order_id: orderNo,
        refund_status: "NONE",
      };
  
      const paymentResponse = await fetch("http://localhost:8090/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });
  
      if (paymentResponse.ok) {
        alert("결제가 완료되었습니다.");
        navigate("/main");
      } else {
        alert("결제 처리 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("결제 요청 에러:", error);
      alert("결제 처리 중 문제가 발생했습니다.");
    }
  };

  // 사용자 정보 가져오기
  const fetchUserInfo = useCallback(async () => {
    if (!userNo) return; // userNo가 없으면 API 호출하지 않음

    let token = sessionStorage.getItem('jwt'); // 세션에서 먼저 확인
    if (!token) {
      token = localStorage.getItem('jwt'); // 세션에 없으면 로컬스토리지에서 가져오기
    }

    if (!token) {
      console.log('로그인 정보가 없습니다.');
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8090/api/user/${userNo}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰 추가
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('사용자 상세 정보:', data);

        // 조건 확인: 임시 데이터가 포함되어 있는지
      if (
        data.email?.includes("@example.com") ||
        data.bank === "SampleBank" ||
        data.account === "0000000000" ||
        // data.zipcode === "00000" ||
        data.address === "Sample Address" ||
        (data.tel && (data.tel.includes("kakao") || data.tel.includes("naver")))
      ) {
        // 리디렉션 응답을 받은 경우
        alert('간편 로그인, 회원 정보를 수정 후 이용해주세요');
        navigate('/MemberInfoEdit');
        return; // 리디렉션 후 더 이상 진행하지 않음
      }
        
        // 전화번호에서 앞의 두 자리를 제외한 나머지 부분만 저장
      const formattedPhone = data.tel ? data.tel.slice(2) : ''; 

      // 사용자 정보 상태 업데이트
      setFormData({
        name: data.fullname || '',
        phone: formattedPhone, // 수정된 전화번호
        zipcode: data.zipcode || '',
        address: data.address || '',
        detailAddress: data.detailAddress || '',
      });

      } else {
        console.error('사용자 정보를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  }, [navigate, userNo]);

  // 컴포넌트가 마운트될 때 사용자 정보 가져오기
  useEffect(() => {
    fetchUserNo(); // 처음에 사용자 번호를 가져옴
  }, [fetchUserNo]);

  useEffect(() => {
    if (userNo) {
      fetchUserInfo(); // userNo가 있을 때만 사용자 정보 조회
    }
  }, [fetchUserInfo, userNo]);

  // 팝업 열기 함수
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // 팝업 닫기 함수
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // 결제 방식 선택 처리 함수
  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setIsPopupOpen(false); // 팝업 닫기
  };

  // 마이페이지로 이동하는 함수
  const handleGoToMemberInfoEdit = () => {
    navigate('/MemberInfoEdit'); // /MemberInfoEdit 페이지로 이동
  };

  return (
    <div className="payment-page">
      <h1>결제 페이지</h1>

      {/* 주문 상품 요약 */}
      <div className="order-summary">
        <h2>주문 상품</h2>
        {selectedItems.map((item, index) => (
          <div className="order-item" key={index}>
            <img
                src={item.imagePath ? `http://localhost:8090/api/images/${item.imagePath.split('uploads/images/')[1]}` : "path/to/default/image.png"}
                alt={item.name}
                className="product-image"
              />
            <div className="product-info">
              <p>상품명: {item.name}</p><br></br>
              <p>가격: {item.price.toLocaleString()}원</p>
              <p>개수: {item.quantity}개</p><br></br>
              <HLine></HLine>
              <p>할인율: {item.discount}%</p>
            </div>
          </div>
        ))}
        <div className="total-price">
          <br></br>
        상품 금액: {calculateTotalPrice().toLocaleString()}원<br />
         <div className="discount">할인: -{calculateDiscountedPrice().toLocaleString()}원</div>
         <HLine></HLine>
        총 결제 금액: {calculateTotalPrice2().toLocaleString()}원
        </div>
      </div>

      {/* 배송 정보 */}
      <div className="shipping-info">
        <h2>배송 정보</h2>
        <button className="fetch-my-info-button" onClick={handleGoToMemberInfoEdit}>
          마이페이지에서 수정하기
        </button>
        <br />
        <label>
          이름:
          <input type="text" value={formData.name} disabled />
        </label>
        <label>
          전화번호:
          <input type="text" value={formData.phone} disabled />
        </label>
        <label>
          우편번호:
          <input type="text" value={formData.zipcode} disabled />
        </label>
        <label>
          주소:
          <input type="text" value={formData.address} disabled />
        </label>

      </div>
      <br />

      {/* 결제 버튼 */}
      <button className="payment-button" onClick={handleOpenPopup}>
        결제 수단 선택
      </button>
      

      {/* 팝업창 */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>결제 수단 선택</h2>
            <button onClick={() => handlePaymentSelect('카드')}>카드 결제</button>
            <button onClick={() => handlePaymentSelect('꿈돌이머니')}>꿈돌이 머니</button>
            <button onClick={() => handlePaymentSelect('휴대폰')}>카카오 페이</button>
            <button className="close-popup" onClick={handleClosePopup}>
              취소
            </button>
          </div>
        </div>
      )}

      {/* 선택된 결제 방식 표시 */}
      {paymentMethod && (
        <div className="selected-payment-method">
          선택된 결제 수단: {paymentMethod}
        </div>
      )}
      <br />
      <button className="confirm-button" onClick={handlePayment}>
        결제하기
      </button>
    </div>
  );
};

export default Pay;
