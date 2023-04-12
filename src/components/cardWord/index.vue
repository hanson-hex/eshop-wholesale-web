<template>
  <div class="fl_cen">
    <div class="status">
      <el-image class="icon_status"
                :src="getStatus(1, '1')" />
      <div class="name"
           :class="getStatus(3, '1')">
        图标图标图标
      </div>
    </div>
    <div class="items"
         v-for="(item,index) in orderList"
         :key="index">
      <div class="title">{{item.label}}</div>
      <div style="height: 22px">{{ item.value || '' }}</div>
    </div>
  </div>
</template>
<script>
import { checkImages } from '@/utils/status'

export default {
  data () {
    return {
      orderList: [
        { label: '订单编号', value: '85631233845' },
        { label: '售后单号', value: '85631233845' },
        { label: '售后金额', value: '85631233845' },
      ]
    }
  },
  computed: {
    getStatus () {
      return (type, status) => checkImages(type, status)
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../../styles/main";
.fl_cen {
  display: flex;
  justify-content: start;
  .status {
    padding-left: 8px;
    text-align: center;
    margin-right: 84px;
    .icon_status {
      margin: 0 auto 6px auto;
      width: 40px;
      height: 40px;
    }
    .name {
      height: 26px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #91939a;
      line-height: 26px;
    }
    .name.yellow {
      color: #e7a23d;
    }
    .name.green {
      color: #67c33a;
    }
  }
  .items {
    width: auto;
    margin-right: 40px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    line-height: 22px;
    .title {
      color: #91939a;
      margin-bottom: 10px;
    }
  }
  .cancel_btn {
    width: 88px !important;
  }
}
</style>