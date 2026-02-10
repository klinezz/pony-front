<script setup>
import { ref } from "vue";

const projects = [
  {
    title: "미래에셋생명 경험위험률산출 시스템",
    period: "2025.03 - 2026.01",
    role: "솔루션 기술 지원 및 엔지니어링 (SSO/DRM 연동 및 커스터마이징)",
    client: "미래에셋셍명",
    position: "큐핏 / 선임연구원",
    desc: "고객사 내부망(폐쇄망) 환경 내 자사 솔루션의 인프라 구축을 주도하였으며, 통합 인증 체계(SSO) 연동을 통해 사용자 접근 편의성을 확보함. 특히 고객사의 보안 정책에 맞춘 DRM(Digital Rights Management) 솔루션의 기능 커스터마이징 및 최적화 작업을 수행하여 시스템 안정성을 제고함.",
  },
  {
    title: "KB라이프 경험위험률산출 시스템",
    period: "2023.05 - 2023.11",
    role: "솔루션 기술 지원 및 엔지니어링 (SSO/DRM 연동 및 커스터마이징)",
    client: "현대글로비스",
    position: "큐핏 / 선임연구원",
    desc: "고객사 내부망(폐쇄망) 환경 내 자사 솔루션의 인프라 구축을 주도하였으며, 통합 인증 체계(SSO) 연동을 통해 사용자 접근 편의성을 확보함. 특히 고객사의 보안 정책에 맞춘 DRM(Digital Rights Management) 솔루션의 기능 커스터마이징 및 최적화 작업을 수행하여 시스템 안정성을 제고함.",
  },
];

const activeCategory = ref(null);

const toggleCategory = (id) => {
  activeCategory.value = activeCategory.value === id ? null : id;
};
</script>

<template>
  <div class="project_container">
    <h2 class="menu_title">Project Experience</h2>

    <div class="project_list">
      <div
        v-for="project in projects"
        :key="project.title"
        class="project_card"
      >
        <div class="project_card_header">
          <h3 class="project_title">{{ project.title }}</h3>
          <span class="project_period">{{ project.period }}</span>
        </div>

        <div class="project_content">
          <div class="info_row">
            <span class="info_label">담당업무</span>
            <span class="info_value">{{ project.role }}</span>
          </div>
          <div class="info_row">
            <span class="info_label">발주처</span>
            <span class="info_value">{{ project.client }}</span>
          </div>
          <div class="info_row">
            <span class="info_label">소속 및 직책</span>
            <span class="info_value">{{ project.position }}</span>
          </div>
        </div>

        <p class="project_desc">{{ project.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu_title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  border-left: 4px solid #1264a3;
  padding-left: 12px;
}

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
  box-shadow: 0 4px 12px rgba(18, 100, 163, 0.1);
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
}

.project_period {
  font-size: 13px;
  color: #94a3b8;
  font-weight: 500;
}

.project_content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info_row {
  display: flex;
  font-size: 12px;
  line-height: 1.5;
}

.info_label {
  min-width: 100px;
  color: #64748b;
  font-weight: 600;
  position: relative;
}

/* 라벨과 텍스트 사이 구분선 대신 여백 활용 */
.info_value {
  color: #334155;
  flex: 1;
}

.project_desc {
  margin-top: 15px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  font-size: 12px;
  color: #475569;
  line-height: 1.6;
}
</style>
