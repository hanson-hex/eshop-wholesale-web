<template>
  <div class="goods-item" :style="{ '--width': width }">
    <div class="goods-item-img">
      <el-image class="goods-item-img-el" lazy :src="item.img" alt="" :preview-src-list="item.img ? [item.img] : []" />
    </div>
    <div class="goods-item-info">
      <el-tooltip effect="dark" :content="item.title" placement="top" :show-after="500">
        <div class="goods-item-title over_h">{{ item.title || '' }}</div>
      </el-tooltip>
      <div class="goods-item-desc">5mg*60粒/盒</div>
      <el-tooltip effect="dark" content="国药集团致君(深圳)坪山制药有限公司" placement="top" :show-after="500">
        <div class="goods-item-desc over_h">国药集团致君(深圳)坪山制药有限公司</div>
      </el-tooltip>
      <div class="goods-item-price"><span>￥</span>{{ item.salePrice || '' }}</div>
      <div class="goods-item-desc">
        <svg-icon class="goods-item-ico" icon-class="shop-chat" />
        <span>永正医药有限公司</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="goodsItem">
import { ref, reactive, onUnmounted, computed } from 'vue';
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      ('');
    },
  },
  width: {
    type: String,
    default: '228px',
  },
});
function searchBtn() {
  console.log('用户点击搜索按钮');
}
</script>

<style lang="scss" scoped>
.goods-item {
  width: var(--width);
  border-radius: 4px;
  padding-bottom: 8px;
  border: 1px solid #fff;
  height: 386px;
  &:hover {
    border: 1px solid #ff4d50;
    border-radius: 4px;
    box-shadow: 0px 6px 10px 0px rgba(255, 77, 80, 0.2), 0px 3px 4px -5px rgba(255, 77, 80, 0.5);
  }
  &-img {
    width: 100%;
    padding: 8px 0;
    display: flex;
    justify-content: center;
    &-el {
      width: 210px;
      height: 210px;
    }
  }
  &-info {
    padding: 0 8px;
  }
  &-title {
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: var(--color-29);
    margin-bottom: 8px;
  }
  &-desc {
    line-height: 1.5;
    margin: 0 8px 0 0;
    font-size: 14px;
    color: var(--color-59);
    text-align: left;
  }
  &-ico {
    display: inline-block;
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
  &-price {
    padding: 8px 0;
    font-size: 24px;
    text-align: left;
    color: #f6212d;
    line-height: 1.5;
    font-weight: 600;
    span {
      font-size: 16px;
    }
  }
}
</style>
