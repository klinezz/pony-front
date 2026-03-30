<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

// 데이터 상태 관리
const projects = ref([]); // 전체 프로젝트 목록
const categories = ref([]); // 회사 목록 (탭 메뉴)
const activeCategoryIdx = ref(0); // 현재 선택된 탭의 PK (0은 '전체')

// 1. API 데이터 로드 (병렬 호출로 최적화)
const fetchData = async () => {
  try {
    const [projectRes, companyRes] = await Promise.all([
      axios.get("/api/manager/getAllProjects"),
      axios.get("/api/manager/getAllCompanies"),
    ]);

    projects.value = projectRes.data;

    // '전체' 버튼을 맨 앞에 추가하여 카테고리 구성
    categories.value = [{ idx: 0, companyName: "전체" }, ...companyRes.data];
  } catch (error) {
    console.error("데이터 로드 중 오류 발생:", error);
  }
};

// 2. 선택된 카테고리(회사)에 따른 필터링 계산
const filteredProjects = computed(() => {
  if (activeCategoryIdx.value === 0) {
    return projects.value;
  }
  return projects.value.filter(
    (project) => project.companyIdx === activeCategoryIdx.value,
  );
});

// 3. 탭 클릭 이벤트
const setCategory = (idx) => {
  activeCategoryIdx.value = idx;
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="project_container">
    <h2 class="menu_title">Project Experience</h2>

    <div class="category_tabs">
      <button
        v-for="cat in categories"
        :key="cat.idx"
        :class="['tab_btn', { active: activeCategoryIdx === cat.idx }]"
        @click="setCategory(cat.idx)"
      >
        {{ cat.companyName }}
      </button>
    </div>

    <div class="project_list">
      <div
        v-for="project in filteredProjects"
        :key="project.idx"
        class="project_card"
      >
        <div class="project_card_header">
          <h3 class="project_title">{{ project.projectName }}</h3>
          <span class="project_period">{{ project.projectPeriod }}</span>
        </div>

        <div class="project_content">
          <div class="info_row">
            <span class="info_label">담당업무</span>
            <span class="info_value">{{ project.mainRole }}</span>
          </div>
          <div class="info_row">
            <span class="info_label">발주처</span>
            <span class="info_value">{{ project.clientName }}</span>
          </div>
          <div class="info_row">
            <span class="info_label">소속</span>
            <span class="info_value">
              {{ project.company?.companyName || "기타" }} /
              {{ project.positionRole }}
            </span>
          </div>
        </div>

        <p class="project_desc" v-html="project.projectDesc"></p>
      </div>

      <div v-if="filteredProjects.length === 0" class="no_data">
        등록된 프로젝트가 없습니다.
      </div>
    </div>
  </div>
</template>

<style scoped>
.project_container {
  margin: 0 auto;
}

.menu_title {
  font-size: 20px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 24px;
}

/* 탭 메뉴 스타일 */
.category_tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: thin; /* 파이어폭스용 */
}

.tab_btn {
  padding: 10px 20px;
  border-radius: 30px;
  border: 1px solid #e2e8f0;
  background: #fff;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.tab_btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.tab_btn.active {
  background: #1264a3;
  color: #fff;
  border-color: #1264a3;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(18, 100, 163, 0.2);
}

/* 카드 리스트 스타일 */
.project_list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project_card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.project_card:hover {
  border-color: #1264a3;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(18, 100, 163, 0.1);
}

.project_card_header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f1f5f9;
}

.project_title {
  font-size: 16px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  line-height: 1.4;
}

.project_period {
  font-size: 13px;
  color: #94a3b8;
  font-weight: 500;
  white-space: nowrap;
  margin-left: 15px;
}

.project_content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info_row {
  display: flex;
  font-size: 13px;
  line-height: 1.5;
}

.info_label {
  min-width: 100px;
  color: #64748b;
  font-weight: 600;
}

.info_value {
  color: #334155;
  flex: 1;
}

.project_desc {
  margin-top: 18px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 13px;
  color: #475569;
  line-height: 1.7;
  border-left: 3px solid #e2e8f0;
}

.no_data {
  text-align: center;
  padding: 80px 0;
  color: #94a3b8;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #e2e8f0;
}
</style>
