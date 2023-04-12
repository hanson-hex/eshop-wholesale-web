<!--  -->
<template>
  <div class="classification">
    <div class="top">
      <el-form ref="formTool" :model="formTool" :inline="true" style="text-align:left;">
        <el-form-item prop="relateStatus">
          <el-select v-model="formTool.relateStatus" size="small" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="skuName">
          <el-input v-model="formTool.skuName" placeholder="请输入SKU名称" clearable size="small" />
        </el-form-item>
        <el-form-item prop="shopName">
          <el-input v-model="formTool.shopName" placeholder="请输入商铺名称" clearable size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="clickSearch(1)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button size="small" type="" @click="returnMain">返回</el-button>
        <el-button size="small" type="primary" icon="el-icon-remove-outline" @click="removalrule">移除规则</el-button>
        <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="associationrule">关联规则</el-button>
      </div>
    </div>

    <div class="center">
      <MyTable :table-data="tableData" :index="index" :selection="selection" :page="page" :operation="operation" :table-option.sync="tableOption" @page-change="getList" @handleSelectionChange="handleSelectionChange">
        <template slot="image" slot-scope="scope">
          <el-image :src="scope.row.image" style="width: 80px; height: 80px" />
        </template>
        <template slot="relatedStatus" slot-scope="scope">
          <el-switch v-model="scope.row.relatedStatus" @change="change(scope.row)" />
        </template>
        <!-- <template slot="menu" slot-scope="scope">
          <el-button type="button" size="mini" icon="el-icon-delete" @click="deleteHandle(scope.row)">下架</el-button>
        </template> -->
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyTable from '@/components/myTable'
import { skuinfo, updateskuinfo } from '@/api/divisionrulemanagement/divisionrule'

export default {
  components: { MyTable },
  data() {
    return {
      formTool: {
        relateStatus: '2',
        skuName: '',
        shopName: ''

      },
      ledgerRulesId: '',
      selectionList: [],
      options: [
        {
          value: '2',
          label: '全部'
        }, {
          value: '1',
          label: '已关联'
        }, {
          value: '0',
          label: '未关联'
        }
      ],
      operation: false,
      selection: true,
      index: false,
      tableData: [
        {
          image: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '111',
          medicineCode: '222',
          approvalNumber: '33'
        }
      ],
      tableOption: [
        { label: '商品图', prop: 'image', slot: true }, // 这里表示自定义列
        { label: 'SKU信息', prop: 'skuName' },
        { label: '商铺名称', prop: 'factory' },
        { label: '关联状态', prop: 'relatedStatus', slot: true }
      ],
      page: {
        total: 1,
        current: 1,
        size: 20,
        pageSizes: [10, 20, 30, 50]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.ledgerRulesId = this.$route.query.id
    this.getgoodsbase()
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
    // 重置查询条件
    reset() {
      this.formTool = {
        relateStatus: '2',
        skuName: '',
        shopName: ''
        // ledgerRulesId: ''
      }
    },
    // 切换分页
    getList() {
      this.getgoodsbase()
    },
    // 勾选
    handleSelectionChange(val) {
      this.selectionList = val
    },
    // 查询规则关联的商品
    getgoodsbase(current) {
      if (current) { // 搜索条件改变从第一页开始查询
        this.page.current = current
      }
      const params = {
        ...this.formTool,
        current: this.page.current,
        size: this.page.size
        // ledgerRulesId: this.ledgerRulesId
      }
      if (this.formTool.relateStatus == 2) {
        params.relateStatus = ''
      }
      skuinfo(params).then(res => {
        if (res.code == 0 && res.data) {
          this.tableData = res.data.records
          this.page.total = res.data.total
          if (this.tableData.length > 0) {
            this.tableData.forEach(item => {
              if (item.relatedStatus == 1) {
                this.$set(item, 'relatedStatus', true)
              } else {
                this.$set(item, 'relatedStatus', false)
              }
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
      this.getgoodsbase(current)
    },
    // 返回
    returnMain() {
      this.$router.push('/commissionmanagement/commissionmanagement-divisionrulemanagement')
    },
    // 关联规则
    associationrule() {
      if (this.selectionList.length == 0) {
        this.$message.warning('请先选择你要关联的数据')
      } else {
        this.updateSku(this.selectionList, true)
      }
    },
    // 移除规则(多条)
    removalrule() {
      if (this.selectionList.length == 0) {
        this.$message.warning('请先选择你要移除关联的数据')
      } else {
        this.updateSku(this.selectionList, false)
      }
    },
    // 移除规则(单条)
    change(row) {
      this.updateSku([row], row.relatedStatus)
    },
    // 真实改变状态的接口
    updateSku(tableData, status) {
      let params = {
        skuId: [],
        ledgerRulesId: this.ledgerRulesId,
        relatedStatus: false
      }
      tableData.forEach(item => {
        params.skuId.push(item.skuId)
      })
      console.log(params.skuId)
      if (status == true) {
        params.relatedStatus = 1
      } else {
        params.relatedStatus = 0
      }
      updateskuinfo(params).then(res => {
        if (res.code == 0) {
          this.$message.success('更新成功')
          this.getgoodsbase()
        } else {
          this.$message.success('更新失败')
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/variables.scss';
.classification {
  background: white;
  // height: $contentHeight;
  padding: 0px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 24px;
    border-bottom: 1px solid #f5f5f5;
    .el-form-item {
      margin-bottom: 0px !important;
    }
    .item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .label {
        width: 120px;
      }
      .button {
        margin-right: 20px;
        ::v-deep .el-button {
          color: $subMenuActiveText;
          background-color: $butColor;
          border-color: $butColor;
          &:hover {
            color: $subMenuActiveText;
            background-color: $butColor;
            border-color: $butColor;
          }
          &:active {
            color: $subMenuActiveText;
            background: $butColor;
            background-color: $butColor;
            border-color: $butColor;
          }
          &:focus {
            color: $subMenuActiveText;
            background-color: $butColor;
            border-color: $butColor;
          }
        }
      }
    }
  }
  .center {
    margin: 0 24px;
    height: calc(100% - 117px);
  }
}
</style>
