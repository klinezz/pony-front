<script setup>
import { ref } from "vue";

const certifications = [
  {
    name: "정보처리기사",
    date: "2023.06.23",
    organizer: "한국산업인력공단 ",
  },
  {
    name: "SQL 개발자 (SQLD)",
    date: "2023.09.15",
    organizer: "한국데이터산업진흥원",
  },
  {
    name: "네트워크관리사2급",
    date: "2024.02.10",
    organizer: "한국정보통신자격협회",
  },
  {
    name: "리눅스마스터2급",
    date: "2025.01.20",
    organizer: "한국정보통신진흥협회",
  },
  {
    name: "ADSP",
    date: "2025.01.20",
    organizer: "한국데이터산업진흥원 ",
  },
];

const activeCategory = ref(null);

const toggleCategory = (id) => {
  activeCategory.value = activeCategory.value === id ? null : id;
};
</script>

<template>
  <div class="cert_container">
    <h2 class="menu_title">Certifications</h2>
    <div class="cert_grid">
      <div v-for="cert in certifications" :key="cert.name" class="cert_card">
        <div class="cert_info">
          <h3 class="cert_name">{{ cert.name }}</h3>
          <div class="cert_details">
            <p class="detail_item">
              <span class="label">발급기관</span>
              <span class="value">{{ cert.organizer }}</span>
            </p>
            <p class="detail_item">
              <span class="label">취득일자</span>
              <span class="value">{{ cert.date }}</span>
            </p>
          </div>
        </div>
        <div class="cert_badge">PASS</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cert_container {
  border-radius: 16px;
}
.menu_title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  padding-left: 5px;
  border-left: 4px solid #1264a3;
}

.cert_grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.cert_card {
  width: calc(50% - 8px);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  transition: all 0.3s ease;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}

.cert_card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border-color: #1264a3;
}

.cert_name {
  font-size: 16px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
}

.cert_details {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail_item {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin: 0;
}

.label {
  color: #718096; /* 흐린 회색 */
  font-weight: 500;
}

.value {
  color: #2d3748; /* 짙은 회색 */
  font-weight: 600;
}

/* 카드 구석의 작은 포인트 */
.cert_badge {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 10px;
  background: #edf2f7;
  color: #22c55e;
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 1px;
}

/* 모바일 대응: 화면이 작아지면 한 열에 1개 */
@media (max-width: 768px) {
  .cert_card {
    width: 100%;
  }
}
</style>
