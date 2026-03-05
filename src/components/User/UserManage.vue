<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button"; // 버튼 컴포넌트 추가
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const selectedUsers = ref([]); // 체크박스로 선택된 사용자들

const fetchUsers = async () => {
  try {
    const response = await axios.get("/api/user/list");
    users.value = response.data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

// 선택된 사용자 삭제
const deleteSelectedUsers = async () => {
  if (selectedUsers.value.length === 0) {
    alert("삭제할 사용자를 선택해주세요.");
    return;
  }

  if (!confirm(`${selectedUsers.value.length}명의 사용자를 삭제하시겠습니까?`))
    return;

  try {
    // 체크된 사용자들의 ID 리스트 추출
    const idsToDelete = selectedUsers.value.map((user) => user.id);

    // 백엔드 삭제 API 호출 (예시)
    await axios.post("/api/user/delete", idsToDelete);

    alert("삭제되었습니다.");
    selectedUsers.value = []; // 선택 초기화
    fetchUsers(); // 목록 새로고침
  } catch (error) {
    alert("삭제 중 오류가 발생했습니다.");
  }
};

// 수정 버튼 클릭 시
const editUser = (user) => {
  console.log("수정할 사용자:", user);
  // 수정 팝업 열기 또는 상세 페이지 이동 로직 추가
};

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};

onMounted(() => {
  fetchUsers();
});
</script>
<template>
  <div>
    <div class="viewport">
      <h2 class="menu_title">사용자 관리</h2>
    </div>

    <div
      class="flex-container"
      style="margin-bottom: 10px; display: flex; gap: 10px"
    >
      <Button icon="pi pi-user-plus" label="사용자 추가" />
      <Button
        icon="pi pi-trash"
        label="사용자 삭제"
        severity="danger"
        @click="deleteSelectedUsers"
        :disabled="!selectedUsers.length"
      />
    </div>

    <div class="card">
      <DataTable
        v-model:selection="selectedUsers"
        :value="users"
        dataKey="id"
        stripedRows
        size="small"
        :paginator="true"
        :rows="10"
        tableStyle="min-width: 60rem"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem; "></Column>

        <Column field="id" header="아이디" sortable></Column>
        <Column field="name" header="이름" sortable></Column>
        <Column field="role" header="권한">
          <template #body="slotProps">
            <span :class="'role-badge ' + slotProps.data.role">{{
              slotProps.data.role
            }}</span>
          </template>
        </Column>
        <Column field="email" header="이메일"></Column>
        <Column field="joinDate" header="가입일">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.joinDate) }}
          </template>
        </Column>
        <Column field="lastLoginDate" header="최근접속일자">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.lastLoginDate) }}
          </template>
        </Column>

        <Column
          header="관리"
          :exportable="false"
          headerClass="header-center"
          style="text-align: center"
          bodyStyle="text-align:center"
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              label="수정"
              class="p-button-sm p-button-outlined"
              @click="editUser(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
