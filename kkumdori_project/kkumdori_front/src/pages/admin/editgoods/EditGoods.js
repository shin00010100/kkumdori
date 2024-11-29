import React, { useState, useEffect } from "react";
import ButtonGroup from "../../../components/buttongroup/ButtonGroup";
import UploadImage from "../../../components/uploadimage/UploadImage";
import "./EditGoods.css";

function EditGoods({ productId }) {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); // 이미지 상태 관리
    const [error, setError] = useState("");

    // 테스트용 기존 상품 데이터
    const TEST_PRODUCT_DATA = {
        productId: 1,
        productName: "테스트 상품명",
        category: "category1",
        price: 10000,
        description: "이것은 테스트용 상품입니다.",
        image: "/img/logo_facebook.png", // 샘플 이미지 경로
    };

    // 기존 상품 데이터 로드
    useEffect(() => {
        const loadProductData = () => {
            const productData = TEST_PRODUCT_DATA; // 테스트 데이터
            if (productId && productData.productId !== productId) {
                alert("해당 상품 데이터를 찾을 수 없습니다.");
                return;
            }

            setProductName(productData.productName);
            setCategory(productData.category);
            setPrice(productData.price);
            setDescription(productData.description);
            setImage(productData.image || null); // 기존 이미지 설정
        };

        loadProductData();
    }, [productId]);

    

    const validateFields = () => {
        if (!productName.trim()) return "상품명을 입력해 주세요.";
        if (!category) return "카테고리를 선택해 주세요.";
        if (!price || price <= 0) return "유효한 판매가를 입력해 주세요.";
        if (!description.trim()) return "상품 설명을 입력해 주세요.";
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("category", category);
        formData.append("price", parseFloat(price)); // 숫자로 변환
        formData.append("description", description);

        if (image instanceof File) {
            formData.append("image", image); // 새 파일 전송
        }

        console.log("수정된 데이터:", {
            productName,
            category,
            price,
            description,
            image,
        });

        alert("테스트: 상품 수정 완료! (실제 전송은 백엔드 연동 후)");
    };

    return (
        <div className="edit-goods-container">
            <h2>상품 수정</h2>
            <div className="edit-goods-content">
                <div className="upload-image-container">
                    <UploadImage onImageSelect={setImage} existingImage={image} />
                </div>
                <div className="product-info-container">
                    <div>
                        <label>상품명:</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => {
                                setProductName(e.target.value);
                                setError("");
                            }}
                        />
                    </div>
                    <div>
                        <label>카테고리:</label>
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setError("");
                            }}
                        >
                            <option value="">선택해주세요</option>
                            <option value="category1">카테고리 1</option>
                            <option value="category2">카테고리 2</option>
                        </select>
                    </div>
                    <div>
                        <label>판매가:</label>
                        <input
                            type="number"
                            step="10"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                setError("");
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="product-content-container">
                <label>상품 설명란</label>
                <textarea
                    className="edit-textarea"
                    placeholder="상품에 대한 설명을 입력해 주세요..."
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setError("");
                    }}
                ></textarea>
            </div>
            {error && <div className="error-message">{error}</div>}
            <ButtonGroup onSubmit={handleSubmit} submitText="수정" />
        </div>
    );
}

export default EditGoods;