<template>
  <div class="app-search">
    <page-banner>
      <template #append>
        <div class="app-search-tools">
          <div class="search-box">
            <el-input placeholder="请输入内容" v-model="inputVal" size="large" class="search-el" @keyup.enter="searchBtn">
              <template #prefix>
                <svg-icon class-name="search-ico" icon-class="search" />
              </template>
              <template #append>
                <span class="search-btn" @click="searchBtn">搜索</span>
              </template>
            </el-input>
          </div>
        </div>
      </template>
    </page-banner>
    <page-tabs :tabs-list="tabsList" :tabs-index="tabsIndex" @tabs-change="tabsChange">
      <template #right>
        <div></div>
      </template>
    </page-tabs>
    <div class="main1200">
      <div class="home-zones">
        <goodsItem v-for="li in goodsList2" :key="li.title" :item="li" />
      </div>
      <div class="app-pagination">
        <el-pagination class="app-pagination-center" background layout="prev, pager, next" :total="1000" @current-change="pageChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="goodsDetail">
import PageBanner from '@/components/pageBanner/index.vue';
import pageTabs from '@/components/pageTabs/index.vue';
import goodsItem from '@/components/goodsItem/index.vue';
import { ref, reactive, onUnmounted } from 'vue';
const inputVal = ref('');
function searchBtn() {
  console.log('用户点击搜索按钮');
}
const goodsList2 = reactive([
  { id: '2', title: '盐酸氟桂利嗪胶囊', img: '/src/assets/images/goods-demo1.jpg', salePrice: '4.00' },
  { id: '3', title: '左甲状腺素钠片(优甲乐)', img: '/src/assets/images/goods-demo2.jpg', salePrice: '34.00' },
  { id: '12', title: '中药饮片', img: '/src/assets/images/goods-demo3.jpg', salePrice: '314.00' },
  { id: '24', title: '保健饮品', img: '/src/assets/images/goods-demo4.jpg', salePrice: '340.00' },
  { id: '2', title: '盐酸氟桂利嗪胶囊', img: '/src/assets/images/goods-demo1.jpg', salePrice: '4.00' },
  { id: '3', title: '左甲状腺素钠片(优甲乐)', img: '/src/assets/images/goods-demo2.jpg', salePrice: '34.00' },
  { id: '12', title: '中药饮片', img: '/src/assets/images/goods-demo3.jpg', salePrice: '314.00' },
  { id: '24', title: '保健饮品', img: '/src/assets/images/goods-demo4.jpg', salePrice: '340.00' },
]);
const tabsIndex = ref(0);
const tabsList = reactive([
  { type: '0', name: '全部宝贝', num: 36 },
  { type: '1', name: '降价', num: 12 },
  { type: '2', name: '失效', num: 2 },
]);
function tabsChange(i: number): void {
  if (tabsIndex.value != i) {
    tabsIndex.value = i;
  }
}
function pageChange(page: number): void {
  console.log(page);
}
</script>

<style lang="scss" scoped>
.app-search {
  background-color: #fff;
  &-tools {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.search {
  &-box {
    width: 440px;
    :deep(.el-input__wrapper) {
      box-shadow: initial;
    }
    :deep(.el-input-group__append) {
      width: 92px;
      height: 36px;
      background-color: var(--main-color);
      color: #fff;
      cursor: pointer;
      line-height: 1;
      position: relative;
      top: 2px;
      right: 4px;
      border-radius: 4px;
    }
    :deep(.el-input__wrapper) {
      font-size: 15px;
    }
  }
  &-btn {
    line-height: 1;
    font-size: 16px;
  }
  &-ico {
    font-size: 20px;
    color: #999;
  }
  &-el {
    background-color: #fff;
    border-radius: 4px;
  }
}
.home {
  &-zones {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    :deep(.goods-item) {
      margin-right: 15px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
