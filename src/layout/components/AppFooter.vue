<template>
  <div class="app-footer">
    <div class="footer-card-box">
      <div class="main1200 footer-card">
        <div v-for="(li, i) in cardLists" :key="i" class="footer-card-li">
          <img :src="`/src/assets/images/${li.img}`" alt="" />
          <div class="footer-card-txt">
            <p class="title">{{ li.title }}</p>
            <!-- <p class="desc">发票保障 满就包邮</p> -->
          </div>
        </div>
      </div>
    </div>

    <div class="footer-info-box">
      <div class="main1200 footer-info">
        <div class="footer-info-left">
          <div v-for="ul in linkLists" :key="ul.title" class="list">
            <div>{{ ul.title }}</div>
            <p v-for="li in ul.children" :key="li.title">{{ li.title }}</p>
          </div>
        </div>
        <div class="footer-info-center">
          <div>
            <span class="label">客服热线：</span>
            <span>400-0505-1111</span>
          </div>
          <div>
            <span class="label">咨询时间：</span>
            <span>8:00-20:00 周一至周日</span>
          </div>
          <div>
            <span class="label">反馈邮箱：</span>
            <span>400-0505-1111</span>
          </div>
        </div>
        <div class="footer-info-right">
          <div v-for="(li, i) in codeLists" :key="i" class="list">
            <img :src="`/src/assets/images/${li.img}`" alt="" />
            <p>{{ li.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-end-box">
      <div class="main1200 footer-end">
        <p>监管机构：国家药品监督管理局 ｜ 营业执照号：91430121MAC3YJQM47 ｜ 药品网络交易第三方平台备案凭证：</p>
        <div class="">
          <p>药品医疗器械网络信息服务备案编号：</p>
          <p>网络食品交易第三方平台备案编号：</p>
          <p>医疗器械网络交易服务第三方平台备案凭证：</p>
        </div>
        <p>ICP备2022016495号-1 ｜ 电信业务经营许可证编号：字B2-20220424 ｜ Copyright湖南春播云药库科技有限公司版权所有</p>
      </div>
    </div>
  </div>
</template>

<script setup name="appFooter">
import { ref, reactive, computed } from 'vue';
// const loginTest = ref<any>()
// const agreement = ref<boolean>(true);
// const signFlag = ref<boolean>(false);
const cardLists = reactive([
  { img: 'footer-card1.png', title: '精耕细作 稳步前行' },
  { img: 'footer-card2.png', title: '专业服务 极致体验' },
  { img: 'footer-card3.png', title: '快速配送 带票销售' },
  { img: 'footer-card4.png', title: '省时 · 省心 · 省力' },
]);

const linkLists = reactive([
  {
    title: '关于我们',
    children: [
      { title: '公司官网', type: 'url', link: '' },
      { title: '公司介绍', type: 'url', link: '' },
      { title: '加入我们', type: 'url', link: '' },
    ],
  },
  {
    title: '联系我们',
    children: [
      { title: '资质指引', type: 'url', link: '' },
      { title: '网站操作流程', type: 'url', link: '' },
      { title: 'APP操作流程', type: 'url', link: '' },
    ],
  },
  {
    title: '联系客服',
    children: [
      { title: '隐私协议', type: 'url', link: '' },
      { title: '服务协议', type: 'url', link: '' },
      { title: '法律声明', type: 'url', link: '' },
    ],
  },
  { title: '合作招聘', children: [{ title: '售后服务', type: 'url', link: '' }] },
]);
const codeLists = reactive([
  { img: 'erweima.png', title: '商城小程序' },
  { img: 'erweima.png', title: '商城小程序' },
  { img: 'erweima.png', title: '商城小程序' },
]);

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
  padding-top: 40px;
  background-color: #fff;
}
.footer {
  &-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-box {
      background: #fff;
      padding: 16px 0;
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
        margin-left: 18px;
      }
    }
  }
  &-end {
    padding: 24px 0px;
    &-box {
      border-top: 1px solid #d9d9d9;
      background-color: #f5f5f5;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: #8c8c8c;
      line-height: 2;
      margin: 0;
      text-align: center;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  &-info {
    display: flex;
    justify-content: space-between;
    &-box {
      background-color: #f2f2f2;
      padding: 24px 0px;
    }
    &-left {
      display: flex;
      justify-content: space-between;
      width: 520px;
      border-right: 1px solid #d9d9d9;
      .list {
        width: 130px;
        p {
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          color: #8c8c8c;
          line-height: 22px;
          margin: 0px;
          cursor: pointer;
          &:hover {
            color: var(--main-color);
          }
        }
        div {
          font-size: 16px;
          font-weight: 400;
          text-align: left;
          color: #262626;
          line-height: 24px;
          margin-bottom: 12px;
        }
      }
    }
    &-center {
      width: 260px;
      div {
        display: flex;
        align-items: center;
        line-height: 30px;
        margin: 0px 0px 8px;
        &:last-child {
          margin-bottom: 0;
        }
        span {
          font-size: 16px;
          font-weight: 400;
          text-align: left;
          color: #262626;
          &:first-child {
            font-size: 14px;
            color: #8c8c8c;
          }
        }
      }
    }
    &-right {
      width: 320px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .list {
        max-width: 84px;
        display: flex;
        align-items: center;
        flex-direction: column;
        img {
          display: block;
          width: 80px;
          height: 80px;
          border: 1px dashed #969798;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: #262626;
          margin: 8px 0;
        }
      }
    }
  }
}
</style>
