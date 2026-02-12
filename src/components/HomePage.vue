<script setup>
import { RouterView, RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { computed, ref, watch } from "vue";
import Breadcrumb from "primevue/breadcrumb";
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const logout = async () => {
  await authStore.logout();
  router.push("/login");
};
const transitionName = ref("");
const dynamicTransition = ref("");

watch(
  () => route.name,
  (to, from) => {
    if (from === "Ability" && to === "AbilityDetail") {
      dynamicTransition.value = "slide-next";
    } else if (from === "AbilityDetail" && to === "Ability") {
      dynamicTransition.value = "slide-prev";
    } else {
      dynamicTransition.value = "";
    }
  },
);

const home = ref({
  icon: "pi pi-home",
  route: "/",
});
const menuItems =
  router.options.routes
    .find((r) => r.path === "/")
    ?.children.filter((child) => child.meta?.isMenu) || [];

const items = computed(() => {
  // route.matched에서 정보를 가져와 Breadcrumb 형식으로 변환
  return route.matched
    .filter((m) => m.meta && m.meta.label && m.meta.label !== "HOME")
    .map((m) => {
      let label = m.meta.label;

      // ✅ 만약 라벨이 ':'로 시작하면 params에서 해당 값을 찾아서 넣음
      if (label.startsWith(":")) {
        const paramName = label.substring(1); // 'skillName' 추출
        label = route.params[paramName] || label; // 실제 값(예: 'Java')으로 교체
      }

      return {
        label: label,
        route: m.path,
      };
    });
});
</script>
<template>
  <div>
    <div id="header">
      <div style="flex-grow: 1">PONY</div>

      <div id="btn_logout" @click="logout()">
        <img src="/icon-logout.png" width="27px" />
      </div>
    </div>

    <div id="body">
      <nav id="nav_var">
        <router-link
          v-for="menu in menuItems"
          :key="menu.path"
          :to="menu.path.startsWith('/') ? menu.path : `/${menu.path}`"
        >
          <div class="m_item">
            <div class="m_sub_item">
              <img
                :src="menu.meta.icon"
                :style="{ width: menu.meta.label === 'NAS' ? '27px' : '30px' }"
              />
            </div>
            <div class="m_title">{{ menu.meta.label }}</div>
          </div>
        </router-link>
      </nav>
      <div class="main_container" style="">
        <div id="main">
          <RouterView></RouterView>
        </div>
        <div id="main2">
          <div class="navigation-wrapper">
            <Breadcrumb :home="home" :model="items">
              <template #item="{ item, props }">
                <router-link
                  v-if="item.route"
                  v-slot="{ href, navigate }"
                  :to="item.route"
                  custom
                >
                  <a :href="href" v-bind="props.action" @click="navigate">
                    <span :class="[item.icon, 'text-color']" />
                    <span class="font-bold">{{ item.label }}</span>
                  </a>
                </router-link>
                <a
                  v-else
                  :href="item.url"
                  :target="item.target"
                  v-bind="props.action"
                >
                  <span class="text-color">{{ item.label }}</span>
                </a>
              </template>
            </Breadcrumb>
          </div>
          <div class="detail_container">
            <router-view name="detail" v-slot="{ Component, route }">
              <transition :name="dynamicTransition">
                <component :is="Component" :key="route.path" />
              </transition>
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  box-sizing: border-box;
  /* background: #1264a3; */
  background: #0e0e0e;
  color: white;
  display: flex;
  flex-direction: row;
  padding: 0 20px;
}
#header #btn_logout {
  cursor: pointer;
}
#body {
  position: relative;
  top: 50px;
  display: flex;
  width: 100vw;
}
#nav_var {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  height: 100vh;
  width: 80px;
  flex-shrink: 0;
  text-align: left;
  /* background: #1264a3; */
  background: #0e0e0e;
  color: white;
  padding-top: 20px;
}
#nav_var .m_item {
  width: calc(100% - 10px);
  box-sizing: content-box;
  cursor: pointer;
  text-align: center;
  margin-bottom: 17px;
}
#nav_var .m_title {
  font-size: 12px;
}
#nav_var .m_item .m_sub_item {
  position: relative;
  height: 47px;
  box-sizing: content-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
#nav_var .m_item .m_sub_item img {
  width: 30px;
}
.main_container {
  display: flex;
  flex: 1;
  flex-direction: row;
  height: calc(100vh - 50px);
}
#main {
  display: flex;
  flex-direction: row;
  padding: 15px;
  width: 150px;
  height: inherit;
  margin: -10px;
  margin-top: 0;
  margin-right: 0px;
  background: #272727;
  border-radius: 10px 0 0 17px;
  box-sizing: content-box;
  text-align: left;
  position: relative;
  color: white;
}
#main2 {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;
  background: #f4f7f9;
  box-sizing: content-box;
  text-align: left;
  position: relative;
  overflow: hidden;
  height: calc(100vh - 50px);
  min-height: calc(100vh - 50px);
  max-height: calc(100vh - 50px);
}
#main2 .detail_container {
  flex: 1;
  padding: 15px;
  position: relative;
  overflow: hidden;
  height: initial;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#header {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
}
#btn_logout {
  cursor: pointer;
}
/* 1. 앞으로 가기 (Ability -> Detail) */
.slide-next-enter-from {
  transform: translateX(100%);
}
.slide-next-leave-to {
  transform: translateX(-100%);
}

/* 2. 뒤로 가기 (Detail -> Ability) */
.slide-prev-enter-from {
  transform: translateX(-100%);
}
.slide-prev-leave-to {
  transform: translateX(100%);
}

/* 공통 애니메이션 속성 */
.slide-next-enter-active,
.slide-prev-enter-active {
  z-index: 2; /* 새 화면이 위로 오게 */
}
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  position: absolute;
  top: 15px; /* main2의 패딩값 */
  left: 15px;
  /* 부모 높이에서 패딩 상하값을 뺀 높이 고정 */
  width: 100%;
  height: calc(100vh - 50px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f4f7f9; /* 배경색 일치 */
}

/* 나가는 요소가 들어오는 요소와 겹치게 처리 */
.slide-next-leave-active,
.slide-prev-leave-active {
  position: absolute;
  width: 100%;
}
:deep(.p-breadcrumb) {
  font-size: 12px;
  flex: 0 0 auto; /* 높이가 줄어들거나 늘어나지 않게 고정 */
  display: flex;
  align-items: center;
  height: 36px;
  overflow: hidden;
}
:deep(.p-menu) {
  min-width: 100% !important;
  width: 100%;
  background-color: transparent;
  color: #ffffff;
  border: 0px;
  padding-left: 0;
}
:deep(.p-menu-item-content) {
  color: #ffffff;
  padding-left: 0;
}
:deep(.p-icon) {
  width: 13px;
  height: 15px;
}
:deep(.p-menu-list) {
  padding: 0;
}
</style>
