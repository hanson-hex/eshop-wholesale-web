<template>
  <div class="cardCont">
    <div class="card1 card">
      <div class="inner">
        <p class="title title1">诊所专区</p>
        <p class="desc desc1">必备单品</p>
      </div>
      <img src="@/assets/card1.png" width="140px" height="120px" alt="" />
    </div>
    <div class="card2 card">
      <div class="inner">
        <p class="title title2">领券中心</p>
        <p class="desc desc2">为你省钱</p>
      </div>
      <img src="@/assets/card2.png" width="140px" height="120px" alt="" />
    </div>
    <div class="card3 card">
      <div class="inner">
        <p class="title title3">拼团专区</p>
        <p class="desc desc3">拼团购 价更优</p>
      </div>
      <img src="@/assets/card3.png" width="140px" height="120px" alt="" />
    </div>
    <div class="card4 card">
      <div class="inner">
        <p class="title title4">全球找药</p>
        <p class="desc desc4">多 · 快 · 好 · 省</p>
      </div>
      <img src="@/assets/card4.png" width="140px" height="120px" alt="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cardCont {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0px;
  .card {
    width: 288px;
    height: 120px;
    display: flex;
    justify-content: space-between;
    div {
      padding-left: 24px;
      padding-top: 27px;
      p {
        margin: 0px;
      }
      .title {
        font-size: 26px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;

        line-height: 37px;
      }
      .title1 {
        color: #043334;
      }
      .title2 {
        color: #3d2c06;
      }
      .title3 {
        color: #043334;
      }
      .title4 {
        color: #07234c;
      }
      .desc {
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;

        line-height: 22px;
        margin-top: 6px;
      }
      .desc1 {
        color: #0e5658;
      }
      .desc2 {
        color: #4f3d15;
      }
      .desc3 {
        color: #043334;
      }
      .desc4 {
        color: #244980;
      }
    }
  }
  .card1 {
    background: linear-gradient(225deg, #f7e7e7, #f3bebf);
    border-radius: 8px;
    box-shadow: 0px 8px 10px 5px rgba(13, 161, 168, 0.05);
  }
  .card2 {
    background: linear-gradient(225deg, #fbf6e9, #f2d896);
    border-radius: 8px;
    box-shadow: 0px 8px 10px 5px rgba(206, 175, 18, 0.06);
  }
  .card3 {
    background: linear-gradient(225deg, #e9f9ed, #c7e3b5 100%);
    border-radius: 8px;
    box-shadow: 0px 8px 10px 5px rgba(40, 151, 10, 0.05);
  }
  .card4 {
    background: linear-gradient(225deg, #eef4fc, #b9cff4);
    border-radius: 8px;
    box-shadow: 0px 8px 10px 5px rgba(27, 83, 167, 0.05);
  }
}
</style>
