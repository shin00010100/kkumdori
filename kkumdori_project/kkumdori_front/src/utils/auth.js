// // src/utils/auth.js

// // 로그인 상태 체크
// export const isAuthenticated = () => {
//   return localStorage.getItem("user") !== null;
// };

// // 사용자 역할 가져오기
// export const getUserRole = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user ? user.role : "guest";
// };

// // 로그인 처리
// export const login = async (username, password) => {
//   // 실제 로그인 API 호출을 통해 유효성 검사 및 JWT 반환
//   // 예시로, 여기서는 간단한 로직을 사용
//   const role = username === "admin" ? "admin" : "user"; // 간단한 역할 분리
//   localStorage.setItem("user", JSON.stringify({ username, role }));
//   return { username, role };
// };

// // 로그아웃 처리
// export const logout = () => {
//   localStorage.removeItem("user");
// };
