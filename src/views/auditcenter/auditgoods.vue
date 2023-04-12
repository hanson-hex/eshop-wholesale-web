
<!--  -->
<template>
  <div class="comContent contentInner">
    <div class="titleInner">
      <MyTabs class="search" :tabi="tabsIndex" keyname="val" :tabs="tabsData" @change="tabChange" />
      <div class="title">
        <el-form ref="formTool" :model="formTool" :inline="true" style="text-align:left;">
          <el-form-item prop="name">
            <el-input v-model="formTool.name" placeholder="请输入商品名称" size="small" />
          </el-form-item>
          <el-form-item prop="factory">
            <el-input v-model="formTool.factory" placeholder="请输入生产厂家" size="small" />
          </el-form-item>
          <el-form-item>
            <MyButton type="primary" text="查询" @click="getList()" />
          </el-form-item>
          <el-form-item>
            <MyButton type="" text="重置" @click="reset()" />
          </el-form-item>
        </el-form>
      </div>

    </div>
    <div class="center">
      <MyTable :table-data="tableData" :index="index" :selection="selection" :page="page" :operation="operation" :table-option.sync="tableOption" @page-change="getList" @handleSelectionChange="handleSelectionChange">
        <template slot="image" slot-scope="scope">
          <el-image :src="scope.row.image" style="width: 80px; height: 80px" />
        </template>
        <template slot="status" slot-scope="scope">
          <MyTypes :type="scope.row.status" />
        </template>
        <template slot="menu" slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="editDetail(scope.row)">审核</el-button> -->
          <el-link :underline="false" type="primary" :disabled="tabsIndex!= 'AWAIT'" @click="editDetail(scope.row)">审核</el-link>
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
import { drugenumeration } from '@/utils/enumeration'
import { goodsCheckPages } from '@/api/auditcenter'
export default {
  components: { MyButton, MyTable, MyTabs, MyTypes },
  data() {
    return {
      text: '',
      clearable: true,
      // tabsIndex: 0,
      // tabsData: [{ name: '待审核', num: 0 }, { name: '审核通过', num: 0 }, { name: '驳回', num: 0 }],
      tabsData: [
        { name: '待审核', num: 0, val: 'AWAIT', numhide: false },
        { name: '审核通过', num: 0, val: 'ALREADY', numhide: true },
        { name: '驳回', num: 0, val: 'FAIL', numhide: true },
      ],
      tabsIndex: 'AWAIT',
      formTool: {
        name: '',
        factory: ''
      },
      operation: true,
      selection: false,
      index: false,
      tableData: [],
      tableOption: [
        // { label: '编号', prop: 'goodsId' },
        { label: '商品图', prop: 'image', slot: true }, // 这里表示自定义列
        { label: '商品信息', prop: 'name' },
        { label: '税务分类编码', prop: 'taxCode' },
        { label: '生产厂家', prop: 'factory' },
        { label: '批准文号', prop: 'approvalNumber' },
        { label: '申请时间', prop: 'createTime' },
        { label: '状态', prop: 'status', slot: true }
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
      // console.log(i)
      this.tabsIndex = i
      this.page.current = 1
      this.getList()
    },
    getList() {
      const { current, size } = this.page
      const params = { current, size, status: this.tabsIndex, ...this.formTool }
      goodsCheckPages(params).then(res => {
        // console.log(res)
        if (res.code == 0) {
          this.tableData = res.data.goodsListVos.records
          this.page.total = res.data.goodsListVos.total
          if (this.tabsIndex == 'AWAIT') {
            this.tabsData[0].num = res.data.sumQty
          }
        }
      })
    },
    reset() {
      // this.formTool.storeName = ''
      this.$refs.formTool.resetFields()
      this.page.current = 1
      this.getList()
    },
    editDetail(row) {
      this.$router.push({ path: '/audit/auditcenter-auditgoodsdetail', query: { goodsId: row.goodsId }})
    },
    handleSelectionChange(val) {

    }
  }
}
</script>
<style lang='scss' scoped>
.contentInner {
  padding: 0px;
}
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
.center {
  padding: 0px 24px;
  height: calc(100% - 120px);
}
.sh {
  &_type {
    position: relative;
    color: #666;
    &:before {
      content: '';
      display: inline-block;
      margin-right: 5px;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      // vertical-align: middle;
      background: #f99b0d;
    }
    &.success {
      &:before {
        background: #0da1a8;
      }
    }
    &.err {
      &:before {
        background: #ff4d4f;
      }
    }
  }
}
</style>
