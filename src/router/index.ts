import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import HomePage from "@/components/HomePage.vue";
import LoginPage from "@/components/LoginPage.vue";
import SignUpPage from "@/components/SignUpPage.vue";
import DashboardPage from "@/components/Dashboard.vue";
import BoardPage from "@/components/Dashboard.vue";
import SettingsPage from "@/components/Settings/Settings.vue";

import SettingsIndex from "@/components/Settings/SettingsIndex.vue";
import SettingsThemeComponent from "@/components/Settings/Settings.vue";

import UserIndex from "@/components/User/UserIndex.vue";
import UserManageView from "@/components/User/UserManage.vue";
import UserRoleView from "@/components/User/UserRole.vue";
import UserLogView from "@/components/User/UserLog.vue";

import ResumeIndex from "@/components/Resume/Index.vue";
import ResumeAboutComponent from "@/components/Resume/About.vue";
import ResumeToolsComponent from "@/components/Resume/Tools.vue";
import ResumeAbilityComponent from "@/components/Resume/Ability.vue";
import ResumeAbilityDetailComponent from "@/components/Resume/AbilityDetail.vue";
import ResumeCertComponent from "@/components/Resume/Certification.vue";
import ResumeProjectComponent from "@/components/Resume/Project.vue";

import NasIndex from "@/components/NAS/NasIndex.vue";
import NasImageComponent from "@/components/NAS/MENU_IMAGE/Image.vue";
import NasVideoComponent from "@/components/NAS/MENU_IMAGE/Video.vue";
import NasDocComponent from "@/components/NAS/MENU_IMAGE/Doc.vue";

import ManagerIndex from "@/components/Manager/Index.vue";
import ManagerCompany from "@/components/Manager/Company.vue";
import ManagerProject from "@/components/Manager/Project.vue";
import ManagerCertification from "@/components/Manager/Certification.vue";

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
      path: "/signup",
      name: "Signup",
      component: SignUpPage,
      meta: { requiresAuth: false }, // 로그인 없이 접근 가능
    },
    {
      path: "/",
      component: HomePage,
      meta: { requiresAuth: false, label: "HOME" }, // 로그인 필요
      children: [
        {
          path: "/", // 빈 경로는 기본 대시보드로 이동
          name: "Dashboard",
          component: DashboardPage,
          meta: { label: "Home", isMenu: true, icon: "/icon-home.png" },
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
          path: "Settings/theme",
          name: "SettingsTheme",
          components: {
            default: SettingsIndex, // 왼쪽 목록 유지
            detail: SettingsThemeComponent, // 오른쪽 <RouterView name="detail" />에 표시
          },
        },
        {
          path: "settings",
          meta: { label: "설정", isMenu: true, icon: "/icon-settings.png" },
          redirect: "/settings/monaco",
          children: [
            {
              path: "monaco",
              name: "monaco",
              meta: { label: "사용자 관리", icon: "pi pi-user" },
              components: {
                default: SettingsIndex,
                detail: SettingsPage,
              },
            },
          ],
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
          path: "resume",
          meta: { label: "Resume", isMenu: true, icon: "/icon-record.png" },
          redirect: "/resume/about",
          children: [
            {
              path: "about",
              meta: { label: "About", icon: "pi pi-exclamation-circle" },
              components: {
                default: ResumeIndex,
                detail: ResumeAboutComponent,
              },
            },
            {
              path: "skill",
              meta: { label: "Skill", icon: "pi pi-id-card" },
              children: [
                {
                  path: "",
                  name: "Skill",
                  components: {
                    default: ResumeIndex,
                    detail: ResumeAbilityComponent,
                  },
                },
                {
                  path: ":skillName",
                  name: "SkillDetail",
                  components: {
                    default: ResumeIndex,
                    detail: ResumeAbilityDetailComponent,
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
                default: ResumeIndex,
                detail: ResumeProjectComponent,
              },
            },
            {
              path: "certification",
              name: "Certification",
              meta: { label: "Certification", icon: "pi pi-receipt" },
              components: {
                default: ResumeIndex,
                detail: ResumeCertComponent,
              },
            },
            {
              path: "tools",
              meta: { label: "Tools", icon: "pi pi-receipt" },
              components: {
                default: ResumeIndex,
                detail: ResumeToolsComponent,
              },
            },
          ],
        },
        {
          path: "manager",
          meta: { label: "Manager", isMenu: true, icon: "/icon-admin.png" },
          redirect: "/manager/project",
          children: [
            {
              path: "company",
              meta: {
                label: "소속회사 관리",
                icon: "pi pi-building",
              },
              components: {
                default: ManagerIndex,
                detail: ManagerCompany,
              },
            },
            {
              path: "project",
              meta: {
                label: "프로젝트 관리",
                icon: "pi pi-th-large",
              },
              components: {
                default: ManagerIndex,
                detail: ManagerProject,
              },
            },
            {
              path: "certification",
              meta: {
                label: "자격증 관리",
                icon: "pi pi-receipt",
              },
              components: {
                default: ManagerIndex,
                detail: ManagerCertification,
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
  const container = document.getElementById("main_detail");
  if (container) {
    container.scrollTo(0, 0);
  }
});
export default router;
