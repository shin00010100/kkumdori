import { useEffect, useState } from "react";
import axios from "axios";
import EditBannerImage from "../../../components/editbannerimage/EditBannerImage";
import HLine from "../../../utils/HLine";
import EditPopup from "../../../components/editpopup/EditPopup";
import ButtonGroup from "../../../components/buttongroup/ButtonGroup";
import "./EditBanner.css";

const EditBanner = () => {
  const [banners, setBanners] = useState([
    { file: null, link: '', order: 1 },
    { file: null, link: '', order: 2 },
    { file: null, link: '', order: 3 },
    { file: null, link: '', order: 4 },
  ]);

  const [popup, setPopup] = useState({ currentImage: null, newImage: null, link: '' });

    // 배너 및 팝업 초기 데이터 로드
    useEffect(() => {
      const fetchData = async () => {
          try {
            let token = sessionStorage.getItem("jwt");  // 세션에서 먼저 확인
          if (!token) {
            token = localStorage.getItem("jwt");  // 세션에 없으면 로컬스토리지에서 가져오기
          }
          // 배너 데이터 불러오기
          const bannerResponse = await axios.get("http://localhost:8090/api/banners", {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          const bannersData = bannerResponse.data.map((banner, index) => ({
            file: null,
            link: banner.link,
            order: banner.displayOrder,
            currentImage: `http://localhost:8090/api/images/${banner.imagePath}`,
          }));
          setBanners(bannersData);
  
          // 팝업 데이터 불러오기
          const popupResponse = await axios.get("http://localhost:8090/api/popups", {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          const popupData = popupResponse.data;
          setPopup({
            currentImage: `http://localhost:8090/api/images/${popupData.imagePath}`,
            newImage: null,
            link: popupData.link,
          });
        } catch (error) {
          console.error("데이터 로드 중 오류 발생:", error);
          alert("배너 및 팝업 데이터를 불러오는 데 실패했습니다.");
        }
      };
      fetchData();
    }, []);

  // 배너 상태 변경 핸들러
  const handleBannerChange = (index, field, value) => {
    const updatedBanners = [...banners];
    updatedBanners[index][field] = value;
    setBanners(updatedBanners);
  };

    // 팝업 상태 변경 핸들러
  const handlePopupChange = (field, value) => {
    setPopup({ ...popup, [field]: value });
  };

    // 데이터 저장 핸들러
    const handleSubmit = async () => {
      try {
        let token = sessionStorage.getItem("jwt");  // 세션에서 먼저 확인
        if (!token) {
          token = localStorage.getItem("jwt");  // 세션에 없으면 로컬스토리지에서 가져오기
        }
        // 배너 저장
        const bannerFormData = new FormData();
        banners.forEach((banner) => {
          if (banner.file) bannerFormData.append("images", banner.file);
          bannerFormData.append("links", banner.link);
          bannerFormData.append("orders", banner.order);
        });
        await axios.post("http://localhost:8090/api/banners", bannerFormData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // 팝업 저장
        const popupFormData = new FormData();
        if (popup.newImage) popupFormData.append("image", popup.newImage);
        popupFormData.append("link", popup.link);
        await axios.post("http://localhost:8090/api/popups", popupFormData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        alert("배너 및 팝업이 성공적으로 저장되었습니다.");
      } catch (error) {
        console.error("저장 중 오류 발생:", error);
        alert("배너 및 팝업 저장 중 오류가 발생했습니다.");
      }
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