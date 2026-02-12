<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const skillCategories = ref([]);
// 명시적으로 null을 주어 처음에는 아무것도 열리지 않게 합니다.
const activeCategory = ref(null);

const fetchSkills = async () => {
  try {
    const response = await axios.get("/api/resume/skills");
    skillCategories.value = response.data;

    // 데이터 로드 후에도 activeCategory를 null로 유지하여 닫힌 상태를 보장합니다.
    activeCategory.value = null;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

onMounted(() => {
  fetchSkills();
});

const toggleCategory = (categoryId) => {
  // 클릭한 ID가 현재 열린 ID와 같으면 닫고(null), 다르면 해당 ID를 엽니다.
  activeCategory.value =
    activeCategory.value === categoryId ? null : categoryId;
};

const goToBoard = (categoryId, item) => {
  router.push({
    name: "AbilityDetail",
    params: {
      skillName: item.name,
      categoryId: categoryId,
    },
    state: {
      skillData: {
        ...item,
        categoryId: categoryId,
      },
    },
  });
};
</script>

<template>
  <div class="viewport">
    <h3 class="menu_title">SKILL</h3>
    <div class="board_container">
      <div
        v-if="skillCategories.length === 0"
        style="color: white; padding: 20px"
      >
        데이터를 불러오는 중입니다...
      </div>

      <div
        v-for="cat in skillCategories"
        :key="cat.categoryId"
        class="skill_group"
      >
        <div
          class="main_row"
          :class="{ is_active: activeCategory === cat.categoryId }"
          @click="toggleCategory(cat.categoryId)"
        >
          <div class="category_label">SKILL</div>
          <div class="category_title">{{ cat.categoryName }}</div>
          <div class="toggle_status">
            {{ activeCategory === cat.categoryId ? "CLOSE" : "OPEN" }}
          </div>
        </div>

        <div
          class="sub_list_wrapper"
          :class="{ is_expanded: activeCategory === cat.categoryId }"
        >
          <div class="sub_list_inner">
            <div
              v-for="item in cat.items"
              :key="item.name"
              class="sub_item"
              @click="goToBoard(activeCategory, item)"
            >
              <div class="item_name">
                <span class="bullet">•</span>
                <img
                  :src="`/skill/${item.icon}`"
                  :alt="item.name"
                  style="width: 20px"
                />
                {{ item.name }}
              </div>
              <div class="item_desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
}
.board_container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.menu_title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  padding-left: 5px;
  margin-bottom: 20px;
  border-left: 4px solid #1264a3;
}

/* 메인 행 스타일 */
.main_row {
  display: flex;
  align-items: center;
  padding: 18px 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.main_row:hover {
  border-color: #5c5c5c;
}

.main_row.is_active {
  background: #5c5c5c;
  color: #fff;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.category_label {
  width: 80px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #999;
}
.is_active .category_label {
  color: rgba(255, 255, 255, 0.7);
}

.category_title {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
}

.toggle_status {
  font-size: 10px;
  font-weight: bold;
  opacity: 0.6;
}

/* 내부 리스트 애니메이션 설정 (Grid 방식) */
.sub_list_wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  background: #fff;
  border-radius: 0 0 12px 12px;
}

.sub_list_wrapper.is_expanded {
  grid-template-rows: 1fr;
  border: 1px solid #d1d1d1;
  border-top: none;
  box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.05);
}

.sub_list_inner {
  min-height: 0;
}

/* 내부 리스트 아이템 스타일 */
.sub_item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid #d1d1d1;
}

.sub_item:last-child {
  border-bottom: none;
}

.item_name {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.bullet {
  color: #1264a3;
}

.item_desc {
  font-size: 13px;
  color: #777;
}

/* --- 상세 페이지 스타일 --- */
.detail_header {
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
  padding: 20px;
}

.empty_message {
  padding: 50px;
  text-align: center;
  color: #999;
  border: 1px dashed #ccc;
  border-radius: 12px;
}

.board_container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.main_row {
  /* ... 기존 스타일 ... */
  display: flex;
  align-items: center;
  padding: 18px 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}
.sub_item {
  cursor: pointer;
}
.sub_item:hover {
  background: #f5f5f5;
}
</style>
