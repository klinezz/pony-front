<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Menu from "primevue/menu";

const route = useRoute();
const router = useRouter();

// ✅ 현재 활성화된 부모 경로(예: /history)의 자식들을 메뉴 아이템으로 변환
const menuItems = computed(() => {
  // matched 배열에서 현재 섹션의 부모 라우트를 찾습니다.
  // path가 '/history'를 포함하는 노드를 찾아 그 자식들을 가져옵니다.
  const parentRoute = route.matched.find((m) => m.path.includes("/history"));

  if (!parentRoute || !parentRoute.children) return [];

  return parentRoute.children
    .filter((child) => child.path !== "") // 상세 페이지가 아닌 목록들만 필터링 (선택 사항)
    .map((child) => ({
      label: child.meta?.label || child.name,
      icon: child.meta?.icon || "pi pi-circle-fill", // 라우터에 설정된 아이콘 사용
      route: `/history/${child.path}`, // 부모 경로와 결합
    }));
});
</script>

<template>
  <div class="flex justify-center w-full">
    <Menu :model="menuItems" class="w-full border-none">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate, isActive }"
          :to="item.route"
          custom
        >
          <a
            v-ripple
            :href="href"
            v-bind="props.action"
            @click="navigate"
            :class="{ 'active-menu-item': isActive }"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menu>
  </div>
</template>

<style scoped></style>
