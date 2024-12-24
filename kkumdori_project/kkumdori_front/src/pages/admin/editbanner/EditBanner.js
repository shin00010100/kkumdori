import { useState } from "react";
import EditBannerImage from "../../../components/editbannerimage/EditBannerImage";
import HLine from "../../../utils/HLine";
import EditPopup from "../../../components/editpopup/EditPopup";
import ButtonGroup from "../../../components/buttongroup/ButtonGroup";
import "./EditBanner.css";

const EditBanner = () => {
  const [banners, setBanners] = useState([
    { file: null, link: '' },
    { file: null, link: '' },
    { file: null, link: '' },
    { file: null, link: '' },
  ]);

  const [popup, setPopup] = useState({ currentImage: null, newImage: null, link: '' });

  const handleBannerChange = (index, field, value) => {
    const newBanners = [...banners];
    newBanners[index][field] = value;
    setBanners(newBanners);
  };

  const handlePopupChange = (field, value) => {
    setPopup({ ...popup, [field]: value });
  };

  const handleSubmit = () => {
    // 저장 로직 작성
    console.log('Banners:', banners);
    console.log('Popup:', popup);
  };
    
      return (
        <div className="edit-banner">
          <h2>배너/팝업 이미지 수정하기</h2>
          <div className="banner-section">
            <h3>배너</h3>
            {banners.map((banner, index) => (
              <EditBannerImage
                key={index}
                index={index}
                banner={banner}
                onBannerChange={handleBannerChange}
              />
            ))}
          </div>
          <HLine/>
          <div className="banner-section">
            <h3>팝업</h3>
            <EditPopup popup={popup} onPopupChange={handlePopupChange}/>
          </div>
          <ButtonGroup
                onSubmit={handleSubmit}
                submitText="등록"
          />
        </div>
      );
    }

export default EditBanner;