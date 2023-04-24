<template>
  <div class="itemCont">
    <div class="itemImg">
      <el-image lazy :src="item.image || avater" alt="" :preview-src-list="item.image ? [item.image] : []" style="width: 205px; height: 205px" />
    </div>
    <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
      <div class="itemBox name">
        {{ item.name || '' }}
      </div>
    </el-tooltip>
    <div class="itemBox factory">
      {{ item.specification || '' }}
    </div>

    <el-tooltip class="item" effect="dark" :content="item.factory" placement="top">
      <div class="itemBox factory">
        {{ item.factory || '' }}
      </div>
    </el-tooltip>

    <div class="itemBox shopCar">
      <p>{{ '￥' + item.salePrice || '' }}</p>
      <!-- <div>
        <el-button type="primary" plain @click="handleAddbuy(item)"
          >加购物车</el-button
        >
      </div> -->
    </div>
    <div class="itemBox shopName">
      <img src="@/assets/shopName.png" width="20px" height="20px" alt="" />
      {{ item.shopName }}
    </div>
  </div>
</template>
<script>
import avater from '/public/img/default.png';
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      avater: avater,
    };
  },
  methods: {
    handleAddbuy(item) {
      // 加入购物车
      this.$emit('handleAddbuy', item);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';

.itemCont {
  width: 223px;
  // height: 325px;
  // margin: 0 0 8px 8px;
  border-radius: 4px;
  padding-bottom: 8px;
  border: 1px solid #fff;
  &:hover {
    border: 1px solid #ff4d50;
    border-radius: 4px;
    box-shadow: 0px 6px 10px 0px rgba(255, 77, 80, 0.2), 0px 3px 4px -5px rgba(255, 77, 80, 0.5);
  }

  .factory {
    color: #595959;
    font-size: 14px;
    height: 22px;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #595959;
    line-height: 22px;
  }

  .itemBox {
    padding: 0px 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 22px;
    margin: 0;
    font-size: 14px;
    color: #595959;
  }

  .name {
    display: block !important;
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    padding: 4px 10px;
    color: #262626;
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #262626;
    line-height: 24px;
    margin-bottom: 8px;
  }
  .shopName {
    display: flex;
    justify-content: start;
    align-items: center;
    img {
      margin-right: 8px;
    }
  }

  .itemImg {
    width: 100%;
    padding: 8px;
    display: flex;
    justify-content: center;
  }

  .price {
    font-weight: 700;
    justify-content: end;
  }

  .shopCar {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    p {
      margin: 0px;
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #f6212d;
      line-height: 32px;
    }
    .el-button {
      padding: 8px 12px;
    }
  }
}

::v-deep .el-button {
  span {
    margin-left: 0px !important;
  }
}
</style>
