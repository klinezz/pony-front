<script setup></script>
<template>
  <div>
    <div class="category_items">
      <div class="category_item">
        <img src="/public/skill/icon-linux.svg" />Linux
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-rockylinux.svg" />Rokcy Linux
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-nginx.svg" />Nginx
      </div>

      <div class="category_item">
        <img src="/public/skill/icon-redhat.svg" />Redhat
      </div>

      <div class="category_item">
        <img src="/public/skill/icon-jenkins.svg" />Jenkins
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-centos.svg" />CentOS
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-debian.svg" />Debian
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-ubuntu.svg" />Ubuntu
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-git.svg" />Git
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-github.svg" />GitHub
      </div>
      <div class="category_item">
        <img src="/public/skill/icon-gitlab.svg" />GitLab
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
}
.category_item img {
  width: 37px;
  height: 37px;
}
</style>
