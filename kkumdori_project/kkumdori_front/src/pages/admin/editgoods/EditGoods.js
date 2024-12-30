import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ButtonGroup from "../../../components/buttongroup/ButtonGroup";
import UploadImage from "../../../components/uploadimage/UploadImage";
import "./EditGoods.css";

function EditGoods() {
  const { goodsId } = useParams(); // URL에서 goodsId 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const [goodsName, setGoodsName] = useState("");
  const [categoryNo, setCategoryNo] = useState("");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // 이미지 상태 관리
  const [error, setError] = useState("");

  // 세션에서 먼저 확인하고 없으면 로컬스토리지에서 가져오는 함수
  const getToken = () => {
    let token = sessionStorage.getItem("jwt");
    if (!token) {
      token = localStorage.getItem("jwt");
    }
    return token;
  };

  // 카테고리 목록 로드
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/categories", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("카테고리 가져오기 실패:", error);
    }
  };

  // 기존 상품 데이터 로드
  const fetchGoodsData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8090/api/goods/${goodsId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const goods = response.data;

      setGoodsName(goods.goodsName);
      setCategoryNo(goods.categoryNo);
      setPrice(goods.price);
      setStock(goods.stock);
      setDiscount(goods.discount);
      setDescription(goods.description);
      setImage(goods.imagePath || null);
      if (goods.imagePath) {
        // goods.imagePath에 이미 "uploads/images/"가 포함되어 있다면 이를 제거해야 함
        const fileName = goods.imagePath.split("/").pop(); // 파일 이름만 추출
        const fullImagePath = `http://localhost:8090/api/images/${fileName}`;
        setImage(fullImagePath); // 이미지 URL 설정
      } else {
        setImage(null); // 이미지가 없는 경우
      }
    } catch (error) {
      console.error("상품 데이터 가져오기 실패:", error);
      setError("상품 데이터를 불러오는 데 실패했습니다.");
    }
  }, [goodsId]); // `goodsId`를 의존성으로 포함

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories(); // 카테고리 가져오기
      await fetchGoodsData(); // 상품 데이터 가져오기
    };

    fetchData();
  }, [fetchGoodsData]); // `fetchGoodsData` 의존성 추가

  const validateFields = () => {
    if (!goodsName.trim()) return "상품명을 입력해 주세요.";
    if (!categoryNo) return "카테고리를 선택해 주세요.";
    if (!price || price <= 0) return "유효한 판매가를 입력해 주세요.";
    if (!stock || stock <= 0) return "유효한 재고를 입력해 주세요.";
    if (discount === "" || discount < 0 || discount > 100) return "유효한 할인율(0~100)을 입력해 주세요.";
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
    formData.append("goodsName", goodsName);
    formData.append("categoryNo", categoryNo);
    formData.append("price", parseFloat(price));
    formData.append("stock", parseInt(stock));
    formData.append("discount", parseFloat(discount));
    formData.append("description", description);

    if (image instanceof File) {
      formData.append("image", image); // 새 이미지 파일 추가
    }

    try {
      await axios.put(`http://localhost:8090/api/goods/${goodsId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      alert("상품이 성공적으로 수정되었습니다.");
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("상품 수정 실패:", error);
      setError("상품 수정에 실패했습니다.");
    }
  };

  // const handleDelete = async () => {
  //   const confirmDelete = window.confirm("정말로 이 상품을 삭제하시겠습니까?");
  //   if (!confirmDelete) return;
  
  //   try {
  //     await axios.delete(`http://localhost:8090/api/goods/${goodsId}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //       },
  //     });
  //     alert("상품이 성공적으로 삭제되었습니다.");
  //     navigate(-1); // 이전 페이지로 이동
  //   } catch (error) {
  //     console.error("상품 삭제 실패:", error);
  //     alert("상품 삭제 중 오류가 발생했습니다.");
  //   }
  // };

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
              value={goodsName}
              onChange={(e) => {
                setGoodsName(e.target.value);
                setError("");
              }}
            />
          </div>
          <div>
            <label>카테고리:</label>
            <select
              value={categoryNo}
              onChange={(e) => {
                setCategoryNo(e.target.value);
                setError("");
              }}
            >
              <option value="">선택해주세요</option>
              {categories.map((cat) => (
                <option key={cat.categoryNo} value={cat.categoryNo}>
                  {cat.categoryName}
                </option>
              ))}
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
          <div>
            <label>재고:</label>
            <input
              type="number"
              step="1"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
                setError("");
              }}
            />
          </div>
          <div>
            <label>할인률:</label>
            <input
              type="number"
              step="1"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
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
