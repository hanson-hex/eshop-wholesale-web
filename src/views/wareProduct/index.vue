<!--  -->
<template>
  <div class="classification">
    <div class="header">
      <span class="font">仓库中的商品</span>
      <el-form ref="formTool" :model="formTool" :inline="true" style="text-align:left;">
        <el-form-item prop="name">
          <el-input v-model="formTool.name" placeholder="请输入商品名称" clearable size="small" />
        </el-form-item>
        <el-form-item prop="approvalNumber">
          <el-input v-model="formTool.approvalNumber" placeholder="请输入批准文号" clearable size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="clickSearch(1)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="center" style="position:relative">
      <div class="shangjia">
        <el-button size="small" type="primary" @click="clickBtn">批量上架</el-button>
      </div>
      <MyTable :table-data="tableData" :index="index" :selection="selection" :page="page" :operation="operation" :table-option.sync="tableOption" @page-change="getList" @handleSelectionChange="handleSelectionChange">
        <template slot="image" slot-scope="scope">
          <el-image :src="scope.row.image || avater" style="width: 80px; height: 80px" />
        </template>
        <template slot="menu" slot-scope="scope">
          <!-- <el-button type="button" size="mini" icon="el-icon-upload2" @click="deleteHandle(scope.row)">上架</el-button> -->
          <el-link :underline="false" type="primary" @click="deleteHandle(scope.row)">上架</el-link>
        </template>
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyTable from '@/components/myTable'
import { drugenumeration } from '@/utils/enumeration'
import { getWarebase, putaway } from '@/api/productManage/wareProduct'
import avater from "/public/img/default.png"

export default {
  name: 'WareProduct',
  components: { MyTable },
  data() {
    return {
      avater: avater,
      formTool: {
        name: '',
        approvalNumber: ''
      },
      selectionList: [],
      operation: true,
      selection: true,
      index: true,
      tableData: [],
      tableOption: [
        { label: '商品图', prop: 'image', slot: true }, // 这里表示自定义列
        { label: '商品名称', prop: 'name' },
        { label: '生产厂商', prop: 'factory' },
        { label: '批准文号', prop: 'approvalNumber' },
        { label: '商品属性', prop: 'type' },
        { label: '发布时间', prop: 'createTime' }
      ],
      page: {
        total: 0,
        current: 1,
        size: 20,
        pageSizes: [10, 20, 30, 50]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getWarebase()
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
    // 批量下架
    clickBtn() {
      if (this.selectionList.length == 0) {
        this.$message.warning('请先选择要下架的数据')
      } else {
        var arr = []
        this.selectionList.forEach(item => {
          const obj = {
            goodsId: item.goodsId
          }
          arr.push(obj)
        })
        this.batchPutaway(arr)
      }
    },
    // 上架接口
    batchPutaway(params) {
      putaway(params).then(res => {
        if (res.code === 0) {
          this.$message.success('批量上架成功')
          this.reset()
          this.getWarebase(1)
        } else {
          this.$message.error('批量上架失败')
        }
      })
    },
    // 重置查询条件
    reset() {
      this.$refs.formTool.resetFields()
    },
    // 单条上架
    deleteHandle(row) {
      const params = [{
        goodsId: row.goodsId
      }]
      putaway(params).then(res => {
        if (res.code === 0) {
          this.$message.success('上架成功')
          this.reset()
          this.getWarebase(1)
        } else {
          this.$message.error('上架失败')
        }
      })
    },
    // 切换分页
    getList() {
      this.getWarebase()
    },
    // 勾选
    handleSelectionChange(val) {
      this.selectionList = val
    },
    // 查询出售中的商品
    getWarebase(current) {
      if (current) { // 搜索条件改变从第一页开始查询
        this.page.current = current
      }
      const params = {
        ...this.formTool,
        current: this.page.current,
        size: this.page.size
      }
      getWarebase(params).then(res => {
        if (res.code == 0 && res.data) {
          this.tableData = res.data.records
          this.page.total = res.data.total
          if (this.tableData.length > 0) {
            this.tableData.forEach(item => {
              item.type = drugenumeration(item.type)
            })
          }
        } else {
          this.tableData = []
          this.page.total = 0
        }
      })
    },
    // 搜索
    clickSearch(current) {
      this.getWarebase(current)
    }
  }
}
</script>
<style lang='scss' scoped>
.classification {
  padding: 0px;
}
.header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px 0px 24px !important;
  border-bottom: 1px solid #f5f5f5;
  .font {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    text-align: left;
    color: #262626;
  }
  .el-form-item {
    margin: 0px 0px 0px 8px !important;
  }
}
.center {
  padding: 0 24px 0 24px;
  height: calc(100% - 115px);
  .shangjia {
    position: absolute;
    z-index: 2;
    bottom: -45px;
  }
}
</style>
