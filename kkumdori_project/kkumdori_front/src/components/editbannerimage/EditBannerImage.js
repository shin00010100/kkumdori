import React from 'react';
import "./EditBannerImage.css";

function EditBannerImage({ index, banner, onBannerChange }) {
  return (
    <div className='edit-banner-image'>
      <input
        type="file"
        onChange={(e) => onBannerChange(index, 'file', e.target.files[0])}
        className='edit-banner-file'
      />
      <input
        type="text"
        placeholder="배너 클릭 시 넘어갈 링크"
        value={banner.link}
        onChange={(e) => onBannerChange(index, 'link', e.target.value)}
        className='edit-banner-link'
      />
    </div>
  );
}

export default EditBannerImage;
