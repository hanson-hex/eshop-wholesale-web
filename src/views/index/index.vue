<template>
  <div class="app-home">
    <home-search name="testsss" />
    <home-menus />
    <div class="home-banner-box">
      <div class="home-banner">
        <img src="/src/assets/images/banner-demo.jpg" alt="" />
      </div>
      <div class="main1200 banner-mask">
        <div class="banner-mask-left">
          <div v-for="li in bannerMaskList" :key="li.title" class="banner-mask-left-li">
            <img :src="`/src/assets/images/${li.img}`" alt="" />
            <p>{{ li.title }}</p>
          </div>
        </div>
        <div class="banner-mask-right">
          <div v-if="!isLogin" class="banner-login">
            <div class="banner-login-title">账号登录</div>
            <div class="banner-login-form">
              <el-form :model="form">
                <el-form-item>
                  <el-input size="large" v-model="form.name" placeholder="请输入用户名或手机号">
                    <template #prefix>
                      <el-icon class="el-input__icon" size="16"><user /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input size="large" type="password" v-model="form.password" placeholder="请输入密码">
                    <template #prefix>
                      <el-icon class="el-input__icon" size="16"><lock /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox label="记住密码" name="type" />
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                  <el-button class="banner-login-btn" type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="banner-login-more">
              <p>忘记密码？</p>
              <p class="act">立即注册</p>
            </div>
          </div>
          <div v-if="isLogin" class="banner-buys">
            <div class="banner-buys-title">我的待采清单</div>
            <div class="banner-buys-list cb-scroll" v-infinite-scroll="buysLoadMore">
              <div v-for="li in buysList" :key="li.title" class="banner-buys-good">
                <div class="banner-buys-good-img">
                  <img :src="`/src/assets/images/${li.img}`" alt="" />
                </div>
                <div class="banner-buys-good-main">
                  <div class="banner-buys-good-title over_h">{{ li.title }}</div>
                  <div class="banner-buys-good-desc over_h">5mg*60粒/1盒</div>
                  <div class="banner-buys-good-price">￥3.96</div>
                </div>
              </div>
            </div>
            <div class="banner-buys-btn">
              <el-button class="banner-login-btn" type="primary">一键加购</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main1200">
      <div class="home-types">
        <div v-for="(li, i) in typesList" :key="li.title" @click="enter(i)" class="home-types-li" :class="`type${i + 1}`">
          <div class="home-types-li-txt">
            <div>{{ li.title }}</div>
            <p>{{ li.desc }}</p>
          </div>
          <img :src="`/src/assets/images/${li.img}`" alt="" />
        </div>
      </div>
      <div class="home-one-box">
        <div class="home-one">
          <goodsItem v-for="li in goodsList" :key="li.title" :item="li" width="235px" />
        </div>
        <div class="home-news">
          <div class="home-news-title">质量公示</div>
          <div class="home-news-list cb-scroll">
            <p v-for="li in 8" :key="li" class="over_h">药品质量公示药品质量公示药品质量公示药品质量公示</p>
          </div>
          <div class="home-news-title">公告</div>
          <div class="home-news-list cb-scroll">
            <p v-for="li in 8" :key="li" class="over_h">药品质量公示药品质量公示药品质量公示药品质量公示</p>
          </div>
        </div>
      </div>
      <line-img img="line1.jpg" @go="lineClick('abc')" />
      <home-title title="超值拼团社区" />
      <div class="home-zone">
        <div class="home-zone-good zone-left">
          <goodsItem key="zone11" :item="goodsList[0]" />
        </div>
        <div class="home-zone-banner">
          <img src="@/assets/images/public1.jpg" alt="" />
        </div>
        <div class="home-zone-good zone-right">
          <goodsItem key="zone12" :item="goodsList[1]" />
        </div>
      </div>
      <div class="home-zones">
        <goodsItem v-for="li in goodsList2" :key="li.title" :item="li" />
      </div>
      <home-title title="热销商品" />
      <div class="home-zones">
        <goodsItem v-for="li in goodsList2" :key="li.title" :item="li" />
      </div>
      <div v-if="isLoad" class="home-hot-more">
        <div class="home-hot-more-load"></div>
        <div class="home-hot-more-txt">加载中</div>
      </div>
    </div>
    <div class="sider-box" v-if="siderShow">
      <!-- <a href="#abcd">测试按钮</a> -->
      <!-- <div @click="scrollToId('abcd')">测试<br />按钮</div> -->
      <div @click="scrollBtn(1000)">超值<br />拼团</div>
      <div @click="scrollBtn(2000)">控销<br />专区</div>
      <div @click="scrollBtn(3000)">新品<br />首推</div>
      <div @click="scrollBtn(4000)">精选<br />热销</div>
      <div class="sider-box-img" @click="scrollBtn(0)">
        <svg-icon class-name="sider-box-ico" icon-class="top" />
      </div>
    </div>
    <!-- <svg-icon class-name="custom-fill-svg" icon-class="404" color="#0f0" /> -->
    <!-- <el-button type="primary">primary</el-button> -->
    <!-- <router-link to="/order/index">我的订单</router-link> -->
  </div>
</template>

<script setup lang="ts" name="homeIndex">
import homeSearch from '@/components/homeSearch/index.vue';
import homeMenus from '@/components/homeMenus/index.vue';
import lineImg from '@/components/lineImg/index.vue';
import homeTitle from '@/components/homeTitle/index.vue';
import goodsItem from '@/components/goodsItem/index.vue';
import { ref, reactive, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { getUserDetail } from '@/api/user';
import { ElMessageBox } from 'element-plus/es/components';
import { setToken } from '@/utils/auth';
import { getUserInfo } from '@/utils/auth';

const userStore = useUserStore();
const $router = useRouter();
const isLogin = ref(true);
const isLoad = ref(false);
const siderShow = ref(false);

const initUserInfo = async () => {
  const userStore = useUserStore();
  const route = useRoute();
  if (route.query.token) {
    console.log('route.query.token', route.query.token);
    const token = route.query.token as string;
    setToken(token);
    console.log('--', userStore.userInfo);
  }
  if (!userStore.userInfo) {
    await getUserDetail();
  }
};
onMounted(async () => {
  console.log('111');
  await initUserInfo();
  console.log('222');
});

const bannerMaskList = reactive([
  { id: '2', title: '中西成药', img: 'banner-icon1.png' },
  { id: '3', title: '养生中药', img: 'banner-icon2.png' },
  { id: '12', title: '中药饮片', img: 'banner-icon3.png' },
  { id: '24', title: '保健饮品', img: 'banner-icon4.png' },
  { id: '627', title: '医疗器械', img: 'banner-icon5.png' },
  { id: '673', title: '个人护理', img: 'banner-icon6.png' },
  { id: '6', title: '注射用药', img: 'banner-icon7.png' },
  { id: '7', title: '普通食品', img: 'banner-icon8.png' },
]);
const buysList = reactive([
  { id: '2', title: '盐酸氟桂利嗪胶囊', img: 'goods-demo1.jpg' },
  { id: '3', title: '左甲状腺素钠片(优甲乐)', img: 'goods-demo2.jpg' },
  { id: '12', title: '中药饮片', img: 'goods-demo3.jpg' },
  { id: '24', title: '保健饮品', img: 'goods-demo4.jpg' },
  { id: '627', title: '维生素B12片', img: 'goods-demo1.jpg' },
  { id: '673', title: '个人护理', img: 'goods-demo3.jpg' },
  { id: '6', title: '维生素B1片', img: 'goods-demo2.jpg' },
  { id: '7', title: '普通食品', img: 'goods-demo1.jpg' },
]);
const goodsList = reactive([
  { id: '2', title: '盐酸氟桂利嗪胶囊', img: '/src/assets/images/goods-demo1.jpg', salePrice: '4.00' },
  { id: '3', title: '左甲状腺素钠片(优甲乐)', img: '/src/assets/images/goods-demo2.jpg', salePrice: '34.00' },
  { id: '12', title: '中药饮片', img: '/src/assets/images/goods-demo3.jpg', salePrice: '314.00' },
  { id: '24', title: '保健饮品', img: '/src/assets/images/goods-demo4.jpg', salePrice: '340.00' },
]);
const goodsList2 = reactive([
  { id: '2', title: '盐酸氟桂利嗪胶囊', img: '/src/assets/images/goods-demo1.jpg', salePrice: '4.00' },
  { id: '3', title: '左甲状腺素钠片(优甲乐)', img: '/src/assets/images/goods-demo2.jpg', salePrice: '34.00' },
  { id: '12', title: '中药饮片', img: '/src/assets/images/goods-demo3.jpg', salePrice: '314.00' },
  { id: '24', title: '保健饮品', img: '/src/assets/images/goods-demo4.jpg', salePrice: '340.00' },
  { id: '2', title: '盐酸氟桂利嗪胶囊', img: '/src/assets/images/goods-demo1.jpg', salePrice: '4.00' },
  { id: '3', title: '左甲状腺素钠片(优甲乐)', img: '/src/assets/images/goods-demo2.jpg', salePrice: '34.00' },
  { id: '12', title: '中药饮片', img: '/src/assets/images/goods-demo3.jpg', salePrice: '314.00' },
  { id: '24', title: '保健饮品', img: '/src/assets/images/goods-demo4.jpg', salePrice: '340.00' },
]);
const typesList = reactive([
  { id: '2', title: '诊所专区', img: 'type-ico1.png', desc: '必备清单' },
  { id: '3', title: '领券中心', img: 'type-ico2.png', desc: '为你省钱' },
  { id: '12', title: '拼团专区', img: 'type-ico3.png', desc: '拼团购 价更优' },
  { id: '24', title: '全球找药', img: 'type-ico4.png', desc: '多 快 好 省' },
]);
const form = reactive({
  name: '',
  password: '',
  type: ['记住密码'],
});
const enter = (i: number) => {
  switch (i) {
    case 0:
      break;
    case 3:
      $router.push('/findMedicine/index');
      break;
    default:
      break;
  }
};
const onSubmit = () => {
  console.log('submit!');
};
function buysLoadMore() {
  console.log('加载更多');
}
function lineClick(e: any): void {
  console.log(e);
}
window.addEventListener('scroll', pageScroll, true);
pageScroll();
function pageScroll() {
  // siderShow,isLoad
  let scrollTop = document.documentElement.scrollTop; //滚动高度
  let clientHeight = document.documentElement.clientHeight; //可视高度
  let scrollHeight = document.documentElement.scrollHeight; //内容高度
  // console.log(scrollTop);
  siderShow.value = Number(scrollTop) > 300;
  // let isEnd = Number(Number(scrollHeight) - Number(clientHeight)) - 10 < Number(scrollTop);
  // console.log(isEnd, isLoad);
  // if (isEnd && !isLoad.value) {
  //   isLoad.value = true;
  //   setTimeout(() => {
  //     // if (Number(Number(this.amount) * 10) + 23 < this.tableData.length) {
  //     //   // that.amount += 1;
  //     //   isLoad.value = false;
  //     // } else {
  //     //   isLoad.value = false;
  //     // }
  //     isLoad.value = false;
  //   }, 1000);
  // }
}

function scrollToId(id: string, top = 100): void {
  if (!id) {
    return;
  }
  let domEl = document.getElementById(id);
  // let domEl = document.getElementById('domee')
  // console.log(domEl)
  if (domEl) {
    // start、center、end 或 nearest
    // domEl.scrollIntoView({ behavior: "smooth", block: "start" });

    let domTop = domEl.getBoundingClientRect().top;
    let viewHeight = window.innerHeight;
    let pTop = domEl.offsetTop;
    // let py = domEl.clientY
    // console
    console.log(domTop, innerHeight, pTop);
    //  - viewHeight  + top
    let reHeight = pTop + top;
    console.log(reHeight);
    window.scrollTo({
      // top: viewHeight - domTop,
      top: reHeight,
      behavior: 'smooth',
    });
  }
}

function scrollBtn(val: number): void {
  document.documentElement.scrollTop = val;
}
onUnmounted(() => {
  window.removeEventListener('scroll', pageScroll, false);
});
</script>

<style lang="scss" scoped>
.app-home {
  background-color: #fff;
}
.home {
  // color: var(--main-color);
  // background-color: $main-color;
  &-banner {
    position: relative;
    height: 400px;
    width: 100%;
    overflow: hidden;
    &-box {
      position: relative;
    }
    img {
      position: relative;
      display: block;
      width: 1920px;
      height: 400px;
      left: calc(50% - 960px);
    }
  }
  &-types {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 0;
    &-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 288px;
      height: 120px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      &.type1 {
        background-image: linear-gradient(90deg, #f3c2c3 0%, #f7e5e5 100%);
        color: #043334;
      }
      &.type2 {
        background-image: linear-gradient(90deg, #f3db9f 0%, #faf4e2 100%);
        color: #3d2c06;
      }
      &.type3 {
        background-image: linear-gradient(90deg, #c9e5b9 0%, #e6f7e8 100%);
        color: #043334;
      }
      &.type4 {
        background-image: linear-gradient(90deg, #bcd1f4 0%, #eaf1fb 100%);
        color: #07234c;
      }
      &-txt {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 140px;
        height: 120px;
        box-sizing: border-box;
        padding-left: 24px;
        div {
          font-size: 26px;
        }
        p {
          font-size: 16px;
          margin: 10px 0 0;
        }
      }
      &-img {
        display: block;
        width: auto;
        height: 120px;
      }
    }
  }
  &-one {
    width: 940px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    &-box {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border: 1px solid var(--color-d9);
      border-radius: 4px;
    }
  }
  &-news {
    width: 260px;
    height: 386px;
    box-sizing: border-box;
    border-left: 1px solid var(--color-d9);
    padding: 0 16px;
    &-title {
      display: flex;
      align-items: center;
      height: 44px;
      font-size: 16px;
      font-weight: 600;
      color: var(--color-26);
    }
    &-list {
      height: 140px;
      overflow-y: auto;
      p {
        position: reactive;
        font-size: 14px;
        color: var(--color-59);
        line-height: 1.8;
        margin: 0;
        cursor: pointer;
        &::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 100%;
          background-color: var(--color-59);
          margin-right: 5px;
          vertical-align: middle;
        }
        &:hover {
          color: var(--main-color);
        }
      }
    }
  }
  &-zone {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 16px 0 20px;
    &-good {
      width: 228px;
      &.zone-left {
        margin-right: 15px;
      }
      &.zone-right {
        margin-left: 15px;
      }
    }
    &-banner {
      width: 714px;
    }
  }
  &-zones {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    :deep(.goods-item) {
      margin-right: 15px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
.banner {
  &-mask {
    position: absolute;
    z-index: 2;
    left: calc(50% - 600px);
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    &-left {
      width: 210px;
      height: 400px;
      background-color: #fff;
      &-li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 50px;
        cursor: pointer;
        padding: 0 16px;
        &:hover {
          background-color: #fff2f1;
        }
        img {
          display: block;
          width: 32px;
          height: 32px;
          margin-right: 8px;
        }
        p {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-26);
        }
      }
    }
    &-right {
      width: 265px;
      height: 400px;
    }
  }
  &-login {
    position: relative;
    top: 48px;
    background-color: #fff;
    padding: 16px;
    border-radius: 6px;
    &-title {
      color: var(--main-color);
      font-weight: 600;
      font-size: 15px;
      width: 116px;
      text-align: center;
      padding-bottom: 8px;
      margin-bottom: 12px;
      border-bottom: 3px solid var(--main-color);
    }
    &-form {
      position: relative;
      :deep(.el-form-item) {
        margin-bottom: 8px;
      }
    }
    &-btn {
      width: 100%;
    }
    &-more {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--color-26);
      margin: 0;
      p {
        font-size: 14px;
        font-weight: 400;
        color: var(--color-59);
        cursor: pointer;
        &.act {
          color: var(--main-color);
        }
      }
    }
  }
  &-buys {
    background-color: #fff;
    height: 400px;
    box-sizing: border-box;
    padding: 16px;
    &-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-26);
      line-height: 24px;
      margin-bottom: 10px;
    }
    &-list {
      height: calc(400px - 32px - 32px - 34px - 10px);
      overflow-y: auto;
    }
    &-good {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      cursor: pointer;
      &-img {
        display: block;
        width: 64px;
        height: 64px;
        img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
        }
      }
      &-main {
        width: calc(100% - 70px);
      }
      &-title {
        font-size: 14px;
        color: var(--color-26);
      }
      &-desc {
        font-size: 12px;
        color: var(--color-59);
      }
      &-price {
        color: var(--main-color);
      }
    }
    &-btn {
      padding-top: 10px;
      height: 32px;
    }
  }
}

.sider-box {
  position: fixed;
  width: 66px;
  border-radius: 4px;
  top: 50vh;
  left: calc(50vw - 600px - 80px);
  font-size: 16px;
  transform: translateY(-50%);
  color: var(--color-59);
  border: 1px solid #d9d9d9;
  background-color: #fff;
  z-index: 12;
  &-img {
    min-height: 50px;
  }
  &-ico {
    color: #999;
    font-size: 25px;
  }
  div {
    padding: 10px;
    cursor: pointer;
    line-height: 1.3;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: #ff4d4f;
      color: #fff;
      .sider-box-ico {
        color: #fff;
      }
    }
  }
}
</style>
