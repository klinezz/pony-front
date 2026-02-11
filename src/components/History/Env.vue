<script setup>
import { ref } from "vue";

const infraSkills = [
  { name: "Linux", icon: "icon-linux.svg" },
  { name: "Rocky Linux", icon: "icon-rockylinux.svg" },
  { name: "Nginx", icon: "icon-nginx.svg" },
  { name: "Redhat", icon: "icon-redhat.svg" },
  { name: "Jenkins", icon: "icon-jenkins.svg" },
  { name: "CentOS", icon: "icon-centos.svg" },
  { name: "Debian", icon: "icon-debian.svg" },
  { name: "Ubuntu", icon: "icon-ubuntu.svg" },
  { name: "Git", icon: "icon-git.svg" },
  { name: "GitHub", icon: "icon-github.svg" },
  { name: "GitLab", icon: "icon-gitlab.svg" },
];

const selectedItem = ref("Linux");
const select = (name) => {
  selectedItem.value = name;
};
</script>
<template>
  <div>
    <div class="category_items">
      <div
        v-for="item in infraSkills"
        :key="item.name"
        class="category_item"
        :class="{ 'is-active': selectedItem === item.name }"
        @click="select(item.name)"
      >
        <img :src="`/skill/${item.icon}`" :alt="item.name" />
        {{ item.name }}
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
</style>
