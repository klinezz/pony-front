<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ref, onMounted } from "vue";
import axios from "axios"; // axios 임포트 확인

const users = ref([]);

// 데이터 호출 함수
const fetchUsers = async () => {
  try {
    const response = await axios.get("/api/user/list");
    users.value = response.data;
  } catch (error) {
    // 백엔드에서 에러 메시지를 보낼 경우 예외 처리
    const errorMsg = error.response ? error.response.data : error.message;
    console.error("데이터 로드 실패:", errorMsg);
  }
};
// 날짜 포맷 함수 (script setup 외부에 두거나 내부에 선언 가능)
const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString();
};
// 컴포넌트 마운트 시 호출
onMounted(() => {
  fetchUsers();
});
</script>
<template>
  <div>
    <div class="viewport">
      <h2 class="menu_title">사용자 관리</h2>
    </div>

    <div class="card">
      <DataTable
        :value="users"
        stripedRows
        size="small"
        :paginator="true"
        :rows="10"
        tableStyle="min-width: 50rem"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords} records"
      >
        <Column field="id" header="아이디" sortable style="width: 20%"></Column>
        <Column field="name" header="이름" sortable style="width: 20%"></Column>
        <Column field="role" header="권한" style="width: 20%">
          <template #body="slotProps">
            <span :class="'role-badge ' + slotProps.data.role">
              {{ slotProps.data.role }}
            </span>
          </template>
        </Column>
        <Column field="email" header="이메일" style="width: 25%"></Column>
        <Column field="joinDate" header="가입일" style="width: 15%">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.joinDate) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
