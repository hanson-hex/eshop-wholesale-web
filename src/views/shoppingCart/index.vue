<template>
  <div class="app-shopcart">
    <page-banner>
      <template #append>
        <div class="app-shopcart-txt">购物车</div>
      </template>
    </page-banner>
    <div class="main1200">
      <div class="cart-box">
        <div class="cart-head">
          <div class="cart-head-left">购物车(10)</div>
          <div class="cart-head-right">
            <div class="cart-head-desc">已选商品(不含运费)</div>
            <div class="cart-head-price"><span>￥</span>960.00</div>
            <el-button class="cart-head-btn" size="large" type="primary">结&nbsp;算</el-button>
          </div>
        </div>
        <div class="cart-titles">
          <div class="cart-titles-check">
            <el-checkbox v-model="checkAll" :indeterminate="checkAllType" @change="checkAllChange">全选</el-checkbox>
          </div>
          <div class="cart-titles-txt" :style="{ '--width': '480px' }">商品信息</div>
          <div class="cart-titles-txt" :style="{ '--width': '130px' }">单价</div>
          <div class="cart-titles-txt" :style="{ '--width': '160px' }">数量</div>
          <div class="cart-titles-txt" :style="{ '--width': '150px' }">金额</div>
          <div class="cart-titles-txt" :style="{ '--width': '100px' }">操作</div>
        </div>
        <div class="cart-shop-box">
          <div v-for="(ul, i) in goodsList" :key="i" class="cart-shop">
            <div class="cart-shop-info">
              <div class="cart-shop-check">
                <el-checkbox v-model="ul.checkAll" :indeterminate="ul.checkAllType" @change="(val) => checkOneAll(val, i)">全选</el-checkbox>
              </div>
              <div class="cart-shop-name"><span>店铺：</span>{{ ul.name }}</div>
              <div class="cart-shop-cards">card</div>
            </div>
            <div class="cart-goods">
              <el-checkbox-group v-model="ul.checkIds" @change="(val) => checkOne(val, i)">
                <div v-for="(li, j) in ul.goods" :key="j" class="cart-goods-li">
                  <div class="cart-goods-li-check">
                    <el-checkbox :key="li.id" :label="li.id" />
                  </div>
                  <div class="cart-goods-li-img">
                    <img src="/src/assets/images/goods-demo1.jpg" alt="" />
                  </div>
                  <div class="cart-goods-li-info">{{ li.title }}</div>
                  <div class="cart-goods-li-price"></div>
                  <div class="cart-goods-li-num"></div>
                  <div class="cart-goods-li-totalprice"></div>
                  <div class="cart-goods-li-tools"></div>
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="cart-footer">
          <div class="cart-footer-left">
            <div class="cart-footer-check">
              <el-checkbox v-model="checkAll" :indeterminate="checkAllType" @change="checkAllChange">全选</el-checkbox>
            </div>
            <div class="cart-footer-desc footer-btn">删除</div>
            <div class="cart-footer-desc footer-btn">加入收藏夹</div>
          </div>
          <div class="cart-footer-right">
            <div class="cart-footer-desc">已选商品<strong>3</strong>件&nbsp;&nbsp;&nbsp;&nbsp;合计(不含运费)</div>
            <div class="cart-head-price"><span>￥</span>960.00</div>
            <el-button class="cart-head-btn" size="large" type="primary">结&nbsp;算</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="shoppingCart">
import PageBanner from '@/components/pageBanner/index.vue';
import pageTabs from '@/components/pageTabs/index.vue';
import goodsItem from '@/components/goodsItem/index.vue';
import { ref, reactive, onUnmounted } from 'vue';
// const inputVal = ref('');
// const checkedCities = ref(['Shanghai', 'Beijing']);
// const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
const checkAll = ref(false);
const checkAllType = ref(false);
// function searchBtn() {
//   console.log('用户点击搜索按钮');
// }
const goodsList = reactive([
  {
    id: '1',
    name: '湖南得见医药有限公司1',
    checkAll: false,
    checkAllType: false,
    checkIds: [],
    goods: [
      { id: '12', title: '盐酸氟桂利嗪胶囊1', salePrice: '4.00', num: 1, status: '1' },
      { id: '13', title: '左甲状腺素钠片(优甲乐)1', salePrice: '34.00', num: 1, status: '1' },
    ],
  },
  {
    id: '2',
    name: '湖南得见医药有限公司2',
    checkAll: false,
    checkAllType: false,
    goods: [
      { id: '22', title: '盐酸氟桂利嗪胶囊2', salePrice: '4.00', num: 1, status: '2' },
      { id: '23', title: '左甲状腺素钠片(优甲乐)2', salePrice: '34.00', num: 1, status: '1' },
    ],
  },
]);
// const tabsIndex = ref(0);
// const tabsList = reactive([
//   { type: '0', name: '全部宝贝', num: 36 },
//   { type: '1', name: '降价', num: 12 },
//   { type: '2', name: '失效', num: 2 },
// ]);
// function tabsChange(i: number): void {
//   if (tabsIndex.value != i) {
//     tabsIndex.value = i;
//   }
// }
const checkOne = (val: any, i: number) => {
  let goodsEl = goodsList[i];
  goodsEl.checkIds = val;
  goodsEl.checkAll = val.length === goodsEl.goods.length;
  goodsEl.checkAllType = val.length > 0 && val.length < goodsEl.goods.length;
  resetCheckAll();
};
const checkOneAll = (val: any, i: number) => {
  let goodsEl = goodsList[i];
  goodsEl.checkIds = val ? goodsEl.goods.map((li) => li.id) : [];
  goodsEl.checkAll = val;
  goodsEl.checkAllType = false;
  resetCheckAll();
};
const resetCheckAll = () => {
  let isAll = goodsList.map((li) => li.checkAll).indexOf(false);
  let isOne = goodsList.map((li) => li.checkAllType).indexOf(true);
  if (isAll == -1) {
    checkAll.value = true;
    checkAllType.value = false;
  } else {
    checkAll.value = false;
    checkAllType.value = isAll != -1 || isOne != -1;
  }
};
const checkAllChange = (val: any) => {
  checkAll.value = val;
  checkAllType.value = false;
  goodsList.forEach((ul) => {
    ul.checkIds = val ? ul.goods.map((li) => li.id) : [];
    ul.checkAll = val;
    ul.checkAllType = false;
  });
};
// const handleCheckedCitiesChange = (value: any) => {
//   console.log(value);
//   const checkedCount = value.length;
//   checkAll.value = checkedCount === cities.length;
//   checkAllType.value = checkedCount > 0 && checkedCount < cities.length;
// };
</script>

<style lang="scss" scoped>
.app-shopcart {
  &-txt {
    display: flex;
    align-items: center;
    height: 32px;
    position: relative;
    font-size: 24px;
    line-height: 1;
    font-weight: 400;
    color: #fff;
    padding-left: 24px;
    margin-left: 16px;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
  }
}
.cart {
  &-box {
    border-radius: 4px;
    border: 1px solid var(--color-d9);
    margin: 24px 0;
  }
  &-head,
  &-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    &-left {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-26);
      .footer-btn {
        margin-left: 24px;
        cursor: pointer;
        &:hover {
          color: var(--main-color);
        }
      }
    }
    &-right {
      display: flex;
      align-items: center;
    }
    &-desc {
      font-size: 14px;
      font-weight: 400;
      color: var(--color-26);
      strong {
        color: var(--main-color);
        margin: 0 4px;
        font-size: 16px;
      }
    }
    &-price {
      font-size: 24px;
      color: var(--main-color);
      font-weight: 600;
      margin: 0 16px;
      span {
        font-size: 14px;
        font-weight: 400;
      }
    }
    &-btn {
      font-size: 16px;
      // letter-spacing: 6px;
      padding: 12px 15px;
    }
  }
  &-head {
    height: 60px;
    border-bottom: 1px solid var(--color-d9);
  }
  &-footer {
    height: 64px;
    border-top: 1px solid var(--color-d9);
  }
  &-titles {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 40px;
    border-bottom: 1px solid var(--color-f2);
    font-size: 14px;
    color: #8c8c8c;
    &-check {
      width: 160px;
      :deep(.el-checkbox__label) {
        font-size: 14px;
        color: #8c8c8c;
      }
    }
    &-txt {
      width: var(--width);
    }
  }
  &-shop {
    :deep(.el-checkbox__label) {
      display: none;
    }
    &-box {
      padding: 16px;
    }
    &-info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    // &-check {}
    &-name {
      margin-left: 10px;
      font-size: 14px;
      color: var(--color-26);
      span {
        color: var(--color-8c);
      }
    }
    &-cards {
    }
  }
  &-goods {
    &-li {
      display: flex;
      align-items: center;
      border: 1px solid var(--color-f2);
      margin-bottom: 8px;
    }
  }
}
</style>
