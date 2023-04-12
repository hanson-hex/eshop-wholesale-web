<!-- 订单下面的表格组件 -->
<template>
  <div class="order">
    <el-table :data="tableData"
              style="width: 100%"
              :span-method="arraySpanMethod"
              :default-expand-all="true">
      <el-table-column type="expand"
                       style="width:1px">
        <template slot-scope="props">
          <table v-if="props.row.orderDetailVo.length > 0"
                 rules="all"
                 frame="border"
                 class="builtinTableClass">
            <tr v-for="(item,index) in props.row.orderDetailVo"
                :key="index">
              <th class="thClass"
                  style="min-width:398px">
                <div class="imageBox">
                  <el-image style="width: 80px; height: 80px"
                            :src="item.image || avater" />
                  <div>
                    <p class="name">{{ item.name }}</p>
                    <p class="duanluo pihao">{{ item.approvalNumber }}</p>
                    <p class="duanluo">{{ item.factory }}</p>
                    <p class="duanluo">{{ item.specification }}</p>
                  </div>
                </div>
              </th>
              <th class="thClass"
                  style="min-width:100px">
                <p class="duanluo">￥{{ item.price }}</p>
              </th>
              <th class="thClass"
                  style="min-width:100px">
                <p class="duanluo">{{ item.qty }}</p>
              </th>
              <th class="thClass"
                  style="min-width:120px">
                <div class="submit">
                  <el-link v-if=" routerType == 'procument'"
                           :disabled="props.row.status != '8'"
                           :underline="false"
                           type="primary"
                           class="btn"
                           @click="applyService(props.row)">申请售后</el-link>
                  <el-link v-else
                           :disabled="props.row.status != '2'"
                           :underline="false"
                           type="primary"
                           class="btn"
                           @click="cancelSale(props.row)">取消售卖</el-link>
                </div>
              </th>
              <th v-if="index == 0"
                  class="thClass"
                  style="text-align:left;min-width:400px"
                  :rowspan="props.row.orderDetailVo.length + 1">
                <div>
                  <p class="duanluo">{{ item.contactsName }}</p>
                  <p class="duanluo">{{ item.contactsPhone }}</p>
                  <p class="duanluo">{{ item.address }}</p>
                </div>
              </th>
              <th v-if="index == 0"
                  class="thClass"
                  style="text-align:left;min-width:300px"
                  :rowspan="props.row.orderDetailVo.length + 1">
                <div>
                  <p class="duanluo">{{ item.expressTime }}
                    <span class="detail">
                      <el-link v-if="item.expressTime"
                               :underline="false"
                               type="primary"
                               class="btn"
                               @click="goWuliuDetail(props.row.id, props.row.orderId)">物流详情</el-link>
                    </span>
                  </p>
                  <p class="duanluo">{{ item.expressStatus }}</p>
                  <p class="duanluo">{{ item.expressDesc }}</p>
                </div>
              </th>
              <th v-if="index == 0"
                  class="thClass"
                  :rowspan="props.row.orderDetailVo.length + 1"
                  style="min-width:120px">
                <div class="submit">
                  <el-link :underline="false"
                           type="primary"
                           class="btn"
                           @click="goDetail(props.row.id, props.row.orderId)">订单详情</el-link>
                  <el-link v-if="props.row.status == '1' && routerType == 'procument'"
                           :underline="false"
                           type="primary"
                           class="btn"
                           @click="cancelClick(props.row.id)">取消订单</el-link>
                  <el-link v-if="props.row.status == '1' && routerType == 'procument'"
                           :disabled="loading"
                           :underline="false"
                           type="primary"
                           class="btn"
                           @click="payBtn(props.row)">付款</el-link>
                  <el-link v-if=" routerType != 'procument'"
                           :disabled="loading"
                           :underline="false"
                           type="primary"
                           class="btn"
                           @click="checkQualification(props.row)">查看资质</el-link>
                  <el-link v-if="props.row.status == '8' && props.row.serialStatus && routerType == 'procument'"
                           :disabled="props.row.serialStatus != 'OPEN' && props.row.serialStatus != 'ERROR'"
                           :underline="false"
                           type="primary"
                           class="btn"
                           @click="watchBtn(props.row)">{{
                    props.row.serialStatus == 'OPEN'
                      ? '申请开票'
                      : props.row.serialStatus == 'CHECK'
                      ? '开票审核中'
                      : props.row.serialStatus == 'ING'
                      ? '开票中'
                      : props.row.serialStatus == 'ERROR'
                      ? '开票失败'
                      : props.row.serialStatus == 'ALREADY'
                      ? '已开票'
                      : ''
                  }}</el-link>
                </div>
              </th>
            </tr>
          </table>
        </template>
      </el-table-column>
      <el-table-column label="商品信息"
                       prop="orderCode"
                       min-width="350"
                       align="left">
        <template slot-scope="scope">
          <div>
            <div v-if="scope.row.newTag"
                 class="xiaoyuandian item" />
            <span>订单号：</span>
            <span>{{ scope.row.orderCode }}</span>
            <span class="marrinLeft"> 创建时间：</span>
            <span>{{ scope.row.orderTime }}</span>
            <span class="marrinLeft"> 订单应付：</span>
            <span>￥{{ scope.row.amount }} </span>
            <span class="marrinLeft"> 订单实付：</span>
            <span>￥{{ scope.row.copeAmount }} </span>
            <span class="marrinLeft"> 商户：</span>
            <span> {{ scope.row.payShopName }} </span>
            <span class="lastStatus">
              <el-image class="icon_status"
                        :src="getStatus(1, scope.row.status)"
                        style="height:20px;width:20px" />
              <span class="text"
                    :class="getStatus(3, scope.row.status)">{{
                    getStatus(2, scope.row.status)
                  }}</span>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价（元）"
                       prop="orderCode"
                       align="left"
                       min-width="100" />
      <el-table-column label="数量"
                       prop="orderCode"
                       align="left"
                       min-width="100" />
      <el-table-column label="商品操作"
                       prop="orderCode"
                       align="left"
                       min-width="120" />
      <el-table-column label="收货信息"
                       prop="orderCode"
                       align="left"
                       min-width="400" />
      <el-table-column label="物流信息"
                       prop="orderCode"
                       align="left"
                       min-width="300" />
      <el-table-column label="操作"
                       prop="orderCode"
                       align="left"
                       min-width="120" />
    </el-table>
  </div>
</template>

<script>
import { checkStatus } from '@/utils/status'
import avater from "/public/img/default.png"

export default {
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    routerType: {
      type: String,
      default: 'sale'
    }
  },
  data () {
    return {
      avater: avater
    };
  },
  computed: {
    getStatus () {
      return (type, status) => checkStatus(type, status)
    }
  },
  watch: {},
  methods: {
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex == 0) {
      if (columnIndex == 1) {
        return [1, 8];
      } else {
        return [0, 0]
      }
      // }
    },
    // 查看资质
    checkQualification (row) {
      console.log(row, 'row')
      this.$router.push({ path: '/ordercenter/ordercenter-qualification', query: { id: row.payShopId, btnShow: false } })
    },
    // 申请售后
    applyService (row) {
      // this.$emit('applyService', row)
      this.$router.push('/ordercenter/ordercenter-afterSale')
    },
    // 取消售卖
    cancelSale (row) {
      this.$emit('cancelSale', row)
    },
    // 订单详情
    goDetail (id, orderId) {
      this.$emit('goDetail', id, orderId)
    },
    // 取消订单
    cancelClick (id) {
      this.$emit('cancelClick', id)
    },
    // 付款
    payBtn (row) {
      this.$emit('payBtn', row)
    },
    // 申请开票
    watchBtn (row) {
      this.$emit('watchBtn', row)
    },
    // 物流详情
    goWuliuDetail (id, orderId) {
      this.$emit('goWuliuDetail', id, orderId)
    }
  },
  created () {
    console.log(this.tableData, '13488188003')
  },
  mounted () {

  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
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
    color: #8c8c8c !important;
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
  padding: 10px 10px;
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
