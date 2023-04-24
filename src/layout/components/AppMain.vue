<template>
  <section class="app-main">
    <!-- <sidebar v-if="!sidebar.hide" class="sidebar-container" /> -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" v-if="!route.meta.link" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
    <!-- <MicroApp /> -->
    <!-- <iframe-toggle /> -->
  </section>
</template>

<script setup>
import { computed } from 'vue';
// import iframeToggle from './IframeToggle/index';
import useTagsViewStore from '@/store/modules/tagsView';
// import Sidebar from '@/layout/components/Sidebar/index.vue';

// import useAppStore from '@/store/modules/app';
// import MicroApp from '@/micro/MicroApp.vue';
// const sidebar = computed(() => useAppStore().sidebar);
const tagsViewStore = useTagsViewStore();
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  background-color: #fff;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
