<script setup></script>
<template>
  <div>
    <div class="category_items">
      <div class="category_item">
        <img src="/public/skill/icon-slack.svg" />Slack
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-notion.svg" />Notion
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-asana.svg" />Asana
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-gemini.svg" />Gemini
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-chatgpt.svg" />ChatGPT
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-notepadplusplus.svg" />Notepad++
      </div>
    </div>
  </div>
</template>
<style scoped>
.category_items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}
.category_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70px;
  height: 80px;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  align-items: center;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  padding: 5px;
}
.category_item img {
  width: 37px;
  height: 37px;
}
</style>
