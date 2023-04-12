
<!--  -->
<template>
  <div class="comContent">
    <div class="shourujilu">
      <!-- <span></span> -->
      收入记录
    </div>
    <div class="content">
      <header class="header">
        <div class="total">收入总金额(元)</div>
        <div class="number">
          <span>￥{{ totalPayeeAmmount }}</span>
          <!-- <span class="xiaosu">.00</span> -->
        </div>
      </header>
      <div class="title">
        <div class="detail">收入明细</div>
        <el-form ref="formTool" :model="formTool" :inline="true" style="text-align:left;">
          <el-form-item prop="id">
            <el-input v-model="formTool.orderCode" placeholder="请输入订单号" size="small" />
          </el-form-item>
          <el-form-item prop="date">
            <el-date-picker v-model="formTool.date" value-format="yyyy-MM-dd" type="daterange" size="small" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
          <el-form-item>
            <MyButton type="primary" text="查询" @click="getcheckList()" />
          </el-form-item>
          <el-form-item>
            <MyButton type="" text="重置" @click="reset()" />
          </el-form-item>
        </el-form>
      </div>

      <el-divider />
      <div class="search_income">收入：<span>{{ money }}</span>元</div>
      <div class="center">
        <MyTable :table-data="tableData" class="myMoney" :index="index" :selection="selection" :page="page" :operation="operation" :table-option.sync="tableOption" @page-change="getcheckList" @handleSelectionChange="handleSelectionChange">
          <template slot="image" slot-scope="scope">
            <el-image :src="scope.row.image" style="width: 80px; height: 80px" />
          </template>
          <!-- <template slot="menu" slot-scope="scope">
          <el-button type="button" size="mini" icon="el-icon-edit" @click="editDetail(scope.row)">编辑</el-button>
        </template> -->
        </MyTable>
      </div>
    </div>

  </div>
</template>

<script>
import MyButton from '@/components/myButton'
import MyTable from '@/components/myTable'
import { drugenumeration } from '@/utils/enumeration'
import { getcheckList } from '@/api/productManage/auditProduct'
import { getShopPayRecord } from '@/api/financialcenter.js'
export default {
  components: { MyButton, MyTable },
  data() {
    return {
      text: '',
      clearable: true,
      totalPayeeAmmount: '0.00',
      money: '0.00',
      formTool: {
        orderCode: '',
        date: []
      },
      operation: false,
      selection: false,
      index: false,
      tableData: [],
      tableOption: [
        { label: '序号', prop: 'id' },
        { label: '交易流水号', prop: 'paySerialNo' }, // 这里表示自定义列, slot: true
        { label: '订单号', prop: 'orderCode' },
        { label: '收入时间', prop: 'finishTime' },
        { label: '金额(￥)', prop: 'payAmount' }
      ],
      page: {
        total: 10,
        current: 1,
        size: 10
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.getcheckList()
    this.getShopPayRecord()
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
  methods: {
    getShopPayRecord() {
      let params = {
        current: 1, // 页码
        size: 10, // 分页大小
        orderCode: this.formTool.orderCode, // 订单id
        startDate: !this.formTool.date || this.formTool.date.length == 0 ? '' : this.formTool.date[0], // 开始时间
        endDate: !this.formTool.date || this.formTool.date.length == 0 ? '' : this.formTool.date[1] // 结束时间
      }
      // this.loadingBtn = true
      getShopPayRecord(params).then(res => {
        if (res.code === 0) {
          if (res.data.pageData.records) {
            this.tableData = res.data.pageData.records
          } else {
            this.tableData = []
          }
          this.page.total = res.data.pageData.total
          this.totalPayeeAmmount = res.data.totalPayeeAmmount
          if (this.tableData.length > 0) {
            this.tableData.forEach(item => {
              item.type = drugenumeration(item.type)
              let a = 0
              this.tableData.forEach(item => {
                a = (a * 100 + item.realAmount * 100) / 100
              })
              this.money = a.toFixed(2)
            })
          } else {
            this.money = 0
          }
        }
        // setTimeout(() => {
        //   // this.loadingBtn = false
        // }, 500)
      })
        .catch(() => {
          // this.loadingBtn = false
        })
    },
    getcheckList() {
      const params = {
        current: this.page.current,
        size: this.page.size,
        orderCode: this.formTool.orderCode, // 订单id
        startDate: !this.formTool.date || this.formTool.date.length == 0 ? '' : this.formTool.date[0], // 开始时间
        endDate: !this.formTool.date || this.formTool.date.length == 0 ? '' : this.formTool.date[1] // 结束时间
      }
      getShopPayRecord(params).then(res => {
        if (res.code == 0) {
          if (res.data.pageData.records) {
            this.tableData = res.data.pageData.records
          } else {
            this.tableData = []
          }
          this.page.total = res.data.pageData.total
          this.totalPayeeAmmount = res.data.totalPayeeAmmount
          if (this.tableData.length > 0) {
            this.tableData.forEach(item => {
              item.type = drugenumeration(item.type)
              let a = 0
              this.tableData.forEach(item => {
                a = (a * 100 + item.realAmount * 100) / 100
              })
              this.money = a.toFixed(2)
            })
          } else {
            this.money = 0
          }
        }
      })
    },
    reset() {
      this.formTool.orderCode = ''
      this.formTool.date = []
      // this.getcheckList()
    },
    handleSelectionChange(val) {

    }
  }
}
</script>
<style lang='scss' scoped>
.comContent {
  padding: 0px;
}
.shourujilu {
  height: 56px;
  line-height: 56px;
  font-weight: 600;
  color: #262626;
  font-size: 16px;
  padding: 0 24px;
  border-bottom: 1px solid #f5f5ff;
}
.content {
  margin: 0 24px;
  height: calc(100% - 80px);
}
.header {
  padding-top: 12px;
  font-size: 16px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 600;
  padding-bottom: 40px;
  // border-bottom: 1px solid;
  .total {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #8c8c8c;
    padding: 20px 0px;
  }
  .number {
    font-size: 24px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    text-align: left;
    color: #f6212d;
    .xiaosu {
      font-size: 24px;
    }
  }
}
.search_income {
  margin: 15px 0;
  font-size: 14px;
  color: #8c8c8c;
  text-align: left;
  span {
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    color: #f6212d;
  }
}
.comContent {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-form-item {
      margin-bottom: 0px !important;
    }
    .detail {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      text-align: left;
      color: #262626;
    }
  }
  .center {
    height: calc(100% - 245px);
    ::v-deep .myMoney {
      .el-table__body td:last-child {
        color: red;
      }
    }
  }
}
</style>
