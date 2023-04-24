<template>
  <div class="app-home">
    <div class="home-header-box">
      <div class="main1200 home-header">
        <div class="home-header-left">
          <div class="home-header-logo">
            <img src="@/assets/images/logo-chunbo.png" alt="logo" />
          </div>
          <div class="home-header-search">
            <div class="search-el">
              <el-input placeholder="九和饮" v-model="inputVal" @keyup.enter="searchBtn">
                <template #prefix>
                  <el-icon class="el-input__icon"><search /></el-icon>
                </template>
                <template #append>
                  <span class="search-btn" style="" @click="searchBtn">搜索</span>
                </template>
              </el-input>
            </div>
            <div class="txts">
              <p v-for="(li, i) in searchList" :key="i">{{ li.title }}</p>
            </div>
          </div>
        </div>
        <div class="home-header-right">
          <img src="@/assets/images/erweima.png" alt="wx-code" />
          <p>云药库小程序</p>
        </div>
      </div>
      <div class="fixed-search-box" v-if="isScroll">
        <div class="main1200 fixed-search">
          <div class="home-header-logo fixed-search-logo">
            <img src="@/assets/images/logo-chunbo.png" alt="logo" />
          </div>
          <div class="home-header-search">
            <div class="search-el">
              <el-input placeholder="九和饮" v-model="inputVal" @keyup.enter="searchBtn">
                <template #prefix>
                  <el-icon class="el-input__icon"><search /></el-icon>
                </template>
                <template #append>
                  <span class="search-btn" style="" @click="searchBtn">搜索</span>
                </template>
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-menus-box">
      <div class="main1200 home-menus">
        <div class="home-menus-left">
          <div class="home-menus-btn">
            <svg-icon class="menu-ico" icon-class="shop-chat" />
            <p>药品分类</p>
          </div>
          <div class="home-menus-mask">
            <div v-for="(ul, i) in 5" :key="i" class="home-menus-lis">
              <div class="home-menus-lis-title">一级菜单</div>
              <div class="home-menus-lis-ul">
                <div v-for="(li, j) in 3" :key="j" class="home-menus-lis-li">二级菜单</div>
              </div>
            </div>
          </div>
        </div>
        <div class="home-menus-tel">
          <img src="@/assets/images/ico-tel.png" alt="" />
          <p>400-6888-888</p>
        </div>
      </div>
    </div>
    <div class="home-banner"></div>
    <div class="home-types"></div>
    <div style="height: 600px"></div>
    <!-- <span class="home">{{ title }}</span>
    <svg-icon class-name="custom-fill-svg" icon-class="404" color="#0f0" />
    <el-button type="primary">primary</el-button>
    <router-link to="/order/index">我的订单</router-link> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted } from 'vue';
const title = ref('首页标题');
const isScroll = ref(false);
const inputVal = ref('');
const searchList = reactive([
  { id: '2', title: '九和' },
  { id: '3', title: '消痞和胃' },
  { id: '12', title: '思考林' },
  { id: '24', title: '洛弗沙星胶囊' },
  { id: '67', title: '布诺芬' },
]);
function searchBtn() {
  console.log('用户点击搜索按钮');
}

window.addEventListener('scroll', scrollChange, true);
scrollChange();
function scrollChange() {
  let scrollTop = document.documentElement.scrollTop; //滚动高度
  // console.log(scrollTop);
  isScroll.value = Number(scrollTop) > 150;
  // if (Number(scrollTop) > 150) {
  //   isScroll.value = true;
  //   // this.isListener = false;
  // } else if (Number(scrollTop) <= 150) {
  //   isScroll.value = false;
  //   // this.isListener = true;
  // }
}
onUnmounted(() => {
  window.removeEventListener('scroll', scrollChange, false);
});
</script>

<style lang="scss" scoped>
.home {
  // color: var(--main-color);
  // background-color: $main-color;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-box {
      background: #fff;
      padding: 20px 0;
    }
    &-left {
      width: 1000px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    &-right {
      width: 180px;
      display: flex;
      align-items: center;
      flex-direction: column;
      img {
        display: block;
        width: 72px;
        height: 72px;
      }
      p {
        margin: 8px 0;
      }
    }
    &-logo {
      img {
        display: block;
        width: 207px;
        height: 56px;
      }
    }
    &-search {
      width: 600px;
      margin-left: 90px;
      .search {
        &-el {
          :deep(.el-input) {
            display: flex;
            align-items: center;
            border: 2px solid var(--main-color);
            border-radius: 20px;
            overflow: hidden;
          }
          :deep(.el-input__wrapper) {
            width: calc(100% - 100px);
            border: 0;
            box-shadow: inherit;
            padding: 0 20px;
          }
          :deep(.el-input-group__append) {
            display: flex;
            width: 100px;
            height: 36px;
            border: 0;
            padding: 0;
            background-color: var(--main-color);
            color: #fff;
            cursor: pointer;
            box-shadow: inherit;
            border-radius: 0;
          }
        }
        &-btn {
          font-size: 18px;
          padding: 0 11px;
        }
      }
      .txts {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-top: 8px;
        p {
          font-size: 14px;
          font-weight: 400;
          color: #595959;
          line-height: 1.5;
          cursor: pointer;
          margin: 0;
          position: relative;
          &:hover {
            color: var(--main-color);
          }
          &::after {
            content: '|';
            margin: 0 10px;
            font-size: 12px;
            color: #e0e0e0;
          }
          &:last-child::after {
            content: inherit;
          }
        }
      }
    }
  }
  &-menus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-box {
      background: #fff;
      border-bottom: 2px solid #f5222d;
    }
    &-left {
      position: relative;
      width: 210px;
      &:hover {
        .home-menus-mask {
          display: block;
        }
      }
    }
    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 210px;
      height: 40px;
      border-radius: 6px 6px 0 0;
      background-color: var(--main-color);
      color: #fff;
      cursor: pointer;
      .menu-ico {
        margin-right: 5px;
      }
    }
    &-mask {
      display: none;
      position: absolute;
      z-index: 10;
      width: 210px;
      top: 40px;
      left: 0;
    }
    &-lis {
      position: relative;
      background-color: #f00;
      color: #fff;
      &:hover {
        .home-menus-lis-ul {
          display: block;
        }
      }
      &-title {
        cursor: pointer;
        &:hover {
          color: #0da1a8;
        }
      }
      &-ul {
        display: none;
        position: absolute;
        left: 210px;
        top: 0;
      }
      &-li {
        background: #00f;
        color: #fff;
        width: 200px;
      }
    }
    &-tel {
      display: flex;
      align-items: center;
      img {
        display: block;
        width: 32px;
        height: 32px;
        margin-right: 5px;
      }
      p {
        font-size: 24px;
        font-weight: 600;
        color: var(--main-color);
        line-height: 1.2;
        font-family: DIN Alternate, DIN A;
        margin: 0;
      }
    }
  }
}

.fixed-search {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-box {
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  }
  &-logo {
    img {
      width: 148px;
      height: 40px;
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
</style>
