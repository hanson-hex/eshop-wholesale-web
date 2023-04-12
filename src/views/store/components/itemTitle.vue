<template>
  <div class="lineTitle">
    <p class="title">
      <el-divider
        direction="vertical"
        content-position="left"
        class="vertical"
      ></el-divider
      >{{ title }}
    </p>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.lineTitle {
  height: 40px;
  margin: 24px 0px 16px;
  .title {
    font-size: 20px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #262626;
    line-height: 28px;
    margin: 0px;
    .vertical {
      width: 5px;
      height: 20px;
      background: #f5222d;
      border-radius: 3px;
      margin-left: 0px;
    }
  }
  .line {
    height: 2px;
    background: #d9d9d9;
    border-radius: 2px;
    margin-top: 10px;
  }
}
</style>
