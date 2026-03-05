import { defineStore } from "pinia";
import api from "@/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    isLoggedIn: false,
  }),
  actions: {
    async login(formData: FormData) {
      try {
        const res = await api.post("/api/login", formData);

        if (res.status === 200) {
          this.isLoggedIn = true;
          localStorage.setItem("is_authenticated", "true");
          this.user = res.data;
          return res.data;
        }
      } catch (error: any) {
        console.log(error);
        this.isLoggedIn = false;
        localStorage.removeItem("is_authenticated"); // 실패 시 기존 정보 삭제

        // 백엔드에서 보낸 에러 메시지가 있다면 에러 객체에 담아서 던짐
        if (error.response && error.response.data) {
          // error.response.data.message (백엔드 필터에서 보낸 JSON 내용)
          throw error.response.data.message || "로그인에 실패했습니다.";
        }
        throw error;
      }
    },
    async logout() {
      await api.post("/api/logout");
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem("is_authenticated");
      // 세션 방식은 클라이언트에서 별도의 로컬 스토리지 삭제가 필요 없음 (쿠키는 서버가 만료시킴)
    },
    async checkSession() {
      try {
        // 새로고침 시 세션이 유효한지 체크하는 API
        const res = await api.get("/api/user/me");
        this.user = res.data;
        this.isLoggedIn = true;
      } catch (e) {
        this.isLoggedIn = false;
      }
    },
  },
});
