<template>
  <div class="page-header">
    <div class="logo">
      <img src="@/assets/images/logo-chunbo.png" alt="" />
    </div>
    <div class="right-part">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.page-header {
  background-color: #cf1422;
  height: 64px;
  .logo {
  }
  .header-text {
  }
}
</style>
