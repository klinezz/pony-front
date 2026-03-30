<script setup>
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Select from "primevue/select";
import Tag from "primevue/tag"; // 상태 표시용 태그 추가
import Editor from "../Editor.vue";
import axios from "axios";
const projects = ref([]);
const companyList = ref([]);
const isEditing = ref(false);
const myEditor = ref(null); // Editor 컴포넌트 참조

const currentProject = ref({
  idx: null,
  projectName: "",
  projectPeriod: null,
  clientName: "",
  projectDesc: "",
  mainRole: "",
});

// 1. 회사 목록 조회 (콤보박스용)
const fetchCompanies = async () => {
  try {
    const response = await axios.get("/api/manager/getAllCompanies");
    companyList.value = response.data;
  } catch (error) {
    console.error("회사 목록 로드 실패:", error);
  }
};
// 2. 목록 조회 (Read)
const fetchProjects = async () => {
  try {
    const response = await axios.get("/api/manager/getAllProjects");
    projects.value = response.data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

onMounted(() => {
  fetchCompanies();
  fetchProjects();
});
const formatDate = (dateRange) => {
  if (!dateRange) return "~";

  if (typeof dateRange === "string") {
    return dateRange;
  }

  if (Array.isArray(dateRange) && dateRange[0]) {
    const start = new Date(dateRange[0]).toLocaleDateString("ko-KR");
    const end = dateRange[1]
      ? new Date(dateRange[1]).toLocaleDateString("ko-KR")
      : "진행중";
    return `${start} ~ ${end}`;
  }

  return "~";
};
// 2. 저장 및 수정 (Create & Update)
const saveProject = async () => {
  if (!currentProject.value.projectName)
    return alert("프로젝트명을 입력해주세요.");

  // 에디터의 HTML 컨텐츠 추출 (Editor 컴포넌트에 getHTML 메서드가 있다고 가정)
  const editorContent = myEditor.value.editor.getHTML() || "";

  const payload = {
    idx: currentProject.value.idx,
    companyIdx: currentProject.value.companyIdx,
    projectName: currentProject.value.projectName,
    clientName: currentProject.value.clientName,
    positionRole: currentProject.value.positionRole,
    mainRole: currentProject.value.mainRole,
    projectPeriod: formatDate(currentProject.value.projectPeriod),
    projectDesc: editorContent,
  };

  try {
    if (isEditing.value) {
      await axios.put("/api/manager/editProject", payload, {
        params: {
          idx: payload.idx,
        },
      });
      alert("수정되었습니다.");
    } else {
      // 신규 등록
      await axios.post("/api/manager/createProject", payload);
      alert("등록되었습니다.");
    }
    await fetchProjects();
    resetForm();
  } catch (error) {
    console.error(error);
    alert("서버 통신 중 오류가 발생했습니다.");
  }
};

// 3. 삭제 (Delete)
const deleteProject = async (idx) => {
  if (!confirm("정말 삭제하시겠습니까?")) return;

  try {
    await axios.delete(`/api/manager/deleteProject/${idx}`);
    alert("삭제되었습니다.");
    await fetchProjects(); // 목록 새로고침
  } catch (error) {
    alert("삭제 중 오류가 발생했습니다.");
  }
};

// 수정 모드 진입
const editProject = (data) => {
  currentProject.value = { ...data };

  // 2. 문자열 "2026. 3. 9. ~ 2026. 3. 12."를 배열로 변환
  if (typeof currentProject.value.projectPeriod === "string") {
    const dateParts = currentProject.value.projectPeriod
      .split("~")
      .map((d) => d.trim());

    if (dateParts.length >= 1) {
      // 점(.)을 하이픈(-)으로 바꿔야 new Date()가 더 잘 인식합니다.
      const start = new Date(dateParts[0].replace(/\./g, "-"));
      const end =
        dateParts[1] && dateParts[1] !== "진행중"
          ? new Date(dateParts[1].replace(/\./g, "-"))
          : null;

      // DatePicker가 인식할 수 있는 [Date, Date] 배열로 교체
      currentProject.value.projectPeriod = [start, end];
    }
  }

  // 에디터에 기존 내용 셋팅 (Editor 컴포넌트에 setHTML 메서드가 있다면)
  myEditor.value?.editor.commands.setContent(data.projectDesc);
  window.scrollTo({ top: 0, behavior: "smooth" });

  isEditing.value = true;
};

const resetForm = () => {
  currentProject.value = {
    idx: null,
    projectName: "",
    projectPeriod: null,
    clientName: "",
    projectDesc: "",
    mainRole: "",
  };
  myEditor.value?.editor.commands.setContent(""); // 에디터 초기화
  isEditing.value = false;
};
const placeholder = ref("상세내용");
</script>

<template>
  <div>
    <div class="header-section">
      <h2 class="title">Project Portfolio Management</h2>
      <p class="subtitle">프로젝트 이력을 관리합니다.</p>
    </div>

    <div class="form_wrapper">
      <div class="form-card shadow-lg">
        <div class="form-header">
          <i :class="isEditing ? 'pi pi-pencil' : 'pi pi-plus-circle'"></i>
          <span>{{
            isEditing ? "프로젝트 정보 수정" : "새 프로젝트 등록"
          }}</span>
        </div>

        <div class="form-body">
          <div class="input-grid">
            <div class="field full-width">
              <label>소속 회사</label>
              <Select
                v-model="currentProject.companyIdx"
                :options="companyList"
                optionLabel="companyName"
                optionValue="idx"
                placeholder="회사를 선택하세요"
                class="w-full"
              />
            </div>

            <div class="field full-width">
              <label>프로젝트명</label>
              <InputText
                v-model="currentProject.projectName"
                placeholder="프로젝트 타이틀"
                class="w-full"
              />
            </div>

            <div class="field full-width">
              <label>발주처</label>
              <InputText v-model="currentProject.clientName" class="w-full" />
            </div>

            <div class="field">
              <label>소속 및 직책</label>
              <InputText v-model="currentProject.positionRole" class="w-full" />
            </div>

            <div class="field">
              <label>수행 기간</label>
              <DatePicker
                v-model="currentProject.projectPeriod"
                selectionMode="range"
                :manualInput="false"
                showIcon
                fluid
                range
                placeholder="시작일 - 종료일 선택"
              />
            </div>

            <div class="field full-width">
              <label>담당 업무</label>
              <InputText
                v-model="currentProject.mainRole"
                class="w-full"
                placeholder="주요 역할 및 핵심 기술 기술"
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
            class="col-12 md:col-6"
            text
            @click="resetForm"
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
            field="projectName"
            header="프로젝트명"
            sortable
            style="width: 30%"
          ></Column>
          <Column header="기간" style="width: 20%">
            <template #body="slotProps">
              <Tag
                :value="formatDate(slotProps.data.projectPeriod)"
                severity="secondary"
              />
            </template>
          </Column>
          <Column
            field="clientName"
            header="발주처"
            style="width: 15%"
          ></Column>
          <Column
            field="positionRole"
            header="직책"
            style="width: 15%"
          ></Column>
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
  width: 800px;
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
.p-datepicker-dropdown {
  border-radius: 0px !important;
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
