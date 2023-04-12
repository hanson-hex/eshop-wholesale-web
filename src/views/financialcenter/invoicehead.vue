
<!--  -->
<template>
  <div class="comContent">
    <MyButton v-if="tabsIndex == 0" type="primary" icon="" text="新增发票抬头" style="position: absolute;right: 30px;top: 10px;" @click="addHead(null)" />
    <MyTabs class="myTabs" :tabi="tabsIndex" :tabs="tabsData" numhide @change="tabChange" />
    <div v-if="tabsIndex == 0" style="height:calc(100% - 80px)">
      <div class="center">
        <MyTable :table-data="tableData" :index="index" :showpage="false" :selection="selection" :page="page" :operation="operation" :table-option.sync="tableOption" @page-change="getList" @handleSelectionChange="handleSelectionChange">
          <template slot="buyerName" slot-scope="scope">
            <div style="padding:5px;">
              <el-badge v-if="scope.row.preferred" value="默认" class="item">{{ scope.row.buyerName }}</el-badge>
              <span v-else>{{ scope.row.buyerName }}</span>
            </div>
          </template>
          <!-- <template slot="image" slot-scope="scope">
            <el-image :src="scope.row.image" style="width: 80px; height: 80px" />
          </template> -->
          <template slot="menu" slot-scope="scope">
            <el-link :underline="false" type="primary" @click="addHead(scope.row)">编辑</el-link>
          </template>
        </MyTable>
      </div>
    </div>
    <div v-if="tabsIndex == 1">
      <InvoiceHeadMy />
    </div>
    <HeadTem ref="headTem" @submit="getList" />
  </div>
</template>

<script>
import MyTabs from '@/components/myTabs'
import MyButton from '@/components/myButton'
import MyTable from '@/components/myTable'
import InvoiceHeadMy from './components/invoiceheadmy'
import HeadTem from './components/headtem'
import { drugenumeration } from '@/utils/enumeration'
// import { getcheckList } from '@/api/productManage/auditProduct'
import { getInvoiceHeader } from '@/api/financialcenter'
export default {
  components: { MyButton, MyTable, MyTabs, InvoiceHeadMy, HeadTem },
  data() {
    return {
      text: '',
      clearable: true,
      tabsData: [{ name: '购买方发票抬头' }, { name: '销售方发票抬头' }],
      tabsIndex: 0,
      formTool: {
        name: '',
        approvalNumber: ''
      },
      operation: true,
      selection: false,
      index: false,
      tableData: [],
      tableOption: [
        { label: '发票抬头', prop: 'buyerName', slot: true },
        { label: '纳税人识别号', prop: 'buyerTaxpayerId' }, // 这里表示自定义列, slot: true
        { label: '注册电话', prop: 'buyerRecipientPhone' },
        { label: '注册地址', prop: 'buyerAddress' },
        { label: '开户账号', prop: 'buyerAccount' },
        { label: '开户银行', prop: 'buyerBank' }
      ],
      page: {
        total: 10,
        current: 1,
        size: 10
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
  },
  mounted() { },
  beforeCreate() { },
  beforeMount() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { },
  methods: {
    tabChange(i) {
      this.tabsIndex = i
      // this.page.current = 1
      // this.page.total = 0
      // this.tableData = []
      // this.getList()
    },
    addHead(val) {
      this.$refs['headTem'].open(val)
    },
    getList() {
      // const { current, size } = this.page
      // const params = {
      //   current, size,
      //   // ...this.formTool
      // }
      getInvoiceHeader({}).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
          // this.page.total = res.data.total
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    handleSelectionChange(val) {

    }
  }
}
</script>
<style lang='scss' scoped>
.comContent {
  position: relative;
  padding: 0px;
  .myTabs {
    padding: 0 24px;
    border-bottom: 1px solid #f5f5f5 !important;
  }
  .center {
    margin: 0 24px;
    height: 100%;
  }
}
::v-deep .el-badge__content {
  padding: 0 6px !important;
}
</style>
