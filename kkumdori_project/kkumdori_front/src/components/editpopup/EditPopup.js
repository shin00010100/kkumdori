import React from "react";
import "./EditPopup.css";

function EditPopup({ popup, onPopupChange }) {
    return (
        <div className="popup-input-container">
            <input
                type="file"
                onChange={(e) => onPopupChange('newImage', e.target.files[0])}
                className="popup-input-file"
            />
            <input
                type="text"
                placeholder="팝업 클릭 시 넘어갈 링크"
                value={popup.link}
                onChange={(e) => onPopupChange('link', e.target.value)}
                className="popup-input-link"
            />
    </div>
    );
  }
  
export default EditPopup;
  