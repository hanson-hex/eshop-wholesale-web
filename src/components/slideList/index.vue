<template>
  <div class="slide-list-container">
    <div class="good-title">凑单商品</div>
    <div class="slide-list">
      <!-- 左边按钮 -->
      <div class="btn" @click="scrollLeft">
        <div class="el-icon left-circle">
          <img src="@/assets/images/left-arrow.png" alt="" />
        </div>
      </div>
      <!-- 中间列表 -->
      <div id="list-box" class="list-box">
        <div id="list" class="list">
          <div v-for="item in imgList" :key="item.id" class="list-item">
            <img src="@/assets/images/footer-card1.png" alt="" />
            <div class="name">
              {{ item.name }}
            </div>
            <div class="spec">
              {{ item.spec }}
            </div>
            <div class="suppler">
              {{ item.suppler }}
            </div>
            <div class="price">¥{{ item.price }}</div>
            <div class="location">
              <img src="@/assets/images/shop.png" />
              <span>
                {{ item.location }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边按钮 -->
      <div class="btn" @click="scrollRight">
        <div class="el-icon right-circle">
          <img src="@/assets/images/right-arrow.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imgList: {
    type: Array<{
      url: string;
      id: number;
      name: string;
      spec: string;
      suppler: string;
      price: string;
      location: string;
    }>,
    default: () => {
      let temp = [];
      for (let i = 0; i < 18; i++) {
        temp.push({
          url: 'https://youcaikeji.com/Uploads/Data/20210723/65209a4600ac1fb9b11a0c34102719cf.jpg',
          id: i,
          name: '维生素B1',
          spec: '200ml*1支/盒',
          suppler: '福元药业有限公司',
          price: '3.96',
          location: '永正医药有限公司',
        });
      }
      return temp;
    },
  },
});

const scrollRight = () => {
  const allLength = props.imgList.length * 243; // monitorList是项目列表
  const boxLength = document.getElementById('list-box')!.clientWidth; // 用clientWidth获取外层div的宽度
  if (allLength < boxLength) return; // 不需要滑动
  const listEl = document.getElementById('list')!;
  const leftMove = Math.abs(parseInt(window.getComputedStyle(listEl, null).left));
  if (leftMove + boxLength + 243 * 5 > allLength) {
    // 到底的时候
    listEl.style.left = '-' + (allLength - boxLength) + 'px';
  } else {
    listEl.style.left = '-' + (leftMove + 243 * 5) + 'px';
  }
};

const scrollLeft = () => {
  const allLength = props.imgList.length * 243;
  const boxLength = document.getElementById('list-box')!.clientWidth;
  if (allLength < boxLength) return;
  const listEl = document.getElementById('list')!;
  const leftMove = Math.abs(parseInt(window.getComputedStyle(listEl, null)?.left));
  if (leftMove + boxLength - 243 * 5 < boxLength) {
    // 滚到
    listEl.style.left = '0px';
  } else {
    listEl.style.left = '-' + (leftMove - 243 * 5) + 'px';
  }
};
</script>
<style lang="scss" scoped>
.slide-list-container {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-top: 24px;
  .slide-list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-bottom: 20px;
    .btn {
      position: relative;
      .left-circle {
        cursor: pointer;
        position: absolute;
        z-index: 100;
        width: 64px;
        height: 64px;
        background-color: #e9e9e9;
        border-radius: 32px;
        left: -32px;
        clip: rect(0px 64px 64px 32px);
        top: 50%;

        transform: translate(0, -50%);
        img {
          width: 20px;
          height: 20px;
          transform: translate(10px, 0);
        }
      }
      .right-circle {
        /*左半圆*/
        cursor: pointer;
        z-index: 100;
        position: absolute;
        /*clip 属性剪裁绝对定位元素。也就是说，只有 position:absolute 的时候才是生效的。*/
        width: 64px;
        height: 64px;
        background-color: #e9e9e9;
        border-radius: 32px;
        /* line-height: 50px; */
        // left: 50%;
        top: 50%;
        right: -32px;

        transform: translate(0, -50%);
        clip: rect(0px 32px 64px 0px);
        img {
          width: 20px;
          height: 20px;
          transform: translate(-10px, 0);
        }
      }
    }
    .list-box {
      width: calc(100vw - 100px);
      overflow: hidden;

      .list {
        width: calc(100vw - 100px);
        display: flex;
        transform: all 2s;
        .list-item {
          width: 235px;
          height: 385px;
          padding: 10px;
          cursor: pointer;
          margin-left: 8px;
          border: 1px solid transparent;
          img {
            width: 211px;
            // height: 211px;
            max-width: none;
          }

          .name {
            color: #262626;
            font-size: 16px;
            font-weight: 600;
            margin-top: 8px;
            margin-bottom: 8px;
          }
          .spec {
            font-size: 14px;
            color: #595959;
          }
          .price {
            font-size: 24px;
            color: #f5222d;
            font-weight: 600;
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .location {
            display: inline-block;
            img {
              display: inline-block;
              width: 20px;
              height: 20px;
              margin-right: 8px;
            }
            color: #8c8c8c;
            font-size: 14px;
            font-weight: 400;
          }
        }
        .list-item:first-child {
          margin-left: 0;
        }
        .list-item:hover {
          border: 1px solid #f5222d;
          border-radius: 4px;
          box-shadow: 0px 6px 10px 0px rgba(255, 77, 80, 0.2), 0px 3px 4px -5px rgba(255, 77, 80, 0.5);
        }
        position: relative;
        left: 0;
        transition: left 1s;
      }
    }
  }
  .good-title {
    color: #262626;
    font-size: 16px;
    font-weight: 600;
    padding-top: 8px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 8px;
    display: inline-block;
    border-top: 4px solid #f5222d;
  }
}
</style>
