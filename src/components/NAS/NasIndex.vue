<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Menu from "primevue/menu";

const route = useRoute();
const router = useRouter();

// ✅ 현재 활성화된 부모 경로(예: /history)의 자식들을 메뉴 아이템으로 변환
const menuItems = computed(() => {
  // 1. 'history'라는 경로 이름을 가진 정확한 부모 라우트를 찾습니다.
  const parentRoute = route.matched.find((m) => m.path.endsWith("/NAS"));

  if (!parentRoute || !parentRoute.children) return [];

  return parentRoute.children
    .filter((child) => child.meta?.label) // 라벨이 있는 정식 메뉴만 표시
    .map((child) => {
      // 2. 경로가 '/'로 시작하면 절대경로, 아니면 부모와 결합
      const fullPath = child.path.startsWith("/")
        ? child.path
        : `/NAS/${child.path}`;

      return {
        label: child.meta.label,
        icon: child.meta.icon || "pi pi-circle-fill",
        route: fullPath,
      };
    });
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
