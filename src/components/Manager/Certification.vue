<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";

// 상태 관리 변수
const projects = ref([]); // 리스트 데이터 (백엔드의 certificates)
const isEditing = ref(false);
const currentCertificate = ref({
  idx: null,
  name: "",
  organization: "",
  obtainedDate: null,
});

// 1. 데이터 불러오기
const getAllCertificates = async () => {
  try {
    const res = await axios.get("/api/manager/getAllCertificates");
    // 날짜 문자열을 Date 객체로 변환하여 DatePicker와 호환되게 함
    projects.value = res.data.map((item) => ({
      ...item,
      obtainedDate: item.obtainedDate ? new Date(item.obtainedDate) : null,
    }));
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

// 2. 저장/수정 로직
const saveCertificate = async () => {
  if (!currentCertificate.value.name) {
    alert("자격증명을 입력해주세요.");
    return;
  }

  try {
    // 백엔드 Certificate DTO 구조에 맞게 전송
    await axios.post("/api/manager/addCertificate", currentCertificate.value);
    await getAllCertificates(); // 목록 새로고침
    resetForm();
  } catch (error) {
    console.error("저장 실패:", error);
  }
};

// 3. 삭제 로직
const deleteCertificate = async (idx) => {
  if (confirm("이 자격증 정보를 삭제하시겠습니까?")) {
    try {
      await axios.delete(`/api/manager/deleteCertificate/${idx}`);
      await getAllCertificates();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  }
};

// 4. 수정 모드 진입
const editCertificate = (data) => {
  isEditing.value = true;
  // 기존 데이터를 복사하고, 날짜는 Date 객체인지 확인
  currentCertificate.value = {
    ...data,
    obtainedDate: data.obtainedDate ? new Date(data.obtainedDate) : null,
  };
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 5. 폼 초기화
const resetForm = () => {
  currentCertificate.value = {
    idx: null,
    name: "",
    organization: "",
    obtainedDate: null,
  };
  isEditing.value = false;
};

// 6. 날짜 포맷팅 (단일 날짜 표시용)
const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("ko-KR"); // "2026. 3. 30." 형태
};

onMounted(() => {
  getAllCertificates();
});
</script>

<template>
  <div class="admin-wrapper">
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
                v-model="currentCertificate.name"
                placeholder="자격증 타이틀"
                class="w-full"
              />
            </div>

            <div class="field full-width">
              <label>발급기관</label>
              <InputText
                v-model="currentCertificate.organization"
                placeholder="기관명"
                class="w-full"
              />
            </div>

            <div class="field">
              <label>취득일자</label>
              <DatePicker
                v-model="currentCertificate.obtainedDate"
                :manualInput="false"
                showIcon
                fluid
                placeholder="취득일 선택"
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
          />
          <Button
            :label="isEditing ? '변경사항 저장' : '등록하기'"
            :icon="isEditing ? 'pi pi-save' : 'pi pi-check'"
            :severity="isEditing ? 'info' : 'success'"
            @click="saveCertificate"
          />
        </div>
      </div>

      <div class="table-container shadow-sm">
        <DataTable
          :value="projects"
          tableStyle="min-width: 50rem"
          paginator
          :rows="10"
          removableSort
        >
          <Column
            field="name"
            header="자격증명"
            sortable
            style="width: 40%"
          ></Column>
          <Column
            header="취득일자"
            sortable
            field="obtainedDate"
            style="width: 20%"
          >
            <template #body="slotProps">
              <Tag
                :value="formatDate(slotProps.data.obtainedDate)"
                severity="secondary"
              />
            </template>
          </Column>
          <Column
            field="organization"
            header="발급기관"
            style="width: 25%"
          ></Column>
          <Column header="관리" style="width: 15%">
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-file-edit"
                  text
                  rounded
                  severity="info"
                  @click="editCertificate(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  text
                  rounded
                  severity="danger"
                  @click="deleteCertificate(slotProps.data.idx)"
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
  margin: 0 auto;
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
