import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditBannerImage from "../../../components/editbannerimage/EditBannerImage";
import HLine from "../../../utils/HLine";
import EditPopup from "../../../components/editpopup/EditPopup";
import ButtonGroup from "../../../components/buttongroup/ButtonGroup";
import "./EditBanner.css";

const API_BASE_URL = "http://localhost:8090/api";

const MAX_BANNERS = 4;

const EditBanner = () => {
  const [banners, setBanners] = useState([]);
  const [popup, setPopup] = useState({ currentImage: "", link: "", isActive: false });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
        const headers = { Authorization: `Bearer ${token}` };

        const [bannerResponse, popupResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/banners`, { headers }),
          axios.get(`${API_BASE_URL}/popups`, { headers }),
        ]);

        // 배너 데이터 초기화
        const loadedBanners = new Array(MAX_BANNERS).fill({ id: null, imagePath: "", link: "", order: null });
      bannerResponse.data.forEach((banner, index) => {
        if (index < MAX_BANNERS) {
          loadedBanners[index] = {
            id: banner.bannerId || null, // bannerId를 id로 설정
            imagePath: banner.imagePath || "",
            link: banner.link || "",
            order: banner.displayOrder || index + 1,
          };
        }
      });
        setBanners(loadedBanners);
        // 팝업 데이터 설정
        setPopup(
          popupResponse.data.length > 0
            ? {
              id: popupResponse.data[0].popupId || null,
              currentImage: popupResponse.data[0].imagePath || "",
              link: popupResponse.data[0].link || "",
              isActive: popupResponse.data[0].isActive || false,
              }
            : { id: null, currentImage: "", link: "", isActive: false }
        );
        setError(""); // 에러 초기화
      } catch (err) {
        console.error("데이터 로드 중 오류 발생:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    };
    fetchData();
  }, []);

  // 배너 변경 핸들러
  const handleBannerChange = (index, field, value) => {
    setBanners((prevBanners) => {
      const updatedBanners = [...prevBanners];
      updatedBanners[index] = {
        ...updatedBanners[index],
        [field]: value,
      };
      return updatedBanners;
    });
  };

  // 팝업 변경 핸들러
  const handlePopupChange = (field, value) => {
    setPopup((prevPopup) => ({ ...prevPopup, [field]: value }));
  };

  // 저장 핸들러
  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      // 배너 데이터 처리
      for (let i = 0; i < banners.length; i++) {
        const banner = banners[i];
        const bannerFormData = new FormData();
        // 파일 추가
        if (banner.file) {
          bannerFormData.append("files", banner.file);
        } else if (banner.imagePath) {
          bannerFormData.append("currentImage", banner.imagePath); // 기존 이미지 유지
        } else {
          alert(`배너 ${i + 1}에 이미지를 추가해주세요.`);
          return;
        }

        // 링크 추가
        bannerFormData.append("links", banner.link || "");

        // 순서 추가
        bannerFormData.append("orders", banner.order || i + 1);
        // ID에 따라 PUT 또는 POST 요청
        if (banner.id) {
          // 수정 요청
          console.log(`수정 요청: ${banner.id}`);
          await axios.put(`${API_BASE_URL}/banners/${banner.id}`, bannerFormData, { headers });
        } else {
          // 추가 요청
          console.log("추가 요청");
          await axios.post(`${API_BASE_URL}/banners`, bannerFormData, { headers });
        }
      }

      // 팝업 데이터 처리
      const popupFormData = new FormData();
      if (popup.newImage) {
        popupFormData.append("file", popup.newImage); // 팝업 파일 추가
      } else if (popup.currentImage) {
        popupFormData.append("currentImage", popup.currentImage); // 기존 이미지 유지
      }
      popupFormData.append("link", popup.link || "");
      popupFormData.append("isActive", popup.isActive);

      if (popup.id) {
        // 팝업 수정
        await axios.put(`${API_BASE_URL}/popups/${popup.id}`, popupFormData, {
          headers,
        });
      } else {
        // 팝업 추가
        await axios.post(`${API_BASE_URL}/popups`, popupFormData, {
          headers,
        });
      }      

      alert("배너 및 팝업 저장이 완료되었습니다!");
      navigate(-1);
    } catch (err) {
      console.error("저장 중 오류 발생:", err);
      setError("배너 및 팝업 저장 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="edit-banner">
      <h2>배너/팝업 이미지 수정</h2>
      {error && <div className="error">{error}</div>}
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
      <HLine />
      <div className="popup-section">
        <h3>팝업</h3>
        <EditPopup popup={popup} onPopupChange={handlePopupChange} />
      </div>
      <ButtonGroup onSubmit={handleSubmit} submitText="등록" />
    </div>
  );
};

export default EditBanner;
