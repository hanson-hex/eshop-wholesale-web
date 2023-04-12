
<!--  -->
<template>
  <div class="comContent">
    <el-form ref="formTool" :model="formTool" :inline="true" style="text-align:left;margin-bottom:5px;">
      <el-form-item prop="name">
        <el-input v-model="formTool.code" placeholder="请输入订单号" size="small" />
      </el-form-item>
      <el-form-item prop="date">
        <el-date-picker v-model="formTool.date" type="daterange" size="small" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item>
        <MyButton type="primary" text="查询" @click="getList()" />
      </el-form-item>
      <el-form-item>
        <MyButton type="" text="重置" @click="reset()" />
      </el-form-item>
    </el-form>
    <div class="center table_ul">
      <InvoiceTable v-for="(ul,i) in demos" :key="i" :info="ul" @click="tableLiClick" />
    </div>
    <Pagination v-show="page.total>0" :total="page.total" :page-sizes="[10, 20, 30, 50]" :page.sync="page.current" :limit.sync="page.size" @pagination="pageChange" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import MyButton from '@/components/myButton'
// import MyTable from '@/components/myTable'
import InvoiceTable from '@/components/invoiceTable'
import { drugenumeration } from '@/utils/enumeration'
import { getcheckList } from '@/api/productManage/auditProduct'
import { busiPage, MockLogin } from '@/api/financialcenter'

export default {
  components: { MyButton, InvoiceTable, Pagination }, // , MyTable
  data() {
    return {
      text: '',
      clearable: true,
      formTool: {
        code: '',
        date: []
      },
      operation: true,
      selection: false,
      index: false,
      demos: [
        {
          time: '2022-09-05 09:23:11', ordernum: '2143546', realypay: '1200', pay: '1200', yun: '12', goods: [
            { name: '商品名称1', imgurl: '', price: '123.00', num: 23 },
            { name: '商品名称2', imgurl: '', price: '123.00', num: 23 }
          ]
        },
        {
          time: '2022-09-01 09:23:11', ordernum: '2143546', realypay: '1200', pay: '1200', yun: '12', goods: [
            { name: '商品名称3', imgurl: '', price: '123.00', num: 23 }
          ]
        }
      ],
      tableData: [],
      tableOption: [
        { label: '编号', prop: 'goodsId' },
        { label: '商品图', prop: 'image', slot: true }, // 这里表示自定义列
        { label: '商品名称', prop: 'name' },
        { label: '第三方商品编码', prop: 'medicineCode' },
        { label: '批准文号', prop: 'approvalNumber' },
        { label: '商品属性', prop: 'type' },
        { label: '发布时间', prop: 'createTime' }
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
    this.getList()
    MockLogin({ username: 'admin' }).then(res => {
      console.log(res)
    })
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
    getList() {
      const { current, size } = this.page
      const { code, date } = this.formTool
      // console.log(code, date)
      const params = { current, size, code: null, startDate: null, endDate: null }
      if (code) { params.code = code }
      if (date && date.length > 0) {
        params.startDate = date[0]
        params.endDate = date[1]
      }
      // console.log(params)
      busiPage(params).then(res => {
        if (res.code === 0) {
          // this.tableData = res.data.records
          // this.page.total = res.data.total

          // this.tableData.forEach(item => {
          //   item.type = drugenumeration(item.type)
          // })
        }
      })
    },
    reset() {
      // this.formTool.storeName = ''
      this.$refs.formTool.resetFields()
      this.getList()
    },
    editDetail(row) {
      this.$router.push({ path: '/productManage/auditProduct-edit', query: { goodsId: row.goodsId }})
    },
    tableLiClick(val, i) {
      console.log(val, i)
    },
    changePage(val) {
      console.log(val)
    },
    changeSize(val) {
      console.log(val)
    },
    pageChange() {
      console.log(val)
      // this.$emit('page-change')
    },
    handleSelectionChange(val) {

    }
  }
}
</script>
<style lang='scss' scoped>
.table {
  &_ul {
    position: relative;
    margin-bottom: 20px;
  }
  // &_li{
  //   position: relative;
  //   &_title{
  //     display: flex;
  //     align-items: center;
  //     padding: 0 20px;
  //     background: #e4e4e4;
  //     p{
  //       margin-right: 30px;
  //       color: #333;
  //       margin: 10px 0;
  //     }
  //   }
  // }
  // &_el{
  //   table{
  //     width: 100%;
  //     border-top:1px solid #ccc;
  //     border-left:1px solid #ccc;
  //   }
  //   tr{}
  //   th{
  //     font-weight: 400;
  //     font-size: 16px;
  //     background: #eee;
  //     border-bottom:1px solid #ccc;
  //     border-right:1px solid #ccc;
  //     div{}
  //   }
  //   td{
  //     border-bottom:1px solid #ccc;
  //     border-right:1px solid #ccc;
  //     div{
  //       text-align: center;
  //     }
  //   }
  // }
}
</style>
