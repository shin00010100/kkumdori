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
        alert(`${product.name} ${quantity}개를 장바구니에 담았습니다.`);
    };

    const handleBuyNow = () => {
        if (!product) {
            alert("상품 정보를 불러오지 못했습니다.");
            return;
        }

        navigate('/pay', {
            state: {
                selectedItems: [
                    {
                        ...product,
                        quantity: quantity,
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
