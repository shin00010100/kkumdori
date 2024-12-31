import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/AuthContext'; // AuthContext 사용

const NaverCallback = () => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = useAuth(); // AuthContext에서 상태 업데이트 함수 가져오기

  useEffect(() => {
    const handleNaverLogin = async () => {
      // 해시에서 액세스 토큰 추출
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const naverAccessToken = hashParams.get('access_token');

      if (!naverAccessToken) {
        alert("네이버 로그인 실패: 토큰이 존재하지 않습니다.");
        return;
      }

      try {
        // 네이버 로그인 토큰을 백엔드로 전달
        const response = await fetch("http://localhost:8090/api/auth/login/naver", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: naverAccessToken }),
        });

        if (response.ok) {
          const data = await response.json();
          const storage = localStorage; 
          storage.setItem("jwt", data.token);

          setIsAuth(true);
          setUser({ fullname: data.fullname, role: data.role });

          // 신규 사용자 처리
          if (data.redirect) {
            alert("네이버 로그인에 성공하였습니다.");
            alert(data.alert); // 사용자에게 알림
            navigate(data.redirect); // 지정된 경로로 이동
          } else {
            alert("네이버 로그인에 성공하였습니다.");
            navigate("/main"); // 기존 사용자는 메인으로 이동
          }
        } else {
          alert("네이버 로그인 실패: 서버 응답 에러");
        }
      } catch (error) {
        console.error("네이버 로그인 중 에러 발생:", error);
        alert("네이버 로그인 실패: 요청 처리 중 문제가 발생했습니다.");
      }
    };

    handleNaverLogin();
  }, [navigate, setIsAuth, setUser]);

  return (
    <div>
      {/* 로딩 중일 때 표시할 UI를 추가할 수 있습니다 */}
      <p>로그인 중입니다. 잠시만 기다려주세요...</p>
    </div>
  );
};

export default NaverCallback;
