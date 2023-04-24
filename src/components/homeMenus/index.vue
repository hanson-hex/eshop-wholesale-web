<template>
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
</template>

<script setup lang="ts" name="”homeMenus">
import { ref, reactive, onUnmounted } from 'vue';
const title = ref('首页标题');
// const isScroll = ref(false);
// const inputVal = ref('');
// const searchList = reactive([
//   { id: '2', title: '九和' },
//   { id: '3', title: '消痞和胃' },
//   { id: '12', title: '思考林' },
//   { id: '24', title: '洛弗沙星胶囊' },
//   { id: '67', title: '布诺芬' },
// ]);
// function searchBtn() {
//   console.log('用户点击搜索按钮');
// }

// window.addEventListener('scroll', scrollChange, true);
// scrollChange();
// function scrollChange() {
//   let scrollTop = document.documentElement.scrollTop; //滚动高度
//   // console.log(scrollTop);
//   isScroll.value = Number(scrollTop) > 150;
//   // if (Number(scrollTop) > 150) {
//   //   isScroll.value = true;
//   //   // this.isListener = false;
//   // } else if (Number(scrollTop) <= 150) {
//   //   isScroll.value = false;
//   //   // this.isListener = true;
//   // }
// }
// onUnmounted(() => {
//   window.removeEventListener('scroll', scrollChange, false);
// });
</script>

<style lang="scss" scoped>
.home {
  // color: var(--main-color);
  // background-color: $main-color;
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
</style>
