<template>
  <div class="tabs">
    <div class="tab-item" :class="{ active: activeTab == 1 }" v-for="(title, index) in tabList" v-bind:key="title" @click="itemClick(index)"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: () => {
      return '';
    },
  },
});

// 2、定义发射给父组件的方法
const emits = defineEmits(['add1', 'decre1']);

const itemClick = (index: number) => {
  console.log('index', index);
};
</script>

<style lang="scss" scoped></style>
