
<!--  -->
<template>
  <el-dialog :visible.sync="editorInvoice" title="发票抬头" width="500px">
    <el-form ref="invoiceForm" :model="invoiceForm" :rules="invoiceRules" label-width="120px" label-position="top">
      <el-form-item label="是否默认发票" prop="preferred">
        <el-radio-group v-model="invoiceForm.preferred">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发票类型" prop="buyerProperty">
        <el-radio-group v-model="invoiceForm.buyerProperty">
          <el-radio label="ENTERPRISE">企业</el-radio>
          <el-radio label="PERSONAL">个人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发票抬头" prop="buyerName">
        <el-input v-model="invoiceForm.buyerName" size="small" />
      </el-form-item>
      <el-form-item v-if="invoiceForm.buyerProperty != 'PERSONAL'" label="纳税人识别号" prop="buyerTaxpayerId">
        <el-input v-model="invoiceForm.buyerTaxpayerId" size="small" />
      </el-form-item>
      <el-form-item v-if="invoiceForm.buyerProperty != 'PERSONAL'" label="地址" prop="buyerAddress">
        <el-input v-model="invoiceForm.buyerAddress" size="small" />
      </el-form-item>
      <el-form-item v-if="invoiceForm.buyerProperty != 'PERSONAL'" label="电话" prop="buyerRecipientPhone">
        <el-input v-model="invoiceForm.buyerRecipientPhone" size="small" />
      </el-form-item>
      <el-form-item v-if="invoiceForm.buyerProperty != 'PERSONAL'" label="开户行" prop="buyerBank">
        <el-input v-model="invoiceForm.buyerBank" size="small" />
      </el-form-item>
      <el-form-item v-if="invoiceForm.buyerProperty != 'PERSONAL'" label="开户行账号" prop="buyerAccount">
        <el-input v-model="invoiceForm.buyerAccount" size="small" />
      </el-form-item>
      <el-form-item v-if="invoiceForm.buyerProperty != 'PERSONAL'" label="邮箱" prop="buyerRecipientMail">
        <el-input v-model="invoiceForm.buyerRecipientMail" size="small" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancelBtn">取 消</el-button>
      <el-button type="primary" size="small" @click="goSubmit()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { drugenumeration } from '@/utils/enumeration'
import { getcheckList } from '@/api/productManage/auditProduct'
import { buyInfoUupdate, buyInfoSave } from '@/api/financialcenter'
let checkPhone = (rule, value, callback) => {
  let reg = /^1[3456789]\d{9}$/
  if (!reg.test(value)) {
    callback(new Error('请输入11位手机号'))
  } else {
    callback()
  }
}
let checkEmail = (rule, value, callback) => {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}
export default {
  // components: { MyButton },
  data() {
    return {
      // 发票抬头弹窗的对象
      invoiceForm: {
        id: 0,
        preferred: null, // 默认
        buyerProperty: '', // 发票类型
        buyerName: '', // 发票抬头
        buyerTaxpayerId: '', // 纳税人识别号
        buyerAddress: '', // 地址
        buyerRecipientPhone: '', // 手机号
        buyerBank: '', // 银行
        buyerAccount: '', // 银行账号
        buyerRecipientMail: '' // 邮箱
      },
      // 发票抬头的弹窗
      editorInvoice: false,
      // 发票抬头的表单规则
      invoiceRules: {
        preferred: [
          { required: true, message: '请选择是否默认', trigger: 'change' },
        ],
        buyerName: [
          { required: true, message: '请填写发票抬头', trigger: 'change' },
        ],
        buyerTaxpayerId: [
          { required: true, message: '请填写纳税人识别号', trigger: 'change' },
        ],
        buyerAddress: [
          { required: true, message: '请填写地址', trigger: 'change' },
        ],
        buyerRecipientPhone: [
          { required: true, message: '请填写电话号码', trigger: 'change' },
          { required: true, validator: checkPhone, message: '请输入正确的手机号', trigger: 'blur' },
        ],
        buyerAccount: [
          { required: true, message: '请填写银行账号', trigger: 'change' },
        ],
        buyerRecipientMail: [
          { required: true, message: '请填写邮箱', trigger: 'change' },
          { required: true, validator: checkEmail, message: '请填写正确的邮箱', trigger: 'blur' }
        ],
        buyerBank: [
          { required: true, message: '请填写银行', trigger: 'change' }
        ],
        buyerProperty: [
          { required: true, message: '请选择发票类型', trigger: 'change' }
        ]
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.getInfo()
  },
  mounted() { },
  methods: {
    open(vals) {
      console.log('vals', vals)
      this.editorInvoice = true
      if (vals) {
        const { id, preferred, buyerProperty, buyerName, buyerTaxpayerId, buyerAddress,
          buyerRecipientPhone, buyerBank, buyerAccount, buyerRecipientMail } = vals
        this.invoiceForm = {
          id,
          preferred, // 默认
          buyerProperty, // 发票类型
          buyerName, // 发票抬头
          buyerTaxpayerId, // 纳税人识别号
          buyerAddress, // 地址
          buyerRecipientPhone, // 手机号
          buyerBank, // 银行
          buyerAccount, // 银行账号
          buyerRecipientMail // 邮箱
        }
        this.id = id
      } else {
        this.$nextTick((res) => {
          this.$refs['invoiceForm'].resetFields()
          this.invoiceForm = {
            id: 0,
            preferred: null, // 默认
            buyerProperty: '', // 发票类型
            buyerName: '', // 发票抬头
            buyerTaxpayerId: '', // 纳税人识别号
            buyerAddress: '', // 地址
            buyerRecipientPhone: '', // 手机号
            buyerBank: '', // 银行
            buyerAccount: '', // 银行账号
            buyerRecipientMail: '' // 邮箱
          }
        })
      }
    },
    cancelBtn() {
      this.editorInvoice = false
      this.$refs['invoiceForm'].resetFields()
    },
    goSubmit() {
      const { id } = this
      this.$refs['invoiceForm'].validate((valid) => {
        // console.log(valid)
        if (valid) {
          // console.log(this.invoiceForm)
          let d = this.invoiceForm
          if (d.buyerProperty == "PERSONAL") {
            d = {
              ...d,
              buyerTaxpayerId: '', // 纳税人识别号
              buyerAddress: '', // 地址
              buyerRecipientPhone: '', // 手机号
              buyerBank: '', // 银行
              buyerAccount: '', // 银行账号
              buyerRecipientMail: '' // 邮箱
            }
          }
          if (d.id) {
            buyInfoUupdate(d).then((res) => {
              if (res.code == 0) {
                this.editorInvoice = false
                this.$emit('submit')
                this.$message.success('发票抬头修改成功')
              }
            }).catch(() => {
              this.$message.error('发票抬头修改失败')
            })
          } else {
            buyInfoSave(d).then((res) => {
              if (res.code == 0) {
                this.editorInvoice = false
                this.$emit('submit')
                this.$message.success('发票抬头新增成功')
              }
            }).catch(() => {
              this.$message.error('发票抬头新增失败')
            })
          }
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.el-dialog__header {
  // border-bottom: 1px solid #f2f2f2;
}
::v-deep .el-dialog__body {
  padding: 20px;
  padding-bottom: 0px;
}
::v-deep .el-form :first-child .el-form-item__content {
  height: 20px;
  line-height: 20px;
}
::v-deep .el-form :nth-child(2) .el-form-item__content {
  height: 20px;
  line-height: 20px;
}
</style>
