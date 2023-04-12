
<!--  -->
<template>
  <div>
    <div class="header">
      <el-form ref="formTool" :model="formTool" :inline="true" style="text-align:left;" label-width="120px">
        <el-form-item prop="storeId">
          <el-input v-model="formTool.taxCode" placeholder="合并编码" :clearable="clearable" size="small" />
        </el-form-item>
        <el-form-item prop="storeNum">
          <MyInput v-model="formTool.goodsLabour" placeholder="货物和劳务名称" :clearable="clearable" size="small" />
        </el-form-item>
        <el-form-item>
          <MyButton type="primary" text="查询" @click="search()" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="center">
      <MyTable class="tableHeight" :max-height="maxHeight" :table-data="tableData" :index="index" :selection="selection" :page="page" :table-option.sync="tableOption" @page-change="goodStaxList()" @handleCurrentChange="handleCurrentChange">
        <template slot="caozuo" slot-scope="scope">
          <el-radio v-model="checkIndex" :label="scope.$index" @input="checkIndexMethod" />
        </template>
      </MyTable>
    </div>
    <div slot="footer" class="dialog-footer">
      <div class="footerBtn">
        <el-button size="small" @click="closeDialog()">取消</el-button>
        <el-button size="small" type="primary" @click="comfirm()">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput'
import MyButton from '@/components/myButton'
import MyTable from '@/components/myTable'
import { goodStaxList } from '@/api/com'
export default {
  components: { MyButton, MyTable, MyInput },
  data() {
    return {
      maxHeight: '465',
      checkIndex: '',
      text: '',
      clearable: true,
      formTool: {
        taxCode: '',
        goodsLabour: ''
      },
      index: true,
      selection: false,
      tableData: [],
      tableOption: [
        { label: '合并编码', prop: 'taxCode', width: '250' },
        { label: '货物和劳务名称', prop: 'goodsLabour', width: '130' }, // 这里表示自定义列
        { label: '商品和服务分类简称', prop: 'goodsServiceClass', width: '220' },
        { label: '增值税税率', prop: 'taxRate', width: '130' },
        { label: '说明', prop: 'explains', width: '130' },
        { label: '增值税特殊管理', prop: 'addTaxManager', width: '160' },
        { label: '增值税政策依据', prop: 'addTaxGist', width: '130' },
        { label: '增值税特殊内容代码', prop: 'addTaxCode', width: '220' },
        { label: '消费税管理', prop: 'consumptionManager', width: '130' },
        { label: '消费税政策依据', prop: 'consumptionGist', width: '130' },
        { label: '消费税特殊内容代码', prop: 'consumptionCode', width: '220' },
        { label: '操作', prop: 'caozuo', width: '60', fixed: 'right', slot: true },
      ],
      page: {
        total: 10,
        current: 1,
        size: 10
      },
      currentRow: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.goodStaxList()
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
    goodStaxList() {
      const params = {
        current: this.page.current,
        size: this.page.size,
        ...this.formTool
      }
      goodStaxList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.records
          this.page.total = res.data.total
        }
      })
    },
    reset() {
      this.formTool.taxCode = ''
      this.formTool.goodsLabour = ''
      this.goodStaxList()
    },
    search() {
      this.goodStaxList()
    },
    handleCurrentChange(val) {
      this.currentRow = val
      // this.$emit('changeTax', val)
    },
    // 选中值发生变化
    checkIndexMethod() {
      this.currentRow = this.tableData[Number(this.checkIndex)]
    },
    closeDialog() {
      this.$emit('closeDialog', false)
    },
    comfirm() {
      if (!this.currentRow) {
        this.$message.warning('请选择一条数据')
        return
      }
      const params = {
        id: this.currentRow.id,
        taxCode: this.currentRow.taxCode
      }
      this.$emit('transferTax', params)
      this.closeDialog()
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/variables.scss';
.header {
  position: absolute;
  top: 10px;
  /* left: 387px; */
  z-index: 2;
  right: 35px;
}
.center {
  height: 500px;
  .tableHeight {
    height: 465px;
  }
  ::v-deep .el-radio__label {
    display: none;
  }
}
.footerBtn {
  display: flex;
  justify-content: flex-end;
}
</style>
