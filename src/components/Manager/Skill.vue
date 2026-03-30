<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

// 상태 변수
const categories = ref([]);
const allItems = ref([]);
const selectedCategoryId = ref(null); // 현재 선택된 카테고리 ID

// 입력 폼 변수
const newCat = ref({ categoryId: "", categoryName: "" });
const newItem = ref({ name: "", icon: "", description: "", imageUrl: "" });

// 수정 모드 및 Ref 변수
const editingItemIdx = ref(null);
const fileInput = ref(null);
const editFileInput = ref([]); // v-for 내의 파일 인풋들을 담을 배열

// 1. 초기 데이터 로드
const fetchData = async () => {
  try {
    const [catRes, itemRes] = await Promise.all([
      axios.get("/api/manager/getSkillCategoryList"),
      axios.get("/api/manager/getAllSkillItemList"),
    ]);

    categories.value = Array.isArray(catRes.data)
      ? catRes.data
      : catRes.data.list || [];
    allItems.value = Array.isArray(itemRes.data)
      ? itemRes.data
      : itemRes.data.list || [];

    if (categories.value.length > 0 && !selectedCategoryId.value) {
      selectedCategoryId.value = categories.value[0].categoryId;
    }
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    categories.value = [];
    allItems.value = [];
  }
};

// 2. 현재 선택된 카테고리에 속한 아이템만 필터링
const filteredItems = computed(() => {
  if (!Array.isArray(allItems.value)) return [];
  return allItems.value.filter((item) => {
    const itemCatId = String(item.categoryId || item.CATEGORY_ID || "");
    const selectedCatId = String(selectedCategoryId.value || "");
    return itemCatId === selectedCatId;
  });
});

// --- 카테고리 CRUD ---
const addCategory = async () => {
  if (!newCat.value.categoryId || !newCat.value.categoryName)
    return alert("내용을 입력하세요.");
  await axios.post("/api/manager/addSkillCategory", newCat.value);
  newCat.value = { categoryId: "", categoryName: "" };
  fetchData();
};

const deleteCategory = async (id) => {
  if (
    !confirm(
      "카테고리 삭제 시 해당 스킬들도 모두 삭제됩니다. 진행하시겠습니까?",
    )
  )
    return;
  await axios.post("/api/manager/deleteSkillCategory", { categoryId: id });
  selectedCategoryId.value = null;
  fetchData();
};

// --- 스킬 아이템 CRUD 및 업로드 ---
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/api/manager/uploadIcon", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { fileName, imageUrl } = response.data;
    newItem.value.icon = fileName;
    newItem.value.imageUrl = imageUrl;
    alert("이미지가 업로드되었습니다.");
  } catch (error) {
    alert("업로드 실패");
  }
};

const addSkillItem = async () => {
  if (!newItem.value.name) return alert("스킬명을 입력하세요.");
  const payload = {
    ...newItem.value,
    categoryId: selectedCategoryId.value,
  };

  try {
    await axios.post("/api/manager/addSkillItem", payload);
    newItem.value = { name: "", icon: "", description: "", imageUrl: "" };
    alert("등록되었습니다.");
    fetchData();
  } catch (error) {
    alert("등록 중 오류가 발생했습니다.");
  }
};

// --- 수정 모드 로직 ---
const triggerEditFile = (index, itemIdx) => {
  // 수정 중인 행의 이미지를 클릭했을 때만 파일 선택창 호출
  if (editingItemIdx.value === itemIdx) {
    if (editFileInput.value && editFileInput.value[index]) {
      editFileInput.value[index].click();
    }
  }
};

const handleEditFileUpload = async (event, item) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/api/manager/uploadIcon", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { fileName, imageUrl } = response.data;
    item.icon = fileName;
    item.imageUrl = imageUrl;
    alert("이미지가 변경되었습니다. 저장 버튼을 눌러야 반영됩니다.");
  } catch (error) {
    alert("업로드 실패");
  }
};

const saveItemEdit = async (item) => {
  await axios.post("/api/manager/editSkillItem", item);
  editingItemIdx.value = null;
  fetchData();
};

const deleteSkillItem = async (idx) => {
  if (!confirm("삭제하시겠습니까?")) return;
  await axios.post("/api/manager/deleteSkillItem", { itemIdx: idx });
  fetchData();
};

onMounted(fetchData);
</script>

<template>
  <div class="admin_layout">
    <aside class="side_nav">
      <div class="nav_header">
        <h3>Categories</h3>
      </div>
      <div class="cat_add_form">
        <input v-model="newCat.categoryId" placeholder="ID (ex: frontend)" />
        <input
          v-model="newCat.categoryName"
          placeholder="명칭 (ex: 프론트엔드)"
          @keyup.enter="addCategory"
        />
        <button @click="addCategory">추가</button>
      </div>
      <ul class="cat_list">
        <li
          v-for="cat in categories"
          :key="cat.categoryId"
          :class="{ active: selectedCategoryId === cat.categoryId }"
          @click="selectedCategoryId = cat.categoryId"
        >
          <span class="cat_name">{{ cat.categoryName }}</span>
          <button class="btn_del" @click.stop="deleteCategory(cat.categoryId)">
            ×
          </button>
        </li>
      </ul>
    </aside>

    <main class="content_area">
      <div v-if="selectedCategoryId" class="item_manager">
        <header class="content_header">
          <h2>{{ selectedCategoryId }} <span class="sub">Items</span></h2>
        </header>

        <section class="item_form_card">
          <input v-model="newItem.name" placeholder="기술명" />
          <div class="file_upload">
            <input
              type="file"
              @change="handleFileUpload"
              ref="fileInput"
              style="display: none"
            />
            <button @click="fileInput.click()">아이콘 선택</button>
            <div v-if="newItem.imageUrl" class="mini_preview">
              <img :src="newItem.imageUrl" />
            </div>
          </div>
          <input
            v-model="newItem.description"
            placeholder="상세 설명"
            class="flex_grow"
          />
          <button class="btn_primary" @click="addSkillItem">아이템 추가</button>
        </section>

        <div class="table_wrapper">
          <table class="item_table">
            <thead>
              <tr>
                <th>아이콘</th>
                <th>기술명</th>
                <th>설명</th>
                <th class="txt_center">관리</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredItems" :key="item.itemIdx">
                <td width="100">
                  <div class="icon_preview">
                    <div
                      class="image_wrapper"
                      :class="{ can_edit: editingItemIdx === item.itemIdx }"
                      @click="triggerEditFile(index, item.itemIdx)"
                    >
                      <img
                        v-if="item.imageUrl"
                        :src="item.imageUrl"
                        class="skill_icon"
                      />
                      <div v-else class="no_icon">No Image</div>
                      <div
                        v-if="editingItemIdx === item.itemIdx"
                        class="edit_overlay"
                      >
                        <span>변경</span>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref="editFileInput"
                      style="display: none"
                      @change="handleEditFileUpload($event, item)"
                    />
                  </div>
                </td>
                <td width="180">
                  <input
                    v-if="editingItemIdx === item.itemIdx"
                    v-model="item.name"
                    class="td_input"
                  />
                  <strong v-else>{{ item.name }}</strong>
                </td>
                <td>
                  <input
                    v-if="editingItemIdx === item.itemIdx"
                    v-model="item.description"
                    class="td_input"
                  />
                  <span v-else class="desc">{{ item.description }}</span>
                </td>
                <td width="150" class="txt_center">
                  <div class="btn_group" v-if="editingItemIdx !== item.itemIdx">
                    <button
                      class="btn_sm btn_edit"
                      @click="editingItemIdx = item.itemIdx"
                    >
                      수정
                    </button>
                    <button
                      class="btn_sm btn_del"
                      @click="deleteSkillItem(item.itemIdx)"
                    >
                      삭제
                    </button>
                  </div>
                  <div class="btn_group" v-else>
                    <button class="btn_sm btn_save" @click="saveItemEdit(item)">
                      저장
                    </button>
                    <button
                      class="btn_sm btn_cancel"
                      @click="editingItemIdx = null"
                    >
                      취소
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="welcome_msg">카테고리를 선택해주세요.</div>
    </main>
  </div>
</template>

<style scoped>
.admin_layout {
  display: flex;
  height: 90vh;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  font-family: sans-serif;
}

/* 사이드바 스타일 */
.side_nav {
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}
.nav_header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}
.cat_add_form {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.cat_add_form input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
}
.cat_add_form button {
  background: #333;
  color: #fff;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.cat_list {
  list-style: none;
  padding: 10px;
  flex: 1;
  overflow-y: auto;
}
.cat_list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}
.cat_list li:hover {
  background: #e9ecef;
}
.cat_list li.active {
  background: #5c5c5c;
  color: #fff;
}
.btn_del {
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 18px;
  cursor: pointer;
  padding: 0 5px;
}
.active .btn_del {
  color: #ff9999;
}

/* 메인 영역 스타일 */
.content_area {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content_header {
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
}
.content_header h2 {
  margin: 0;
  font-size: 22px;
  text-transform: uppercase;
}
.content_header .sub {
  font-weight: normal;
  color: #888;
}

.item_form_card {
  padding: 20px 30px;
  background: #fdfdfd;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #eee;
}
.item_form_card input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.flex_grow {
  flex: 1;
}
.btn_primary {
  background: #1264a3;
  color: #fff;
  border: none;
  padding: 0 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.table_wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 0 30px 30px;
}
.item_table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.item_table th {
  text-align: left;
  padding: 12px;
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  font-size: 13px;
  color: #495057;
}
.item_table td {
  padding: 15px 12px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  vertical-align: middle;
}

.icon_preview {
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon_preview img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 4px;
}
.td_input {
  width: 100%;
  padding: 6px;
  border: 1px solid #1264a3;
  border-radius: 4px;
}
.desc {
  color: #6c757d;
  font-size: 13px;
  line-height: 1.4;
}

.btn_group {
  display: flex;
  gap: 5px;
  justify-content: center;
}
.btn_sm {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}
.btn_edit {
  background: #e9ecef;
  color: #495057;
}
.btn_save {
  background: #1264a3;
  color: #fff;
}
.btn_cancel {
  background: #6c757d;
  color: #fff;
}
.no_data {
  padding: 50px !important;
  text-align: center;
  color: #adb5bd;
}
.welcome_msg {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
  font-size: 18px;
}
.txt_center {
  text-align: center;
}
</style>
