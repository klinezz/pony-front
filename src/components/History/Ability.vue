<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    items: [
      {
        name: "HTML5",
        icon: "icon-html5.svg",
        desc: "시맨틱 마크업 및 웹 표준 준수",
      },
      {
        name: "CSS3",
        icon: "icon-css3.svg",
        desc: "Flex/Grid 레이아웃 및 애니메이션 구현",
      },
      {
        name: "JavaScript",
        icon: "icon-javascript.svg",
        desc: "ES6+ 문법 및 비동기 로직 처리",
      },
      {
        name: "TypeScript",
        icon: "icon-typescript.svg",
        desc: "정적 타이핑을 통한 안정적인 코드 작성",
      },
      {
        name: "Vue.js",
        icon: "icon-vuejs.svg",
        desc: "Composition API 기반 컴포넌트 설계",
      },
      {
        name: "Vite",
        icon: "icon-vitejs.svg",
        desc: "빠른 번들링 및 최적화된 빌드 환경 구축",
      },
      {
        name: "Tailwind CSS",
        icon: "icon-tailwind.svg",
        desc: "Utility-first 기반 신속한 UI 개발",
      },
      {
        name: "Bootstrap",
        icon: "icon-bootstrap.svg",
        desc: "반응형 그리드 시스템 및 컴포넌트 활용",
      },
      {
        name: "Sass",
        icon: "icon-sass.svg",
        desc: "변수 및 믹스인을 활용한 효율적 CSS 관리",
      },
      {
        name: "Jquery",
        icon: "icon-jquery.svg",
        desc: "DOM 조작 및 레거시 라이브러리 유지보수",
      },
      {
        name: "Figma",
        icon: "icon-figma.svg",
        desc: "디자인 협업 및 UI/UX 프로토타이핑",
      },
      {
        name: "npm",
        icon: "icon-npm.svg",
        desc: "패키지 의존성 관리 및 스크립트 실행",
      },
      {
        name: "ESLint",
        icon: "icon-eslint.svg",
        desc: "코드 컨벤션 유지 및 정적 코드 분석",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    items: [
      {
        name: "Java",
        icon: "icon-java.svg",
        desc: "객체 지향 프로그래밍 및 대규모 백엔드 개발",
      },
      {
        name: "Spring Boot",
        icon: "icon-springboot.svg",
        desc: "MSA 및 REST API 서버 구축",
      },
      {
        name: "Spring",
        icon: "icon-spring.svg",
        desc: "DI/IoC 기반의 견고한 프레임워크 활용",
      },
      {
        name: "Node.js",
        icon: "icon-nodejs.svg",
        desc: "이벤트 기반 비동기 서버 개발",
      },
      {
        name: "PHP",
        icon: "icon-php.svg",
        desc: "서버 사이드 스크립트 기반 웹 서비스 구축",
      },
      {
        name: "MySQL",
        icon: "icon-mysql.svg",
        desc: "관계형 데이터베이스 설계 및 쿼리 최적화",
      },
      {
        name: "MariaDB",
        icon: "icon-mariadb.svg",
        desc: "고성능 DB 클러스터링 및 운영",
      },
      {
        name: "PostgreSQL",
        icon: "icon-postgresql.svg",
        desc: "복잡한 쿼리 및 데이터 정밀 분석",
      },
      {
        name: "Oracle",
        icon: "icon-oracle.svg",
        desc: "엔터프라이즈급 데이터 관리 및 트랜잭션 처리",
      },
      {
        name: "Redis",
        icon: "icon-redis.svg",
        desc: "인메모리 캐싱을 통한 성능 가속화",
      },
      {
        name: "JSON",
        icon: "icon-json.svg",
        desc: "표준 데이터 포맷을 이용한 통신 규격 설계",
      },
      {
        name: "Tomcat",
        icon: "icon-tomcat.svg",
        desc: "WAS 운용 및 서블릿 컨테이너 관리",
      },
      {
        name: "Gradle",
        icon: "icon-gradle.svg",
        desc: "유연한 빌드 자동화 및 스크립트 관리",
      },
      {
        name: "Maven",
        icon: "icon-maven.svg",
        desc: "XML 기반 라이브러리 관리 및 빌드 표준화",
      },
    ],
  },
  {
    id: "version_devops",
    title: "Version Control & DevOps",
    items: [
      {
        name: "Git",
        icon: "icon-git.svg",
        desc: "Git Flow 전략 기반 버전 관리",
      },
      {
        name: "GitHub",
        icon: "icon-github.svg",
        desc: "오픈소스 협업 및 Actions CI/CD 구축",
      },
      {
        name: "GitLab",
        icon: "icon-gitlab.svg",
        desc: "Private 저장소 관리 및 CI/CD 파이프라인",
      },
      {
        name: "Docker",
        icon: "icon-docker.svg",
        desc: "컨테이너 가상화 및 배포 환경 표준화",
      },
      {
        name: "Jenkins",
        icon: "icon-jenkins.svg",
        desc: "빌드 및 배포 프로세스 자동화 운영",
      },
      {
        name: "Nginx",
        icon: "icon-nginx.svg",
        desc: "리버스 프록시 및 로드 밸런싱 설정",
      },
    ],
  },
  {
    id: "os_server",
    title: "OS & Infrastructure",
    items: [
      {
        name: "Linux",
        icon: "icon-linux.svg",
        desc: "서버 시스템 운영 및 쉘 스크립트 작성",
      },
      {
        name: "Ubuntu",
        icon: "icon-ubuntu.svg",
        desc: "데비안 계열 배포판 운영 및 서버 설정",
      },
      {
        name: "CentOS",
        icon: "icon-centos.svg",
        desc: "RHEL 기반 엔터프라이즈 서버 관리",
      },
      {
        name: "Debian",
        icon: "icon-debian.svg",
        desc: "안정성 중심의 시스템 서버 운영",
      },
      {
        name: "Redhat",
        icon: "icon-redhat.svg",
        desc: "보안 및 유료 기술 지원 서버 아키텍처",
      },
      {
        name: "Rocky Linux",
        icon: "icon-rockylinux.svg",
        desc: "CentOS 대체 배포판 구축 및 전환",
      },
      {
        name: "Android",
        icon: "icon-android.svg",
        desc: "모바일 앱 환경 이해 및 플랫폼 개발",
      },
    ],
  },
  {
    id: "tools_ai",
    title: "Development Tools & AI",
    items: [
      {
        name: "IntelliJ IDEA",
        icon: "icon-intellij.svg",
        desc: "Java 환경 최적화 IDE 활용",
      },
      {
        name: "VS Code",
        icon: "icon-vscode.svg",
        desc: "다양한 익스텐션을 활용한 개발 생산성 증대",
      },
      {
        name: "JetBrains",
        icon: "icon-jetbrains.svg",
        desc: "전문 개발자용 툴 세트 활용 능력",
      },
      {
        name: "PhpStorm",
        icon: "icon-phpstorm.svg",
        desc: "PHP 특화 지능형 개발 환경 운영",
      },
      {
        name: "DataGrip",
        icon: "icon-datagrip.svg",
        desc: "통합 DB 관리 및 SQL 튜닝",
      },
      {
        name: "DBeaver",
        icon: "icon-dbeaver.svg",
        desc: "범용 데이터베이스 클라이언트 활용",
      },
      {
        name: "SQL Developer",
        icon: "icon-sqldeveloper.svg",
        desc: "Oracle DB 전용 관리 및 개발",
      },
      {
        name: "Eclipse",
        icon: "icon-eclipse.svg",
        desc: "레거시 프로젝트 및 자바 어플리케이션 개발",
      },
      {
        name: "Android Studio",
        icon: "icon-androidstudio.svg",
        desc: "모바일 앱 인터페이스 및 로직 설계",
      },
      {
        name: "Postman",
        icon: "icon-postman.svg",
        desc: "API 테스트 및 문서화 협업",
      },
      {
        name: "PuTTY",
        icon: "icon-putty.svg",
        desc: "SSH 원격 터미널 접속 및 서버 제어",
      },
      {
        name: "MobaXterm",
        icon: "icon-mobaxterm.png",
        desc: "강력한 올인원 네트워크 터미널 활용",
      },
      {
        name: "FileZilla",
        icon: "icon-filezilla.svg",
        desc: "FTP/SFTP 파일 전송 및 관리",
      },
      {
        name: "Notepad++",
        icon: "icon-notepadplusplus.svg",
        desc: "가벼운 텍스트 편집 및 코드 메모",
      },
      {
        name: "Slack",
        icon: "icon-slack.svg",
        desc: "팀 프로젝트 채널 기반 실시간 협업",
      },
      {
        name: "Notion",
        icon: "icon-notion.svg",
        desc: "문서화 및 칸반 보드 기반 일정 관리",
      },
      {
        name: "Asana",
        icon: "icon-asana.svg",
        desc: "워크플로우 관리 및 테스크 트래킹",
      },
      {
        name: "Gemini",
        icon: "icon-gemini.svg",
        desc: "AI 기반 코드 리뷰 및 정보 검색 보조",
      },
      {
        name: "ChatGPT",
        icon: "icon-chatgpt.svg",
        desc: "대규모 언어 모델을 활용한 문제 해결",
      },
    ],
  },
];

const activeCategory = ref(null);
const toggleCategory = (id) => {
  activeCategory.value = activeCategory.value === id ? null : id;
};

const currentView = ref("main");
const selectedSkill = ref(null);
const transitionName = ref("slide-next");
const goToBoard = async (item) => {
  router.push({
    name: "AbilityDetail",
    params: { skillName: item.name },
    state: { skillData: item },
  });
  await nextTick();
};
const goBack = () => {
  currentView.value = "main";
};
onMounted(() => {
  console.log("onMounted");
});
</script>

<template>
  <div class="viewport">
    <h3 class="menu_title">SKILL</h3>
    <div class="board_container">
      <div v-for="cat in skillCategories" :key="cat.id" class="skill_group">
        <div
          class="main_row"
          :class="{ is_active: activeCategory === cat.id }"
          @click="toggleCategory(cat.id)"
        >
          <div class="category_label">SKILL</div>
          <div class="category_title">{{ cat.title }}</div>
          <div class="toggle_status">
            {{ activeCategory === cat.id ? "CLOSE" : "OPEN" }}
          </div>
        </div>

        <div
          class="sub_list_wrapper"
          :class="{ is_expanded: activeCategory === cat.id }"
        >
          <div class="sub_list_inner">
            <div
              v-for="item in cat.items"
              :key="item.name"
              class="sub_item"
              @click="goToBoard(item)"
            >
              <div class="item_name">
                <span class="bullet">•</span>
                <img
                  :src="`/public/skill/${item.icon}`"
                  :alt="item.name"
                  style="width: 20px"
                />
                {{ item.name }}
              </div>
              <div class="item_desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
}
.board_container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.menu_title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  padding-left: 5px;
  margin-bottom: 20px;
  border-left: 4px solid #1264a3;
}

/* 메인 행 스타일 */
.main_row {
  display: flex;
  align-items: center;
  padding: 18px 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.main_row:hover {
  border-color: #5c5c5c;
}

.main_row.is_active {
  background: #5c5c5c;
  color: #fff;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.category_label {
  width: 80px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #999;
}
.is_active .category_label {
  color: rgba(255, 255, 255, 0.7);
}

.category_title {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
}

.toggle_status {
  font-size: 10px;
  font-weight: bold;
  opacity: 0.6;
}

/* 내부 리스트 애니메이션 설정 (Grid 방식) */
.sub_list_wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  background: #fff;
  border-radius: 0 0 12px 12px;
}

.sub_list_wrapper.is_expanded {
  grid-template-rows: 1fr;
  border: 1px solid #d1d1d1;
  border-top: none;
  box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.05);
}

.sub_list_inner {
  min-height: 0;
}

/* 내부 리스트 아이템 스타일 */
.sub_item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid #d1d1d1;
}

.sub_item:last-child {
  border-bottom: none;
}

.item_name {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.bullet {
  color: #1264a3;
}

.item_desc {
  font-size: 13px;
  color: #777;
}

.viewport {
  margin: 0;
  width: 100%;
  height: 100%;
}

/* --- 상세 페이지 스타일 --- */
.detail_header {
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
  padding: 20px;
}

.empty_message {
  padding: 50px;
  text-align: center;
  color: #999;
  border: 1px dashed #ccc;
  border-radius: 12px;
}

.board_container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.main_row {
  /* ... 기존 스타일 ... */
  display: flex;
  align-items: center;
  padding: 18px 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}
.sub_item {
  cursor: pointer;
}
.sub_item:hover {
  background: #f5f5f5;
}
</style>
