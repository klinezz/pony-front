<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const companies = ref([]); // 회사 목록
const isEditing = ref(false);

const currentCompany = ref({
  idx: null,
  companyName: "",
  workPeriod: "",
  hireDate: null,
  resignation_date: null,
});

// 1. 목록 조회 (Read)
const fetchCompanies = async () => {
  try {
    const response = await axios.get("/api/manager/getAllCompanies");
    companies.value = response.data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

onMounted(fetchCompanies);

// 날짜 포맷팅 (YYYY/MM/DD)
const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("ko-KR").replace(/\. /g, "/").replace(".", "");
};

// 2. 저장 및 수정 (Create & Update)
const saveCompany = async () => {
  if (!currentCompany.value.companyName || !currentCompany.value.workPeriod) {
    return alert("회사명과 근무기간은 필수입니다.");
  }

  const payload = { ...currentCompany.value };

  try {
    if (isEditing.value) {
      await axios.post(`/api/manager/updateCompany/${payload.idx}`, payload);
      alert("수정되었습니다.");
    } else {
      await axios.post("/api/manager/createCompany", payload);
      alert("등록되었습니다.");
    }
    await fetchCompanies();
    resetForm();
  } catch (error) {
    alert("서버 통신 중 오류가 발생했습니다.");
  }
};

// 3. 삭제 (Delete)
const deleteCompany = async (idx) => {
  if (
    !confirm(
      "해당 회사 정보를 삭제하시겠습니까? 관련 프로젝트가 있을 경우 오류가 발생할 수 있습니다.",
    )
  )
    return;

  try {
    await axios.post(`/api/manager/deleteCompany/${idx}`);
    alert("삭제되었습니다.");
    await fetchCompanies();
  } catch (error) {
    alert("삭제 중 오류가 발생했습니다.");
  }
};

const editCompany = (data) => {
  isEditing.value = true;
  currentCompany.value = {
    ...data,
    hireDate: data.hireDate ? new Date(data.hireDate) : null,
    resignation_date: data.resignation_date
      ? new Date(data.resignation_date)
      : null,
  };
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const resetForm = () => {
  currentCompany.value = {
    idx: null,
    companyName: "",
    workPeriod: "",
    hireDate: null,
    resignation_date: null,
  };
  isEditing.value = false;
};
</script>

<template>
  <div class="header-section mb-4">
    <h2 class="title">Company Management</h2>
    <span class="text-500">경력 사항에 해당하는 회사 목록을 관리합니다.</span>
  </div>
  <div class="admin-layout">
    <aside class="sidebar-form shadow-2">
      <div class="form-header">
        <h3 class="m-0">
          <i
            :class="
              isEditing
                ? 'pi pi-pencil text-blue-500'
                : 'pi pi-building text-green-500'
            "
          ></i>
          {{ isEditing ? " 회사 정보 수정" : " 새 회사 등록" }}
        </h3>
      </div>

      <div class="form-scroll-area">
        <div class="field">
          <label>회사명 (Not Null)</label>
          <InputText
            v-model="currentCompany.companyName"
            class="w-full"
            placeholder="예: 미래에셋생명"
          />
        </div>

        <div class="field">
          <label>근무기간 (Not Null)</label>
          <InputText
            v-model="currentCompany.workPeriod"
            class="w-full"
            placeholder="예: 2023.05 - 2023.11"
          />
        </div>

        <div class="field">
          <label>입사일</label>
          <DatePicker
            v-model="currentCompany.hireDate"
            dateFormat="yy/mm/dd"
            showIcon
            fluid
            placeholder="입사일 선택"
          />
        </div>

        <div class="field">
          <label>퇴사일</label>
          <DatePicker
            v-model="currentCompany.resignation_date"
            dateFormat="yy/mm/dd"
            showIcon
            fluid
            placeholder="퇴사일 선택"
          />
        </div>
      </div>

      <div class="form-footer flex gap-2">
        <Button
          v-if="isEditing"
          label="취소"
          severity="secondary"
          text
          @click="resetForm"
          class="flex-1"
        />
        <Button
          :label="isEditing ? '수정하기' : '등록하기'"
          :icon="isEditing ? 'pi pi-save' : 'pi pi-check'"
          :severity="isEditing ? 'info' : 'success'"
          @click="saveCompany"
          class="flex-2"
        />
      </div>
    </aside>

    <main class="main-content">
      <div class="table-card shadow-1">
        <DataTable
          :value="companies"
          paginator
          :rows="10"
          stripedRows
          size="small"
        >
          <Column field="companyName" header="회사명" sortable></Column>
          <Column
            field="workPeriod"
            header="근무기간"
            style="width: 200px"
          ></Column>
          <Column header="입사/퇴사일" style="width: 250px">
            <template #body="slotProps">
              <span class="text-sm">
                {{ formatDate(slotProps.data.hireDate) }} ~
                {{ formatDate(slotProps.data.resignation_date) }}
              </span>
            </template>
          </Column>
          <Column header="관리" style="width: 120px">
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  severity="info"
                  text
                  rounded
                  @click="editCompany(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  rounded
                  @click="deleteCompany(slotProps.data.idx)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background-color: #f8fafc;
  overflow: hidden;
}
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
.sidebar-form {
  width: 380px;
  background: white;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e2e8f0;
}
.form-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}
.form-scroll-area {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}
.form-footer {
  padding: 1.25rem;
  border-top: 1px solid #f1f5f9;
}
.field {
  margin-bottom: 1.5rem;
}
.field label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}
.main-content {
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
}
.title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}
.table-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.w-full {
  width: 100% !important;
}
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
.shadow-2 {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

@media (max-width: 1024px) {
  .admin-layout {
    flex-direction: column;
    height: auto;
  }
  .sidebar-form {
    width: 100%;
    border-right: none;
  }
}
</style>
