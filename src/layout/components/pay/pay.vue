<template>
  <div>
    <div class="fl pay_con">
      <div class="list">
        <div class="title">付款方信息</div>
        <div class="list_item fl_cen">
          <div class="left">账户类型</div>
          <div class="right">{{ dataOption.buyName }}</div>
        </div>
        <div class="list_item fl_cen">
          <div class="left">商户号</div>
          <div class="right">{{ dataOption.buyNo }}</div>
        </div>
      </div>
      <div class="list">
        <div class="title">收款方信息</div>
        <div class="list_item fl_cen">
          <div class="left">账户类型</div>
          <div class="right">{{ dataOption.buyName }}</div>
        </div>
        <div class="list_item fl_cen">
          <div class="left">商户号</div>
          <div class="right">{{ dataOption.sellNo }}</div>
        </div>
      </div>
      <div class="list">
        <div class="title">付款信息</div>
        <div class="list_item fl_cen">
          <div class="left">金额</div>
          <div class="right">{{ dataOption.amount }}</div>
        </div>
      </div>
    </div>
    <el-form ref="loginForm" :rules="loginRules" :model="loginForm" class="login-form" status-icon label-width="120">
      <el-form-item prop="password" label="支付密码">
        <el-input v-model.trim="loginForm.password" auto-complete="off" type="password" placeholder="请输入支付密码">
          <i slot="prefix" class="el-icon-mobile-phone" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" label="短信验证码">
        <el-input v-model.trim="loginForm.code" class="verification-code" auto-complete="off" placeholder="请输入验证码">
          <i slot="prefix" class="el-icon-key" />
          <template slot="append">
            <span :class="[{ display: msgKey }, { active: loginForm.mobile }]" class="msg-text" @click="handleSend">{{ msgText }}</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" class="login-submit" @click.native.prevent="handlePay">确认付款</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const MSGINIT = '发送验证码'
const MSGSCUCCESS = '${time}秒后重发'
const MSGTIME = 60
import { saleAccounts, accountsEnter, b2bPageList } from '@/api/stock/index.js'
import { encryption } from '@/utils/index'
export default {
  name: 'PayIndex',
  components: {},
  props: {
    dataOption: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const validateCode = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入6位数的验证码'))
      } else {
        callback()
      }
    }
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      loginForm: {
        password: '',
        code: ''
      },
      loginRules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loginData: {},
      param: {}
    }
  },
  mounted() {
    const { id } = this.$route.query
    console.log(id)
    this.id = id
    this.getData()
  },
  methods: {
    // getData() {
    //   b2bPageList({ id: this.id }).then((res) => {
    //     if (res.data.code == 0) {
    //       this.param = res.data.data.records
    //       // this.timeCacl()
    //     } else {
    //       this.$message.error(res.data.msg)
    //     }
    //   })
    // },
    handleSend() {
      // 判断是否可以发送（时间限制）
      if (this.msgKey) return
      // 发送验证码
      const that = this
      this.$refs.loginForm.validateField('password', (valid) => {
        if (!valid) {
          const user = encryption({
            data: that.loginForm,
            key: '8vkv0#e^D@mjv%VS',
            param: ['password']
          })
          saleAccounts({
            id: this.dataOption.id,
            password: user.password
          }).then((res) => {
            if (res.code == 0) {
              this.$message.success('验证码发送成功')
              this.phone = res.data
              this.timeCacl()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$message.error('请输入支付密码')
        }
      })
    },
    handlePay() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          accountsEnter({
            payerId: this.phone.userId,
            token: this.phone.token,
            txnSeqno: this.phone.txnSeqno,
            verifyCode: this.loginForm.code,
            id: this.dataOption.id
          }).then((res) => {
            if (res.code == 0) {
              this.$message.success('支付成功')
              this.form = {}
              this.$emit('suceeBtn', true)
            } else {
              this.$message.error(res.data.msg)
              this.form = {}
            }
          })
        }
      })
    },
    timeCacl() {
      // 计时避免重复发送
      this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
      this.msgKey = true
      const time = setInterval(() => {
        this.msgTime--
        this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
        if (this.msgTime === 0) {
          this.msgTime = MSGTIME
          this.msgText = MSGINIT
          this.msgKey = false
          clearInterval(time)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/index.scss';
.classification {
  margin: 4px;
  padding: 24px 32px;
  box-sizing: border-box;
  .pay_con {
    display: flex;
    padding: 30px;
    width: 100%;
    justify-content: space-between;
    .list {
      width: 32%;
      .title {
        background: #0da1a8;
        height: 40px;
        padding: 0 20px;
        line-height: 40px;
        margin-bottom: 14px;
        color: #fff;
        font-size: 14px;
      }
      .list_item {
        display: flex;
        margin-bottom: 10px;
        .left {
          width: 120px;
          text-align: right;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
          line-height: 22px;
          padding-right: 10px;
        }
        .right {
          text-align: left;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
        }
      }
    }
  }
  .msg-text {
    display: block;
    width: 101px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    padding: 12px 20px;
  }
  .msg-text.display {
    color: #ccc;
  }
  .verification-code {
    margin-top: 18px;
    ::v-deep .el-input__prefix {
      display: flex;
      align-items: center;
    }
    ::v-deep .el-input__inner {
      padding: 20px 60px 20px 40px;
    }
  }
  ::v-deep.verification-code .el-input-group__append {
    padding: 0 !important;
  }
  .login-form {
    width: 400px;
    margin: 32px auto;
    .el-form-item {
      .el-form-item__content {
        .login-submit {
          width: 100%;
          height: 45px;
          border: 1px solid #0da1a8;
          background-color: #0da1a8;
          color: #fff;
          font-size: 18px;
          letter-spacing: 2px;
          font-weight: 300;
          cursor: pointer;
          margin-top: 30px;
          font-family: 'neo';
          transition: 0.25s;
        }
      }
    }
  }
  .active {
    background: #0da1a8;
    padding: 12px;
    color: #fff;
  }

  ::v-deep .el-icon-mobile-phone:before,
  ::v-deep .el-icon-key:before {
    font-size: 18px;
  }
}
</style>
