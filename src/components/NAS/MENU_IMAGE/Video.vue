<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axios from "axios";

interface MediaFile {
  fileName: string;
  fileType: "IMAGE" | "VIDEO";
  fileUrl: string;
  takenDate: string;
  latitude: string; // 혹은 number
  longitude: string; // 혹은 number
  ThumbUrl: string;
}

const fileList = ref<MediaFile[]>([]);
const selectedFile = ref<MediaFile | null>(null);
const isDrawerOpen = ref(false);
const address = ref("");
const isAddressLoading = ref(false); // 로딩 상태 관리
// 💡 수정: Props가 아닌 현재 컴포넌트의 selectedFile을 감시해야 합니다.
watch(
  () => selectedFile.value,
  async (newFile) => {
    if (newFile && newFile.latitude) {
      try {
        address.value = await getAddress(newFile.latitude, newFile.longitude);
      } catch (e) {
        address.value = "주소 변환 실패";
      }
    } else {
      address.value = "위치 정보 없음";
    }
  },
);

const fetchFiles = async () => {
  try {
    // 💡 팁: type을 "IMAGE"로 보낼지 "VIDEO"로 보낼지 구분해 보세요.
    const res = await axios.get("/api/nas/all", {
      params: { type: "VIDEO" },
    });
    fileList.value = res.data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

const openDrawer = (file: MediaFile) => {
  // 1. 일단 Drawer부터 즉시 연다 (반응성 확보)
  selectedFile.value = file;
  isDrawerOpen.value = true;

  // 2. 주소는 초기화하고 로딩 상태로 만든다
  address.value = "";
  isAddressLoading.value = true;

  // 3. 주소 호출은 '비동기'로 별도로 돌린다 (await를 여기서 쓰지 않거나,
  // 내부에서 처리하여 메인 스레드를 방해하지 않게 함)
  if (file.latitude && file.longitude) {
    getAddress(file.latitude, file.longitude)
      .then((result) => {
        address.value = result;
        isAddressLoading.value = false;
      })
      .catch(() => {
        address.value = "위치 정보 읽기 실패";
        isAddressLoading.value = false;
      });
  } else {
    address.value = "위치 정보 없음";
    isAddressLoading.value = false;
  }
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
  selectedFile.value = null; // 닫을 때 초기화
};

const getAddress = async (lat: string, lon: string) => {
  try {
    // Nominatim API 호출 (userAgent를 설정하는 것이 매너입니다)
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      { headers: { "Accept-Language": "ko" } },
    );

    if (res.data && res.data.display_name) {
      const addr = res.data.address;
      return `${addr.city || addr.province || ""} ${addr.suburb || addr.borough || ""} ${addr.road || ""}`.trim();
    }
    return "주소 정보 없음";
  } catch (e) {
    console.error("주소 변환 실패:", e);
    return "위치 정보 읽기 실패";
  }
};

onMounted(fetchFiles);
</script>
<template>
  <div class="search-container">
    <div class="search">
      <input type="text" placeholder="검색어 입력" />
      <img
        src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
      />
    </div>
  </div>

  <h3>NAS 미디어 동영상</h3>

  <div class="switch-album">
    <div class="grid">
      <div
        v-for="file in fileList"
        :key="file.fileName"
        class="item"
        @click="openDrawer(file)"
      >
        <div class="thumb-wrapper">
          <img :src="file.ThumbUrl" loading="lazy" class="thumb-img" />
          <div v-if="file.fileType === 'VIDEO'" class="video-icon">▶</div>
        </div>
      </div>
    </div>

    <Transition name="slide-fade">
      <div v-if="isDrawerOpen" class="drawer">
        <div class="drawer-header">
          <button @click="closeDrawer" class="back-btn">
            <span>close</span>
          </button>
        </div>

        <div class="drawer-content" v-if="selectedFile">
          <div class="preview-box">
            <img :src="selectedFile.fileUrl" class="preview-img" />
          </div>

          <div class="info-group">
            <div class="info-section">
              <p>{{ selectedFile.takenDate || "날짜 정보 없음" }}</p>
            </div>

            <div class="info-section">
              <p>{{ address }}</p>
            </div>
          </div>

          <div class="info-list">
            <p><strong>파일명:</strong> {{ selectedFile.fileName }}</p>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="isDrawerOpen" class="overlay" @click="closeDrawer"></div>
  </div>
</template>
<style scoped>
.search {
  position: relative;
  width: 250px;
  border: 1px solid #bbb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

input {
  border: none;
  padding: 10px 12px;
  font-size: 14px;
}

.search img {
  position: absolute;
  width: 17px;
  top: 10px;
  right: 15px;
  margin: 0;
}
/* 썸네일 그리드 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.item {
  cursor: pointer;
  border: 1px solid #e1e1e1;
  padding: 2px;
  border-radius: 3px;
  transition:
    transform 0.1s,
    border-color 0.1s;
}

.item:hover {
  border-color: #00ebf0; /* 스위치 하늘색 */
  transform: scale(1.05);
}

.thumb-wrapper {
  aspect-ratio: 16 / 9;
  background: #000;
  position: relative;
  overflow: hidden;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 모달 스타일 (원본 보기) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 1200px;
  position: relative;
}

.full-media {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: -50px;
  left: 0;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

/* 애니메이션 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Drawer 본체 */
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  height: 100%;
  background-color: #2d2d2d; /* 닌텐도 다크 테두리 색상 */
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
  z-index: 2000;
  padding: 20px;
  color: white;
}

/* 배경 오버레이 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1500;
}

/* 상세 정보 스타일 */
.preview-box {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
}
.preview-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.back-btn {
  display: flex;
  background: #444;
  border: none;
  color: white;
  padding: 3px 15px;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 12px;
}

/* 🚀 애니메이션 핵심: Slide Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%); /* 오른쪽 밖으로 숨김 */
}
</style>
