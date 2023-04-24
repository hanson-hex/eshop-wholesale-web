<template>
  <div class="page-header">
    <div class="main1200">
      <div class="logo">
        <img src="@/assets/images/logo-chunbo-white.png" alt="" />
      </div>
      <slot name="append"></slot>
      <!-- <div class="right-part">
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.page-header {
  background-color: #cf1422;
  height: 64px;
  display: flex;
  justify-content: center;
  .main1200 {
    display: flex;
    justify-content: space-between;
    .logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        height: 40px;
        width: 180px;
      }
      .logo-title {
        font-weight: 600;
        font-size: 24px;
        color: #fff;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        padding-left: 24px;
        margin-left: 20px;
      }
    }
    .right-part {
    }
  }
}
</style>
