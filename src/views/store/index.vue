<template>
  <div class="contentCont">
    <cardList />
    <div class="announcement">
      <GoodsCard :item="item"></GoodsCard>
    </div>
    <img src="@/assets/line1.png" width="1200px" alt="" />

    <img src="@/assets/line2.png" width="1200px" alt="" />

    <img src="@/assets/line3.png" width="1200px" alt="" />

    <img src="@/assets/line4.png" width="1200px" alt="" />
    <!-- //添加购物车 -->
    <el-dialog
      title="加入购物车"
      :visible.sync="dialogAdd"
      width="450px"
      :before-close="cancelAddCart"
      class="pop_con"
    >
      <div class="pop_detail fl_center">
        <div class="pop_element">
          <!-- <div class="list"><span>编号：</span>{{ popCon.code || '--' }}</div> -->
          <div class="list">
            <span
              ><img
                :src="popCon.image || avater"
                alt=""
                style="width: 80px; height: 80px"
            /></span>
            <div class="listHeader">
              {{ popCon.name || "--" }}
              <span>
                {{ popCon.specification || "--" }}
              </span>
              <p class="money">
                ￥{{ listData[activeIndex]?.salePrice ?? "" }}
              </p>
            </div>
          </div>
          <div class="guige">
            <div
              v-for="(item, index) in listData"
              :key="index"
              style="margin-bottom: 10px"
            >
              <span
                :class="activeIndex == index ? 'avtiveChoice' : 'everyOne'"
                @click="choiceBox(index)"
              >
                {{ item.goodsSkuName }}
                <span v-if="activeIndex == index" class="imgChoice">
                  <img src="../../assets/选中.png" alt="" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="dialog-bottom">
          <el-input-number
            v-model="qty"
            size="small"
            :min="listData[activeIndex]?.startWholesale ?? 0"
            :max="listData[activeIndex]?.goodsSkuInventory ?? 0"
            label="描述文字"
          />
          <span style="margin-left: 10px" class="number">{{
            listData[activeIndex]?.goodsSkuUnit ?? ""
          }}</span>
          <span style="margin-left: 10px" class="number">
            数量：{{ listData[activeIndex]?.goodsSkuInventory ?? "" }}
          </span>
        </div>
        <el-button
          size="mini"
          icon="el-icon-shopping-cart-1"
          type="primary"
          @click="confirmAddCart"
        >
          加入购物车</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import cardList from "./components/cardList.vue";
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
  components: { GoodsCard, Pagination, cardList },
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
      item: {
        approvalNumber: " 国药准字Z15021107",
        beSelfSupport: null,
        expireTime: "2026-03-20 00:00:00",
        factory: "内蒙古库伦蒙药有限公司",
        goodsId: "1636677541276205057",
        goodsSkuId: "1638481564199337985",
        goodsSkuInventory: 32210,
        goodsSkuName: null,
        image:
          "https://eshop-develop.oss-cn-hangzhou.aliyuncs.com/goods/966f94f100764519ba21a3b9deb5c331.jpg",
        marketPrice: null,
        name: "清瘟消肿九味丸(内测)",
        producedTime: null,
        salePrice: "0.11",
        salesVolume: 2002,
        shopId: "1606205771220635650",
        shopName: "湖南永正医药有限公司",
        specification: "0.2g*90粒/盒",
        startWholesale: null,
      },
    };
  },
  created() {
    this.shopId = this.getQueryString("shopId");
  },
  mounted() {
    this.getList();
    Bus.$on("searchVal", (res) => {
      this.queryKeyWord = res;
      this.getGoods(this.shopId);
    });
  },
  methods: {
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
      this.getGoods(this.shopId);
      salesTop({ shopId: this.shopId }).then((res) => {
        if (res.code == 0) {
          this.saleTopData = res.data;
        } else {
          this.$message({ type: "warning", message: res.msg });
        }
      });
      getGoodClass({ shopId: this.shopId }).then((res) => {
        if (res.code == 0) {
          res.data.unshift({
            classId: "",
            className: "查看所有药品",
          });
          this.typeData = res.data;
        } else {
          this.$message({ type: "warning", message: res.msg });
        }
      });
      getshopGrades({ shopId: this.shopId }).then((res) => {
        this.gradeData = res ?? {};
      });
    },
    getGoods(shopId) {
      shopGoodlist({
        shopId: shopId,
        goodsClassId: this.goodsClassId,
        queryKeyWord: this.queryKeyWord,
      }).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data;
        } else {
          this.$message({ type: "warning", message: res.msg });
        }
      });
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
  }
}
</style>
