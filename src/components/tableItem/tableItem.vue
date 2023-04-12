<template>
  <div class="itemCont">
    <div class="itemImg">
      <el-image lazy
                :src="item.image || avater"
                alt=""
                :preview-src-list="item.image?[item.image]:[]"
                style=" width: 205px; height: 205px;" />
    </div>
    <el-tooltip class="item"
                effect="dark"
                :content="item.name"
                placement="top">
      <div class="itemBox name">
        {{ item.name || '' }}
      </div>
    </el-tooltip>
    <div class="itemBox factory">
      {{ item.specification || '' }}
    </div>
    <div class="itemBox factory">
      {{ '有效期至：'+item.expireTime?.substring(0,10)??'' }}
    </div>
    <p class="itemBox factory">
      {{ item.approvalNumber || '' }}
    </p>
    <el-tooltip class="item"
                effect="dark"
                :content="item.factory"
                placement="top">
      <div class="itemBox factory">
        {{ item.factory || '' }}
      </div>
    </el-tooltip>

    <div class="itemBox shopCar">
      <p>{{'￥' + item.salePrice??''}}</p>
      <div>
        <el-button type="primary"
                   plain
                   @click="handleAddbuy(item)">加购物车</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import avater from "/public/img/default.png"
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      avater: avater
    }
  },
  methods: {
    handleAddbuy (item) { // 加入购物车
      this.$emit('handleAddbuy', item)
    },
  }

}
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

.itemCont {
  width: 223px;
  // height: 325px;
  // margin: 0 0 8px 8px;
  border-radius: 4px;
  &:hover {
    // border: 2px solid;
    // border-color: $borderColorActive;
    box-shadow: 0px 9px 28px 8px rgba(13, 161, 168, 0.05),
      0px 6px 16px 0px rgba(13, 161, 168, 0.16),
      0px 3px 6px -4px rgba(13, 161, 168, 0.2);
  }

  .factory {
    color: #595959;
    font-size: 14px;
    height: 22px;
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
      color: #f6212d;
      font-size: 24px;
      line-height: 32px;
      margin: 0px;
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
