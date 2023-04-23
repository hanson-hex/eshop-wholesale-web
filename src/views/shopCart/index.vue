<template>
  <div class="app-container">
    <div class="page-header">
      <div class="logo">
        <img src="@/assets/images/f.png" alt="" />
      </div>
      <div class="header-text">购物车</div>
    </div>
    <div class="shop-cart">
      <div class="shop-cart-header">
        <div class="shop-cart-text">购物车（3）</div>
        <div class="shop-cart-price"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
</script>

<style lang="scss" scoped>
.app-container {
  .shop-cart-header {
    background-color: #cf1422;
    height: 64px;
    .logo {
    }
    .header-text {
    }
  }
}
</style>
