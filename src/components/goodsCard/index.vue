<template>
  <div class="itemCont">
    <div class="boxTop">
      <div class="itemImg">
        <el-image :src="item.image ||avater"
                  alt=""
                  lazy
                  :preview-src-list="item.image?[item.image]:[]"
                  style="width: 188px; height: 188px;padding: 10px" />
      </div>
      <div class="rightBox">
        <el-tooltip class="item"
                    effect="dark"
                    :content="item.name"
                    placement="top">
          <div class="itemBox name"
               style="padding-bottom:20px">
            {{ item.name }}
          </div>
        </el-tooltip>
        <el-tooltip class="item"
                    effect="dark"
                    :content="item.specification"
                    placement="top">
          <div class="itemBox factory">
            {{ item.specification }}
          </div>
        </el-tooltip>
        <el-tooltip class="item"
                    effect="dark"
                    :content="item.expireTime.substring(0,10)"
                    placement="top">
          <div class="itemBox factory">
            有效期至：{{ item.expireTime?item.expireTime.substring(0,10):'' }}
          </div>
        </el-tooltip>
        <el-tooltip class="item"
                    effect="dark"
                    :content="item.approvalNumber"
                    placement="top">
          <div class="itemBox factory">
            {{ item.approvalNumber }}
          </div>
        </el-tooltip>
        <el-tooltip class="item"
                    effect="dark"
                    :content="item.factory"
                    placement="top">
          <div class="itemBox factory">
            {{ item.factory }}
          </div>
        </el-tooltip>
        <div class="itemBox"
             style="width:100%;justify-content: space-between;padding-top:10px">
          <div style="width:100%;display:flex;justify-content: space-between;">
            <div class="price"
                 style="color: red;font-size:20px; justify-content:start;color:#F6212D">
              <span style="font-size:12px">
                ￥
              </span>
              {{ item.salePrice }}
            </div>
            <div class="price"
                 style="justify-content:start;font-size:12px;color:#595959;line-height:26px">
              数量：{{ item.goodsSkuInventory }}
            </div>
          </div>
          <div style="justify-content:end" />
        </div>
      </div>
    </div>
    <div class="bottomBox">
      <div>
        <img src="../../assets/shop.png"
             alt=""
             style="width:20px;heihgt:20px;position:relative;top:5px">
        <span class="company">
          {{ item.shopName }}
        </span>
      </div>
      <div>
        <!-- <el-input-number v-model="num" :min="1" :max="10" label="描述文字" @change="handleChange" /> -->
        <el-button type=""
                   size="small"
                   icon="el-icon-shopping-cart-1"
                   style="color:#0DA1A8;background:#e4fffb;border:1px solid #74CFCB"
                   @click="handleAddbuy(item)">
          购物车</el-button>
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
      this.$parent.handleAddbuy(item)
    }
  }

}
</script>
<style lang="scss" scoped>
// .goodsCards {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   padding-top: 24px;
//   align-content: flex-start;
.itemCont {
  // width: 16.1%;
  // min-width: 214px;
  // width: 370px;
  height: 229px;
  border: 1px solid #dcdfe6;
  margin: 0px 10px 10px 0px;
  border-radius: 4px;
  .boxTop {
    display: flex;
    .itemBox {
      width: 170px;
      padding: 3px 10px 3px 0px;
      // display: flex;
      // justify-content: flex-start;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #262626;
    }
  }
  .bottomBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    .company {
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: left;
      color: #8c8c8c;
      position: relative;
    }
  }
  .name {
    display: block !important;
    font-size: 16px;
    font-weight: 600;
  }
  .factory {
    color: #8c8c8c !important;
    font-size: 14px;
  }

  .itemImg {
    height: 180px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .rightBox {
    padding-top: 15px;
  }
  .price {
    font-weight: 700;
    justify-content: end;
    font-size: 12px;
    color: #595959;
  }
  .shopCar {
    justify-content: center;
  }
}
// }
</style>
