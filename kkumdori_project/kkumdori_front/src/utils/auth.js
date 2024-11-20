// Storage 관련 로직 분리
const getFromStorage = (key) => JSON.parse(localStorage.getItem(key));
const setInStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const removeFromStorage = (key) => localStorage.removeItem(key);

// 테스트 계정 정보 (개발 환경에서만 사용)
const TEST_ACCOUNTS = {
  admin: { username: "admin", password: "admin123", role: "admin" },
  user: { username: "testuser", password: "user123!", role: "user" },
};

// 1. getUserRole: 사용자 권한 반환
export const getUserRole = () => {
  const user = getFromStorage("user");
  return user?.role || "guest"; // 로그인하지 않은 경우 'guest' 반환
};

// 2. isAuthenticated: 사용자 로그인 상태 확인
export const isAuthenticated = () => Boolean(localStorage.getItem("authToken"));

// 3. login: 로그인 처리
export const login = (username, password) => {
  // 테스트 계정을 이용한 로그인 처리 (서버 연동 전)
  const account = Object.values(TEST_ACCOUNTS).find(
    (user) => user.username === username && user.password === password
  );

  if (account) {
    setInStorage("authToken", "sample-token"); // 실제로는 서버에서 받은 토큰 사용
    setInStorage("user", { username: account.username, role: account.role });
  } else {
    throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");
  }
};

// 4. logout: 로그아웃 처리
export const logout = () => {
  removeFromStorage("authToken");
  removeFromStorage("user");
};

// 5. hasAccess: 역할 기반 접근 제어 (추가 기능)
export const hasAccess = (requiredRole) => {
  const role = getUserRole();
  const rolesHierarchy = ["guest", "user", "admin"]; // 역할 계층
  return rolesHierarchy.indexOf(role) >= rolesHierarchy.indexOf(requiredRole);
};