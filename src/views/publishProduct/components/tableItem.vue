<template>
  <div class="itemCont">
    <div class="itemImg">
      <el-image lazy
                :src="item.image || avater"
                alt=""
                :preview-src-list="item.image?[item.image]:[]"
                style=" width: 180px; height: 180px; padding: 15px 0px" />
    </div>
    <el-tooltip class="item"
                effect="dark"
                :content="item.name"
                placement="top">
      <div class="itemBox name">
        {{ item.name || '' }}
      </div>
    </el-tooltip>
    <el-tooltip class="item"
                effect="dark"
                :content="item.factory"
                placement="top">
      <div class="itemBox factory">
        {{ item.factory || '' }}
      </div>
    </el-tooltip>
    <p class="itemBox factory">
      {{ item.approvalNumber || '' }}
    </p>
    <div class="itemBox factory">
      {{ item.specification || '' }}
    </div>
    <div class="itemBox shopCar">
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="handleAddbuy(item)">
        加入仓库</el-button>
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
      this.$router.push({ path: '/productManage/publishProduct-shopingcart', query: item })
    },
  }

}
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

.itemCont {
  width: 214px;
  height: 325px;
  border: 1px solid #ccc;
  margin: 0 0 8px 8px;
  border-radius: 4px;

  &:hover {
    border: 2px solid;
    border-color: $borderColorActive;
  }

  .factory {
    color: #595959;
    font-size: 14px;
    height: 22px;
  }

  .itemBox {
    padding: 0px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 22px;
    margin: 0;
  }

  .name {
    display: block !important;
    font-size: 16px;
    font-weight: 600;
    padding: 4px 10px;
  }

  .itemImg {
    height: 180px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .price {
    font-weight: 700;
    justify-content: end;
  }

  .shopCar {
    margin-top: 5px;
    justify-content: center;

    .el-button {
      width: 100%;
      padding: 8px 20px;
    }
  }
}

::v-deep .el-button {
  span {
    margin-left: 0px !important;
  }
}
</style>
