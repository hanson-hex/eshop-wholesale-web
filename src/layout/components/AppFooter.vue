<template>
  <div class="app-footer">
    <div class="footer-card-box">
      <div class="main1200 footer-card">
        <div class="footer-card-li">
          <img src="@/assets/images/footer-card1.png" alt="" />
          <div class="footer-card-txt">
            <p class="title">精耕细作 稳步前行</p>
            <!-- <p class="desc desc1">发票保障 满就包邮</p> -->
          </div>
        </div>
        <div class="footer-card-li">
          <img src="@/assets/images/footer-card2.png" alt="" />
          <div class="footer-card-txt">
            <p class="title">专业服务 极致体验</p>
            <!-- <p class="desc desc1">百万好药 等你来选</p> -->
          </div>
        </div>
        <div class="footer-card-li">
          <img src="@/assets/images/footer-card3.png" alt="" />
          <div class="footer-card-txt">
            <p class="title">快速配送 带票销售</p>
            <!-- <p class="desc desc1">专业物流 准时送达</p> -->
          </div>
        </div>
        <div class="footer-card-li">
          <img src="@/assets/images/footer-card4.png" alt="" />
          <div class="footer-card-txt">
            <p class="title">省时 · 省心 · 省力</p>
            <!-- <p class="desc desc1">一键采购 便捷无忧</p> -->
          </div>
        </div>
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
      <p>监管机构：国家药品监督管理局 ｜ 营业执照号：91430121MAC3YJQM47 ｜ 药品网络交易第三方平台备案凭证：</p>
      <p>药品医疗器械网络信息服务备案编号： 网络食品交易第三方平台备案编号： 医疗器械网络交易服务第三方平台备案凭证：</p>
      <p>ICP备2022016495号-1 ｜ 电信业务经营许可证编号：字B2-20220424 ｜ Copyright湖南春播云药库科技有限公司版权所有</p>
    </div>
  </div>
</template>

<script setup name="appFooter">
import { computed } from 'vue';
// import iframeToggle from './IframeToggle/index';
// import useTagsViewStore from '@/store/modules/tagsView';
// import Sidebar from '@/layout/components/Sidebar/index.vue';

// import useAppStore from '@/store/modules/app';
// import MicroApp from '@/micro/MicroApp.vue';
// const sidebar = computed(() => useAppStore().sidebar);
// const tagsViewStore = useTagsViewStore();
</script>

<style lang="scss" scoped>
.app-footer {
  position: relative;
  margin-top: 40px;
}
.footer-card {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-box {
    background: #fff;
  }
  &-li {
    width: 300px;
    height: 128px;
    padding: 32px 16px;
    display: flex;
    justify-content: start;
    img {
      display: block;
      width: 64px;
      height: 64px;
    }
  }
  &-txt {
    .title {
      font-size: 18px;
      font-weight: 600;
      text-align: left;
      color: #262626;
      line-height: 26px;
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
          box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
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
</style>
