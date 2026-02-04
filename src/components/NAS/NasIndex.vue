<template>
  <div id="nas">
    <div class="m_sub_item" style="width: 200px">
      <ul>
        <li>
          <router-link to="/NAS/image">이미지</router-link>
        </li>
        <li>
          <router-link to="/NAS/video">동영상</router-link>
        </li>
        <li>
          <router-link to="/NAS/doc">파일</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const images = ref([]);

onMounted(async () => {
  // try {
  //   const response = await axios.get("/api/nas/files?type=image");
  //   images.value = response.data;
  // } catch (error) {
  //   console.error("파일 로드 실패:", error);
  // }
});
</script>
<style scoped>
#nas ul li {
  margin-bottom: 13px;
  font-size: 14px;
  font-family: "Noto Sans KR", sans-serif !important;
}
</style>
