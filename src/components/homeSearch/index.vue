<template>
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
</template>

<script setup lang="ts" name="”homeSearch">
import { ref, reactive, onUnmounted, computed } from 'vue';
// 定义父组件传过来的值
const props = defineProps({
  // 菜单列表
  name: {
    type: String,
    default: () => '',
  },
});
// {{ props.name }}  {{newName}}
const newName = computed(() => {
  return props.name;
});
const isScroll = ref(false);
// const newName = ref(props.name);
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
  isScroll.value = Number(scrollTop) > 150;
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
</style>
