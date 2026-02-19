<template>
  <button
    class="editor-btn"
    :class="{ 'is-active': isActive }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  isActive: Boolean,
  disabled: Boolean,
});
defineEmits(["click"]);
</script>

<style scoped>
.editor-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 3px;
  cursor: pointer;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 7px;
  color: #4a5568;
  transition: all 0.1s ease;
  /* 살짝 아래로 그림자를 주어 띄워진 느낌 */
  box-shadow: 0 4px 0 #e2e8f0;
}

/* 마우스 호버 시 */
.editor-btn:hover:not(:disabled) {
  background: #f7fafc;
  border-color: #cbd5e0;
}

/* 버튼이 활성화되었거나 클릭했을 때 */
.editor-btn.is-active,
.editor-btn:active:not(:disabled) {
  background: #edf2ff;
  border-color: #4c6ef5;
  color: #4c6ef5;
  /* 그림자만큼 아래로 내려서 눌린 효과 */
  transform: translateY(1px);
  box-shadow: 0 0.8px 0 #4c6ef5;
}

.editor-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
  transform: translateY(2px);
}
</style>
