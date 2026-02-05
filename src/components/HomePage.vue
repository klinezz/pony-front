<script setup>
import { RouterView, RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
const router = useRouter();
const logout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>
<template>
  <div>
    <div id="header">
      <div style="flex-grow: 1">PONY</div>

      <div id="btn_logout" @click="logout()">
        <img src="@/assets/logout.png" width="60px" />
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
      <div style="height: 100vh; display: flex; flex-direction: row; flex: 1">
        <div id="main">
          <RouterView></RouterView>
        </div>
        <div id="main2">
          <RouterView name="detail"></RouterView>
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
  background: #1264a3;
  color: white;
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
  background: #1264a3;
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
  background: #e8f0f6;
  border-radius: 10px 0 0 17px;
  border-right: 1px solid #e1e1e1;
  box-sizing: content-box;
  text-align: left;
  position: relative;
}
#main2 {
  flex: 1;
  margin: 0;
  padding: 15px;
  background: #ffffff;
  box-sizing: content-box;
  height: initial;
  text-align: left;
  position: relative;
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
</style>
