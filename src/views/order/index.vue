<template>
  <div class="app-container">
    testa
    <span class="home">{{ title }}</span>
    <svg-icon class-name="custom-fill-svg" icon-class="404" />
    <el-button type="primary">primary</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const title = ref('首页标题');
</script>

<style lang="scss" scoped>
.home {
  color: var(--main-color);
  // background-color: $main-color;
}
</style>
