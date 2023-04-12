
<!--  -->
<template>

  <div style="margin-top:20px">
    <el-form ref="ruleForm" :model="company" :rules="rules" label-width="110px">
      <el-form-item label="发票抬头" prop="sellerName">
        <el-input v-model="company.sellerName" size="small" placeholder="请输入发票抬头" :disabled="!isEdit" style="width: 400px" max="100" />
      </el-form-item>
      <el-form-item label="发票税号" prop="sellerTaxpayerId">
        <el-input v-model="company.sellerTaxpayerId" size="small" placeholder="请输入发票税号" :disabled="!isEdit" style="width: 400px" />
      </el-form-item>
      <el-form-item label="注册地址" prop="sellerAddress">
        <el-input v-model="company.sellerAddress" size="small" type="textarea" max="200" placeholder="请输入注册地址" :disabled="!isEdit" style="width: 400px" />
      </el-form-item>
      <el-form-item label="注册电话" prop="sellerTel">
        <el-input v-model="company.sellerTel" size="small" placeholder="请输入注册电话" :disabled="!isEdit" show-word-limit max="100" style="width: 400px" />
      </el-form-item>
      <el-form-item label="开户银行" prop="sellerBank">
        <el-input v-model="company.sellerBank" size="small" placeholder="请输入开户银行" :disabled="!isEdit" max="100" style="width: 400px" />
      </el-form-item>
      <el-form-item label="开户账号" prop="sellerAccount">
        <el-input v-model="company.sellerAccount" size="small" placeholder="请输入开户账号" :disabled="!isEdit" max="100" style="width: 400px" />
      </el-form-item>
      <el-form-item>
        <MyButton :type="isEdit?'':'primary'" icon="" :text="isEdit?'取消修改':'开启编辑'" @click="editChange" />
        <MyButton v-if="isEdit" type="primary" icon="" text="确认修改" @click="goSubmit" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MyButton from '@/components/myButton'
// import { drugenumeration } from '@/utils/enumeration'
import { getPage, updateCon, saveCon } from '@/api/financialcenter'

import { isvalidatemobile, checkTax } from '@/utils/validate'
const validatePhone = (rule, value, callback) => {
  if (isvalidatemobile(value)[0]) {
    callback(new Error(isvalidatemobile(value)[1]))
  } else {
    callback()
  }
}
const validateNum = (rule, value, callback) => {
  if (checkTax(value)) {
    callback()
  } else {
    callback(new Error('税号错误'))
  }
}
export default {
  components: { MyButton },
  data() {
    return {
      isEdit: false,
      company: {
        id: '',
        sellerName: '',
        sellerBank: '',
        sellerAccount: '',
        sellerAddress: '',
        sellerTel: '', // 销方电话
        sellerTaxpayerId: '', // 销方税号（纳税人识别号）,只能15、17、18、20位
      },
      rules: {
        sellerName: [
          { required: true, message: '请输入发票抬头', trigger: 'blur' },
        ],
        sellerTaxpayerId: [
          { required: true, validator: validateNum, trigger: 'blur' },
        ],
        sellerAddress: [
          { required: true, message: '请输入注册地址', trigger: 'blur' },
        ],
        sellerTel: [
          { required: true, validator: validatePhone, trigger: 'blur' },
        ],
        sellerBank: [
          { required: true, message: '请输入开户银行', trigger: 'blur' },
        ],
        sellerAccount: [
          { required: true, message: '请输入开户账号', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getInfo()
  },
  mounted() { },
  methods: {
    editChange() {
      if (this.isEdit) {
        this.getInfo()
      }
      this.isEdit = !this.isEdit
    },
    goSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.company)
          if (this.company.id) {
            updateCon(this.company).then((res) => {
              if (res.code == 0) {
                this.$message.success('开票信息编辑成功～')
              } else {
                this.$message.error('开票信息编辑失败～')
              }
              this.getInfo()
              this.isEdit = false
            })
          } else {
            saveCon(this.company).then((res) => {
              if (res.code == 0) {
                this.$message.success('开票信息编辑成功～')
              } else {
                this.$message.error('开票信息编辑失败～')
              }
              this.getInfo()
              this.isEdit = false
            })
          }
        }
      })
    },
    getInfo() {
      console.log('获取抬头信息')
      getPage({}).then(res => {
        if (res.code === 0) {
          // console.log(res)
          this.company = res.data
        } else {
          this.$message.warning(res.msg);
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
