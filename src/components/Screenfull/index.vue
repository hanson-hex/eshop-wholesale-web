<template>
  <div>
    <svg-icon class="screenfull-svg" :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggle" />
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core';

const { isFullscreen, enter, exit, toggle } = useFullscreen();
</script>

<style lang="scss" scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #ffffff;
  width: 0.8em;
  height: 0.8em;
  top: -2px;
  position: relative;
}
</style>
