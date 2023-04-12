<!-- 服务中心组件 -->
<template>
  <div class="order">
    <el-table :data="tableData" style="width: 100%" :span-method="arraySpanMethod" :default-expand-all="true">
      <el-table-column type="expand" style="width:1px">
        <template slot-scope="props">
          <table rules="all" frame="border" class="builtinTableClass">
            <tr v-for="(item,index) in props.row.orderDetailVo" :key="index">
              <th class="thClass" style="min-width:398px">
                <div class="imageBox">
                  <el-image style="width: 80px; height: 80px" :src="item.image || avater" />
                  <div>
                    <p class="name">{{ item.name }}</p>
                    <p class="duanluo pihao">{{ item.approvalNumber }}</p>
                    <p class="duanluo">{{ item.factory }}</p>
                    <p class="duanluo">{{ item.specification }}</p>
                  </div>
                </div>
              </th>
              <th class="thClass" style="min-width:200px">
                <p class="duanluo">￥{{ item.price }}</p>
              </th>
              <th class="thClass" style="min-width:200px">
                <p class="duanluo">{{ item.qty }}</p>
              </th>
              <th v-if="index == 0" class="thClass" style="min-width:200px" :rowspan="props.row.orderDetailVo.length + 1">
                <p class="duanluo">￥{{ item.servicePrice }}</p>
              </th>
              <th v-if="index == 0" class="thClass" style="min-width:200px" :rowspan="props.row.orderDetailVo.length + 1">
                <p class="duanluo">￥{{ props.row.status != '8'? '0' : item.servicePrice }}</p>
              </th>
              <th v-if="index == 0" class="thClass" style="min-width:200px" :rowspan="props.row.orderDetailVo.length + 1">
                <div>
                  <p class="duanluo submit">{{ item.payeeShopName }}</p>
                </div>
              </th>
              <th v-if="index == 0 && routerType == 'pending'" class="thClass" style="min-width:200px" :rowspan="props.row.orderDetailVo.length + 1">
                <div class="submit">
                  <el-link :disabled="props.row.status == '8'" :underline="false" type="primary" class="btn" @click="payBtn(props.row)"> {{ props.row.status == '8'?'已 转 账' : '待 转 账' }}
                  </el-link>
                </div>
              </th>
            </tr>
          </table>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" prop="id" min-width="350" align="left">
        <template slot-scope="scope">
          <div>
            <div v-if="scope.row.newTag" class="xiaoyuandian item" />
            <span>订单号：</span>
            <span>{{ scope.row.orderCode }}</span>
            <span class="marrinLeft"> 创建时间：</span>
            <span>{{ scope.row.orderTime }}</span>
            <span class="marrinLeft"> {{ routerType == 'pending' ? '订单应付：' : '订单应收：' }} </span>
            <span>￥{{ scope.row.amount }} </span>
            <span class="marrinLeft"> {{ routerType == 'pending' ? '订单实付：' : '订单实收：' }} </span>
            <span>￥{{ scope.row.status != '8' ? '0' : scope.row.copeAmount }} </span>
            <!-- <span class="marrinLeft"> 商户：</span>
            <span> {{ scope.row.payShopName }} </span> -->
            <!-- <span class="lastStatus">
              <el-image class="icon_status" :src="getStatus(1, scope.row.status)" style="height:20px;width:20px" />
              <span class="text" :class="getStatus(3, scope.row.status)">{{
                    getStatus(2, scope.row.status)
                  }}</span>
            </span> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价（元）" prop="name" align="left" min-width="200" />
      <el-table-column label="数量" prop="desc" align="left" min-width="200" />
      <el-table-column v-if="routerType == 'pending'" label="服务费应付金额" prop="desc" align="left" min-width="200" />
      <el-table-column v-else label="服务费应收金额" prop="desc" align="left" min-width="200" />
      <el-table-column v-if="routerType == 'pending'" label="服务费实付金额" prop="desc" align="left" min-width="200" />
      <el-table-column v-else label="服务费实收金额" prop="desc" align="left" min-width="200" />
      <el-table-column label="收款方" prop="desc" align="left" min-width="200" />
      <el-table-column v-if="routerType == 'pending'" label="操作" prop="desc" align="left" min-width="200" />
    </el-table>
  </div>
</template>

<script>
import { checkStatus } from '@/utils/status'
import avater from "/public/img/default.png"

export default {
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    routerType: {
      type: String,
      default: 'pending'
    },
    status: {
      type: String,
      default: 'sale'
    }
  },
  data() {
    return {
      avater: avater
    };
  },
  computed: {
    getStatus() {
      return (type, status) => checkStatus(type, status)
    }
  },
  watch: {},
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex == 0) {
      if (columnIndex == 1) {
        return [1, 8];
      } else {
        return [0, 0]
      }
      // }
    },
    // 订单详情
    goDetail(row) {
      this.$emit('goDetail', row)
    },
    // 取消订单
    cancelClick(row) {
      this.$emit('cancelClick', row)
    },
    // 付款
    payBtn(row) {
      this.$emit('payBtn', row)
    },
    // 申请开票
    watchBtn(row) {
      this.$emit('watchBtn', row)
    },
    // 物流详情
    goWuliuDetail() {
      console.log(111)
    }
  },
  created() {

  },
  mounted() {

  },
  beforeCreate() { },
  beforeMount() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { },
}
</script>
<style lang='scss' scoped>
.order {
  height: 100%;
  overflow: auto;
  ::v-deep tbody {
    tr :first-child {
      th {
        padding: 10px 0;
      }
    }
  }
}
::v-deep .el-table__expanded-cell {
  padding: 0px 0px;
}
.builtinTableClass {
  width: 100%;
  border-color: #ebeef5;
}
.thClass {
  text-align: center;
  padding: 5px 0px;
  div {
    color: #595959 !important;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    padding: 0px 10px;
  }
  .submit {
    text-align: center !important;
  }
  .btn {
    display: block;
    padding: 5px 0;
  }
}
.imageBox {
  display: flex;
  align-items: center;
  .name {
    margin: 7px 0;
    color: #262626;
  }
  .pihao {
    color: #595959;
  }
  .el-image {
    padding: 0px !important;
  }
}
.duanluo {
  margin: 3px;
  font-weight: 400;
  .detail {
    float: right;
  }
}
.lastStatus {
  float: right;
}
::v-deep .el-table--enable-row-transition .el-table__body td.el-table__cell {
  background: #edf6f6;
  padding: 10px 0;
  border-radius: 4px;
}
::v-deep
  .el-table--enable-row-transition
  .el-table__body
  td.el-table__expanded-cell {
  background: #fff;
  padding: 0 0 10px 0;
}
::v-deep
  .el-table--enable-row-hover
  .el-table__body
  tr:hover
  > td.el-table__expanded-cell {
  background: #fff !important;
}

.el-table td.el-table__cell div {
  // color: white;
  text-align: left;
}
::v-deep .el-table tbody tr:hover > td {
  background: #edf6f6 !important;
}
.icon_status {
  height: 20px;
  width: 20px;
  vertical-align: top;
}
.text {
  margin-left: 10px;
}
.yellow {
  color: #f99b0d;
}
.green {
  color: #32bf78;
}
.gray {
  color: #8c8c8c;
}
.marrinLeft {
  margin-left: 16px;
}
</style>
