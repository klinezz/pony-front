<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import router from "@/router";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Dialog from "primevue/dialog";
import AbilityWriteComponent from "./AbilityWriteComponent.vue";
const route = useRoute();
const selectedSkill = ref(null);
const categoryId = ref("");
const isWriting = ref(false);
const boardList = ref([]);
const selectedPost = ref(null);

const isDetail = ref(false); // 상세 보기 모드 여부
const isEditing = ref(false); // 수정 모드 여부

onMounted(async () => {
  const stateData =
    window.history.state?.skillData || window.history.state?.usr?.skillData;

  if (stateData) {
    selectedSkill.value = stateData;
    categoryId.value = selectedSkill.value.categoryId;
  } else {
    selectedSkill.value = { name: route.params.skillName, desc: "" };
  }
  await fetchList(); // 데이터 로드 후 목록 조회
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
const onSaved = (savedPost) => {
  isWriting.value = false;
  isEditing.value = false;

  selectedPost.value = savedPost;
  isDetail.value = true;
  fetchList();
};

const onRowClick = (event) => {
  selectedPost.value = event.data;
  isDetail.value = true; // Dialog 대신 화면 전환
};

// 수정 모드 진입
const enterEditMode = () => {
  isEditing.value = true;
};

// 수정 취소
const cancelEdit = () => {
  isEditing.value = false;
};

// 글 삭제 함수
const deletePost = async () => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  try {
    await axios.post("/api/skill/deleteBoardContent", {
      id: selectedPost.value.id,
      tableName: categoryId.value,
    });
    alert("삭제되었습니다.");
    isDetail.value = false;
    fetchList();
  } catch (e) {
    alert("삭제 실패");
  }
};
</script>

<template>
  <div>
    <div class="viewport">
      <div class="detail_header">
        <div class="title_group">
          <img :src="`/skill/${displayIcon}`" style="width: 30px" />
          <h3>{{ displayName }} Experience</h3>
        </div>
      </div>

      <div class="project_board">
        <div class="button_container">
          <Button
            @click="goBack"
            label="뒤로가기"
            icon="pi pi-chevron-left"
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
        <div v-else-if="isEditing" class="edit_section">
          <AbilityWriteComponent
            :category="categoryId"
            :skill="displayName"
            :initialData="selectedPost"
            @cancel="cancelEdit"
            @saved="onSaved"
          />
        </div>

        <div v-else-if="isDetail" class="detail_view">
          <div class="button_container">
            <Button
              label="목록"
              icon="pi pi-list"
              @click="isDetail = false"
              size="small"
              severity="primary"
            />
            <div
              class="right_buttons"
              style="margin-left: auto; display: flex; gap: 8px"
            >
              <Button
                label="수정"
                icon="pi pi-pencil"
                @click="enterEditMode"
                size="small"
                severity="warn"
              />
              <Button
                label="삭제"
                icon="pi pi-trash"
                @click="deletePost"
                size="small"
                severity="danger"
              />
            </div>
          </div>

          <div class="post_container">
            <h2 class="post_title">{{ selectedPost.title }}</h2>
            <div class="post_meta">
              <span><i class="pi pi-user"></i> {{ selectedPost.author }}</span>
              <span
                ><i class="pi pi-calendar"></i>
                {{ selectedPost.createdDt }}</span
              >
            </div>
            <Divider />
            <div
              class="post_content ql-editor"
              v-html="selectedPost.content"
            ></div>
          </div>
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
            "{{ displayName }}" 관련 등록된 글이 없습니다.
          </div>

          <Dialog
            v-model:visible="displayDetail"
            modal
            :header="selectedPost?.title"
            :style="{ width: '800px' }"
            class="custom_dialog"
          >
            <div class="post_meta" v-if="selectedPost">
              <div class="meta_item">
                <i class="pi pi-user"></i>
                <span>{{ selectedPost.author }}</span>
              </div>
              <Divider layout="vertical" />
              <div class="meta_item">
                <i class="pi pi-calendar"></i>
                <span>{{ selectedPost.createdDt }}</span>
              </div>
            </div>

            <div class="post_content_container" v-if="selectedPost">
              <div
                class="post_content ql-editor"
                v-html="selectedPost.content"
                style="background-color: #ffffff"
              ></div>
            </div>

            <template #footer>
              <Button
                label="닫기"
                icon="pi pi-times"
                @click="displayDetail = false"
                class="p-button-text close_btn"
              />
            </template>
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
/* 메타 정보 스타일 */
.post_meta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 20px;
  padding: 0 10px;
}

.meta_item {
  display: flex;
  align-items: center;
  gap: 5px;
}
.detail_view {
  animation: fadeIn 0.3s ease;
}

.post_container {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.post_title {
  font-weight: 700;
  margin-bottom: 15px;
  color: #2c3e50;
}

.post_meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: #7f8c8d;
  font-size: 0.75rem;
}

.post_content {
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  box-sizing: content-box;
  margin-top: 20px;
  line-height: 1.6;
  padding: 10px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
