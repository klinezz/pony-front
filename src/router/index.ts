import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import HomePage from "@/components/HomePage.vue";
import LoginPage from "@/components/LoginPage.vue";
import DashboardPage from "@/components/Dashboard.vue";
import BoardPage from "@/components/Dashboard.vue";

import SettingsIndex from "@/components/Settings/SettingsIndex.vue";
import SettingsThemeComponent from "@/components/Settings/Settings.vue";

import UserIndex from "@/components/User/UserIndex.vue";
import UserManageView from "@/components/User/UserManage.vue";
import UserRoleView from "@/components/User/UserRole.vue";
import UserLogView from "@/components/User/UserLog.vue";

import HistoryIndex from "@/components/History/HistoryIndex.vue";
import HistoryToolsComponent from "@/components/History/Tools.vue";
import HistoryAbilityComponent from "@/components/History/Ability.vue";
import HistoryAbilityDetailComponent from "@/components/History/AbilityDetail.vue";
import HistoryCertComponent from "@/components/History/Certification.vue";
import HistoryProjectComponent from "@/components/History/Project.vue";

import NasIndex from "@/components/NAS/NasIndex.vue";
import NasImageComponent from "@/components/NAS/MENU_IMAGE/Image.vue";
import NasVideoComponent from "@/components/NAS/MENU_IMAGE/Video.vue";
import NasDocComponent from "@/components/NAS/MENU_IMAGE/Doc.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active-menu-item",
  linkExactActiveClass: "exact-active-menu-item",
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
      meta: { requiresAuth: false, label: "HOME" }, // 로그인 필요
      children: [
        {
          path: "", // 빈 경로는 기본 대시보드로 이동
          name: "Dashboard",
          component: DashboardPage,
          meta: { label: "Home" },
        },
        {
          path: "NAS",
          redirect: "/NAS/image",
          meta: { label: "NAS", isMenu: true, icon: "/icon-nas.png" },
          children: [
            {
              path: "image",
              name: "NasImage",
              components: { default: NasIndex, detail: NasImageComponent },
              meta: { label: "이미지", icon: "pi pi-images" },
            },
            {
              path: "video",
              name: "NasVideo",
              components: { default: NasIndex, detail: NasVideoComponent },
              meta: { label: "동영상", icon: "pi pi-video" },
            },
            {
              path: "doc",
              name: "NasDoc",
              components: { default: NasIndex, detail: NasDocComponent },
              meta: { label: "문서", icon: "pi pi-file" },
            },
          ],
        },
        {
          path: "board",
          name: "Board",
          component: BoardPage,
        },
        {
          path: "settings",
          name: "SettingsIndex",
          meta: { label: "설정", isMenu: true, icon: "/icon-settings.png" },
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
          meta: { label: "사용자", isMenu: true, icon: "/icon-user.png" },
          redirect: "/user/manage",
          children: [
            {
              path: "manage",
              name: "Manage",
              meta: { label: "사용자 관리", icon: "pi pi-user" },
              components: {
                default: UserIndex,
                detail: UserManageView,
              },
            },
            {
              path: "role",
              name: "Role",
              meta: { label: "권한 관리", icon: "pi pi-key" },
              components: {
                default: UserIndex,
                detail: UserRoleView,
              },
            },
            {
              path: "log",
              name: "Log",
              meta: { label: "사용자 로그", icon: "pi pi-history" },
              components: {
                default: UserIndex,
                detail: UserLogView,
              },
            },
          ],
        },
        {
          path: "history",
          meta: { label: "History", isMenu: true, icon: "/icon-record.png" },
          redirect: "/history/ability",
          children: [
            {
              path: "ability",
              meta: { label: "Ability", icon: "pi pi-id-card" },
              children: [
                {
                  path: "",
                  name: "Ability",
                  components: {
                    default: HistoryIndex,
                    detail: HistoryAbilityComponent,
                  },
                },
                {
                  path: ":skillName",
                  name: "AbilityDetail",
                  components: {
                    default: HistoryIndex,
                    detail: HistoryAbilityDetailComponent,
                  },
                  meta: { label: ":skillName" },
                },
              ],
            },
            {
              path: "project",
              name: "Project",
              meta: { label: "Project", icon: "pi pi-objects-column" },
              components: {
                default: HistoryIndex,
                detail: HistoryProjectComponent,
              },
            },
            {
              path: "certification",
              name: "Certification",
              meta: { label: "Certification", icon: "pi pi-receipt" },
              components: {
                default: HistoryIndex,
                detail: HistoryCertComponent,
              },
            },
            {
              path: "tools",
              meta: { label: "Tools", icon: "pi pi-receipt" },
              components: {
                default: HistoryIndex,
                detail: HistoryToolsComponent,
              },
            },
          ],
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
router.afterEach(() => {
  // 전환이 시작되거나 끝날 때 스크롤 위치를 0으로 초기화
  const container = document.getElementById("main2");
  if (container) {
    container.scrollTo(0, 0);
  }
});
export default router;
