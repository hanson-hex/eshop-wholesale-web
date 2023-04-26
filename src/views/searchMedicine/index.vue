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
            </template>
            <template #append>
              <span class="search-btn" @click="searchBtn">我要找药</span>
            </template>
          </el-input>
        </div>
      </div>
    </template>
  </page-banner>
  <div class="main1200">
    <div class="search-list">
      <template v-if="tableData.length > 0">
        <GoodsCard v-for="item in tableData" :key="item.id" :item="item"> </GoodsCard>
      </template>
    </div>
  </div>
  <!-- <div class="noData">
    <img src="@/assets/images/no-Data.png" alt="" />
    <p>
      当前药品库中未找到相关药品，因不可抗力因素影响，不能保障所有需求都能及时满足，全球找药将全力扩展找药品种范围，如有进展将第一时间与您联系，感谢您的等待和支持。
    </p>
    <el-button color="#F5222D">提交申请，帮你找药</el-button>
  </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageBanner from '@/components/pageBanner/index.vue';
import GoodsCard from './searchMedicineItem/index.vue';
import { getJson } from '../findMedicine/medicineItem/data.js';

const inputVal = ref<string>('');
const tableData = ref<Array<any>>([]);

tableData.value = getJson().data;

const tabList = ref([
  {
    title: '我的申请',
    id: 'apply',
  },
  {
    title: '待付定金',
    id: 'deposit',
  },
  {
    title: '补款订单',
    id: 'supplementary',
  },
]);
setTimeout(() => {
  tabList.value = tabList.value.map((item) => {
    return {
      ...item,
      title: item.title + '{}',
    };
  });
}, 1000);

const tabChange = () => {
  console.log('tabChange');
};

const searchBtn = () => {
  console.log('searchBtn');
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
.main1200 {
  position: relative;
  margin-top: 24px;
  background-color: #fff;
  .search-list {
    display: grid;
    grid-template-columns: 212px 212px 212px 212px 212px;
    grid-template-rows: 360px auto;
    grid-column-gap: 32px;
    grid-row-gap: 24px;
    margin-bottom: 24px;
  }
}
.noData {
  margin: 0 auto;
  display: flex;
  min-height: 500px;
  flex-direction: column;
  align-items: center;
  img {
    width: 290px;
    height: 218px;
  }
  p {
    max-width: 440px;
    margin-top: 24px;
    margin-bottom: 32px;
    font-size: 14px;
    color: #8c8c8c;
  }
  :deep(button) {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
