<script setup>
import { ref } from "vue";
</script>
<template>
  <div>
    <h2 class="menu_title">About</h2>

    <div class="about_container">
      <div class="info">
        <div class="contact-list">
          <div class="contact-item">
            <i class="pi pi-at" style="font-size: 1.2rem"></i>
            <span class="contact-text">klinezz@naver.com</span>
          </div>

          <div class="contact-item">
            <i class="pi pi-mobile" style="font-size: 1.2rem"></i>
            <span class="contact-text">010-2590-1894</span>
          </div>

          <div class="contact-item">
            <i class="pi pi-map-marker" style="font-size: 1.2rem"></i>
            <span class="contact-text">Seoul, South Korea</span>
          </div>
        </div>

        <div class="profile">
          <div>
            <h1>Developer Web</h1>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<style scoped>
.about_container {
  position: relative;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #e1e1e1;
  padding: 20px;
  margin: 15px;
  background: linear-gradient(135deg, #f8f9fa 50%, #e9ecef 50%);
}
.info {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.profile {
  flex-grow: 1;
}
.profile h1 {
  text-align: right;
}
.contact-list {
  width: 400px;
  border-radius: 20px;
  position: relative;
  margin-left: -40px;
  background-color: whitesmoke;
  border: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  gap: 12px; /* 항목 간 간격 */
  padding: 20px;
}

/* 각 항목(아이콘 + 텍스트) */
.contact-item {
  display: flex;
  align-items: center; /* 아이콘과 텍스트 수직 중앙 정렬 */
  gap: 10px; /* 아이콘과 글자 사이 간격 */
  font-family: "Pretendard", sans-serif;
  color: #444;
  transition: all 0.2s ease;
}

/* 아이콘 스타일 */
.contact-item i {
  width: 24px; /* 아이콘 너비 고정으로 텍스트 시작점 통일 */
  display: flex;
  justify-content: center;
}

/* 호버 효과 (선택사항) */
.contact-item:hover {
  color: #000;
  transform: translateX(5px);
}

/* 텍스트 스타일 */
.contact-text {
  font-size: 0.95rem;
  font-weight: 500;
}
</style>
