<template>
  <div class="home-title">
    <h3>{{ title }}</h3>
  </div>
</template>

<script setup lang="ts" name="homeTitle">
// import { ref, reactive, onUnmounted, computed } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
});
</script>

<style lang="scss" scoped>
.home-title {
  border-bottom: 2px solid var(--color-d9);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-26);
    line-height: 1;
    margin: 0;
    &::before {
      content: '';
      width: 5px;
      height: 20px;
      background: #f5222d;
      border-radius: 3px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}
</style>
