
<!--  -->
<template>
  <div class="comContent contentInner">
    <div class="titleInner">
      <MyTabs class="search"
              :tabi="tabsIndex"
              keyname="val"
              :tabs="tabsData"
              @change="tabChange" />
      <div class="title">
        <el-form ref="formTool"
                 :model="formTool"
                 :inline="true">
          <el-form-item prop="shopName">
            <el-input v-model="formTool.shopName"
                      clearable
                      placeholder="请输入企业名称"
                      size="small" />
          </el-form-item>
          <el-form-item prop="concatPhone">
            <el-input v-model="formTool.concatPhone"
                      clearable
                      placeholder="请输入手机号"
                      size="small" />
          </el-form-item>
          <el-form-item>
            <MyButton type="primary"
                      text="查询"
                      @click="goSearch" />
          </el-form-item>
          <el-form-item>
            <el-button size="small"
                       @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <div class="center">
      <MyTable :table-data="tableData"
               :index="index"
               :selection="selection"
               :page="page"
               :operation="operation"
               :table-option.sync="tableOption"
               @page-change="getcheckList"
               @handleSelectionChange="currentChange">
        <!-- <template slot="image" slot-scope="scope">
          <el-image :src="scope.row.image" style="width: 80px; height: 80px" />
        </template> -->
        <template slot="status"
                  slot-scope="scope">
          <MyTypes :type="scope.row.status" />
        </template>
        <template slot="address"
                  slot-scope="scope">
          <p>{{ scope.row.provinceName + scope.row.cityName + scope.row.areaName + scope.row.address }}</p>
        </template>
        <template slot="menu"
                  slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="editDetail(scope.row)">审核</el-button> -->
          <el-link :underline="false"
                   type="primary"
                   :disabled="tabsIndex!= '0'"
                   @click="editDetail(scope.row)">审核</el-link>
        </template>
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/myButton'
import MyTable from '@/components/myTable'
import MyTabs from '@/components/myTabs'
import MyTypes from '@/components/myTypes'
import { auditTypes } from '@/utils/enumeration'
import { auditCompanyList } from '@/api/auditcenter'

export default {
  components: { MyButton, MyTable, MyTabs, MyTypes },
  data () {
    return {
      text: '',
      clearable: true,
      formTool: {
        shopName: '',
        concatPhone: ''
      },
      tabsData: [
        { name: '待审核', num: 0, val: '0', numhide: false },
        { name: '审核通过', num: 0, val: '2', numhide: true },
        { name: '驳回', num: 0, val: '1', numhide: true },
      ],
      tabsIndex: '0',
      operation: true,
      selection: false,
      index: false,
      tableData: [],
      tableOption: [
        { label: '编号', prop: 'id' },
        { label: '企业名称', prop: 'shopName' }, // 这里表示自定义列 , slot: true
        { label: '企业类型', prop: 'shopTypeName' },
        { label: '负责人电话', prop: 'concatPhone' },
        { label: '详细地址', prop: 'address', slot: true, width: '400px' },
        { label: '状态', prop: 'status', slot: true }
        // { label: '操作', prop: 'menu' }
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
  created () {
    this.getcheckList()
  },
  mounted () {

  },
  methods: {
    tabChange (i) {
      // console.log('i:' + i)
      this.tabsIndex = i
      this.page.current = 1
      this.getcheckList()
    },
    getcheckList () {
      const { current, size } = this.page
      const params = {
        current, size, status: this.tabsIndex,
        ...this.formTool
      }
      auditCompanyList(params).then(res => {
        if (res.code === 0) {
          const { records, total } = res.data
          this.page.total = total
          // records.forEach(item => {
          //   item.status = auditTypes(item.status)
          // })
          this.tableData = records
          if (this.tabsIndex == '0') {
            this.tabsData[0].num = total
          }
        }
      })
    },
    reset () {
      // this.formTool.storeName = ''
      this.$refs.formTool.resetFields()
      this.page.current = 1
      this.getcheckList()
    },
    editDetail (row) {
      this.$router.push({ path: '/audit/auditcenter-auditcompanydetail', query: { id: row.requestId, btnShow: true } })
    },
    currentChange (val) {
      console.log('current', val)
    },
    goSearch () {
      const { shopName, concatPhone } = this.formTool
      console.log(shopName, concatPhone)
      if (shopName || concatPhone) {
        this.page.current = 1
        this.getcheckList()
      } else {
        this.$message({
          showClose: true,
          message: '请输入检索内容',
          type: 'warning'
        });
      }
    },
    // pageChange(val) {
    //   console.log('page', val)
    // },
    // handleSelectionChange(val) {
    //   console.log(val)
    // }
  }
}
</script>
<style lang='scss' scoped>
.comContent {
  .titleInner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 0px 24px;
    .title {
      display: flex;
      justify-content: right;
      align-items: center;
      .el-form--inline > .el-form-item {
        margin-bottom: 0px !important;
      }
    }
    .search {
      align-items: center;
    }
  }
}
.contentInner {
  padding: 0px;
}
.center {
  padding: 0px 24px;
  height: calc(100% - 120px);
}
</style>
