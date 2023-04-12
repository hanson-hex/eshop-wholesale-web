
<!--  -->
<template>
  <div class="comContent">
    <!-- <div class="incom_header">
      <h2></h2>
    </div> -->
    <el-form ref="formTool" :model="formTool" :inline="true" style="text-align:left;">
      <el-form-item prop="name">
        <el-input v-model="formTool.name" placeholder="请输入商品名称" size="small" />
      </el-form-item>
      <el-form-item prop="approvalNumber">
        <el-input v-model="formTool.approvalNumber" placeholder="请输入批准文号" size="small" />
      </el-form-item>
      <el-form-item>
        <MyButton type="success" text="查询" @click="getcheckList()" />
      </el-form-item>
      <el-form-item>
        <MyButton type="success" text="重置" @click="reset()" />
      </el-form-item>
    </el-form>
    <div class="center">
      <MyTable :table-data="tableData" :index="index" :selection="selection" :page="page" :operation="operation" :table-option.sync="tableOption" @page-change="getcheckList" @handleSelectionChange="handleSelectionChange">
        <template slot="image" slot-scope="scope">
          <el-image :src="scope.row.image" style="width: 80px; height: 80px" />
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button type="button" size="mini" icon="el-icon-edit" @click="editDetail(scope.row)">编辑</el-button>
        </template>
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/myButton'
import MyTable from '@/components/myTable'
import { drugenumeration } from '@/utils/enumeration'
import { getcheckList } from '@/api/productManage/auditProduct'
export default {
  components: { MyButton, MyTable },
  data() {
    return {
      text: '',
      clearable: true,
      formTool: {
        name: '',
        approvalNumber: ''
      },
      operation: true,
      selection: false,
      index: false,
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
    this.getcheckList()
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
    getcheckList() {
      const params = {
        current: this.page.current,
        size: this.page.size,
        ...this.formTool
      }
      getcheckList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.records
          this.page.total = res.data.total

          this.tableData.forEach(item => {
            item.type = drugenumeration(item.type)
          })
        }
      })
    },
    reset() {
      // this.formTool.storeName = ''
      this.$refs.formTool.resetFields()
      this.getcheckList()
    },
    editDetail(row) {
      this.$router.push({ path: '/productManage/auditProduct-edit', query: { goodsId: row.goodsId }})
    },
    handleSelectionChange(val) {

    }
  }
}
</script>
<style lang='scss' scoped>
</style>
