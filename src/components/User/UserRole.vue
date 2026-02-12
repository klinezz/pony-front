<script setup></script>

<template>
  <div>
    <div class="viewport">
      <h2 class="menu_title">권한 관리</h2>
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
:deep(.post_content.ql-editor) {
  background-color: #ffffff !important;
  min-height: 200px;
}

/* 에디터 내부의 텍스트가 안 보일 경우를 대비해 기본 색상 지정 */
:deep(.post_content.ql-editor *) {
  background-color: transparent !important; /* 글자마다 걸린 배경색 제거(선택사항) */
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
  min-height: 500px;
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
