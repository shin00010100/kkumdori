import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditCategory.css";

function EditCategory() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const navigate = useNavigate();

  // DB에서 카테고리 목록을 가져옴
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      let token = sessionStorage.getItem("jwt");  // 세션에서 먼저 확인
    if (!token) {
      token = localStorage.getItem("jwt");  // 세션에 없으면 로컬스토리지에서 가져오기
    }
      const response = await axios.get("http://localhost:8090/api/categories", {
        headers: {
          Authorization: `Bearer ${token}` // Authorization 헤더 추가
        },
      });
      setCategories(
        response.data.map((item) => ({
          id: item.categoryNo, // categoryNo를 id로 매핑
          categoryName: item.categoryName,
        }))
      ); // 상태 업데이트
      console.log("카테고리 데이터:", response.data);
    } catch (error) {
      console.error("카테고리 가져오기 실패:", error);
    }
  };

  // 카테고리 수정
const handleUpdate = async (id, newName) => {
  if (!id) {
    alert("수정할 카테고리 ID가 없습니다.");
    return;
  }
  if (!newName.trim()) {
    alert("카테고리 이름을 입력하세요.");
    return;
  }

  try {
    let token = sessionStorage.getItem("jwt");  // 세션에서 먼저 확인
    if (!token) {
      token = localStorage.getItem("jwt");  // 세션에 없으면 로컬스토리지에서 가져오기
    }
    await axios.put(
      `http://localhost:8090/api/categories/${id}`,
      { categoryName: newName },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더 추가
        },
      }
    );
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, categoryName: newName } : category
      )
    );
    alert("카테고리가 수정되었습니다.");
  } catch (error) {
    console.error("카테고리 수정 실패:", error);
    // setError("카테고리 수정에 실패했습니다.");
  }
};

  // 카테고리 삭제
const handleDelete = async (id) => {
  if (!window.confirm("정말 삭제하시겠습니까?")) return;

  try {
    let token = sessionStorage.getItem("jwt");  // 세션에서 먼저 확인
    if (!token) {
      token = localStorage.getItem("jwt");  // 세션에 없으면 로컬스토리지에서 가져오기
    }
    await axios.delete(`http://localhost:8090/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더 추가
      },
    });
    setCategories(categories.filter((category) => category.id !== id)); // 삭제된 데이터 제거
    alert("카테고리가 삭제되었습니다.");
  } catch (error) {
    console.error("카테고리 삭제 실패:", error);
    // setError("카테고리 삭제에 실패했습니다.");
  }
};

  // 카테고리 추가
const handleAdd = async () => {
  if (!newCategory.trim()) {
    alert("새 카테고리를 입력하세요.");
    return;
  }

  try {
    let token = sessionStorage.getItem("jwt");  // 세션에서 먼저 확인
    if (!token) {
      token = localStorage.getItem("jwt");  // 세션에 없으면 로컬스토리지에서 가져오기
    }
    const response = await axios.post(
      "http://localhost:8090/api/categories",
      { categoryName: newCategory },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더 추가
        },
      }
    );
    setCategories([
      ...categories,
      { id: response.data.categoryNo, categoryName: response.data.categoryName },
    ]); // 목록에 추가된 데이터 반영
    setNewCategory(""); // 입력 필드 초기화
    alert("카테고리가 추가되었습니다.");
  } catch (error) {
    console.error("카테고리 추가 실패:", error);
    // setError("카테고리 추가에 실패했습니다.");
  }
};

  return (
    <div className="category-manager">
      <h2>카테고리 관리자</h2>
      {categories.map((category) => (
        <div key={category.id} className="category-item">
          <input
            type="text"
            value={category.categoryName}
            onChange={(e) =>
              setCategories((prevCategories) =>
                prevCategories.map((cat) =>
                  cat.id === category.id
                    ? { ...cat, categoryName: e.target.value }
                    : cat
                )
              )
            }
          />
          <button className="category-edit-button"
            onClick={() => handleUpdate(category.id, category.categoryName)}
          >
            수정
          </button>
          <button className="category-delete-button" onClick={() => handleDelete(category.id)}>삭제</button>
        </div>
      ))}

      <div className="category-item">
        <input
          type="text"
          placeholder="새 카테고리"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="category-insert-button" onClick={handleAdd}>추가</button>
      </div>

      <button className="category-back-button" onClick={() => navigate(-1)}>뒤로</button>
    </div>
  );
}

export default EditCategory;