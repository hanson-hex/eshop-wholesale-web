<template>
  <div v-if="img" class="home-line-img" @click="goClick">
    <img :src="`/src/assets/images/${img}`" alt="" />
  </div>
</template>

<script setup lang="ts" name="lineImg">
// import { ref, reactive, onUnmounted, computed } from 'vue';
const props = defineProps({
  img: {
    type: String,
    default: () => '',
  },
});
const emit = defineEmits(['go']);
// {{ props.name }}  {{newName}}
// const newName = computed(() => {
//   return props.img;
// });
function goClick() {
  emit('go');
}
</script>

<style lang="scss" scoped>
.home-line-img {
  margin: 18px 0;
  cursor: pointer;
  img {
    display: block;
    width: 1200px;
    height: 110px;
    border-radius: 4px;
  }
}
</style>
