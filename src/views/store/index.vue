<template>
  <div class="contentCont">
    <cardList />
    <div class="announcement">
      <GoodsCard
        v-for="i in 4"
        :key="i"
        :item="tableData[Number(i) + 2]"
      ></GoodsCard>
      <div class="passAll">
        <p class="title">质量公示</p>
        <p class="desc">·暂停销售 | 甘肃省药品监督管理…</p>
        <p class="desc">·注销 | 重庆市药品监督管理局关…</p>
        <p class="desc">·抽检不合格 | 安徽省药品质量公…</p>
        <p class="desc">·注销 | 关于《药品经营许可证》…</p>
        <p class="desc">·抽检不合格 | 四川省药品监督管…</p>
        <p class="desc">·抽检不合格 | 四川省药品监督管…</p>
        <p class="title">公告</p>
        <p class="desc">·【运营规则】商家发货规则</p>
        <p class="desc">·【运营规则】售后服务及纠纷处理</p>
      </div>
    </div>
    <img src="@/assets/line1.png" width="1200px" alt="" />
    <itemTitle title="超值拼团专区"></itemTitle>
    <div class="announcement1">
      <GoodsCard :item="tableData[1]"></GoodsCard>
      <img src="@/assets/public1.png" width="714px" alt="" />
      <GoodsCard :item="tableData[2]"></GoodsCard>
    </div>
    <div class="announcement1">
      <GoodsCard
        v-for="i in 5"
        :key="i"
        :item="tableData[Number(i) + 5]"
      ></GoodsCard>
    </div>
    <img src="@/assets/line2.png" width="1200px" alt="" />
    <itemTitle title="控销专区"></itemTitle>
    <div class="announcement1">
      <GoodsCard :item="tableData[11]"></GoodsCard>
      <img src="@/assets/public2.png" width="714px" alt="" />
      <GoodsCard :item="tableData[12]"></GoodsCard>
    </div>
    <div class="announcement1">
      <GoodsCard
        v-for="i in 5"
        :key="i"
        :item="tableData[Number(i) + 12]"
      ></GoodsCard>
    </div>
    <img src="@/assets/line3.png" width="1200px" alt="" />
    <itemTitle title="新品首推专区"></itemTitle>
    <div class="announcement1">
      <GoodsCard :item="tableData[17]"></GoodsCard>
      <img src="@/assets/public3.png" width="714px" alt="" />
      <GoodsCard :item="tableData[18]"></GoodsCard>
    </div>
    <div class="announcement1">
      <GoodsCard
        v-for="i in 5"
        :key="i"
        :item="tableData[Number(i) + 18]"
      ></GoodsCard>
    </div>

    <img src="@/assets/line4.png" width="1200px" alt="" />
    <itemTitle title="精选热销"></itemTitle>

    <div class="announcement2">
      <GoodsCard
        v-for="i in 10 * amount"
        :key="i"
        :item="tableData[Number(i) + 23]"
      ></GoodsCard>
    </div>
    <div class="loading" v-if="isLoad">
      <div class="center">
        <img src="@/assets/loading.png" width="32px" height="32px" alt="" />
        <span>加载中...</span>
      </div>
    </div>
    <publicList />
  </div>
</template>
<script>
import cardList from "./components/cardList";
import itemTitle from "./components/itemTitle";
import publicList from "./components/publicList";
import { getJson } from "./components/index";
import GoodsCard from "@/components/tableItem/tableItem.vue";
import Pagination from "@/components/Pagination";
import {
  shopGoodlist,
  salesTop,
  getGoodClass,
  getshopGrades,
} from "@/api/store/index";
import avater from "/public/img/default.png";
import { addCart, clinicSku } from "@/api/drugprocurement/buygoods";
import Bus from "@/utils/bus.js";
export default {
  components: { GoodsCard, Pagination, cardList, itemTitle, publicList },
  data() {
    return {
      page: { total: 20, current: 1, size: 10 },
      pageSizes: [10, 20, 30, 40],
      tableData: [],
      saleTopData: [],
      qty: 0,
      dialogAdd: false,
      popCon: {},
      listData: [],
      avater: avater,
      activeIndex: 0,
      typeData: [],
      typeActive: 0,
      goodsClassId: null,
      queryKeyWord: null,
      gradeData: {},
      shopId: "",
      amount: 1,
      isLoad: false,
    };
  },
  created() {
    this.shopId = "1606205771220635650";
  },
  mounted() {
    console.log(getJson());
    this.tableData = getJson().data;
    // Bus.$on("searchVal", (res) => {
    //   this.queryKeyWord = res;
    // this.getGoods(this.shopId);
    // });
    window.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    handleScroll() {
      const that = this;
      let scrollTop = document.documentElement.scrollTop; //滚动高度
      let clientHeight = document.documentElement.clientHeight; //可视高度
      let scrollHeight = document.documentElement.scrollHeight; //内容高度
      if (
        Number(Number(scrollHeight) - Number(clientHeight)) - 10 <
          Number(scrollTop) &&
        !that.isLoad
      ) {
        that.isLoad = true;
        setTimeout(() => {
          if (Number(Number(this.amount) * 10) + 23 < this.tableData.length) {
            that.amount += 1;
            that.isLoad = false;
          } else {
            that.isLoad = false;
          }
        }, 1000);
      }
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    pageChange() {},
    getList() {
      // this.getGoods(this.shopId);
      // salesTop({ shopId: this.shopId }).then((res) => {
      //   if (res.code == 0) {
      //     this.saleTopData = res.data;
      //   } else {
      //     this.$message({ type: "warning", message: res.msg });
      //   }
      // });
      // getGoodClass({ shopId: this.shopId }).then((res) => {
      //   if (res.code == 0) {
      //     res.data.unshift({
      //       classId: "",
      //       className: "查看所有药品",
      //     });
      //     this.typeData = res.data;
      //   } else {
      //     this.$message({ type: "warning", message: res.msg });
      //   }
      // });
      // getshopGrades({ shopId: this.shopId }).then((res) => {
      //   this.gradeData = res ?? {};
      // });
    },
    getGoods(shopId) {
      // shopGoodlist({
      //   shopId: shopId,
      //   goodsClassId: this.goodsClassId,
      //   queryKeyWord: this.queryKeyWord,
      // }).then((res) => {
      //   if (res.code == 0) {
      // } else {
      //   this.$message({ type: "warning", message: res.msg });
      // }
      // });
    },
    selectBtn(item, index) {
      this.typeActive = index;
      this.goodsClassId = item.classId;
      this.getGoods(this.shopId);
    },
    handleAddbuy(row) {
      this.popCon = row;
      let params = {
        goodsId: row.goodsId,
        shopId: row.shopId,
      };
      clinicSku(params).then((res) => {
        if (res.code == 0) {
          this.dialogAdd = true;
          this.listData = res.data;
          this.qty = this.listData[0]?.startWholesale ?? 0;
        }
      });
    },
    // 选中对应的规格
    choiceBox(index) {
      this.activeIndex = index;
      this.qty = this.listData[index]?.startWholesale ?? 0;
    },
    cancelAddCart() {},
    // 确定添加购物车
    confirmAddCart() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
      });
      let params = {
        goodsSkuId: this.listData[this.activeIndex]?.goodsSkuId ?? 0,
        qty: this.qty,
      };
      addCart(params)
        .then((res) => {
          if (res.code == 0) {
            Bus.$emit("test");
            this.$message.success("添加购物车成功～");
            loading.close();
            this.dialogAdd = false;
            this.qty = 1;
            this.activeIndex = 0;
            // this.popCon.id = ''
          }
        })
        .catch((res) => {
          // console.log(res)
          this.$message.error("提交购物车失败～");
          loading.close();
          this.isDrawer = false;
          this.dialogAdd = false;
          this.qty = 1;
          this.activeIndex = 0;
          // this.popCon.id = ''
        });
    },
    // 取消添加购物车
    cancelAddCart() {
      this.dialogAdd = false;
      this.dialogquikly = false;
      this.qty = 1;
      this.activeIndex = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.contentCont {
  width: 100%;
  .announcement {
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 24px;
    .passAll {
      width: 259px;
      height: 385px;
      border-left: 1px solid #d9d9d9;
      padding: 16px;
      p {
        margin: 0px;
      }
      .title {
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #262626;
        line-height: 24px;
        margin: 8px 0px;
      }
      .desc {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #595959;
        line-height: 22px;
      }
    }
  }
  .announcement1 {
    background: #ffffff;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 24px;
  }
  .announcement2 {
    display: grid;
    grid-template-columns: 212px 212px 212px 212px 212px;
    grid-template-rows: 385px auto;
    grid-column-gap: 32px;
    grid-row-gap: 24px;
    margin-bottom: 24px;
  }
  .loading {
    .center {
      width: 100px;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: left;
      color: #8c8c8c;
      line-height: 24px;
      img {
        animation: rote360 2s linear infinite;
      }

      @keyframes rote360 {
        from {
        }
        to {
          transform: rotateZ(360deg);
        }
      }
    }
  }
}
</style>
