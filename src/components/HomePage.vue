<script setup>
import { RouterView, RouterLink } from "vue-router";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { ref, watch } from "vue";
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
      <nav>
        <router-link to="/NAS/image">
          <div class="m_item">
            <div class="m_sub_item">
              <img src="/icon-nas.png" style="width: 27px" />
            </div>
            <div class="m_title">NAS</div>
          </div>
        </router-link>
        <router-link to="/settings">
          <div class="m_item">
            <div class="m_sub_item">
              <img src="/icon-settings.png" style="width: 30px" />
            </div>
            <div class="m_title">설정</div>
          </div>
        </router-link>
        <router-link to="/user">
          <div class="m_item">
            <div class="m_sub_item">
              <img src="/icon-user.png" style="width: 30px" />
            </div>
            <div class="m_title">사용자</div>
          </div>
        </router-link>
        <router-link to="/history">
          <div class="m_item">
            <div class="m_sub_item">
              <img src="/icon-record.png" style="width: 30px" />
            </div>
            <div class="m_title">이력</div>
          </div>
        </router-link>
      </nav>
      <div class="main_container" style="">
        <div id="main">
          <RouterView></RouterView>
        </div>
        <div id="main2">
          <router-view name="detail" v-slot="{ Component, route }">
            <transition :name="dynamicTransition">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
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
nav {
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
nav .m_item {
  width: calc(100% - 10px);
  box-sizing: content-box;
  cursor: pointer;
  text-align: center;
  margin-bottom: 17px;
}
nav .m_title {
  font-size: 12px;
}
nav .m_item .m_sub_item {
  position: relative;
  height: 47px;
  box-sizing: content-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
nav .m_item .m_sub_item img {
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
  width: 150px;
  padding: 15px;
  padding-left: 25px;
  height: inherit;
  margin: -10px;
  margin-top: 0;
  margin-right: 0px;
  /* background: #e8f0f6; */
  background: #272727;
  border-radius: 10px 0 0 17px;
  border-right: 1px solid #e1e1e1;
  box-sizing: content-box;
  text-align: left;
  position: relative;
  color: white;
}
#main2 {
  flex: 1;
  margin: 0;
  padding: 15px;
  background: #f4f7f9;
  box-sizing: content-box;
  text-align: left;
  position: relative;
  overflow-y: hidden;
  height: calc(100vh - 50px);
  min-height: calc(100vh - 50px);
  max-height: calc(100vh - 50px);
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
</style>
