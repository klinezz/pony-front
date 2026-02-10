<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 1. state에서 데이터를 꺼내옵니다.
// 브라우저 뒤로가기/앞으로가기 시에도 데이터가 유지됩니다.
const selectedSkill = computed(() => window.history.state?.skillData);

// 2. 만약 새로고침해서 state가 날아갈 경우를 대비한 안전장치
const displayName = computed(() => {
  return selectedSkill.value?.name || route.params.skillName;
});

const displayDesc = computed(() => {
  return selectedSkill.value?.desc || "상세 설명 정보가 없습니다.";
});
onBeforeMount(() => {

}),
</script>

<template>
  <div>
    <div class="viewport">
      <!-- <button @click="goBack" class="back_btn">← 뒤로가기</button> -->
      <div class="detail_header">
        <div class="title_group">
          <img
            :src="`/public/skill/${selectedSkill.icon}`"
            style="width: 30px"
          />
          <h3>{{ selectedSkill.name }} Experience</h3>
        </div>
      </div>

      <div class="project_board">
        <div class="empty_message">
          "{{ selectedSkill.name }}" 관련 프로젝트 상세 목록이 표시되는
          영역입니다.
        </div>
      </div>
    </div>
  </div>
</template>

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

.empty_message {
  padding: 50px;
  text-align: center;
  color: #999;
  border: 1px dashed #ccc;
  border-radius: 12px;
}
</style>
