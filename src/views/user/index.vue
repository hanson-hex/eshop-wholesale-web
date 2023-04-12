<template>
  <div class="personal-box">
    <div class="personal-box__title">
      <p class="title">个人信息</p>
      <p class="password" @click="changePsw">修改密码</p>
    </div>
    <div class="personal-box__items">
      <div class="title">姓名</div>
      <p>{{ userInfo.fullName || '' }}</p>
    </div>
    <div class="personal-box__items">
      <div class="title">手机号（账号）</div>
      <p>{{ userInfo.phone || '' }}</p>
    </div>

    <el-dialog :visible.sync="visible" title="修改密码" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" @close="visible = false">
      <el-form ref="ruleForm" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="旧密码：" prop="password" class="input_list">
          <el-input v-model.trim="form.password" type="password" hide-required-asterisk placeholder="请输入旧密码" />
        </el-form-item>
        <el-form-item label="新密码：" prop="newpassword1" class="input_list">
          <el-input v-model.trim="form.newpassword1" type="password" hide-required-asterisk placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmNewpassword" class="input_list">
          <el-input v-model.trim="form.confirmNewpassword" type="password" hide-required-asterisk placeholder="请再次输入新密码" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button class="theme-bg-btn" :loading="dialogData.loading" type="primary" @click="onSubmit('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getUserInfo, editPassword } from '@/api/user'
// import { getStore } from '@/util/store'
// import { encryption } from '@/util/util'
import { encryption } from '@/utils/index'

export default {
  name: 'PersonalIndex',
  data() {
    return {
      load: false,
      rules: {
        password: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' },
        ],
        newpassword1: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        confirmNewpassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
        ],
      },
      visible: false,
      form: {
        username: '',
        password: '',
        newpassword1: '',
        confirmNewpassword: ''
      },
      // userInfo: {},
      dialogData: {

      },
    }
  },
  computed: {
    // ...mapState(['usergetUserInfo']),
    userInfo() {
      return this.$store.state.user.user_info
    },
  },
  methods: {
    // ...mapActions(['getusergetUserInfo']),

    /**
     * 修改密码
     */
    changePsw() {
      this.visible = true
      this.$refs.ruleForm.resetFields()
    },

    /**
     * 提交
     */
    onSubmit(formName) {
      // 加密
      const user = encryption({
        data: this.form,
        key: '8vkv0#e^D@mjv%VS',
        param: ['password', 'newpassword1'],
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.newpassword1 == this.form.confirmNewpassword) {
            this.load = true
            let info = {
              newPassword: user.newpassword1,
              password: user.password,
              username: user.username
            }
            editPassword(info).then((res) => {
              this.load = false
              if (res.code == '0' && res.data) {
                this.$message({
                  message: '修改新密码成功，请重新登录',
                  type: 'success',
                })
                this.$store.dispatch('user/logout').then(() => {
                  this.$router.push({ path: '/login' })
                })

                this.visible = false;
              } else {
                this.$message.error(res.msg)
                this.$refs.ruleForm.resetFields()
              }
            })
          } else {
            this.$message.error('两次新密码输入不一致！')
          }
        } else {
          return false
        }
      })
    },
  },
  async created() {
    console.log(this.userInfo)
    this.form.username = this.userInfo.username
    // await getUserInfo(getStore({ name: 'userId' })).then((res) => {
    //   this.userInfo = res.data.data
    //   this.dialogData.form.username = res.data.data.username
    //   this.userInfo.role = []
    //   this.userInfo.post = []
    //   res.data.data.roleList.map((item) => {
    //     this.userInfo.role.push(item.roleName)
    //   })
    //   res.data.data.postList.map((item) => {
    //     this.userInfo.post.push(item.postName)
    //   })
    // })
    // store.dispatch('GetUserInfo').then(() => {})
    // console.log(getStore({ name: 'userId' }))
    // this.$store.dispatch('LogOut').then(() => {
    //   location.reload() // 为了重新实例化vue-router对象 避免bug
    // })
    // let id = JSON.parse(storage.user).user_info.uid
    // const res = await getUserInfo(id)
    // storage.setItem('username', res.data.roleList[0].roleName)
    // await this.getusergetUserInfo(res.data)
    // this.userInfo = res.data
  },
  mounted() { },
}
</script>
<style lang="scss" scoped>
.personal-box {
  background: #ffffff;
  border-radius: 2px;
  padding: 32px;
  height: 795px;
  &__title {
    width: 320px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
    }
    .password {
      font-size: 14px;
      color: #0da1a8;
    }
    .password:hover {
      cursor: pointer;
    }
  }
  &__items {
    margin-top: 24px;
    display: flex;
    align-items: center;
    .title {
      margin-right: 8px;
      font-weight: 600;
    }
    p {
      margin: 0;
      color: #666;
    }
  }
}
.all_bg {
  background: transparent;
  padding-bottom: 0;
  .personal_left {
    position: relative;
    width: 1226px;
    margin-right: 16px;
    .regards {
      position: relative;
      width: 100%;
      height: 92px;
      margin-bottom: 16px;
      padding: 32px;
      font-size: 20px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.9);
      line-height: 28px;
    }
    .info {
      position: relative;
      width: 100%;
      height: 368px;
      margin-bottom: 16px;
      padding: 32px;
    }
    .fl_cen {
      display: flex;
      align-items: center;
      .items {
        width: 240px;
        padding-right: 20px;
        text-align: left;
        margin-bottom: 32px;
        .top {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.4);
          line-height: 22px;
          margin-bottom: 16px;
        }
        .con {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.9);
        }
      }
    }

    .edit {
      position: relative;
      width: 100%;
      height: 368px;
      margin-bottom: 16px;
      padding: 32px;
      .edit_con {
        margin-top: 27px;
        .input_list {
          height: 35px;
          margin-bottom: 20px;
          color: #323130;
          font-size: 14px;
          ::v-deep .el-form-item__label {
            width: 90px;
            text-align: center;
          }
          ::v-deep .el-form-item__label:last-child {
            text-align: left;
          }
          ::v-deep .el-form-item__label::before {
            content: none;
          }
          ::v-deep .el-input__inner {
            width: 280px;
          }
        }
      }
      .edit_btn {
        margin-left: 90px;
        button {
          width: 60px;
          height: 32px;
          border-radius: 3px;
          font-size: 14px;
          padding: 0;
          text-align: center;
          border: 0;
        }
        ::v-deep .el-button--primary {
          background: #2c7a51;
        }
        ::v-deep .el-button--info {
          background: #e7e7e7;
          color: #666;
        }
      }
    }
    .names {
      font-size: 20px;
      color: rgba(0, 0, 0, 0.9);
      line-height: 28px;
      margin-bottom: 27px;
    }
  }
  .personal_right {
    position: relative;
    width: 398px;
    .identity {
      position: relative;
      width: 100%;
      height: 282px;
      background: #2c7a51;
      border-radius: 4px;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
      margin-bottom: 16px;
      padding: 55px 48px;
      .head {
        width: 60px;
        height: 60px;
        background: #f7f8fa;
        border-radius: 50px;
        i {
          font-size: 30px;
          color: #cccccc;
        }
      }
      .idt {
        margin-top: 55px;
        height: 28px;
        font-size: 20px;
        color: #ffffff;
        line-height: 28px;
      }
      .conmpany {
        margin-top: 7px;
        height: 22px;
        font-size: 14px;
        color: #ffffff;
        line-height: 22px;
      }
    }
    .blank {
      position: relative;
      width: 100%;
      height: 562px;
      margin-bottom: 16px;
    }
  }
  .card {
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);
  }
}
</style>
