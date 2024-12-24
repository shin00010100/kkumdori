import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuth, user} = useAuth(); // 현재 사용자의 역할 정보 가져오기

    // 권한 검증 로직
  if (!isAuth || (allowedRoles && !allowedRoles.includes(user?.role))) {
    return <Navigate to="/" />; // 접근 불가 시 메인 페이지로 리다이렉트
  }

    return children; // 역할이 허용된 사용자에게는 해당 컴포넌트를 렌더링
};

export default PrivateRoute;