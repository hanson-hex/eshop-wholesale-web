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
    <div class="course-list">
      <div class="course-item">
        <span class="inex"> 1 </span>
        寻药申请
      </div>
      <div class="gap"></div>
      <div class="course-item">
        <span class="inex"> 2 </span>
        供应商接单
      </div>
      <div class="gap"></div>
      <div class="course-item">
        <span class="inex"> 3 </span>
        支付定金
      </div>
      <div class="gap"></div>
      <div class="course-item">
        <span class="inex"> 4 </span>
        支付补款
      </div>
      <div class="gap"></div>
      <div class="course-item">
        <span class="inex"> 5 </span>
        寻药完成
      </div>
    </div>
    <el-tabs v-model="activeTab" class="flex-1" @tab-change="tabChange">
      <el-tab-pane v-for="item in tabList" :key="item.id" :label="item.title" :name="item.id">
        <div class="findMedicine-status-list">
          <template v-if="tableData.length > 0">
            <GoodsCard v-for="item in tableData" :key="item.id" :item="item"> </GoodsCard>
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>
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

import { useRouter } from 'vue-router';
import PageBanner from '@/components/pageBanner/index.vue';
import GoodsCard from './medicineItem/medicineItem.vue';
import { getJson } from './medicineItem/data.js';
const router = useRouter();

const inputVal = ref<string>('');
const activeTab = ref<string>('apply');
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
  router.push({
    path: '/findMedicine/search',
  });
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
  background-color: #fff;
  .course-list {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 15px;
    .course-item {
      font-size: 16px;
      color: #595959;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        line-height: 32px;
        text-align: center;
        width: 32px;
        height: 32px;
        font-size: 16px;
        border-radius: 16px;
        margin-right: 6px;
        color: #d9d9d9;
        border: 1px solid #d9d9d9;
      }
    }
    .gap {
      width: 50px;
      height: 0px;
      border-bottom: dotted 2px #d9d9d9;

      margin-left: 8px;
      margin-right: 8px;
    }
  }
  .findMedicine-status-list {
    display: grid;
    grid-template-columns: 389px 389px 389px;
    grid-template-rows: 244px auto;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    margin-bottom: 24px;
  }
  :deep(.el-tabs__item) {
    font-size: 16px;
    font-weight: 600;
    color: #595959;
    padding-top: 16px;
    padding-bottom: 16px;
    height: auto;
  }
  :deep(.el-tabs__item.is-active) {
    color: #f5222d;
  }
  :deep(.el-tabs__active-bar) {
    background-color: #f5222d;
    height: 3px;
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
