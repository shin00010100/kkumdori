import React, { createContext, useContext, useState, useEffect } from "react";

// AuthContext 생성
const AuthContext = createContext();

// useAuth 훅 생성
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false); // 인증 상태
  const [user, setUser] = useState(null); // 사용자 정보

  // 페이지 새로고침 시 로컬스토리지에서 인증 상태 복원
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user); // 사용자 정보 설정
      setIsAuth(true); // 인증 상태 true로 설정
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt"); // JWT 토큰 삭제
    localStorage.removeItem("user"); // 사용자 정보 삭제
    setIsAuth(false); // 인증 상태 false로 변경
    setUser(null); // 사용자 정보 초기화
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, setIsAuth, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
