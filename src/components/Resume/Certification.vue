<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// 1. 상태 관리 변수
const certifications = ref([]); // API로 받아올 자격증 목록
const isLoading = ref(true); // 로딩 상태 (선택 사항)

// 2. API로 목록 가져오기 함수
const getAllCertificates = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get("/api/manager/getAllCertificates");

    // 백엔드 필드(name, organization, obtainedDate)를 화면용 데이터로 매핑
    // 만약 백엔드 필드명을 그대로 사용한다면 템플릿만 수정하면 됩니다.
    certifications.value = response.data;
  } catch (error) {
    console.error("자격증 목록을 가져오는데 실패했습니다:", error);
  } finally {
    isLoading.value = false;
  }
};

// 날짜 포맷팅 함수 (기존 2023-01-01 -> 2023.01.01 변환)
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR");
};

// 3. 컴포넌트 마운트 시 실행
onMounted(() => {
  getAllCertificates();
});
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
              <span class="value">{{ cert.organization }}</span>
            </p>
            <p class="detail_item">
              <span class="label">취득일자</span>
              <span class="value">{{ cert.obtainedDate }}</span>
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
