<template>
  <div class="itemCont">
    <div class="itemImg">
      <el-image
        lazy
        :src="item.image || getImageUrl()"
        alt=""
        :preview-src-list="item.image ? [item.image] : []"
        style="width: 120px; height: 120px"
      />
      <div class="item-box-desc">
        <div class="itemBox name">
          {{ item.name || '' }}
        </div>
        <div class="itemBox">
          {{ item.specification || '' }}
        </div>

        <div class="itemBox">
          {{ item.factory || '' }}
        </div>
        <div class="itemBox">申请数量： 30盒</div>
        <div class="itemBox">已付定金：<span class="deposit">¥3000</span> <Warning class="warn"></Warning></div>
      </div>
      <img class="card" src="@/assets/images/card-fill.png" alt="" />
    </div>

    <div class="apply-bottom" v-if="item.id === 1">
      <div class="line-item">药品规格和价格均可满足</div>
      <div class="line-item-two">
        <div class="text">
          <div>需补款 <span class="price">¥198.00</span></div>
          <div class="one-line">本药品 由湖南永正医药提供 <img src="@/assets/images/connect.png" alt="" /></div>
        </div>
        <div class="opt">
          <el-button @click="handleOpen" color="#F5222D">支付定金</el-button>
        </div>
      </div>
    </div>
    <div class="apply-bottom" v-if="item.id === 2">
      <div class="line-item">数量: <strong> ¥ 30</strong> 单价<strong>¥198.00 </strong>（期望价格≤¥290.00）</div>
      <div class="line-item-two">
        <div class="text">
          <div>需补款 <span class="price">¥198.00</span></div>
          <div class="one-line">本药品 由湖南永正医药提供 <img src="@/assets/images/connect.png" alt="" /></div>
        </div>
        <div class="opt">
          <el-button color="#F5222D">支付补款</el-button>
        </div>
      </div>
    </div>

    <div class="other-bottom send" v-if="item.id === 3">
      <img src="@/assets/images/clock.png" alt="" />
      派单中
    </div>
    <div class="other-bottom prepare" v-if="item.id === 4">
      <img src="@/assets/images/mirror.png" alt="" />
      货源准备中
    </div>
    <div class="other-bottom complate" v-if="item.id === 5">
      <img src="@/assets/images/gou.png" alt="" />
      寻药完成
    </div>
    <slot></slot>
  </div>
  <el-dialog class="custom-dialog" v-model="dialogVisible" title="服务单确定" :before-close="handleClose">
    <div class="dialog-content-wrapper">
      <div class="dialog-content">
        <div class="item">
          <div class="item-title">需求方： 顾德中医诊所</div>
          <el-image lazy :src="getImageUrl()" alt="" :preview-src-list="item.image ? [item.image] : []" style="width: 120px; height: 120px" />
          <div class="item-name">
            {{ item.name || '' }}
          </div>
          <div class="item-text">
            {{ item.specification || '' }}
          </div>
          <div class="item-text">
            {{ item.specification || '' }}
          </div>
          <div class="item-text">{{ item.specification || '' }}≤100</div>
        </div>
        <div class="item">
          <div class="item-title">服务方： 顾德中医诊所</div>
          <el-image lazy :src="getImageUrl()" alt="" :preview-src-list="item.image ? [item.image] : []" style="width: 120px; height: 120px" />
          <div class="item-name">
            {{ item.name || '' }}
          </div>
          <div class="item-text">
            {{ item.specification || '' }}
          </div>
          <div class="item-text">
            {{ item.specification || '' }}
          </div>
          <div class="item-text">
            商家报价:≤ {{ item.specification || '' }}
            <span class="warn"> 便宜 10</span>
          </div>
        </div>
      </div>
      <div class="pay">
        <p class="pay-price">应付定金：<span class="price">2000</span></p>
        <p class="pay-text">请在 24 小时之内完成定金支付，超时服务单会被自动取消。</p>
        <div class="q-code">
          <img src="" alt="" />
        </div>
        <p class="tip">请使用手机微信或者支付宝扫一扫功能，扫码并支付。</p>
        <div class="warn">
          <img class="warn-icon" src="@/assets/images/warning-circle-fill.png" alt="" />
          支付定金代表接受服务方提供的服务。定金可抵扣 2000元 货款，后续如不采购则定金不可退还。
        </div>
      </div>
    </div>

    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const getImageUrl = () => {
  return new URL('@/assets/images/default.png', import.meta.url).href;
};

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const dialogVisible = ref<boolean>(false);
const handleOpen = () => {
  dialogVisible.value = true;
};
const handleClose = () => {
  dialogVisible.value = false;
};
console.log('props', props.item);
</script>
<style lang="scss" scoped>
.itemCont {
  width: 389px;
  border-radius: 4px;
  // padding-bottom: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  // align-items: space-between;
  justify-content: space-between;
  &:hover {
    border: 1px solid #ff4d50;
    border-radius: 4px;
    box-shadow: 0px 6px 10px 0px rgba(255, 77, 80, 0.2), 0px 3px 4px -5px rgba(255, 77, 80, 0.5);
  }

  .itemImg {
    width: 100%;
    padding: 8px;
    display: flex;
    justify-content: center;
    position: relative;
    .item-box-desc {
      .price {
        font-weight: 700;
        justify-content: end;
      }

      .shopCar {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        p {
          margin: 0px;
          font-size: 24px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: left;
          color: #f6212d;
          line-height: 32px;
        }
        .el-button {
          padding: 8px 12px;
        }
      }

      .itemBox {
        padding-left: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
        line-height: 22px;
        margin: 0;
        font-size: 14px;
        color: #595959;
        display: flex;
        align-items: center;
        .deposit {
          color: #f5222d;
          font-size: 16px;
          font-weight: 600;
        }
        .warn {
          width: 16px;
          height: 16px;
          display: inline-block;
          margin-left: 10px;
        }
      }

      .name {
        // padding: 4px 10px;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        color: #262626;
        line-height: 24px;
        margin-bottom: 8px;
      }
      .shopName {
        display: flex;
        justify-content: start;
        align-items: center;
        img {
          margin-right: 8px;
        }
      }
    }
    .card {
      width: 36px;
      height: 36px;
      position: absolute;
      right: 12px;
      top: 12px;
    }
  }
  .apply-bottom {
    height: 92px;
    background: #fafafa;
    border-top: 1px solid #d9d9d9;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 10px;
    .line-item {
      .warn {
      }
    }
    .line-item-two {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        .one-line {
          display: flex;
          align-items: center;
          img {
            width: 20px;
            height: 20px;
            margin-left: 10px;
          }
        }
        .price {
          color: #f5222d;
          font-size: 16px;
        }
      }
      .opt {
      }
    }
  }
  .other-bottom {
    height: 92px;
    background: #fafafa;
    border-top: 1px solid #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  .send {
    color: #f99b0d;
    font-size: 18px;
    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  .prepare {
    color: #f5222d;
    font-size: 18px;
    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  .complate {
    color: #32bf78;
    font-size: 18px;
    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
}
.custom-dialog {
  min-width: 800px;
  .dialog-content-wrapper {
    display: flex;
    flex-direction: column;
    .dialog-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .item {
        width: 224px;
        display: flex;
        flex-direction: column;
        .item-title {
          width: 100%;
          height: 44px;
          text-align: center;
          line-height: 44px;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          background: #fafafa;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
        }
        .item-name {
          color: #262626;
          font-size: 16px;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .item-text {
          font-size: 14px;
          color: #595959;
          .warn {
            height: 22px;
            padding-left: 5px;
            padding-right: 5px;
            background: #fff2f1;
            border: 1px solid #ffa39e;
            text-align: center;
            border-radius: 2px;
            margin-left: 5px;
          }
        }
      }
    }
    .pay {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      border-top: 1px solid #f2f2f2;
      margin-top: 40px;
      .pay-price {
        font-size: 16px;

        span {
          font-size: 32px;
          color: #f5222d;
          font-weight: 500;
        }
      }
      .pay-text {
        font-size: 14px;
        color: #f5222d;
        margin-top: 8px;
        margin-bottom: 24px;
      }
      .q-code {
        img {
          width: 184px;
          height: 184px;
        }
      }
      .tip {
        color: #8c8c8c;
        margin-top: 16px;
        margin-bottom: 10px;
      }
      .warn {
        display: flex;
        align-items: center;
        padding: 0 20px;
        .warn-icon {
          width: 14px;
          height: 14px;
          margin-right: 10px;
        }
        height: 40px;
        background-color: #fff9e6;
        border: 1px solid #ffdb88;
        border-radius: 4px;
      }
    }
  }
}

:deep(.el-button) {
  span {
    margin-left: 0px !important;
  }
}
</style>
