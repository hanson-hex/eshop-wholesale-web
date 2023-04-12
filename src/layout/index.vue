<template>
  <div :class="classObj" class="app-wrapper">
    <div class="topSider" v-if="!isScroll">
      <div class="inner">
        <div class="tip">欢迎您来到春播云药库！</div>
        <div class="btnArea">
          <span>首页</span>
          <span>我的订单</span>
          <span>购物车</span>
          <span>收藏夹</span>
          <span>招商入驻</span>
          <span>用户中心</span>
          <span>帮助中心</span>
        </div>
      </div>
    </div>
    <div class="headerTopcont" v-if="!isScroll">
      <div class="topInner">
        <div class="top">
          <div class="imgClass">
            <img
              class="logoImg"
              src="@/assets/logo-chunbo.png"
              width="207px"
              height="56px"
              alt=""
            />
          </div>
          <div class="middle">
            <div class="middleCont">
              <el-input
                placeholder="请输入内容"
                v-model="inputVal"
                class="searchAll"
                @keyup.enter.native="searchBtn"
              >
                <i slot="prefix" class="el-icon-search el-input__icon"></i>
                <template slot="append">
                  <span
                    style="cursor: pointer; font-size: 18px; padding: 0px 11px"
                    @click="searchBtn"
                    >搜索</span
                  >
                </template>
              </el-input>
            </div>
            <div class="middleContDown">
              <span>九和</span>
              <el-divider direction="vertical"></el-divider>
              <span>消痞和胃</span>
              <el-divider direction="vertical"></el-divider>
              <span>思考林</span>
              <el-divider direction="vertical"></el-divider>
              <span>洛弗沙星胶囊</span>
              <el-divider direction="vertical"></el-divider>
              <span>布诺芬</span>
            </div>
          </div>
          <div class="right">
            <img src="@/assets/erweima.png" width="72px" height="72px" alt="" />
            <span>云药库小程序</span>
          </div>
        </div>
        <div class="down">
          <el-button
            type="primary"
            style="
              width: 212px;
              background-color: #f5222d;
              border-color: #f5222d;
            "
          >
            <div
              style="display: flex; align-items: center; justify-content: start"
            >
              <i class="el-icon-s-fold"></i>
              <span style="font-size: 16px">药品分类</span>
            </div>
          </el-button>
        </div>
      </div>
    </div>
    <div class="floatSearch" v-else>
      <div class="inner">
        <div class="imgClass">
          <img
            class="logoImg"
            src="@/assets/logo-chunbo.png"
            width="207px"
            height="56px"
            alt=""
          />
        </div>
        <div class="middle">
          <div class="middleCont">
            <el-input
              placeholder="请输入内容"
              v-model="inputVal"
              class="searchAll"
              @keyup.enter.native="searchBtn"
            >
              <i slot="prefix" class="el-icon-search el-input__icon"></i>
              <template slot="append">
                <span
                  style="cursor: pointer; font-size: 18px; padding: 0px 11px"
                  @click="searchBtn"
                  >搜索</span
                >
              </template>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="loginCont">
      <img src="@/assets/banner.png" height="400px" class="banner" alt="" />
      <div class="loginInner">
        <div class="typeLeft">
          <div>
            <img src="@/assets/1.png" width="32px" height="32px" alt="" />
            <span>中西成药</span>
          </div>
          <div>
            <img src="@/assets/2.png" width="32px" height="32px" alt="" />
            <span>养生中药</span>
          </div>
          <div>
            <img src="@/assets/3.png" width="32px" height="32px" alt="" />
            <span>中药饮片</span>
          </div>
          <div>
            <img src="@/assets/4.png" width="32px" height="32px" alt="" />
            <span>保健食品</span>
          </div>
          <div>
            <img src="@/assets/5.png" width="32px" height="32px" alt="" />
            <span>医疗器械</span>
          </div>
          <div>
            <img src="@/assets/6.png" width="32px" height="32px" alt="" />
            <span>个人护理</span>
          </div>
          <div>
            <img src="@/assets/7.png" width="32px" height="32px" alt="" />
            <span>注射用药</span>
          </div>
          <div>
            <img src="@/assets/8.png" width="32px" height="32px" alt="" />
            <span>普通食品</span>
          </div>
        </div>
        <div class="loginCard" v-if="!islogin">
          <div class="cardHeader">
            <div>账号登陆</div>
          </div>
          <el-form ref="form" :model="form" style="padding-top: 12px">
            <el-form-item>
              <el-input
                prefix-icon="el-icon-user"
                v-model="form.name"
                placeholder="请输入用户名或手机号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                prefix-icon="el-icon-lock"
                v-model="form.name"
                type="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <el-form-item
              style="margin-bottom: 2px !important; margin-top: 6px !important"
            >
              <el-button
                style="width: 100%"
                size="small"
                type="primary"
                @click="islogin = true"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
          <div class="downTip">
            <span>忘记密码</span>
            <span>立即注册</span>
          </div>
        </div>
        <div class="buyerCard" v-else>
          <p class="title">我的待采清单</p>
          <div class="itemCont">
            <div
              class="itemInner"
              v-for="(item, index) in tableData"
              :key="index"
            >
              <el-image :src="item.image"></el-image>
              <div class="itemDesc">
                <p class="title">{{ item.name }}</p>
                <p>{{ item.specification }}</p>
                <p class="price">
                  <span style="font-size: 12px"> ￥ </span>
                  {{ item.salePrice ?? "" }}
                </p>
                <p>销量：{{ item.salesVolume }}</p>
              </div>
            </div>
          </div>
          <el-button type="primary" size="small" style="width: 100%"
            >一键采购</el-button
          >
        </div>
      </div>
    </div>

    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <app-main />
    <div class="floatDiv">
      <div @click="scrollBtn(1000)">超值拼团</div>
      <div @click="scrollBtn(2000)">控销专区</div>
      <div @click="scrollBtn(3000)">新品首推</div>
      <div @click="scrollBtn(4000)">精选热销</div>
      <div @click="scrollBtn(0)">
        <img src="@/assets/top.png" width="32px" height="32px" alt="" />
      </div>
    </div>
    <div class="footer">
      <div class="inner">
        <div class="innerLeft">
          <div class="desc1">
            <div class="cont">
              <p class="title">关于我们</p>
              <p>公司官网</p>
              <p>公司介绍</p>
              <p>加入我们</p>
            </div>
            <div class="cont">
              <p class="title">联系我们</p>
              <p>资质指引</p>
              <p>网站操作流程</p>
              <p>APP操作流程</p>
            </div>
            <div class="cont">
              <p class="title">联系客服</p>
              <p>隐私协议</p>
              <p>服务协议</p>
              <p>法律声明</p>
            </div>
            <div class="cont">
              <p class="title">合作招商</p>
              <p>售后服务</p>
            </div>
          </div>
          <div class="desc2">
            <p>
              <span class="label">客服热线：</span>
              <span>400-0505-1111</span>
            </p>
            <p>
              <span class="label">咨询时间：</span>
              <span>8:00-20:00 周一至周日</span>
            </p>
            <p>
              <span class="label">反馈邮箱：</span>
              <span>400-0505-1111</span>
            </p>
          </div>
        </div>
        <div class="innerRight">
          <div>
            <img src="@/assets/erweima.png" width="80px" height="80px" alt="" />
            商城小程序
          </div>
          <div>
            <img src="@/assets/erweima.png" width="80px" height="80px" alt="" />
            商城小程序
          </div>
          <div>
            <img src="@/assets/erweima.png" width="80px" height="80px" alt="" />
            商城小程序
          </div>
        </div>
      </div>
    </div>
    <div class="footerDown">
      <p>
        监管机构：国家药品监督管理局 ｜ 营业执照号：91430121MAC3YJQM47 ｜
        药品网络交易第三方平台备案凭证：
      </p>
      <p>
        药品医疗器械网络信息服务备案编号： 网络食品交易第三方平台备案编号：
        医疗器械网络交易服务第三方平台备案凭证：
      </p>
      <p>
        ICP备2022016495号-1 ｜ 电信业务经营许可证编号：字B2-20220424 ｜
        Copyright湖南春播云药库科技有限公司版权所有
      </p>
    </div>
  </div>
</template>
<script>
import { AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import variables from "@/styles/variables.scss";
import { mapGetters } from "vuex";
import { getPage } from "@/api/shoppingcart/shoppingcart";
import Bus from "@/utils/bus.js";
export default {
  name: "Layout",
  components: {
    AppMain,
  },
  data() {
    return {
      inputVal: "",
      activeIndex: "/",
      number: 0,
      form: {},
      checked: true,
      islogin: false,
      tableData: [],
      isScroll: false,
      isListener: true,
    };
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
    variables() {
      return variables;
    },
  },
  created() {
    const { shopId } = this.$route.query;
    this.shopId = shopId;
  },
  mounted() {
    this.queryTableData();
    const that = this;
    Bus.$on("test", (res) => {
      that.queryTableData();
    });
    this.tableData = [
      {
        goodsId: "1636677541276205057",
        name: "清瘟消肿九味丸(内测)",
        specification: "0.2g*90粒/盒",
        beSelfSupport: null,
        shopName: "湖南永正医药有限公司",
        shopId: "1606205771220635650",
        image:
          "https://eshop-develop.oss-cn-hangzhou.aliyuncs.com/goods/966f94f100764519ba21a3b9deb5c331.jpg",
        approvalNumber: " 国药准字Z15021107",
        marketPrice: null,
        salePrice: "0.11",
        startWholesale: null,
        factory: "内蒙古库伦蒙药有限公司",
        goodsSkuId: "1638481564199337985",
        goodsSkuName: null,
        goodsSkuInventory: 32210.0,
        producedTime: null,
        expireTime: "2026-03-20 00:00:00",
        salesVolume: 2002,
      },
      {
        goodsId: "1629439755903799314",
        name: "对乙酰氨基酚片",
        specification: "0.5g*24片/盒",
        beSelfSupport: null,
        shopName: "湖南永正医药有限公司",
        shopId: "1606205771220635650",
        image:
          "https://eshop-develop.oss-cn-hangzhou.aliyuncs.com/goods/5272ca0e2215433690bf960c0b410e33.png",
        approvalNumber: "国药准字H12021118",
        marketPrice: null,
        salePrice: "7.50",
        startWholesale: null,
        factory: "中美天津史克制药有限公司",
        goodsSkuId: "1633027555078234123",
        goodsSkuName: null,
        goodsSkuInventory: 940.0,
        producedTime: null,
        expireTime: "2025-11-30 00:00:00",
        salesVolume: 1977,
      },
      {
        goodsId: "1629440003464204324",
        name: "铝碳酸镁咀嚼片",
        specification: "0.5g*24片/盒",
        beSelfSupport: null,
        shopName: "湖南永正医药有限公司",
        shopId: "1606205771220635650",
        image:
          "https://eshop-develop.oss-cn-hangzhou.aliyuncs.com/goods/b815ebc3c5244113933905f05b5bfdb1.png",
        approvalNumber: "国药准字H20074156",
        marketPrice: null,
        salePrice: "4.40",
        startWholesale: null,
        factory: "山东鑫齐药业有限公司",
        goodsSkuId: "1630510381081358344",
        goodsSkuName: null,
        goodsSkuInventory: 740.0,
        producedTime: null,
        expireTime: "2024-10-31 00:00:00",
        salesVolume: 1970,
      },
      {
        goodsId: "1629440322151616545",
        name: "抗病毒口服液",
        specification: "10ml*12支/盒",
        beSelfSupport: null,
        shopName: "湖南永正医药有限公司",
        shopId: "1606205771220635650",
        image:
          "https://eshop-develop.oss-cn-hangzhou.aliyuncs.com/goods/e7e6f20d14eb45e6bdc7a689d073642e.png",
        approvalNumber: "国药准字Z19994091",
        marketPrice: null,
        salePrice: "31.00",
        startWholesale: null,
        factory: "江苏聚荣制药集团有限公司",
        goodsSkuId: "1630507520654110728",
        goodsSkuName: null,
        goodsSkuInventory: 642.0,
        producedTime: null,
        expireTime: "2024-12-08 00:00:00",
        salesVolume: 1946,
      },
      {
        goodsId: "1629440109169053753",
        name: "盐酸雷尼替丁胶囊",
        specification: "0.15g*30片/盒",
        beSelfSupport: null,
        shopName: "湖南永正医药有限公司",
        shopId: "1606205771220635650",
        image:
          "https://eshop-develop.oss-cn-hangzhou.aliyuncs.com/goods/54d387bdc2284441980e1cf3551b70be.png",
        approvalNumber: "国药准字H32025308",
        marketPrice: null,
        salePrice: "5.00",
        startWholesale: null,
        factory: "苏州弘森药业股份有限公司",
        goodsSkuId: "1633027555111788566",
        goodsSkuName: null,
        goodsSkuInventory: 593.0,
        producedTime: null,
        expireTime: "2024-04-30 00:00:00",
        salesVolume: 1940,
      },
      {
        goodsId: "1629440583142182978",
        name: "肤痒颗粒",
        specification: "9g*10袋/盒",
        beSelfSupport: null,
        shopName: "湖南永正医药有限公司",
        shopId: "1606205771220635650",
        image:
          "https://eshop-develop.oss-cn-hangzhou.aliyuncs.com/goods/2ac4e23e15a74d1eb9494097eec1aed7.jpg",
        approvalNumber: "国药准字Z51021175",
        marketPrice: null,
        salePrice: "8.80",
        startWholesale: null,
        factory: "四川升和药业股份有限公司",
        goodsSkuId: "1633027555132760085",
        goodsSkuName: null,
        goodsSkuInventory: 577.0,
        producedTime: null,
        expireTime: "2024-09-30 00:00:00",
        salesVolume: 1936,
      },
      {
        goodsId: "1629440403219124272",
        name: "藿香清胃胶囊",
        specification: "0.32g*24粒/盒",
        beSelfSupport: null,
        shopName: "湖南永正医药有限公司",
        shopId: "1606205771220635650",
        image:
          "https://eshop-develop.oss-cn-hangzhou.aliyuncs.com/goods/3fd7c4c858d74f0eb374e521c2a4d265.png",
        approvalNumber: "国药准字Z20060148",
        marketPrice: null,
        salePrice: "5.80",
        startWholesale: null,
        factory: "吉林省俊宏药业有限公司",
        goodsSkuId: "1633027555136954388",
        goodsSkuName: null,
        goodsSkuInventory: 12.0,
        producedTime: null,
        expireTime: "2025-09-30 00:00:00",
        salesVolume: 1910,
      },
      {
        goodsId: "1629439755601809447",
        name: "乙酰螺旋霉素片",
        specification: "0.1g*24粒/盒",
        beSelfSupport: null,
        shopName: "湖南永正医药有限公司",
        shopId: "1606205771220635650",
        image:
          "https://eshop-develop.oss-cn-hangzhou.aliyuncs.com/goods/85282aa8258f4084a41155eb5fd00276.png",
        approvalNumber: "国药准字H11020337",
        marketPrice: null,
        salePrice: "2.70",
        startWholesale: null,
        factory: "北京京丰制药集团有限公司",
        goodsSkuId: "1630483608176226335",
        goodsSkuName: null,
        goodsSkuInventory: 988.0,
        producedTime: null,
        expireTime: "2024-04-06 00:00:00",
        salesVolume: 1897,
      },
      {
        goodsId: "1629440187665453101",
        name: "醋酸泼尼松片",
        specification: "5mg*100片/瓶",
        beSelfSupport: null,
        shopName: "湖南永正医药有限公司",
        shopId: "1606205771220635650",
        image:
          "https://eshop-develop.oss-cn-hangzhou.aliyuncs.com/goods/8de07521a3fd40fbb866f387a8649558.jpg",
        approvalNumber: "国药准字H42021526",
        marketPrice: null,
        salePrice: "5.50",
        startWholesale: null,
        factory: "华中药业股份有限公司",
        goodsSkuId: "1633027555086622741",
        goodsSkuName: null,
        goodsSkuInventory: 255.0,
        producedTime: null,
        expireTime: "2025-03-31 00:00:00",
        salesVolume: 1864,
      },
      {
        goodsId: "1629440455232688143",
        name: "香丹注射液",
        specification: "10ml*5瓶/1瓶",
        beSelfSupport: null,
        shopName: "湖南永正医药有限公司",
        shopId: "1606205771220635650",
        image: null,
        approvalNumber: "国药准字Z22022558",
        marketPrice: null,
        salePrice: "9.80",
        startWholesale: null,
        factory: "吉林省集安益盛药业股份有限公司",
        goodsSkuId: "1630499193245200384",
        goodsSkuName: null,
        goodsSkuInventory: 45.0,
        producedTime: null,
        expireTime: "2025-06-30 00:00:00",
        salesVolume: 1855,
      },
    ];
    window.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    scrollBtn(val) {
      document.documentElement.scrollTop = val;
    },
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop; //滚动高度
      if (Number(scrollTop) > 200 && this.isListener) {
        this.isScroll = true;
        this.isListener = false;
      } else if (Number(scrollTop) <= 200 && !this.isListener) {
        this.isScroll = false;
        this.isListener = true;
      }
    },
    searchBtn() {
      Bus.$emit("searchVal", this.inputVal);
    },
    // 跳到购物车
    goCard() {
      location.href =
        "https://www.cbyyk.com/#/drugprocurement/shoppingcart-shoppingcart";
    },
    handleMenu(val) {
      console.log(val);
      this.activeIndex = val;
      let query = { shopId: this.shopId };
      this.$router.push({ path: val, query });
    },
    handleSelect() {},
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`);
    },
    async goInfo() {
      // await this.$store.dispatch('user/logout')
      this.$router.push(`/user/info`);
    },
    // 查询上方购物车的数量
    queryTableData() {
      getPage()
        .then((res) => {
          this.number = res.data?.cartVos?.length ?? 0; //es5=>es6=>es12
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .topSider {
    width: 100%;
    height: 32px;
    .inner {
      width: 1200px;
      height: 32px;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tip {
        font-size: 12px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #595959;
        line-height: 20px;
      }
      .btnArea {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #595959;
        line-height: 22px;
        span {
          margin-left: 24px;
          cursor: pointer;
        }
      }
    }
  }
  .floatDiv {
    position: fixed;
    width: 66px;
    height: 322px;
    border-radius: 4px;
    top: 50%;
    left: 0px;
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #595959;
    line-height: 16px;
    border: 1px solid #d9d9d9;
    overflow: hidden;
    background-color: #fff;
    div {
      padding: 16px;
      cursor: pointer;
      &:hover {
        background: #ff4d4f;
        color: #fff;
      }
    }
  }
  .footer {
    background-color: #f2f2f2;
    padding: 24px 0px;
    .inner {
      width: 1200px;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      .innerLeft {
        display: flex;
        justify-content: space-between;
        width: 852px;

        .desc1 {
          width: 70%;
          display: flex;
          justify-content: space-between;
          border-right: 1px solid #d9d9d9;
          div {
            width: 130px;
          }
          .cont {
            p {
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #8c8c8c;
              line-height: 22px;
              margin: 0px;
              cursor: pointer;
            }
            .title {
              font-size: 16px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #262626;
              line-height: 24px;
              margin-bottom: 12px;
            }
          }
        }
        .desc2 {
          width: 100%;
          padding-left: 48px;
          p {
            margin: 0px 0px 12px;
            cursor: pointer;
            .label {
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #8c8c8c;
              line-height: 22px;
            }
            span {
              font-size: 16px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: left;
              color: #262626;
              line-height: 24px;
            }
          }
          // div {
          //   width: 25%;
          // }
        }
      }

      .innerRight {
        width: 348px;
        display: flex;
        justify-content: start;
        align-items: center;
        div {
          width: 80px;
          margin-left: 36px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: center;
          color: #262626;
        }
      }
    }
  }
  .footerDown {
    border-top: 1px solid #d9d9d9;
    background-color: #f2f2f2;
    padding: 24px 0px;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #8c8c8c;
    line-height: 28px;
    p {
      margin: 0px;
    }
  }
  .headerTopcont {
    height: 178px;
    background: #fff;
    border-bottom: 2px solid #f5222d;
    .topInner {
      width: 1200px;
      margin: 0 auto;
      .top {
        display: flex;
        justify-content: space-between;
        padding-top: 24px;
        .imgClass {
          width: 360px;
          margin-top: 8px;
        }
        .middle {
          padding-top: 12px;
          .middleCont {
            box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
              0px 6px 16px 0px rgba(0, 0, 0, 0.08),
              0px 3px 6px -4px rgba(0, 0, 0, 0.12);
          }
          .middleContDown {
            padding-top: 8px;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: #595959;
            line-height: 22px;
            span {
              cursor: pointer;
            }
          }
        }
        // .logoImg {
        //   margin: 0px 16px;
        // }
        // .dosce {
        //   margin: 16px 0px 17px;
        // }
        .right {
          width: 97px;
          margin-left: 197px;

          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: center;
          color: #595959;
        }
      }
      .down {
        width: 100%;
        height: 40px;
        display: flex;
        margin-top: 22px;
        justify-content: start;
        .menu {
          font-weight: 600;
          font-size: 16px;
          color: #262626;
          margin-left: 48px;
        }
        .active {
          color: #0da1a8;
        }
        // background: #0da1a8;
      }
    }
  }
  .floatSearch {
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
      0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
    .inner {
      width: 1200px;
      height: 64px;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .loginCont {
    width: 100%;
    height: 400px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .loginInner {
      position: absolute;
      width: 1200px;
      height: 400px;
      display: flex;
      justify-content: space-between;

      .typeLeft {
        width: 212px;
        background: #ffffff;
        box-shadow: 0px 5px 12px 4px rgba(0, 0, 0, 0.09),
          0px 3px 6px 0px rgba(0, 0, 0, 0.12),
          0px 1px 2px -2px rgba(0, 0, 0, 0.16);
        div {
          height: 50px;
          padding: 9px 16px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #262626;
          line-height: 22px;
          display: flex;
          justify-content: start;
          align-items: center;
          cursor: pointer;
          img {
            margin-right: 8px;
          }
          &:hover {
            background-color: #fff2f1;
          }
        }
      }
      .loginCard {
        width: 264px;
        height: 276px;
        padding: 16px;
        margin-top: 48px;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 5px 12px 4px rgba(0, 0, 0, 0.09),
          0px 3px 6px 0px rgba(0, 0, 0, 0.12),
          0px 1px 2px -2px rgba(0, 0, 0, 0.16);
        .cardHeader {
          width: 100%;

          div {
            width: 50%;
            height: 40px;
            font-size: 16px;
            text-align: center;
            font-family: PingFang SC, PingFang SC-Semibold;
            font-weight: 600;
            color: #f6212d;
            line-height: 24px;
            border-bottom: 3px solid #ff4d4f;
            border-bottom-left-radius: 2px;
            border-bottom-right-radius: 2px;
          }
        }
        .downTip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #595959;
          line-height: 22px;
        }
      }
      .buyerCard {
        width: 264px;
        height: 400px;
        padding: 16px;
        background: #ffffff;
        box-shadow: 0px 5px 12px 4px rgba(0, 0, 0, 0.09),
          0px 3px 6px 0px rgba(0, 0, 0, 0.12),
          0px 1px 2px -2px rgba(0, 0, 0, 0.16);
        .title {
          margin: 0px;
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #262626;
          line-height: 24px;
        }
        .itemCont {
          padding: 16px 8px;
          width: 100%;
          // height: calc(100vh - 747px);
          height: 290px;
          overflow-y: auto;
          margin-top: 12px;
          margin-bottom: 16px; // &::-webkit-scrollbar {
          //   display: none; /* Chrome Safari */
          // }
          .itemInner {
            display: flex;
            justify-content: space-between;
            margin-bottom: 16px;
            .el-image {
              width: 80px;
              height: 80px;
            }
            .itemDesc {
              width: calc(100% - 88px);
              p {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                font-size: 12px;
                line-height: 20px;
                color: #595959;
              }
              .title {
                font-weight: 600;
                font-size: 14px;
                line-height: 22px;
                color: #262626;
              }
              .price {
                color: #f6212d;
                font-weight: 600;
                font-size: 14px;
                line-height: 22px;
              }
            }
          }
          p {
            margin: 0px;
          }
        }
      }
    }
    // .banner {
    //   width: 100vw;
    //   height: 20.833vw;
    // }
    // backface-visibility: ;
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 48px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          color: #fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
        .downIcon {
          cursor: pointer;
          color: #fff;
        }
      }
    }
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
