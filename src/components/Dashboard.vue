<script setup>
import { ref, computed, onMounted } from "vue";
import dayjs from "dayjs";

// --- [상태 관리] ---
const now = ref(dayjs()); // 실시간 배경 및 시간 판단용
const viewDate = ref(dayjs()); // 캘린더 화면 이동용
const weatherData = ref(null);
const weatherMain = ref("Clear"); // 초기값
const temperature = ref(0);
const isLoading = ref(true);

const API_KEY = "b1aae148b4e52fb45400af617d7faeb8";
const CITY = "Seoul";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=kr`;

// --- [로직: 배경 클래스 생성] ---
const timePeriod = computed(() => {
  const hour = now.value.hour();
  if (hour >= 6 && hour < 17) return "morning"; // 낮
  if (hour >= 17 && hour < 20) return "evening"; // 노을
  return "night"; // 밤
});

const backgroundClass = computed(() => {
  // 날씨 상태가 API에서 오면 해당 상태 반영, 아니면 Clear 기준
  const status = weatherMain.value ? weatherMain.value.toLowerCase() : "clear";
  return `bg-${timePeriod.value}-${status}`;
});

// --- [로직: 날씨 데이터 호출] ---
const fetchWeather = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("날씨 로드 실패");
    const data = await response.json();
    weatherData.value = data;
    weatherMain.value = data.weather[0].main;
    temperature.value = Math.round(data.main.temp);
  } catch (error) {
    console.error("Weather Error:", error);
  } finally {
    isLoading.value = false;
  }
};

// --- [로직: 캘린더 계산] ---
const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const calendarDays = computed(() => {
  const startOfMonth = viewDate.value.startOf("month");
  const startDay = startOfMonth.day(); // 시작 요일
  const totalDays = viewDate.value.endOf("month").date();

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push({ day: null, key: `empty-${i}` });
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push({ day: i, key: `day-${i}` });
  }
  return days;
});

// --- [로직: 이동 함수] ---
const moveMonth = (amt) => (viewDate.value = viewDate.value.add(amt, "month"));
const moveYear = (amt) => (viewDate.value = viewDate.value.add(amt, "year"));
const goToday = () => {
  viewDate.value = dayjs();
};

onMounted(() => {
  fetchWeather();
  setInterval(() => {
    now.value = dayjs();
  }, 60000); // 1분마다 시간 동기화
});
</script>

<template>
  <div id="dashboard_container">
    <div class="calendar-wrapper">
      <header :class="['calendar-header', !isLoading ? backgroundClass : '']">
        <div class="nav-row">
          <div class="nav-btns">
            <button @click="moveYear(-1)">
              <i class="pi pi-angle-double-left"></i>
            </button>
            <button @click="moveMonth(-1)">
              <i class="pi pi-angle-left"></i>
            </button>
          </div>
          <h2 class="current-month-display">
            {{ viewDate.format("YYYY년 MM월") }}
          </h2>
          <div class="nav-btns">
            <button @click="moveMonth(1)">
              <i class="pi pi-angle-right"></i>
            </button>
            <button @click="moveYear(1)">
              <i class="pi pi-angle-double-right"></i>
            </button>
          </div>
        </div>
        <div class="info-box" v-if="!isLoading">
          <div class="weather-row">
            <div class="weather-text-group">
              <span style="font-size: 12px">현재 날씨</span>
              <span class="temp-text">{{ temperature }}°C</span>
              <span class="status-text">{{ weatherMain }}</span>
            </div>
            <img
              :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
              alt="icon"
              class="weather-icon"
            />
          </div>
          <button class="btn-today" @click="goToday">Today</button>
        </div>
        <div v-else class="loading-status">날씨 정보 불러오는 중...</div>
      </header>

      <main class="calendar-content">
        <div class="weekdays-row">
          <span v-for="label in daysOfWeek" :key="label">{{ label }}</span>
        </div>
        <div class="days-grid">
          <div
            v-for="item in calendarDays"
            :key="item.key"
            class="day-cell"
            :class="{
              'is-today':
                item.day === dayjs().date() &&
                viewDate.isSame(dayjs(), 'month'),
              'is-empty': !item.day,
            }"
          >
            {{ item.day }}
          </div>
        </div>
      </main>
    </div>

    <div id="schedule_container">
      <!-- <div class="editor">
        <Editor ref="myEditor" />
      </div> -->

      <div class="schedule_list">
        <div class="schedule_item">
          <div class="schedule_title">
            <i class="pi pi-calendar pr-1"></i>
            schedule_title
          </div>
          <div class="schedule_desc">
            <div class="schedule_desc_item">
              <i class="pi pi-ticket"></i>asdfasdfasdfasdf
            </div>
            <div class="schedule_desc_item">asdfasdfasdfasdf</div>
            <div class="schedule_desc_item">asdfasdfasdfasdf</div>
          </div>
        </div>
        <div class="schedule_item">
          <div class="schedule_title">
            <i class="pi pi-calendar pr-1"></i>
            schedule_title
          </div>
          <div class="schedule_desc">
            <div class="schedule_desc_item">asdfasdfasdfasdf</div>
            <div class="schedule_desc_item">asdfasdfasdfasdf</div>
            <div class="schedule_desc_item">asdfasdfasdfasdf</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#dashboard_container {
  display: flex;
  flex-direction: row;
}
#schedule_container {
  flex-grow: 1;
  padding: 0 15px;
}
.schedule_list {
  display: flex;
  flex-direction: column;
  gap: 13px;
}
.schedule_title {
  border-radius: 7px 7px 0 0;
  background-color: #55ad77;
  padding: 5px 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
}
.schedule_desc_item {
  background-color: #ffffff;
  border: 1px dashed #999999;
  border-left: 0;
  border-right: 0;
  padding: 5px 10px;
  font-size: 14px;
  border-top: 0;
  font-weight: 500;
}
.schedule_desc .schedule_desc_item:hover {
  cursor: pointer;
}

.calendar-wrapper {
  width: 100%;
  max-width: 450px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  height: fit-content;
}

/* --- 상단 배경 스타일 (요청 스타일 유지) --- */
.calendar-header {
  position: relative;
  padding: 15px 13px;
  color: white;
  transition: background 1.5s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* --- Clear (맑음) --- */
.bg-morning-clear {
  background: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
}
.bg-evening-clear {
  background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
}
.bg-night-clear {
  background: linear-gradient(120deg, #2c3e50 0%, #000000 100%);
}

/* --- Clouds & Mist (흐림/안개 - 요청하신 기본색상) --- */
.bg-morning-clouds,
.bg-morning-mist,
.bg-evening-clouds,
.bg-evening-mist {
  background: #95a5a6;
}
.bg-night-clouds,
.bg-night-mist {
  background: #2c3e50; /* 밤에는 조금 더 어둡게 */
}

/* --- Rain & Drizzle (비/이슬비) --- */
.bg-morning-rain {
  background: linear-gradient(120deg, #4facfe 0%, #00f2fe 100%);
}
.bg-evening-rain {
  background: linear-gradient(120deg, #7028e4 0%, #e5b2ca 100%);
}
.bg-night-rain {
  background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%);
}

/* --- Snow (눈) --- */
.bg-morning-snow {
  background: linear-gradient(120deg, #e6e9f0 0%, #eef1f5 100%);
}
.bg-night-snow {
  background: linear-gradient(120deg, #83a4d4 0%, #b6fbff 100%);
}

/* --- Thunderstorm (뇌우) --- */
.bg-morning-thunderstorm {
  background: linear-gradient(120deg, #37ecba 0%, #72afd3 100%);
}
.bg-night-thunderstorm {
  background: linear-gradient(120deg, #09203f 0%, #537895 100%);
}

/* --- Atmosphere (Haze, Dust, Fog 등 기타) --- */
.bg-atmosphere {
  background: linear-gradient(120deg, #6a85b6 0%, #bac8e0 100%);
}
/* 헤더 내부 요소 */
.weather-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.weather-icon {
  width: 85px;
  height: 85px;
}
.weather-text-group {
  display: flex;
  flex-direction: column;
}
.temp-text {
  font-size: 1.8rem;
  font-weight: 800;
}
.status-text {
  font-size: 0.9rem;
  opacity: 0.9;
}
.nav-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  padding: 0 5px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  margin-bottom: 10px;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
}
.current-month-display {
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: bold;
}
.nav-btns button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 5px 10px;
  cursor: pointer;
  transition: transform 0.1s;
}
.nav-btns button:active {
  transform: scale(0.9);
}
.calendar-content {
  padding: 10px;
}
.weekdays-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: #888;
  font-size: 0.85rem;
  font-weight: bold;
  background: #fafafa; /* 요일 영역 배경색 살짝 추가 */
  border: 1px solid #eee; /* 요일과 날짜 사이 구분선 */
  box-sizing: border-box;
}
.weekdays-row span {
  padding: 12px 0;
  border-right: 1px solid #eee; /* 요일 간의 세로선 */
  box-sizing: border-box;
}
.weekdays-row span:last-child {
  border-right: none; /* 마지막 요일은 세로선 제거 */
}
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  border-bottom: 0;
  border-left: 0;
}
.day-cell {
  height: 70px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;
  font-weight: 500;
  color: #444;
  transition: 0.2s;
  font-size: 12px;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding: 5px 7px;
}
button.btn-today {
  position: absolute;
  background-color: transparent;
  border: 1px solid #eee;
  font-size: 10px;
  right: 13px;
  bottom: 10px;
}
/* 7번째 날(토요일)마다 오른쪽 테두리 제거 */
.day-cell:nth-child(n) {
  border-left: 1px solid #eee;
}
.day-cell:nth-child(7n),
.day-cell:last-child {
  border-right: 1px solid #eee;
}
.day-cell:hover:not(.is-empty) {
  background: #f5f5f5;
  color: #000;
}

.day-cell:hover:not(.is-empty) {
  background: #f9f9f9;
  color: #000;
}

.is-today {
  color: #5797f1 !important;
  font-weight: bold;
  box-shadow: inset 0 0 0 1px #4872f4;
}

.is-empty {
  cursor: default;
  background: #fdfdfd;
}
</style>
