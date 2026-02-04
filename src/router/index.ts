import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import HomePage from "@/components/HomePage.vue";
import LoginPage from "@/components/LoginPage.vue";
import DashboardPage from "@/components/Dashboard.vue";
import BoardPage from "@/components/Dashboard.vue";

import SettingsIndex from "@/components/Settings/SettingsIndex.vue";
import SettingsThemeComponent from "@/components/Settings/Settings.vue";

import UserIndex from "@/components/User/UserIndex.vue";
import HistoryIndex from "@/components/History/HistoryIndex.vue";

import NasIndexView from "@/components/NAS/NasIndex.vue";
import NasImageComponent from "@/components/NAS/MENU_IMAGE/Image.vue";
import NasVideoComponent from "@/components/NAS/MENU_IMAGE/Video.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
      meta: { requiresAuth: false }, // 로그인 없이 접근 가능
    },
    {
      path: "/",
      component: HomePage,
      meta: { requiresAuth: false }, // 로그인 필요
      children: [
        {
          path: "", // 빈 경로는 기본 대시보드로 이동
          name: "Dashboard",
          component: DashboardPage,
        },
        {
          path: "NAS/index",
          name: "NasIndex",
          components: {
            default: NasIndexView,
          },
        },
        {
          path: "NAS/image",
          name: "NasImage",
          components: {
            default: NasIndexView, // 왼쪽 목록 유지
            detail: NasImageComponent, // 오른쪽 <RouterView name="detail" />에 표시
          },
        },
        {
          path: "NAS/video",
          name: "NasVideo",
          components: {
            default: NasIndexView,
            detail: NasVideoComponent,
          },
        },
        {
          path: "board",
          name: "Board",
          component: BoardPage,
        },
        {
          path: "settings",
          name: "SettingsIndex",
          components: {
            default: SettingsIndex,
          },
        },
        {
          path: "Settings/theme",
          name: "SettingsTheme",
          components: {
            default: SettingsIndex, // 왼쪽 목록 유지
            detail: SettingsThemeComponent, // 오른쪽 <RouterView name="detail" />에 표시
          },
        },
        {
          path: "user",
          name: "Users",
          component: UserIndex,
        },
        {
          path: "history",
          name: "History",
          component: HistoryIndex,
        },
      ],
    },
  ],
});
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  // Pinia의 isLoggedIn 상태나 실제 데이터 존재 여부로 체크
  const isAuthenticated =
    authStore.isLoggedIn || localStorage.getItem("is_authenticated") === "true";

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else if (to.name === "Login" && isAuthenticated) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});
export default router;
