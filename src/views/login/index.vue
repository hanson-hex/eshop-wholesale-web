<template>
  <div class="login-container">
    <img class="mainLogo"
         src="/img/login-logo.png"
         alt>
    <img class="mainLogoright"
         src="/img/loginRight.png"
         alt>
    <div class="login-weaper">
      <div class="login-left animate__animated animate__fadeInLeft">
        <img class="img"
             src="/img/loginLeft.png"
             alt>
      </div>
      <div class="login-border animate__animated animate__fadeInRight">
        <div class="login-main">
          <h1>春播云药库系统</h1>
          <el-form ref="loginForm"
                   :model="loginForm"
                   :rules="loginRules"
                   class="login-form"
                   auto-complete="on"
                   label-position="left">
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input ref="username"
                        v-model="loginForm.username"
                        placeholder="请输入账号"
                        size="small"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on" />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="请输入密码"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        size="small"
                        @keyup.enter.native="handleLogin" />
              <span class="show-pwd"
                    @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button :loading="loading"
                       type="primary"
                       style="width:100%;margin-bottom:30px;"
                       :disabled="!rememberAccount"
                       @click.native.prevent="handleLogin">登陆</el-button>
          </el-form>
          <div style="display: flex;align-items: center;">
            <el-checkbox v-model="rememberAccount" />
            <span class="lianjie">同意
              <span style="color:#0DA1A8;cursor: pointer;"
                    @click="infoShow">
                《春播云药库用户服务协议》
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-copyright">
      Copyright © 湖南春播云药库科技有限公司版权所有
    </div>
    <ServeInfo ref="serveinfo"
               @sure="goCheck" />
    <div v-if="tokenLoading"
         class="loading_box">
      <div class="loading_content">
        <i class="el-icon-loading" />
      </div>
    </div>
  </div>
</template>

<script>
import '@/styles/login.scss'
import { validUsername } from '@/utils/validate'
import { randomLenNum } from '@/utils/index'
import { getStatus } from '@/api/user'

import website from "@/utils/website";
import ServeInfo from "./serveInfo.vue";

export default {
  name: 'Login',
  components: {
    ServeInfo
  },
  data () {
    // const validateUsername = (rule, value, callback) => {
    //   if (value.length < 3) {
    //     callback(new Error('请输入账号'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 3) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      tokenLoading: false,
      code: {
        src: '/code',
        value: '',
        len: 4,
        type: 'image',
      },
      loginForm: {
        username: '', // 13488188001,13211111114,13488188002
        password: '', // Aa123456
        code: '',
        randomStr: '',
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      rememberAccount: true,
      routes: {
        home: '/',
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {
    this.$store.dispatch('user/resetToken').then(() => {
      const { allRoutes } = this
      // const { accessToken, url, ids } = this.$route.query
      let shopId = this.getQueryString('shopId')
      let accessToken = this.getQueryString('accessToken')
      let url = this.getQueryString('url')
      if (accessToken && url) {
        this.tokenLoading = true
        setTimeout(() => {
          this.tokenLoading = false
        }, 500)
        this.$store.dispatch('user/setTokenNew', accessToken).then(() => {
          let query = {}
          if (url == '/drugprocurement/shoppingcart-confirmOrder') {
            // query = { ids: JSON.parse(ids) }
            query = { ids: ids }
          }
          if (shopId) {
            query = { shopId: shopId }
          }
          this.tokenLoading = true
          this.$router.push({ path: url, query })
        })
      }
      if (website.validateCode) {
        this.refreshCode()
      }
    })
  },
  methods: {
    infoShow () {
      this.$refs['serveinfo'].open()
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    goCheck (val) {
      this.rememberAccount = val || false
    },
    refreshCode () {
      this.loginForm.randomStr = randomLenNum(this.code.len, true)
      if (this.code.type === 'text') {
        this.code.value = randomLenNum(this.code.len)
      }
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        // console.log(valid)
        if (valid) {
          this.loading = true
          // console.log(this.loginForm)
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            this.$router.push({ path: '/' })
            // this.$router.push({ path: this.redirect || '/' })
            // this.$router.push({ path: '/mymerchantsettlement' })

            // this.checkStatus()

            // this.$store.dispatch('user/getInfo').then((data) => {

            // })

            // this.$store.dispatch('user/getMenus', { type: true, id: -1 }).then((data) => {
            //   // if (data.length === 0) return
            //   // this.$router.$avueRouter.formatRoutes(data, true)
            //   // this.$router.push({ path: this.tagWel.value })
            // })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    checkStatus () {
      getStatus().then((res) => {
        // console.log(res)
        const { code, data, msg } = res
        const { status } = data
        if (code == 0) {
          if (status == null) {
            this.$router.push({ path: '/mymerchantsettlementb' })
            return
          }
          if (status == 0) {
            // console.log(status)
            this.$message.warning('资质正在审核中，请耐心等待')
            this.$router.push({ path: '/mymerchantsettlementb' })
            return
          }
          if (status == 1) {
            this.$alert('您的资质审核失败，请重新提交', '审核结果', {
              confirmButtonText: '确定',
              callback: () => {
                this.$router.push({ path: '/mymerchantsettlementb' })
              }
            });
            return
          }
          if (status == 2) {
            // this.$router.push({ path: '/mymerchantsettlementb' })
            this.$router.push({ path: '/' }) // this.redirect || 
            // this.$store.dispatch('user/getMenus', { type: true, id: -1 }).then((resa) => {
            //   console.log(resa)
            //   // if (data.length === 0) return
            //   // this.$router.$avueRouter.formatRoutes(data, true)
            //   // this.$router.push({ path: this.tagWel.value })
            // })
            return
          }
        }
        // if (res.data.code == 0 && !res.data.data.status) {
        //   this.$router.push({ path: '/examination' })
        // } else if (res.data.code == 0 && res.data.data.status == 2) {
        //   this.$store
        //     .dispatch('GetMenu', { type: true, id: -1 })
        //     .then((data) => {
        //       if (data.length === 0) return
        //       this.$router.$avueRouter.formatRoutes(data, true)
        //       this.$router.push({ path: this.tagWel.value })
        //     })
        // } else if (res.data.code == 0 && res.data.data.status == 1) {
        //   this.$alert('您的资质审核失败，请重新提交', '审核结果', {
        //     confirmButtonText: '确定',
        //     callback: () => {
        //       this.$router.push({ path: '/examination' })
        //     }
        //   });
        // } else if (res.data.code == 0 && res.data.data.status == 0) {
        //   this.$message.info('资质正在审核中，请耐心等待')
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.loading {
  &_box {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9999;
    cursor: pointer;
  }
  &_content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 130px;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 60px;
    border-radius: 10px;
  }
}

.login-container {
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    position: absolute;
    z-index: 12;
    color: $dark_gray;
    vertical-align: middle;
    top: 1px;
    left: 10px;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 1px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #0da1a8;
}

.bottom-copyright {
  position: fixed;
  bottom: 16px;
  left: 42%;
  color: #545965;
  font-size: 12px;
}
.lianjie {
  color: #545965;
  padding-left: 10px;
  font-size: 14px;
  // cursor: pointer;
}
</style>
