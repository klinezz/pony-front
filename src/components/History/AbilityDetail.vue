<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import router from "@/router";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AbilityWriteComponent from "./AbilityWriteComponent.vue";
const route = useRoute();
const selectedSkill = ref(null);
const categoryId = ref("");
const isWriting = ref(false);
const boardList = ref([]);

onMounted(() => {
  const stateData =
    window.history.state?.skillData || window.history.state?.usr?.skillData;

  if (stateData) {
    selectedSkill.value = stateData;
    categoryId.value = selectedSkill.value.categoryId;
  } else {
    selectedSkill.value = { name: route.params.skillName, desc: "" };
  }
});

const displayName = computed(() => selectedSkill.value?.name || "이름 없음");
const displayDesc = computed(
  () => selectedSkill.value?.desc || "설명이 없습니다.",
);
const displayIcon = computed(() => selectedSkill.value?.icon || "이름 없음");
const goBack = () => {
  router.push({
    name: "Ability",
  });
};
const fetchList = async () => {
  try {
    const response = await axios.post(
      "/api/skill/getBoardSkillContentList",
      null,
      {
        params: {
          categoryId: categoryId.value,
          skillName: displayName.value,
        },
      },
    );
    boardList.value = response.data;
  } catch (error) {
    console.error("목록 조회 실패:", error);
  }
};
const createBoard = async () => {
  try {
    const skillName = displayName.value;
    const response = await axios.post("/api/skill/createBoard", {
      tableName: categoryId.value,
    });

    isWriting.value = true;
  } catch (error) {
    console.error("게시판 생성 실패:", error);
    alert("생성 중 오류가 발생했습니다.");
  }
};
const cancelWriting = () => {
  isWriting.value = false;
};
const onSaved = () => {
  isWriting.value = false;
  fetchList();
};
onMounted(async () => {
  await fetchList(); // 데이터 로드 후 목록 조회
});
</script>

<template>
  <div>
    <div class="viewport">
      <div class="detail_header">
        <div class="title_group">
          <img :src="`/public/skill/${displayIcon}`" style="width: 30px" />
          <h3>{{ displayName }} Experience</h3>
        </div>
      </div>

      <div class="project_board">
        <div class="button_container">
          <Button
            @click="goBack"
            label="목록"
            icon="pi pi-list"
            size="small"
            severity="primary"
          />
          <Button
            v-if="!isWriting"
            @click="createBoard"
            label="글 작성"
            icon="pi pi-pencil"
            size="small"
            severity="info"
          />
          <div v-if="!isWriting" class="search_wrapper">
            <div class="search_input_group">
              <i class="pi pi-search search_icon"></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="결과 내 검색..."
                class="custom_search_input"
              />
            </div>
          </div>
        </div>
        <div v-if="isWriting" class="write_section">
          <AbilityWriteComponent
            :category="categoryId"
            :skill="displayName"
            @cancel="cancelWriting"
            @saved="onSaved"
          />
        </div>

        <div v-else class="board_content">
          <DataTable
            :value="boardList"
            :paginator="true"
            :rows="5"
            dataKey="id"
            responsiveLayout="stack"
            breakpoint="960px"
            selectionMode="single"
            @row-click="onRowClick"
            v-if="boardList.length > 0"
            class="p-datatable-sm custom_table"
            :globalFilterFields="['title', 'author', 'content']"
          >
            <Column
              field="id"
              header="No"
              style="width: 8%"
              headerClass="header-center"
              body-style="text-align:center"
            ></Column>
            <Column field="title" header="제목" sortable style="width: 50%">
              <template #body="slotProps">
                <span class="title_link">{{ slotProps.data.title }}</span>
              </template>
            </Column>
            <Column
              field="author"
              header="작성자"
              style="width: 20%"
              headerClass="header-center"
              body-style="text-align:center"
            ></Column>
            <Column
              field="createdDt"
              header="날짜"
              style="width: 20%"
              headerClass="header-center"
              body-style="text-align:center"
            ></Column>
          </DataTable>

          <div v-else class="empty_message">
            "{{ displayName }}" 관련 등록된 경험이 없습니다.
          </div>

          <Dialog
            v-model:visible="displayDetail"
            modal
            :header="selectedPost?.title"
            :style="{ width: '50vw' }"
          >
            <div class="post_meta">
              <span>작성자: {{ selectedPost?.author }}</span> |
              <span>날짜: {{ selectedPost?.createdDt }}</span>
            </div>
            <Divider />
            <div class="post_content">
              <pre>{{ selectedPost?.content }}</pre>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>
x
<style scoped>
/* --- 상세 페이지 스타일 --- */
.detail_header {
  padding-bottom: 20px;
  border-bottom: 2px solid #333;
}
.viewport {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.back_btn {
  font-size: 14px;
  border: none;
  background: none;
  color: #1264a3;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 15px;
}

.title_group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.project_board {
  padding: 20px 0;
}
.button_container {
  display: flex;
  gap: 10px;
  flex-direction: row;
  margin-bottom: 20px;
}
.empty_message {
  padding: 50px;
  text-align: center;
  color: #999;
  border: 1px dashed #ccc;
  border-radius: 12px;
}
/* 검색창을 오른쪽 끝으로 밀기 */
.search_wrapper {
  margin-left: auto;
}

.search_input_group {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
}

.search_icon {
  position: absolute;
  left: 10px;
  color: #999;
  font-size: 14px;
}

.custom_search_input {
  padding: 8px 12px 8px 32px; /* 아이콘 공간 확보 */
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  width: 200px;
  transition: all 0.2s ease;
}

.custom_search_input:focus {
  border-color: #1264a3;
  width: 250px; /* 포커스 시 길어지는 효과 */
  box-shadow: 0 0 0 2px rgba(18, 100, 163, 0.1);
}
:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f1f3f5 !important; /* 원하는 배경색 */
  color: #495057; /* 글자색 */
}

/* 2. 바디(데이터) 영역 배경색 */
:deep(.p-datatable .p-datatable-tbody > tr) {
  background-color: #ffffff;
}

/* 3. 마우스 호버(Hover) 시 배경색 (행 위에 마우스 올렸을 때) */
:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: #f8f9fa !important;
  cursor: pointer;
}

/* 4. 선택된 행(Selected Row) 배경색 */
:deep(.p-datatable .p-datatable-tbody > tr.p-highlight) {
  background-color: #e7f5ff !important;
  color: #007bff;
}

:deep(.header-center .p-datatable-column-header-content) {
  justify-content: center !important;
}

/* 데이터 셀 텍스트 중앙 정렬 */
:deep(.text-center) {
  text-align: center !important;
}
:deep(.p-datatable) {
  font-size: 13px; /* 기본은 보통 14~16px 사이입니다 */
}

/* 헤더만 더 굵거나 다르게 하고 싶을 때 */
:deep(.p-datatable .p-datatable-thead > tr > th) {
  font-size: 14px;
  font-weight: 700;
}

/* 데이터 셀(Body) 글자 크기 */
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 8px 12px; /* 폰트가 작아지면 패딩도 줄여주는 게 예쁩니다 */
}
</style>
