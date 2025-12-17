<script setup lang="ts">
import { onMounted } from "vue";
import { useInactivity } from "@/utils/useInactivity/useInactivity.ts";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  useInactivity();
});
</script>

<template>
  <main class="main">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <transition name="fade-page" mode="out-in">
          <suspense>
            <component :is="Component" :key="route.fullPath"></component>
          </suspense>
        </transition>
      </template>
    </RouterView>
  </main>
</template>

<style scoped></style>
