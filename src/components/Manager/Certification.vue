<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag"; // 상태 표시용 태그 추가
import Editor from "../Editor.vue";

const projects = ref([
  {
    id: 1,
    title: "미래에셋생명 경험위험률산출 시스템",
    period: [new Date(2025, 2, 1), new Date(2026, 0, 1)],
    role: "솔루션 기술 지원 및 엔지니어링",
    client: "미래에셋셍명",
    position: "큐핏 / 선임연구원",
    desc: "고객사 내부망 환경 내 인프라 구축 주도 및 SSO/DRM 연동 최적화.",
  },
]);

const isEditing = ref(false);
const currentProject = ref({
  id: null,
  title: "",
  period: null,
  role: "",
  client: "",
  position: "",
  desc: "",
});

const formatDate = (dateRange) => {
  if (!dateRange || !dateRange[0]) return "-";
  const start = dateRange[0].toLocaleDateString("ko-KR");
  const end = dateRange[1]
    ? dateRange[1].toLocaleDateString("ko-KR")
    : "진행중";
  return `${start} ~ ${end}`;
};

const saveProject = () => {
  if (!currentProject.value.title) return;
  if (isEditing.value) {
    const index = projects.value.findIndex(
      (p) => p.id === currentProject.value.id,
    );
    projects.value[index] = { ...currentProject.value };
  } else {
    projects.value.push({ ...currentProject.value, id: Date.now() });
  }
  resetForm();
};

const editProject = (data) => {
  isEditing.value = true;
  currentProject.value = { ...data };
  window.scrollTo({ top: 0, behavior: "smooth" }); // 수정 시 상단 폼으로 이동
};

const deleteProject = (id) => {
  if (confirm("이 자격증를 삭제하시겠습니까?")) {
    projects.value = projects.value.filter((p) => p.id !== id);
  }
};

const resetForm = () => {
  currentProject.value = {
    id: null,
    title: "",
    period: null,
    role: "",
    client: "",
    position: "",
    desc: "",
  };
  isEditing.value = false;
};
const placeholder = ref("상세내용");
</script>

<template>
  <div>
    <div class="header-section">
      <h2 class="title">Certification Portfolio Management</h2>
      <p class="subtitle">자격증 이력을 관리합니다.</p>
    </div>

    <div class="form_wrapper">
      <div class="form-card shadow-lg">
        <div class="form-header">
          <i :class="isEditing ? 'pi pi-pencil' : 'pi pi-plus-circle'"></i>
          <span>{{ isEditing ? "자격증 정보 수정" : "자격증 등록" }}</span>
        </div>

        <div class="form-body">
          <div class="input-grid">
            <div class="field full-width">
              <label>자격증명</label>
              <InputText
                v-model="currentProject.title"
                placeholder="자격증 타이틀"
                class="w-full"
              />
            </div>

            <div class="field full-width">
              <label>발급기관</label>
              <InputText v-model="currentProject.client" class="w-full" />
            </div>

            <div class="field">
              <label>취득일자</label>
              <DatePicker
                v-model="currentProject.period"
                :manualInput="false"
                showIcon
                fluid
                placeholder="취득일"
              />
            </div>
            <div class="field full-width">
              <label>상세 내용</label>
              <Editor
                ref="myEditor"
                @update="autoSaveSchedule"
                :placeholder-text="`${placeholder}`"
              />
            </div>
          </div>
        </div>

        <div class="form-footer">
          <Button
            v-if="isEditing"
            label="취소"
            icon="pi pi-times"
            severity="secondary"
            text
            @click="resetForm"
            class="flex-1"
          />
          <Button
            :label="isEditing ? '변경사항 저장' : '등록하기'"
            :icon="isEditing ? 'pi pi-save' : 'pi pi-check'"
            :severity="isEditing ? 'info' : 'success'"
            @click="saveProject"
            class="px-5"
          />
        </div>
      </div>

      <div class="table-container shadow-sm">
        <DataTable
          :value="projects"
          tableStyle="min-width: 50rem"
          paginator
          :rows="5"
          removableSort
        >
          <Column
            field="title"
            header="자격증명"
            sortable
            style="width: 30%"
          ></Column>
          <Column header="취득일자" style="width: 20%">
            <template #body="slotProps">
              <Tag
                :value="formatDate(slotProps.data.period)"
                severity="secondary"
              />
            </template>
          </Column>
          <Column field="client" header="발급기관" style="width: 15%"></Column>
          <Column header="관리" style="width: 15%">
            <template #body="slotProps">
              <div class="flex gap-3">
                <Button
                  icon="pi pi-file-edit"
                  text
                  rounded
                  severity="info"
                  @click="editProject(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  text
                  rounded
                  severity="danger"
                  @click="deleteProject(slotProps.data.id)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 컨테이너 */
.admin-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* 헤더 섹션 */
.header-section {
  margin-bottom: 2rem;
  padding-left: 0.5rem;
  border-left: 5px solid var(--p-primary-color); /* PrimeVue 테마 색상 사용 */
}
.title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #2d3436;
  margin: 0;
}
.subtitle {
  color: #636e72;
  margin-top: 0.5rem;
}

.form_wrapper {
  display: flex;
  gap: 20px;
  flex-direction: row;
}
/* 폼 카드 */
.form-card {
  background: white;
  width: 500px;
  border-radius: 12px;
  margin-bottom: 2.5rem;
  overflow: hidden;
  border: 1px solid #e9ecef;
}
.form-header {
  padding: 0.75rem 1.5rem;
  background: #f1f3f5;
  border-bottom: 1px solid #e9ecef;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #495057;
}

.form-body {
  padding: 1.5rem;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
.full-width {
  grid-column: span 2;
}

/* 입력 필드 레이블 */
.field label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-footer {
  padding: 1.25rem 1.5rem;
  background: #fcfcfc;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 테이블 컨테이너 */
.table-container {
  flex: 1;
  overflow: hidden;
}
.p-datatable {
  border: 1px solid #e9ecef;
  border-top: 0px;
  border-bottom: 0px;
  border-radius: 10px;
  overflow: hidden;
}

/* 공통 클래스 */
.w-full {
  width: 100%;
}

/* 모바일 대응 */
@media (max-width: 768px) {
  .input-grid {
    grid-template-columns: 1fr;
  }
  .full-width {
    grid-column: span 1;
  }
}
</style>
