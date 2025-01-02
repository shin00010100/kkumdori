import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartButton.css';

function CartButton({ product }) {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!product) {
            alert("상품 정보를 불러오지 못했습니다.");
            return;
        }
        alert(`${product.goodsName} ${quantity}개를 장바구니에 담았습니다.`);
    };

    const handleBuyNow = () => {
        if (!product) {
            alert("상품 정보를 불러오지 못했습니다.");
            return;
        }

        console.log("상품 이미지 URL:", product.imagePath);

        // JWT 토큰 확인
        let token = sessionStorage.getItem("jwt"); // 세션 스토리지에서 토큰 확인
        if (!token) {
            token = localStorage.getItem("jwt"); // 로컬 스토리지에서 토큰 확인
        }

        if (!token) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate('/login'); // 로그인 페이지로 리디렉션
            return;
        }

        // 토큰이 있는 경우 Pay 페이지로 이동
        navigate('/pay', {
            state: {
                selectedItems: [
                    {
                        ...product,
                        name: product.goodsName,
                        quantity: quantity,
                        imageUrl: product.imagePath,
                    },
                ],
            },
        });
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div className="cart-button">
            <button className="quantity-button" onClick={decreaseQuantity}>-</button>
            <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: '60px', margin: '0 10px' }}
            />
            <button className="quantity-button" onClick={increaseQuantity}>+</button>
            <button className="cart-shoppingcart-button" onClick={handleAddToCart}>
                장바구니 담기
            </button>
            <button className="buy-button" onClick={handleBuyNow}>
                바로 구매
            </button>
        </div>
    );
}

export default CartButton;
