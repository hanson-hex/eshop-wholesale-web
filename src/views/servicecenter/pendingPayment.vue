<template>
  <div class="classification">
    <div class="title">
      <el-form ref="formTool" :model="query" class="posiitonRight" :inline="true" style="text-align:left;">
        <el-form-item prop="name">
          <el-input v-model="query.code" placeholder="按订单编号查询" clearable size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="queryTableData(1)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane label="全部采购单" name="first" /> -->
      <el-tab-pane label="已付款" name="8">
        <span slot="label">
          已付款
        </span>
      </el-tab-pane>
      <el-tab-pane label="未付款" name="1">
        <span v-if="awaitPayQty > 0" slot="label">
          未付款
          <el-badge :value="awaitPayQty" class="item" />
        </span>
      </el-tab-pane>
      <!-- <el-tab-pane label="已发货" name="3">
        <span v-if="alwaySendQty > 0" slot="label">
          已发货
          <el-badge :value="alwaySendQty" class="item" />
        </span>
      </el-tab-pane>
      <el-tab-pane label="待收货" name="4">
        <span v-if="awaitReceivingQty > 0" slot="label">
          待收货
          <el-badge :value="awaitReceivingQty" class="item" />
        </span>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="8" />
    </el-tabs> -->
      <div class="tables collapse_list">
        <Service v-if="tableData.length > 0" :router-type="routerType" :table-data="tableData" @goDetail="goDetail" @payBtn="payBtn" />
        <el-empty v-else description="暂无数据" style="height:100%" />
      </div>
      <!-- 分页 -->
      <div class="bottom">
        <Pagination :total="query.pages" :page.sync="query.current" :limit.sync="query.size" @pagination="changeSize" />
      </div>
      <!-- 支付 -->
      <el-dialog title="支付窗口" :visible.sync="dialogBtob" width="800px" :before-close="handleClose" class="goods_con" :close-on-click-modal="false">
        <payCont ref="payCont" :data-option="payData" @suceeBtn="suceeBtn" />
      </el-dialog>
    </el-tabs>
  </div>
</template>
<script>
// import { correspondingVal } from '@/util/validate'
import { mapState, mapGetters } from 'vuex'
import { goodorderDetail, buyPageList, payPurchase } from '@/api/servicecenter/pendingPayment.js'
import { checkStatus } from '@/utils/status'
import Pagination from '@/components/Pagination'
import Service from '@/components/service'
import payCont from '@/layout/components/pay/pay'
export default {
  name: 'SaleList',
  components: {
    Pagination,
    payCont,
    Service
  },
  data() {
    return {
      routerType: 'pending', // 判断是哪个页面进入
      dialogBtob: false,
      payData: {},
      awaitPayQty: 0,
      awaitShipmentsQty: 0,
      awaitReceivingQty: 0,
      activeName: '8',
      isLoading: false,
      query: {
        code: '',
        current: 1,
        size: 10,
        pages: 0,
        type: 'PURCHASE_SERVICE',
        status: '8'
        // startOrderTime: '',
        // endOrderTime: ''
      },
      activeNames: '', // 展开list
      tableData: [
      ],
      tableList: [],
      time: [],
      payid: ''
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    ...mapState('App', {
      selectList: 'selectList'
    }),
    getStatus() {
      return (type, status) => checkStatus(type, status)
    }
  },
  created() {
    this.queryTableData()
  },
  mounted() { },
  methods: {
    suceeBtn() {
      this.dialogBtob = false
      this.queryTableData(1)
      // if (this.$route.query && this.$route.query.id) {
      //   this.goodsId = this.$route.query.id
      //   this.goodsQtyVoList = [{ id: this.$route.query.id, qty: 1 }]
      //   this.getcon({ id: this.$route.query.id, qty: 1 }, false)
      // }
      // if (this.$route.query && this.$route.query.ids) {
      //   this.getcon(JSON.parse(this.$route.query.ids), true)
      // }
    },
    handleClick(tab) {
      this.query.status = this.activeName
      this.queryTableData(1)
    },
    // watchBtn(item) {
    //   surePrint({ id: item }).then((res) => {
    //     if (res.data.code == 0) {
    //       this.queryTableData(1)
    //     }
    //   })
    // },
    validateBtn(val, row, name) {
      // return correspondingVal(name, row, val, this.selectList)
    },
    queryTableData(current) {
      if (current) {
        this.query.current = current
      }
      // if (this.time != null && this.time.length > 0) {
      //   this.query.startOrderTime = this.time[0]
      //   this.query.endOrderTime = this.time[1]
      // } else {
      //   this.query.startOrderTime = null
      //   this.query.endOrderTime = null
      // }
      buyPageList(this.query)
        .then((res) => {
          this.awaitPayQty = res.data.awaitPayQty
          this.awaitShipmentsQty = res.data.awaitShipmentsQty
          this.awaitReceivingQty = res.data.awaitReceivingQty
          this.isLoading = false
          if (res.data && res.data.code != 1) {
            this.tableData = res.data.page.records || []
            this.query.pages = res.data.page.total
          } else {
            this.tableData = []
            this.query.pages = 0
          }
        })
        .catch(() => {
          this.tableData = []
          this.isLoading = false
        })
    },
    handleChange(val) {
      console.log(val)
      this.isLoading = true
      // this.tableList = []
      this.getdemoList()
    },
    async getdemoList() {
      const activeId = this.activeNames
      this.activeNames = ''
      if (activeId) {
        await goodorderDetail(activeId)
          .then((res) => {
            this.tableList = res.data.detailList
            this.isLoading = false
            this.$nextTick(() => {
              this.activeNames = activeId
            })
          })
          .catch(() => {
            this.isLoading = false
          })
      }
    },
    // changePage(val) {
    //   this.isLoading = true
    //   this.query.current = val
    //   this.queryTableData()
    // },
    changeSize(val) {
      this.isLoading = true
      this.query.current = val.page
      this.query.size = val.limit
      this.queryTableData()
    },
    stopClick(e) {
      e.stopPropagation()
    },
    goDetail(id, orderId) {
      this.$router.push({
        path: '/order/order-index',
        query: { id: id, orderId: orderId }
      })
    },
    payBtn(row) {
      this.orderCode = row.orderCode
      this.dialogBtob = true
      payPurchase(row.id)
        .then((res) => {
          if (res.code == 0) {
            this.payData = res.data
            // this.payData.amount = this.payData.amount.toFixed(2)
            this.dialogBtob = true
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(() => {
          this.isQrCode = false
          this.$message.error('请求错误，请联系管理员')
        })
    },
    handleClose() {
      this.$refs.payCont.loginForm = {
        password: '',
        code: ''
      }
      this.$refs.payCont.$refs.loginForm.resetFields()
      this.dialogBtob = false
    },
    reset() {
      this.query = {
        code: '',
        current: 1,
        size: 10,
        pages: 0,
        type: 'PURCHASE_SERVICE',
        status: '8'
        // startOrderTime: '',
        // endOrderTime: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/index.scss';
.classification {
  padding: 0px;
  .title {
    z-index: 2;
    position: absolute;
    top: 8px;
    right: 15px;
  }
  position: relative;
  .posiitonRight {
    // position: fixed;
    // top: 120px;
    // right: 35px;
    // z-index: 2;
  }
  .tables {
    height: calc(100% - 40px);
    padding-top: 0;
  }
  .el-tabs {
    height: 100%;
    ::v-deep .el-tabs__header {
      padding: 0px 24px;
      border-bottom: 1px solid #f5f5f5;
    }
    ::v-deep .el-tabs__content {
      padding: 0px 24px;
      height: calc(100% - 60px);
    }
  }
  .collapse_list {
    position: relative;

    .top_list {
      display: flex;
      position: relative;
      width: 100%;
      font-size: 14px;
      .emphasis_btn {
        margin-right: 30px;
      }
      .items {
        display: flex;
        flex: 1;
        padding-left: 24px;
        align-items: center;
        .item {
          height: 22px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #91939a;
          line-height: 22px;
          margin-right: 24px;

          span {
            min-width: 56px;
          }

          .msg {
            font-weight: 600;
            color: rgba(0, 0, 0, 0.85);
          }
        }

        .status {
          display: flex;
          align-items: center;
          .icon_status {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }

          .text {
            height: 22px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 600;
            color: #91939a;
            line-height: 22px;
          }

          .text.msg {
            color: #e7a23d;
          }

          .text.important {
            color: #67c33a;
          }
        }

        .item.nums {
          min-width: 210px;
        }
      }

      .btns {
        display: flex;
        align-items: center;
        padding-right: 16px;

        button {
          margin: 0 8px 0 0;
        }

        button.popover_btn {
          margin: 0 24px 0 0;
        }
      }
    }

    .el-collapse {
      border: 0;

      ::v-deep .el-collapse-item__header {
        height: 64px;
        background: #fafafa;
        border-radius: 4px 4px 0px 0px;
        border: 0;
        position: relative;
        line-height: 64px;
      }

      .el-collapse-item {
        margin-bottom: 24px;
      }

      ::v-deep .el-icon-arrow-right:before {
        content: '\e6df';
        color: #333;
      }

      ::v-deep .el-collapse-item__arrow.is-active {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
    ::v-deep .el-collapse-item__content {
      padding-bottom: 0px;
      color: #303133;
    }
    .bom_list {
      position: relative;
      border-top: 1px solid #e8e8e8;

      .list {
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
        padding: 12px 24px;

        .left,
        .cen,
        .right {
          flex: 1;
          align-items: center;
        }

        .left {
          display: flex;
          .img {
            width: 80px;
            height: 80px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #e8e8e8;

            img {
              width: 100%;
              height: auto;
            }
          }

          .names {
            margin-left: 16px;
            height: 44px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.65);
            line-height: 22px;
          }
        }
      }

      .cen {
        text-align: center;
        height: 22px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #91939a;
        line-height: 22px;
      }

      .right {
        display: flex;
        height: 22px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #91939a;
        line-height: 22px;

        div {
          flex: 1;
          text-align: right;
        }

        div.price {
          font-weight: 600;
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }

    .custom__table {
      position: relative;
    }
  }

  .xiaoyuandian {
    position: absolute;
    top: -20px;
    left: -5px;
    width: 12px;
    height: 12px !important;
    background: #ff4d50;
    border: 1px solid #ffffff;
    border-radius: 10px;
  }
}
</style>
