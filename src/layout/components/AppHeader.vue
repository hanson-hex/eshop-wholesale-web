<template>
  <div class="app-header">
    <div class="main1200 app-header-box">
      <div class="app-header-left">
        <div class="act">
          <el-icon class="app-header-ico" size="16px"><Edit /></el-icon>
          <span>湖南</span>
        </div>
        <div>欢迎您来到春播云药库！</div>
        <div class="act">
          <el-icon class="app-header-ico" size="16px"><Edit /></el-icon>
          <span>13244566777</span>
        </div>
      </div>
      <div class="app-header-right">
        <router-link class="app-header-btn" to="/">首页</router-link>
        <router-link class="app-header-btn" to="/order/index">我的订单</router-link>
        <el-badge :value="5" class="app-header-badge">
          <p class="app-header-btn app-header-shop" @click="goRoute('/order/index')">
            <!-- <img src="@/assets/images/buymore.png" /> -->
            <el-icon class="app-header-ico" size="16px"><ShoppingCartFull /></el-icon>
            <span>购物车</span>
          </p>
        </el-badge>

        <router-link class="app-header-btn" to="/">收藏夹</router-link>
        <!-- <router-link to="/">招商入驻</router-link> -->
        <!-- <router-link to="/">用户中心</router-link> -->
        <!-- <router-link to="/">帮助中心</router-link> -->
        <!-- <span>收藏夹</span> -->
        <p class="app-header-btn" @click="goRoute('/order/index')">招商入驻</p>
        <p class="app-header-btn" @click="goRoute('/order/index')">用户中心</p>
        <p class="app-header-btn" @click="goRoute('/order/index')">帮助中心</p>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup name="appheader">
import { useRouter } from 'vue-router';
// import { getCodeImg } from '@/api/login';
// import Cookies from 'js-cookie';
// import { encrypt, decrypt } from '@/utils/jsencrypt';
// import useUserStore from '@/store/modules/user';

// const userStore = useUserStore();
const router = useRouter();
// import { computed } from 'vue';
// import iframeToggle from './IframeToggle/index';
// import useTagsViewStore from '@/store/modules/tagsView';
// import Sidebar from '@/layout/components/Sidebar/index.vue';

// import useAppStore from '@/store/modules/app';
// import MicroApp from '@/micro/MicroApp.vue';
// const sidebar = computed(() => useAppStore().sidebar);
// const tagsViewStore = useTagsViewStore();

function goRoute(path = '/') {
  router.push({ path });
}
</script>

<style lang="scss" scoped>
.app-header {
  position: relative;
  background: #fafafa;
  &-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    font-size: 14px;
    color: var(--color-59);
  }
  &-left {
    display: flex;
    align-items: center;
    div {
      margin-right: 22px;
      &.act {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: var(--main-color);
      }
    }
  }
  &-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &-btn {
    cursor: pointer;
    margin: 0;
    margin-left: 25px;
    &:hover {
      color: var(--main-color);
    }
  }
  &-shop {
    display: flex;
    align-items: center;
    img {
      display: block;
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
  }
  &-ico {
    font-size: 16px;
    margin-right: 4px;
    color: var(--main-color);
  }
  &-badge {
    &:hover {
      cursor: pointer;
      color: var(--main-color);
    }
    :deep(.el-badge__content) {
      top: 4px;
      background-color: var(--main-color);
    }
  }
}
</style>
