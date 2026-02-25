<script setup>
import { ref, reactive, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const message = "Join Us!";

// 템플릿 참조
const inputId = useTemplateRef("inputId");

// 회원가입 데이터 객체
const userForm = reactive({
  id: "",
  password: "",
  name: "",
  email: "",
  phone1: "",
  phone2: "",
  role: "ROLE_USER",
});

const handleSignUp = async () => {
  if (!userForm.id) {
    alert("아이디를 입력하세요.");
    inputId.value.focus();
    return;
  }
  if (!userForm.password) {
    alert("비밀번호를 입력하세요.");
    return;
  }
  if (!userForm.name) {
    alert("이름을 입력하세요.");
    return;
  }

  const formData = new FormData();
  Object.keys(userForm).forEach((key) => {
    formData.append(key, userForm[key]);
  });

  try {
    // 백엔드 회원가입 API 호출
    await axios.post("/api/user/signup", formData);
    alert("회원가입이 완료되었습니다!");
    router.push("/login");
  } catch (error) {
    alert("회원가입 실패: " + (error.response?.data || "오류 발생"));
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <div id="loginBox">
      <h1>{{ message }}</h1>
      <form
        id="loginForm"
        @submit.prevent="handleSignUp"
        style="margin-top: 40px"
      >
        <div class="loginInput">
          <div class="loginCol labelCol">
            <div>아이디 *</div>
            <div>비밀번호 *</div>
            <div>이름 *</div>
            <div>이메일</div>
            <div>연락처 1</div>
            <div>연락처 2</div>
          </div>
          <div class="loginCol">
            <div class="divLoginCol">
              <input
                type="text"
                ref="inputId"
                v-model="userForm.id"
                placeholder="ID"
              />
            </div>
            <div class="divLoginCol">
              <input
                type="password"
                v-model="userForm.password"
                placeholder="Password"
              />
            </div>
            <div class="divLoginCol">
              <input type="text" v-model="userForm.name" placeholder="Name" />
            </div>
            <div class="divLoginCol">
              <input
                type="email"
                v-model="userForm.email"
                placeholder="example@mail.com"
              />
            </div>
            <div class="divLoginCol">
              <input
                type="text"
                v-model="userForm.phone1"
                placeholder="010-0000-0000"
              />
            </div>
            <div class="divLoginCol">
              <input
                type="text"
                v-model="userForm.phone2"
                placeholder="02-000-0000"
              />
            </div>
          </div>
        </div>

        <div class="divLoginButton" style="margin-top: 20px">
          <button type="submit">가입하기</button>
          <svg class="border-svg">
            <defs>
              <linearGradient
                id="glow-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2" />
                <stop offset="50%" stop-color="#60a5fa" stop-opacity="0.6" />
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="1" />
              </linearGradient>
            </defs>
            <rect
              class="border-rect"
              x="-2"
              y="2"
              width="calc(100% + 4px)"
              height="calc(100% - 4px)"
              rx="12"
              ry="12"
            ></rect>
          </svg>
        </div>

        <div class="loginCheck">
          <div class="loginForgot" @click="router.push('/login')">
            이미 계정이 있으신가요? 로그인
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#loginBox {
  padding: 60px 80px; /* 항목이 많으므로 상하 패딩 조절 */
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1); /* 그림자 부드럽게 변경 */
}

#loginForm {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.loginInput {
  display: flex;
  gap: 20px;
}

.loginCol {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.labelCol {
  justify-content: space-around;
  font-weight: 600;
  color: #555;
  width: 80px; /* 라벨 영역 너비 고정 */
}

.divLoginCol {
  display: flex;
  align-items: center;
  width: 300px;
  position: relative;
}

.divLoginCol input {
  width: 100%;
  height: 40px;
  padding: 0 15px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  box-sizing: border-box;
}

.divLoginCol input:focus {
  border-color: #3b82f6;
  outline: none;
}

.divLoginButton {
  position: relative;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  background: #e1e1e1;
}

.divLoginButton button {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 15px;
  z-index: 10;
  font-size: 16px;
  border-radius: 10px;
  position: relative;
  z-index: 0;
}

.border-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  z-index: 1;
}

.border-rect {
  fill: none;
  stroke: url(#glow-grad);
  stroke-width: 3px;
  stroke-linecap: round;
  stroke-linejoin: round;

  /* 선의 길이와 공백 (총 합이 약 700~800 사이여야 함) */
  stroke-dasharray: 170 630;
  animation: stroke-move 3s linear infinite;
}

@keyframes stroke-move {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -750;
  }
}

.loginForgot {
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #888;
  cursor: pointer;
  margin-top: 10px;
}
.loginForgot:hover {
  text-decoration: underline;
  color: #3b82f6;
}
</style>
