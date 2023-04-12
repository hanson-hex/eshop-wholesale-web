<template>
  <div>
    <section class="app-main-cont">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>
    <!-- <div class="bottom">Copyright © 湖南春播云药库科技有限公司版权所有</div> -->
  </div>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.app-main-cont {
  /*50 = navbar  */
  /* padding: 20px; */
  /* background: #eee; */
  /* height: calc(100vh - 190px); */
  width: 1200px;
  position: relative;
  border-radius: 4px;
  padding-bottom: 0px;
  margin: 0px auto;
  overflow: auto;
}
.app-main-cont::-webkit-scrollbar {
  width: 0px;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.bottom {
  height: 40px;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  color: #8c8c8c;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
