<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

// 1. 데이터 구조 인터페이스 정의
interface MediaFile {
  fileName: string;
  fileType: "IMAGE" | "VIDEO";
  fileUrl: string;
}

const backendUrl = import.meta.env.VITE_API_BASE_URL;

// 2. 타입을 MediaFile[]로 변경
const fileList = ref<MediaFile[]>([]);
const selectedFile = ref<MediaFile | null>(null);
const fetchFiles = async () => {
  try {
    const res = await axios.get(`${backendUrl}/api/nas/all`, {
      params: { type: "IMAGE" },
    });
    fileList.value = res.data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};
const openOriginal = (file: MediaFile) => {
  selectedFile.value = file;
};
const closeOriginal = () => {
  selectedFile.value = null;
};
onMounted(fetchFiles);
</script>

<template>
  <div class="search">
    <input type="text" placeholder="검색어 입력" />
    <img
      src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
    />
  </div>
  <h3>NAS 미디어 이미지</h3>
  <div class="switch-album">
    <div class="grid">
      <div
        v-for="file in fileList"
        :key="file.fileName"
        class="item"
        @click="openOriginal(file)"
      >
        <div class="thumb-wrapper">
          <img :src="file.fileUrl" loading="lazy" class="thumb-img" />
          <div v-if="file.fileType === 'VIDEO'" class="video-icon">▶</div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="selectedFile"
        class="modal-overlay"
        @click.self="closeOriginal"
      >
        <div class="modal-content">
          <button class="close-btn" @click="closeOriginal">✕ Back</button>

          <div class="media-viewer">
            <img
              v-if="selectedFile.fileType === 'IMAGE'"
              :src="selectedFile.fileUrl"
              class="full-media"
            />

            <video
              v-else-if="selectedFile.fileType === 'VIDEO'"
              :src="selectedFile.fileUrl"
              controls
              autoplay
              class="full-media"
            ></video>
          </div>

          <div class="modal-footer">
            <p>{{ selectedFile.fileName }}</p>
          </div>
        </div>
      </div>
    </Transition>
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
</style>
