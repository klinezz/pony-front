<script setup>
import { ref } from "vue";
import axios from "axios";
import Editor from "primevue/editor";

const props = defineProps(["category", "skill"]);
const emit = defineEmits(["cancel", "saved"]);

const post = ref({ title: "", content: "", author: "Admin" });

const submit = async () => {
  try {
    await axios.post("/api/skill/addBoardSkillContent", {
      categoryId: props.category,
      skillName: props.skill,
      ...post.value,
    });
    alert("저장되었습니다.");
    emit("saved");
  } catch (e) {
    alert("저장 실패");
  }
};
</script>

<template>
  <div class="write_form">
    <div class="input_group">
      <input
        v-model="post.title"
        placeholder="프로젝트 제목을 입력하세요"
        class="title_input"
      />
    </div>

    <div class="editor_container">
      <Editor
        v-model="post.content"
        editorStyle="height: 320px"
        placeholder="상세 내용을 입력하세요 (이미지, 표, 볼드 등 지원)"
      >
        <template #toolbar>
          <span class="ql-formats">
            <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
            <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
            <button
              class="ql-underline"
              v-tooltip.bottom="'Underline'"
            ></button>
          </span>
          <span class="ql-formats">
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>
            <select class="ql-color"></select>
          </span>
          <span class="ql-formats">
            <button class="ql-link"></button>
            <button class="ql-image"></button>
            <button class="ql-code-block"></button>
            <button class="ql-clean"></button>
          </span>
        </template>
      </Editor>
    </div>

    <div class="flex gap-2 justify-end mt-4">
      <Button
        @click="$emit('cancel')"
        label="취소"
        severity="secondary"
        size="small"
        outlined
      />
      <Button
        @click="submit"
        label="저장하기"
        severity="warn"
        size="small"
        icon="pi pi-check"
      />
    </div>
  </div>
</template>

<style scoped>
.write_form {
  padding: 25px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.title_input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  outline: none;
  transition: border-color 0.2s;
}

.title_input:focus {
  border-color: #3b82f6;
}

.editor_container {
  margin-bottom: 15px;
}

/* 에디터 내부 스타일 커스텀 */
:deep(.p-editor-container .p-editor-content .ql-editor) {
  font-size: 12px;
  line-height: 1.6;
}

.mt-4 {
  margin-top: 1rem;
}
.flex {
  display: flex;
}
.gap-2 {
  gap: 0.5rem;
}
.justify-end {
  justify-content: flex-end;
}
</style>
