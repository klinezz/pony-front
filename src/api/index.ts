import axios from "axios";
import router from "@/router";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(
  (response) => {
    // 응답이 성공적이면 그대로 반환
    return response;
  },
  (error) => {
    // 서버 응답 에러가 발생했을 때
    if (error.response) {
      const status = error.response.status;
      const errorCode = error.response.data.code;

      // 1. 상태 코드가 401(Unauthorized)이거나
      // 2. 백엔드에서 정의한 LOGIN_REQUIRED 코드인 경우
      if (status === 401 || errorCode === "LOGIN_REQUIRED") {
        alert("세션이 만료되었거나 로그인이 필요합니다.");

        // 로그인 페이지로 이동
        router.push("/login");
      }
    }
    return Promise.reject(error);
  },
);
export default api;
