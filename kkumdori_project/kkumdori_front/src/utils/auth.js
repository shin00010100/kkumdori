// 1. getUserRole: 사용자 권한을 가져오는 함수
// 현재 로그인한 사용자의 역할을 반환합니다. 
export const getUserRole = () => {
    // 예를 들어, 사용자 역할 정보가 로컬 스토리지에 저장되어 있다고 가정합니다.
    // 실제 구현에서는 로그인 시 서버에서 받아온 역할 정보를 활용할 수 있습니다.
    // const user = JSON.parse(localStorage.getItem('user'));
    // return user ? user.role : 'guest'; // 로그인하지 않았을 경우 'guest'로 처리
    return 'admin';
};

// 2. isAuthenticated: 사용자 로그인 상태를 확인하는 함수
// 사용자가 로그인되어 있는지 여부를 확인합니다.
export const isAuthenticated = () => {
    // 예시로 토큰을 확인하여 로그인 상태를 체크합니다.
    return Boolean(localStorage.getItem('authToken'));
};

// 3. login: 사용자가 로그인할 때 호출하는 함수
// 실제 구현에서는 API 요청으로 서버와 인증을 처리해야 합니다.
export const login = (username, password) => {
    // 예제 코드로, 실제 로그인 처리 로직이 필요합니다.
    // 서버에서 받은 토큰과 사용자 정보를 로컬 스토리지에 저장합니다.
    const authToken = "sample-token"; // 실제로는 서버에서 받아온 토큰 사용
    const userRole = "admin"; // 서버에서 받아온 사용자 역할
    
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('user', JSON.stringify({ username, role: userRole }));
};

// 4. logout: 사용자가 로그아웃할 때 호출하는 함수
// 로그인 세션을 종료하고 로컬 스토리지에서 사용자 정보를 제거합니다.
export const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
};