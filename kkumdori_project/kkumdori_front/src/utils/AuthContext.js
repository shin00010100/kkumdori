import React, { createContext, useContext, useState, useEffect } from "react";
import { login as authLogin, logout as authLogout, getUserRole, isAuthenticated } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated()); // 초기 로그인 상태를 localStorage에서 확인
  const [userRole, setUserRole] = useState(getUserRole()); // 초기 사용자 역할 설정
  const [user, setUser] = useState(null); // 초기값을 null로 설정

   // 초기화: 로컬스토리지에서 사용자 정보 가져오기
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUser(JSON.parse(storedUser)); // 로컬스토리지의 user 데이터를 상태에 반영
    }
  }, []);

  const login = async (username, password) => {
    try {
      await authLogin(username, password);
      setIsAuth(true); // 상태 업데이트
      setUserRole(getUserRole()); // 사용자 역할 설정
    } catch (error) {
      throw error; // 에러 전달
    }
  };

  const logout = () => {
    authLogout();
    setIsAuth(false);
    setUserRole("guest"); // 기본 역할로 초기화
    alert("로그아웃되었습니다.");
  };

  // localStorage 변경 시 상태 업데이트 (새로고침 처리)
  useEffect(() => {
    setIsAuth(isAuthenticated());
    setUserRole(getUserRole());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, user, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
