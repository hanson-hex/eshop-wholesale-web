<template>
  <div class="cardCont">
    <div class="card1 card">
      <img src="@/assets/selectImg1.png" width="64px" height="64px" alt="" />
      <div class="inner">
        <p class="title title1">带票销售 直邮包邮</p>
        <p class="desc desc1">发票保障 满就包邮</p>
      </div>
    </div>
    <div class="card1 card">
      <img src="@/assets/selectImg2.png" width="64px" height="64px" alt="" />
      <div class="inner">
        <p class="title title1">正品行货 品类齐全</p>
        <p class="desc desc1">百万好药 等你来选</p>
      </div>
    </div>
    <div class="card1 card">
      <img src="@/assets/selectImg3.png" width="64px" height="64px" alt="" />
      <div class="inner">
        <p class="title title1">专业服务 闪电配送</p>
        <p class="desc desc1">专业物流 准时送达</p>
      </div>
    </div>
    <div class="card1 card">
      <img src="@/assets/selectImg4.png" width="64px" height="64px" alt="" />
      <div class="inner">
        <p class="title title1">轻松采购 便捷支付</p>
        <p class="desc desc1">一键采购 便捷无忧</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cardCont {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .card {
    width: 300px;
    height: 128px;
    padding: 32px 16px;
    display: flex;
    justify-content: start;
    .inner {
      padding-top: 8px;
    }
    div {
      margin-left: 16px;
      p {
        margin: 0px;
      }
      .title {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #262626;
        line-height: 26px;
      }
      .desc {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #8c8c8c;
        line-height: 22px;
      }
    }
  }
}
</style>
