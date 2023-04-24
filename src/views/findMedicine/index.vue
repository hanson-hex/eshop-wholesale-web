<template>
  <page-banner>
    <template #append>
      <div class="banner-container">
        <div class="logo-title">
          <span> 全球找药 </span>
          <img src="@/assets/images/biaoyu.png" alt="" />
        </div>
        <div class="search-part">
          <el-input placeholder="请输入内容" v-model="inputVal" class="searchAll" @keyup.enter="searchBtn">
            <template #prefix>
              <Search class="search-icon" />
              <!-- <svg-icon class-name="el-icon-search el-input__icon" icon-class="404" /> -->
              <!-- <i class="el-icon-search el-input__icon"></i> -->
            </template>
            <template #append>
              <span class="search-btn" @click="searchBtn">我要找药</span>
            </template>
          </el-input>
        </div>
      </div>
    </template>
  </page-banner>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageBanner from '@/components/pageBanner/index.vue';

const inputVal = ref<string>('');

const searchBtn = () => {
};
</script>

<style lang="scss" scoped>
.banner-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .logo-title {
    font-weight: 600;
    font-size: 24px;
    color: #fff;
    display: flex;
    align-items: center;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    padding-left: 24px;
    margin-left: 20px;
    img {
      height: 14px;
      margin-left: 10px;
    }
  }
  .search-part {
    display: flex;
    // justify-content: ;
    align-items: center;
    .el-input {
      height: 42px;
      width: 440px;
      :deep(.el-input__wrapper) {
        box-shadow: none !important;
      }
      :deep(.el-input__wrapper.is_focus) {
        box-shadow: none !important;
      }
      :deep(.el-input__wrapper:hover) {
        box-shadow: none;
      }
      :deep(.el-input-group__append) {
        box-shadow: none;
        padding-right: 10px;
        background-color: #fff;
      }
    }
    .search-icon {
      width: 1em;
      height: 1em;
      margin-right: 8px;
    }
    .search-btn {
      cursor: pointer;
      font-size: 18px;
      padding: 2px 15px;
      background: #f5222d;
      border-radius: 4px;
      color: #fff;
    }
  }
}
</style>
