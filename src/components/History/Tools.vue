<script setup>
const box = document.getElementsByClassName("category_item");

box.addEventListener("click", () => {
  // 애니메이션 중복 실행을 위해 기존 클래스 제거 후 다시 추가
  box.classList.remove("active-border");

  // 강제 리플로우(Reflow)를 발생시켜 애니메이션 초기화
  void box.offsetWidth;

  box.classList.add("active-border");
});
</script>
<template>
  <div>
    <div class="category_items">
      <div class="category_item">
        <img src="/public/skill/icon-jetbrains.svg" />Jetbrains
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-intellij.svg" />Intellij
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-datagrip.svg" />DataGrip
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-phpstorm.svg" />PhpStorm
      </div>

      <div class="category_item">
        <img src="/public/skill/icon-vscode.svg" />VScode
      </div>

      <div class="category_item">
        <img src="/public/skill/icon-dbeaver.svg" />DBeaver
      </div>

      <div class="category_item">
        <img src="/public/skill/icon-eclipse.svg" />Eclipse
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-androidstudio.svg" />Android Studio
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-postman.svg" />Postman
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-putty.svg" />Putty
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-mobaxterm.png" />MobaXterm
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-spring.svg" />Spring
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-sqldeveloper.svg" />SQL Developer
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-filezilla.svg" />FileZilla
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
  transition: all 0.3s;
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
.active-border {
  animation: border-move 1.5s ease-out; /* 1.5초 동안만 실행 */
}
.category_item img {
  width: 37px;
  height: 37px;
}
@keyframes border-move {
  0% {
    box-shadow: 0 0 0 0px rgba(52, 152, 219, 0.7);
    border-color: #3498db;
  }
  50% {
    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
    border-color: #3498db;
  }
  100% {
    box-shadow: 0 0 0 0px rgba(52, 152, 219, 0);
    border-color: #3498db; /* 마지막에 특정 색상에서 멈춤 */
  }
}
</style>
