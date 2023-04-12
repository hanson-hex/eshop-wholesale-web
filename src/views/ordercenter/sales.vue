<template>
  <div class="classification new card">
    <!-- <el-tabs v-model="activeName" class="headerTabs" @tab-click="handleClick">
      <el-tab-pane label="全部采购单" name="first" />
      <el-tab-pane label="待付款" name="1">
        <span v-if="awaitPayQty > 0" slot="label">
          待付款
          <el-badge :value="awaitPayQty" class="item" />
        </span>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="2">
        <span v-if="awaitShipmentsQty > 0" slot="label">
          待发货
          <el-badge :value="awaitShipmentsQty" class="item" />
        </span>
      </el-tab-pane>
      <el-tab-pane label="已发货" name="3">
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
    <Tabs @tab-click="handleClick"
          :tabsList="tabsList"
          :activeName.sync="activeName"></Tabs>
    <div class="search fl_bet">
      <div class="left fl_cen">
        <div>
          <el-input v-model="query.goodsName"
                    size="small"
                    placeholder="商品名称"
                    style="width: 208px"
                    clearable
                    @keyup.enter.native="queryTableData(1)" />
          <el-input v-model="query.code"
                    size="small"
                    placeholder="订单号"
                    style="width: 208px; margin-left: 10px"
                    clearable
                    @keyup.enter.native="queryTableData(1)" />
          <el-input v-model="query.phone"
                    size="small"
                    placeholder="手机号码"
                    style="width: 208px; margin-left: 10px"
                    clearable
                    @keyup.enter.native="queryTableData(1)" />
          <el-date-picker v-model="time"
                          size="small"
                          class="picker"
                          style="margin-left: 10px"
                          type="daterange"
                          align="left"
                          unlink-panels
                          value-format="yyyy-MM-dd"
                          start-placeholder="开始日期"
                          range-separator="-"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                          clearable
                          @change="queryTableData(1)" />
        </div>
        <div>
          <el-button size="small"
                     type="primary"
                     style="margin-left: 10px"
                     @click="queryTableData(1)">查询</el-button>
          <el-button size="small"
                     @click="reset()">重置</el-button>
        </div>
      </div>
    </div>
    <div class="tables collapse_list">
      <Order v-if="tableData.length > 0"
             :router-type="routerType"
             :table-data="tableData"
             @goDetail="goDetail"
             @watchBtn="watchBtn"
             @goWuliuDetail="goWuliuDetail" />
      <el-empty v-else
                description="暂无数据"
                style="height:100%" />
    </div>
    <!-- 分页 -->
    <div class="bottom">
      <Pagination :total="query.pages"
                  :page.sync="query.current"
                  :limit.sync="query.size"
                  @pagination="changeSize" />
    </div>
  </div>
</template>
<script>
// import { correspondingVal } from '@/util/validate'
import { mapState, mapGetters } from 'vuex'
import { goodorderDetail, buyPageList, surePrint } from '@/api/servicecenter/pendingPayment.js'
import { checkStatus } from '@/utils/status'
import Order from '@/components/order'
import Pagination from '@/components/Pagination'
import Tabs from '@/components/Tabs'
// import { downloadFile } from '@/api/util'
export default {
  name: 'SaleList',
  components: {
    Order,
    Pagination,
    Tabs
  },
  data () {
    return {
      activeName: 'first', // tabs 传的值
      tabsList: [ // tabs 传的值
        {
          name: 'first',
          label: '所有订单',
          value: 0,
        },
        {
          name: '1',
          label: '待付款',
          value: 0,
        },
        {
          name: '2',
          label: '待发货',
          value: 0,
        },
        {
          name: '3',
          label: '配送中',
          value: 0,
        },
        {
          name: '8',
          label: '配送完成',
          value: 0,
        },
        {
          name: '9',
          label: '已完成',
          value: 0,
        },
        // {
        //   name: '10',
        //   label: '售后',
        //   value: 0,
        // },
      ],
      routerType: 'sale', // 区分是哪个页面进入的
      awaitPayQty: 0,
      awaitShipmentsQty: 0,
      alwaySendQty: 0,
      awaitReceivingQty: 0,
      // activeName: 'first',
      isLoading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近7天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近15天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近30天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      query: {
        current: 1,
        size: 10,
        pages: 0,
        code: '',
        goodsName: '',
        phone: '',
        startOrderTime: '',
        endOrderTime: '',
        type: 'SALE',
        status: ''
      },
      activeNames: '', // 展开list
      tableData: [],
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
    getStatus () {
      return (type, status) => checkStatus(type, status)
    }
  },
  methods: {
    // 重置
    reset () {
      this.time = []
      this.query.code = ''
      this.query.goodsName = ''
      this.query.phone = ''
    },
    // 查看资质
    look (row) {
      console.log(row, 'show')
      // this.$router.push({
      //   path: '/audit/qualificationAudit',
      //   query: {
      //     requestId: row.payShopId,
      //     show: true
      //   }
      // })
    },
    handleClick (tab, event) {
      if (this.activeName == 'first') {
        this.query.status = ''
      } else {
        this.query.status = this.activeName
      }
      this.queryTableData(1)
    },
    watchBtn (item) {
      surePrint({ id: item }).then((res) => {
        if (res.data.code == 0) {
          this.queryTableData(1)
        }
      })
    },
    validateBtn (val, row, name) {
      return correspondingVal(name, row, val, this.selectList)
    },
    queryTableData (current) {
      if (current) {
        this.query.current = current
      }
      if (this.time != null && this.time.length > 0) {
        this.query.startOrderTime = this.time[0]
        this.query.endOrderTime = this.time[1]
      } else {
        this.query.startOrderTime = null
        this.query.endOrderTime = null
      }
      buyPageList(this.query)
        .then((res) => {
          this.tabsList[1].value = res.data.awaitPayQty
          this.tabsList[2].value = res.data.awaitShipmentsQty
          this.tabsList[3].value = res.data.awaitReceivingQty
          this.tabsList[4].value = res.data.signQty
          this.tabsList[6].value = res.data.afterSaleQty
          this.isLoading = false
          if (res.data && res.code != 1) {
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
    handleChange (val) {
      console.log(val)
      this.isLoading = true
      this.tableList = []
      this.getdemoList()
    },
    async getdemoList () {
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
    changePage (val) {
      this.isLoading = true
      this.query.current = val.page
      this.queryTableData()
    },
    changeSize (val) {
      this.isLoading = true
      this.query.size = val.limit
      this.queryTableData()
    },
    typeSel (val) {
      this.isLoading = true
      if (val) {
        this.query.type = val
      } else {
        this.query.type = ''
      }
      this.query.current = 1
      this.queryTableData()
    },
    stopClick (e) {
      e.stopPropagation()
    },
    // 物流详情
    goWuliuDetail (id, orderId) {
      this.$router.push({
        path: '/ordercenter/ordercenter-procurementDetail',
        query: { id: id, orderId: orderId }
      })
    },
    goDetail (id, orderId) {
      this.$router.push({
        path: '/ordercenter/ordercenter-detail',
        query: { id: id, orderId: orderId }
      })
    },
    // 导出
    async exportFile () {
      await exportPage(this.query).then((res) => {
        downloadFile(res.data, '销售订单')
      })
    }
  },
  created () {
    this.queryTableData()
  },
  mounted () { }
}
</script>
<style lang="scss" scoped>
@import "@/styles/index.scss";
@import "../../styles/main";

.classification {
  padding: 0px;

  .headerTabs {
    padding: 0px 24px;
    border-bottom: 1px solid #f5f5f5;
  }

  .search,
  .collapse_list {
    margin-left: 24px !important;
    margin-right: 24px !important;
  }

  .collapse_list {
    height: calc(100% - 160px);
  }

  .bottom {
    margin: 0 24px;
  }
}

.card {
  overflow: hidden;
}

.collapse_list {
  overflow: auto;
}
</style>
