<script setup>
import { ref } from "vue";

const skills = [
  { name: "HTML5", icon: "icon-html5.svg" },
  { name: "Java", icon: "icon-java.svg" },
  { name: "JavaScript", icon: "icon-javascript.svg" },
  { name: "TypeScript", icon: "icon-typescript.svg" },
  { name: "Jquery", icon: "icon-jquery.svg" },
  { name: "CSS", icon: "icon-css3.svg" },
  { name: "Tailwind", icon: "icon-tailwind.svg" },
  { name: "Vue", icon: "icon-vuejs.svg" },
  { name: "VITE", icon: "icon-vitejs.svg" },
  { name: "MySql", icon: "icon-mysql.svg" },
  { name: "Postgresql", icon: "icon-postgresql.svg" },
  { name: "json", icon: "icon-json.svg" },
  { name: "Redis", icon: "icon-redis.svg" },
  { name: "Sass", icon: "icon-sass.svg" },
  { name: "Node Js", icon: "icon-nodejs.svg" },
  { name: "Oracle", icon: "icon-oracle.svg" },
  { name: "Mariadb", icon: "icon-mariadb.svg" },
  { name: "Spring Boot", icon: "icon-springboot.svg" },
  { name: "Tomcat", icon: "icon-tomcat.svg" },
  { name: "PHP", icon: "icon-php.svg" },
  { name: "Figma", icon: "icon-figma.svg" },
  { name: "Gradle", icon: "icon-gradle.svg" },
  { name: "Docker", icon: "icon-docker.svg" },
  { name: "Maven", icon: "icon-maven.svg" },
  { name: "Android", icon: "icon-android.svg" },
  { name: "ESLint", icon: "icon-eslint.svg" },
  { name: "BootStrap", icon: "icon-bootstrap.svg" },
  { name: "npm", icon: "icon-npm.svg" },
];

const selectedItem = ref("Vue"); // 기본 선택값
const select = (name) => {
  selectedItem.value = name;
};
</script>
<template>
  <div>
    <div class="category_items">
      <div
        v-for="item in skills"
        :key="item.name"
        class="category_item"
        :class="{ 'is-active': selectedItem === item.name }"
        @click="select(item.name)"
      >
        <img :src="`/skill/${item.icon}`" :alt="item.name" />
        {{ item.name }}
      </div>
    </div>

    <div style="margin-top: 20px">
      <table>
        <colgroup>
          <col style="width: 15%" />
          <col style="width: 50%" />
          <col style="width: 15%" />
          <col style="width: 20%" />
        </colgroup>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>인프라</td>
            <td>
              길디 긴 제목입니다. 하지만 너비를 넘어가면 줄바꿈되거나 잘립니다.
            </td>
            <td>관리자</td>
            <td>2026-02-10</td>
          </tr>
        </tbody>
      </table>
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
</style>
