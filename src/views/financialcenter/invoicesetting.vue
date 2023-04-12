
<!--  -->
<template>
  <div class="comContent">
    <el-alert type="warning" show-icon title="请设置你的开票方式，若未设置普通电子发票，则买家不能申请开电子发票。" />
    <!-- <div class="head_box">
      <h1>发票设置</h1>
      <h2>请设置你的开票方式</h2>
      <p>若未设置普通电子发票，则买家不能申请开电子发票</p>
    </div> -->
    <div class="centerBox">
      <el-form ref="formTool" :model="formTool" label-width="120px" :inline="false" :rules="rules" label-position="top">
        <el-form-item label-width="50px">
          <h3 class="form_h3">普票</h3>
          <el-divider />
        </el-form-item>
        <el-form-item prop="checkList" label="开票类型">
          <el-checkbox-group v-model="formTool.checkList">
            <el-checkbox label="1">普通纸质发票</el-checkbox>
            <el-checkbox label="2">普通电子发票</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="radio" label="送达时间">
          <el-radio-group v-model="formTool.radio">
            <el-radio :label="3">随货</el-radio>
            <el-radio :label="6">月开</el-radio>
            <el-radio :label="9">其他(请在其他说明中备注)</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="formTool.radio == 9" prop="desc" label="备注说明">
          <el-input v-model="formTool.desc" placeholder="请输入发票送达时间备注说明" size="small" />
        </el-form-item>
        <el-form-item label-width="50px">
          <h3 class="form_h3">专票</h3>
          <el-divider />
        </el-form-item>
        <el-form-item prop="checkList2" label="开票类型">
          <el-checkbox-group v-model="formTool.checkList2">
            <el-checkbox label="1">支持开专票</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item prop="approvalNumber" label="送达方式">
        <el-input v-model="formTool.approvalNumber" placeholder="请输入送达方式" size="small" />
      </el-form-item> -->
        <el-form-item>
          <MyButton type="primary" icon="" style="width:120px" text="保存" @click="goSubmit" />
        </el-form-item>
        <!-- <el-form-item>
        <MyButton type=""   text="重置" @click="reset()" />
      </el-form-item> -->
      </el-form>
    </div>

  </div>
</template>

<script>
import MyButton from '@/components/myButton'
// import MyTable from '@/components/myTable'
import { drugenumeration } from '@/utils/enumeration'
import { getcheckList } from '@/api/productManage/auditProduct'
export default {
  components: { MyButton }, // , MyTable
  data() {
    return {
      text: '',
      clearable: true,
      formTool: {
        checkList: [],
        radio: null,
        desc: '',
        checkList2: [],
        // approvalNumber: ''
      },
      rules: {
        checkList: [{ required: true, message: `请选择开票类型`, trigger: `blur` }],
        radio: [{ required: true, message: `请选择发票送达方式`, trigger: `blur` }],
        desc: [{ required: true, message: `请输入备注说明`, trigger: `blur` }]
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
    // this.getcheckList()
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
    goSubmit() {
      console.log('submit')
    },
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
    handleSelectionChange(val) {

    }
  }
}
</script>
<style lang='scss' scoped>
.head {
  &_box {
    h1 {
      font-size: 20px;
      font-weight: 400;
      color: #13c2c2;
    }
    h2 {
      color: #82be24;
      font-weight: 400;
      font-size: 16px;
      margin-left: 20px;
    }
    p {
      font-size: 14px;
      color: #999;
      margin-left: 20px;
    }
  }
}
.form {
  &_h3 {
    margin: 0;
  }
}
::v-deep.el-alert--warning {
  .el-alert__content {
    .el-alert__title {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #595959;
      line-height: 22px;
    }
  }
}
.centerBox {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
.el-divider--horizontal {
  margin: 0px;
}
</style>
