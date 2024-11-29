import { useState, useEffect } from "react";
import "./UploadImage.css";

const UploadImage = ({ onImageSelect, existingImage }) => {
  const [preview, setPreview] = useState(existingImage || null); // 초기값: 기존 이미지

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl); // 미리 보기 URL 설정
        onImageSelect(file); // 부모 컴포넌트에 선택한 파일 전달
    } else {
        alert("이미지 파일을 선택해 주세요.");
        setPreview(null);
        onImageSelect(null); // 잘못된 파일 선택 시 부모 컴포넌트에 null 전달
    }
  };

  // 기존 이미지가 변경되었을 때 동기화
  useEffect(() => {
    if (!preview && existingImage) {
        setPreview(existingImage);
    }
}, [existingImage, preview]);

    return (
      <div className="file-input-container">
            {/* 이미지 미리보기 */}
            <div className="attachment-preview">
                {preview ? (
                    <img
                        src={preview}
                        alt="첨부 이미지 선택"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                ) : (
                    "첨부 이미지 선택"
                )}
            </div>
            {/* 파일 선택 입력 */}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
            />
        </div>
    );
  };

export default UploadImage;