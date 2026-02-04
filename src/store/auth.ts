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
          this.user = res.data; // 서버에서 보내준 유저 정보 저장

          return res.data; // 성공 반환
        }
      } catch (error) {
        this.isLoggedIn = false;
        throw error; // 에러를 던져야 컴포넌트의 catch가 작동함
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
