<script setup></script>

<template>
  <div id="cabinet_container">
    <div class="cabinet-scene">
      <div class="cabinet-body">
        <div class="cabinet-shell top"></div>
        <div class="cabinet-shell left"></div>
        <div class="cabinet-shell right"></div>

        <div v-for="i in 5" :key="i" class="drawer-unit">
          <input type="checkbox" :id="'dr_front' + i" />
          <div class="drawer-group">
            <div class="drawer-tray">
              <div class="paper-stack">
                <div class="paper-header">DOCUMENTS #0{{ i }}</div>
                <div class="paper-content">
                  <p>📌 옆면 높이 정렬 완료</p>
                  <p>📌 상단 뚜껑 밀폐 처리</p>
                </div>
                <div class="paper-footer">INTERNAL STORAGE</div>
              </div>
            </div>
            <label :for="'dr_front' + i" class="drawer-front">
              <div class="handle"></div>
              <span class="drawer-label">FRONT-VIEW {{ i }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cabinet-scene {
  --iron-base: #2d3748;
  --iron-front: #4a5568;
  --iron-dark: #1a202c;
  --iron-light: #718096;
  --paper-white: #ffffff;
  perspective: 4000px;
  padding: 100px;
  display: flex;
  justify-content: center;
  height: 1000px;
}

.cabinet-body {
  width: 550px;
  height: 400px;
  transform-style: preserve-3d;
  transform: rotateX(-28deg) rotateY(-30deg);
  position: relative;
  background: #1e1e1e;
  padding-top: 2px;
}

/* 🏠 캐비닛 외각 껍데기 */
.cabinet-shell {
  position: absolute;
  background: var(--iron-dark);
  z-index: -1;
}

/* 맨 윗부분 뚜껑 닫기 */
.cabinet-shell.top {
  width: 100%;
  height: 200px; /* 서랍 깊이 */
  top: 0;
  left: 0;
  transform-origin: top;
  transform: rotateX(-90deg);
  background: var(--iron-light);
  border: 1px solid rgba(0, 0, 0, 0.5);
}

/* 옆면 높이를 서랍 전체 높이에 맞게 설정 (5단 서랍 + 간격) */
.cabinet-shell.left {
  width: 200px;
  height: 400px; /* 부모 .cabinet-body 높이에 맞춤 */
  left: 0;
  top: 0;
  transform-origin: left;
  transform: rotateY(90deg);
  background: var(--iron-dark);
  border: 1px solid rgba(0, 0, 0, 0.6);
}

.cabinet-shell.right {
  width: 200px;
  height: 400px;
  right: 0;
  top: 0;
  transform-origin: right;
  transform: rotateY(-90deg);
  background: #141a24;
  border: 1px solid rgba(0, 0, 0, 0.6);
}

/* 🗄️ 서랍 유닛 */
.drawer-unit {
  position: relative;
  width: 100%;
  height: 80px;
  margin-bottom: 0px;
  background: #000;
  transform-style: preserve-3d;
}

.drawer-unit:has(input:checked) {
  z-index: 100;
}

input[type="checkbox"] {
  display: none;
}

.drawer-group {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.drawer-front {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--iron-front);
  border: 1px solid var(--iron-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.1);
}

.drawer-tray {
  position: absolute;
  width: 100%;
  height: 200px;
  top: 0;
  transform-origin: top;
  transform: rotateX(-90deg);
  background: #334155;
  padding: 12px;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.7);
}

/* 애니메이션 */
input:checked + .drawer-group {
  transform: translateZ(200px) translateY(20px);
}

/* 종이 리스트 */
.paper-stack {
  background: white;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
}

.paper-header {
  font-weight: bold;
  border-bottom: 2px solid #2d3748;
  margin-bottom: 8px;
  font-size: 14px;
  color: #2d3748;
}

.paper-content p {
  font-size: 12px;
  color: #4a5568;
  margin: 4px 0;
}

.paper-footer {
  margin-top: auto;
  font-size: 10px;
  color: #cbd5e0;
  text-align: right;
}

.handle {
  width: 60px;
  height: 10px;
  background: #94a3b8;
  border-radius: 20px;
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.5);
}

.drawer-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 8px;
}
</style>
