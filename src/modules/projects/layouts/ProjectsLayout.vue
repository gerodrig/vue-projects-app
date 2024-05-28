<template>
  <div class="flex flex-col">
    <!-- //Top Menu -->
    <top-menu />

    <main class="flex flex-row">
      <!-- Side Menu -->
      <side-menu />

      <!-- Router View -->
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '@/modules/projects/components/SideMenu.vue';
</script>
