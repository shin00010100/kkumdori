import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

const PrivateRoute = ({ children, allowedRoles }) => {
    const userRole = getUserRole(); // 현재 사용자의 역할 정보 가져오기

    if (!allowedRoles.includes(userRole)) {
        // 허용된 역할에 사용자의 역할이 포함되지 않으면 접근 불가 페이지로 리다이렉트
        return <Navigate to="/" replace />; // 메인 페이지로 리다이렉트
    }

    return children; // 역할이 허용된 사용자에게는 해당 컴포넌트를 렌더링
};

export default PrivateRoute;