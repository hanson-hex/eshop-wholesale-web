<template>
  <div class="tools-bar-box">
    <div class="main1200 tools-bar">
      <div class="tools-bar-logo" @click="router.push({ path: '/' })">
        <img src="@/assets/images/logo-white.png" alt="" />
      </div>
      <div class="tools-bar-right">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="pageBanner">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style lang="scss" scoped>
.tools-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  &-box {
    background-color: #cf1422;
    min-width: 1200px;
  }
  &-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    img {
      height: 40px;
      width: 148px;
    }
  }
  &-right {
    width: calc(100% - 160px);
  }
}
</style>
