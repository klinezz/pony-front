<script setup> 
import { ref, reactive, useTemplateRef } from "vue";
import api from '@/api';  
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore();
const router = useRouter();
const loginForm = reactive({
  username: '',
  password: ''
});

const message = "Hello, Vue 3!"; 
const inputId = useTemplateRef('inputId');
const inputPw = useTemplateRef('inputPw'); 
const userId = ref('');
const userPw = ref('');
const saveId = ref(false);
const showPw = ref(false);
const doLogin = async () => {
  const id = userId.value;
  const pw = userPw.value;
  const isCheckId = saveId.value;
  if (id == '') {
    alert('아이디를 입력하세요.');
    inputId.value.focus();
    return;
  } 
  if (pw == '') {
    alert('비밀번호를 입력하세요.');
    inputPw.value.focus();
    return;
  }

  const formData = new FormData();
  formData.append('username', id);
  formData.append('password', pw);
 
  try { 
    await authStore.login(formData);  
    router.push('/');
  } catch (error) { 
    alert('로그인 정보가 올바르지 않습니다.');
    console.error(error);
  }
} 
const findUserIdAndPassword = () => {
  alert('asdf')
}
const showUserInputPassword = () => {
  showPw.value = !showPw.value;
  if (showPw.value) {
    
  } else {
    
  }
} 

</script>

<template>
  <div> 
    <div id="loginBox">
      <h1>{{ message }}</h1>  
      <form id="loginForm"  @submit.prevent="doLogin" style="margin-top:50px;">
        <div class="loginInput">
          <div class="loginCol">
            <div>아이디</div>
            <div>비밀번호</div>
          </div>
          <div class="loginCol">
            <div class="divLoginCol">
              <input type="text" id="" ref="inputId" v-model="userId" placeholder="아이디를 입력하세요" ></input>
               
            </div>
            <div class="divLoginCol">
              <input :type="showPw ? 'text' : 'password'" id="" ref="inputPw" v-model="userPw" placeholder="비밀번호를 입력하세요" ></input>
              <img src="../../public/vite.svg" @click="showUserInputPassword"></img>
               
            </div>
          </div>
        </div>
        
        <div class="divLoginButton">
        <button type="submit">로그인</button>
        <svg class="border-svg">
                <defs>
                  <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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
          <label for="checkId">
              <input type="checkbox" v-model="saveId" id="checkId">ID 저장하기
          </label> 
          <div class="loginForgot" @click="findUserIdAndPassword">
            아이디 / 비밀번호 찾기
          </div> 
        </div>  
      </form>
    </div>
  </div>
</template>


<style scoped>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
*{
    padding: 0;
    margin: 0;
    border: none;
}
body{
    font-size: 14px;
    font-family: 'Noto Sans KR', sans-serif !important;
} 
#loginBox{ 
  padding: 100px 120px;
  border : 1px solid #e1e1e1;
  box-sizing: border-box;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 5px 5px 2px 2px #555555
}
#loginForm{
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
}
#loginForm > .loginInput{
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  gap: 15px;
}
#loginForm > .loginInput > .loginCol{ 
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  gap: 15px;
  position: relative;
}  
#loginForm > .loginInput > .loginCol > .divLoginCol{ 
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 250px; 
}  
#loginForm > .loginInput > .loginCol > .divLoginCol img { 
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  z-index: 1;
}
#loginForm > .loginInput input { 
  position: relative;
  width: 100%;
  height: 45px;
  background-color: #ffffff; 
  box-sizing: border-box;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
}
#loginForm > .loginInput input:focus {
  outline: none; 
} 
#loginForm .divLoginCol:last-child input { 
  padding-right: 10px;
}
#loginForm > .loginCheck{
  display: flex;
  text-align: left;
  align-items: center; 
  justify-content: space-between; 
  font-size: 12px; 
  font-weight: 600;
}
#loginForm > .loginCheck label {
  display: inline-flex;     
  align-items: center;       
   cursor: pointer;       
}  
#loginForm > .loginCheck #checkId {
  margin-right: 7px; 
  width: 17px;
  height: 17px;
}
#loginForm > button{
  padding: 10px;
}
#loginForm > button:active {
 outline: 2px solid lightblue;  
  outline-offset: 2px; 
}
#loginForm > .loginForgot{
  font-size: 12px;
  text-align: right;
  margin-top: 0px; 
}
#loginForm .loginForgot:hover{
  text-decoration: underline;
  cursor: pointer;
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
  /* 정의한 그라데이션 ID 호출 (무조건 색상이 나옵니다) */
  stroke: url(#glow-grad);
  stroke-width: 3px;
  stroke-linecap: round;
  stroke-linejoin: round;

  /* 선의 길이와 공백 (총 합이 약 700~800 사이여야 함) */
  stroke-dasharray: 120 630;
  animation: stroke-move 3s linear infinite;
}

@keyframes stroke-move {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    /* 사각형 둘레만큼 이동 (끊김이 느껴지면 이 숫자를 미세하게 조절) */
    stroke-dashoffset: -750;
  }
}
</style>
