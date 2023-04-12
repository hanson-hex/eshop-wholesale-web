<template>
  <div :class="classObj" class="app-wrapper">
    <div class="topSider">
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
    <div class="headerTopcont">
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
        <div class="loginCard">
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
              <el-button style="width: 100%" size="small" type="primary"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
          <div class="downTip">
            <span>忘记密码</span>
            <span>立即注册</span>
          </div>
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
      <div>超值拼团</div>
      <div>控销专区</div>
      <div>新品首推</div>
      <div>精选热销</div>
      <div>超值拼团</div>
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
    console.log(this.$route.query);
    this.shopId = shopId;
  },
  mounted() {
    this.queryTableData();
    const that = this;
    Bus.$on("test", (res) => {
      that.queryTableData();
    });
  },
  methods: {
    searchBtn() {
      Bus.$emit("searchVal", this.inputVal);
    },
    // 跳到购物车
    goCard() {
      // this.$router.push('/drugprocurement/shoppingcart-shoppingcart')
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
    div {
      padding: 16px;
      cursor: pointer;
      &:hover {
        background: #ff4d4f;
        color: #fff;
      }
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
