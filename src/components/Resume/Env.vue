<script setup>
import { ref } from "vue";
const categories = [
  { name: "Jetbrains", icon: "icon-jetbrains.svg" },
  { name: "Intellij", icon: "icon-intellij.svg" },
  { name: "DataGrip", icon: "icon-datagrip.svg" },
  { name: "PhpStorm", icon: "icon-phpStorm.svg" },
  { name: "VScode", icon: "icon-vscode.svg" },
  { name: "DBeaver", icon: "icon-dbeaver.svg" },
  { name: "Eclipse", icon: "icon-eclipse.svg" },
  { name: "Android Studio", icon: "icon-androidstudio.svg" },
  { name: "Postman", icon: "icon-postman.svg" },
  { name: "Putty", icon: "icon-putty.svg" },
  { name: "MobaXterm", icon: "icon-mobaxterm.png" },
  { name: "Spring", icon: "icon-spring.svg" },
  { name: "SQL Developer", icon: "icon-sqldeveloper.svg" },
  { name: "FileZilla", icon: "icon-filezilla.svg" },
];

const selectedItem = ref("Jetbrains");
const select = (name) => {
  selectedItem.value = name;
};
const box = document.getElementsByClassName("category_item");
</script>
<template>
  <div>
    <div class="category_items">
      <div
        v-for="item in categories"
        :key="item.name"
        class="category_item"
        :class="{ 'is-active': selectedItem === item.name }"
        @click="select(item.name)"
      >
        <img :src="`/skill/${item.icon}`" :alt="item.name" />
        {{ item.name }}
      </div>
    </div>

    <div class="scene">
      <div class="cabinet-3d">
        <div class="drawer-3d">
          <div class="drawer-front"><div class="handle"></div></div>
        </div>

        <div class="drawer-3d open">
          <div class="drawer-front"><div class="handle"></div></div>
          <div class="drawer-bottom">
            <div class="folder f1"><span class="label">INDEX 1</span></div>
            <div class="folder f2"><span class="label">INDEX 2</span></div>
            <div class="folder f3"><span class="label">INDEX 3</span></div>
          </div>
          <div class="drawer-left"></div>
          <div class="drawer-right"></div>
        </div>

        <div class="drawer-3d">
          <div class="drawer-front"><div class="handle"></div></div>
        </div>
      </div>
    </div>

    <svg
      aria-hidden="true"
      style="position: absolute; width: 0; height: 0; overflow: hidden"
    >
      <defs>
        <filter
          id="water-wavy-filter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01 0.02"
            numOctaves="2"
            seed="2"
            result="noiseWave"
          >
            <animate
              attributeName="baseFrequency"
              dur="20s"
              values="0.01 0.02; 0.015 0.03; 0.01 0.02"
              repeatCount="indefinite"
              begin="0s"
            />
          </feTurbulence>

          <feDisplacementMap
            in="SourceGraphic"
            in2="noiseWave"
            scale="15"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />
        </filter>
      </defs>
    </svg>

    <div class="underwater-container-real">
      <div class="wavy-content">
        <img src="https://picsum.photos/id/28/600/400" alt="물속 풍경" />
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
  transition: all 0.3s ease;
}
.active-border {
  animation: border-move 1.5s ease-out; /* 1.5초 동안만 실행 */
}
.category_item img {
  width: 37px;
  height: 37px;
}
.category_item:hover {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  transform: translateY(-4px);
}
.category_item.is-active {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  border: 1px solid #4da3ff;
  box-shadow: 0 0 15px rgba(77, 163, 255, 0.4);
}
.category_item.is-active img {
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
}
/* --- 웹페이지 전체 배경 (투명도 테스트용) --- */
/* 실제 프로젝트에서는 body나 부모 요소의 배경이 비쳐 보입니다. */
body {
  /* 예시: 페이지 배경에 다른 무늬나 이미지가 있다고 가정 */
  background: url("https://picsum.photos/id/1015/1920/1080") center/cover;
  margin: 0;
}

/* --- 전체 컨테이너 (배경 투명하게) --- */
.underwater-container-real {
  position: relative;
  width: 100%;
  height: 100vh;
  /* 이전의 어두운 바다색 제거, 완전히 투명하게 설정 */
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* --- 일렁이는 콘텐츠 박스 --- */
.wavy-content {
  position: relative;
  max-width: 600px;
  border-radius: 15px;
  overflow: hidden;
  /* 그림자도 맑은 느낌에 맞춰 조금 더 연하게 조절 */
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

/* --- 핵심: 이미지/내용물 스타일 및 필터 적용 --- */
.wavy-content img,
.wavy-content .text-box {
  display: block;
  width: 100%;
  height: auto;

  /* 흐림(blur)을 약간 줄이고, 
    밝기(brightness)를 올려 맑은 물의 투명함을 강조했습니다.
  */
  filter: url(#water-wavy-filter) blur(1.2px) brightness(1) contrast(0.7);
  transform: scale(1.08); /* 가장자리 왜곡 숨기기용 확대 */
  transition:
    filter 0.8s ease,
    transform 0.8s ease;
  will-change: filter, transform;
}

/* --- 푸른색 틴트 오버레이 (투명도 극대화) --- */
.wavy-content::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* rgba의 마지막 숫자(투명도)를 0.1 ~ 0.2 수준으로 매우 낮췄습니다. 
    투명한 옥빛/물빛 느낌만 살짝 얹어줍니다.
  */
  background: linear-gradient(
    to bottom,
    rgba(0, 180, 255, 0.1),
    rgba(0, 100, 200, 0.2)
  );
  pointer-events: none;
  transition: opacity 0.8s ease;
}

/* --- 마우스 호버(Hover) 효과 --- */
.wavy-content:hover img,
.wavy-content:hover .text-box {
  filter: none; /* 필터 제거하여 선명하게 */
  transform: scale(1);
}

.wavy-content:hover::after {
  opacity: 0; /* 물빛 틴트 제거 */
}

:root {
  --wood-dark: #4e342e;
  --wood-light: #795548;
  --folder-main: #ffca28;
  --folder-dark: #fbc02d;
}

.scene {
  perspective: 800px; /* 입체감을 만드는 핵심 거리 */
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.cabinet-3d {
  width: 220px;
  background: var(--wood-dark);
  padding: 15px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transform: rotateX(5deg) rotateY(-5deg); /* 전체를 살짝 틀어서 입체감 강조 */
}

.drawer-3d {
  position: relative;
  height: 70px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

/* 서랍 앞면 */
.drawer-front {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--wood-light);
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

/* 열린 서랍 효과 */
.drawer-3d.open {
  transform: translateZ(50px) translateY(10px); /* 서랍이 앞으로 튀어나옴 */
}

/* 서랍 바닥 (폴더가 놓이는 곳) */
.drawer-bottom {
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100px; /* 서랍의 깊이 */
  background: #3e2723;
  transform: rotateX(-90deg); /* 바닥면으로 눕힘 */
  transform-origin: top;
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

/* 서랍 옆면 (선택사항, 입체감 극대화) */
.drawer-left,
.drawer-right {
  position: absolute;
  height: 100px;
  width: 100%;
  background: #5d4037;
  top: 0;
  transform-origin: top;
}

/* 폴더 디자인 */
.folder {
  position: absolute;
  width: 160px;
  height: 90px;
  background: var(--folder-main);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  transform: rotateX(90deg) translateZ(20px); /* 바닥에서 수직으로 세움 */
  border-radius: 2px 10px 2px 2px;
}

/* 폴더 겹치기 및 입체 배치 */
.f1 {
  transform: rotateX(85deg) translateZ(30px);
  z-index: 3;
}
.f2 {
  transform: rotateX(85deg) translateZ(50px);
  z-index: 2;
  background: #ffb300;
}
.f3 {
  transform: rotateX(85deg) translateZ(70px);
  z-index: 1;
  background: #ffa000;
}

.label {
  position: absolute;
  top: 5px;
  left: 10px;
  background: white;
  font-size: 9px;
  padding: 1px 4px;
  font-weight: bold;
}

.handle {
  width: 50px;
  height: 10px;
  background: #333;
  border-radius: 5px;
  box-shadow: inset 0 2px 2px rgba(255, 255, 255, 0.2);
}
</style>
