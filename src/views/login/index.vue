<template>
  <div class="login">
    <div class="login-left"></div>
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <img src="@/assets/images/login.png" alt="login" class="login-form-img" />
      <img src="@/assets/images/art-fonts.png" alt="fonts" class="login-form-art-fonts" />
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" size="large" auto-complete="off" placeholder="密码" @keyup.enter="handleLogin">
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <div class="forgot-block">
        <el-checkbox v-model="signFlag">十日内免登录</el-checkbox>
        <router-link class="link-type" :to="'/register'">忘记密码</router-link>
      </div>
      <div class="agreement">
        <el-checkbox v-model="agreement" />
        <a class="link-type" @click="handleAgreement">《春播万象云诊所用户协议》</a>
      </div>
      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';
const userStore = useUserStore();
const router = useRouter();
const loginForm = ref({
  username: '',
  password: '',
});
const agreementDialogRef = ref<any>(null);
const loginRef = ref<any>();
const agreement = ref<boolean>(true);
const signFlag = ref<boolean>(false);
const loginRules = reactive<object>({
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
});
const loading = ref(false);
const redirect = ref(undefined);
function handleAgreement() {
  nextTick(() => {
    //
  });
}
function handleLogin() {
  loginRef?.value?.validate((valid: any) => {
    if (valid) {
      if (!agreement.value) {
        ElMessage.error('请先勾选用户协议');
        return false;
      }
      loading.value = true;
      const params = {
        ...loginForm.value,
        signFlag: signFlag.value,
        term: 'pc',
      };
      // 调用action的登录方法
      userStore
        .login(params)
        .then(() => {
          ElMessage.success('登录成功');
          router.push({ path: '/' });
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #0da1a8;

  &-left {
    width: 742px;
    height: 680px;
    background-image: url('@/assets/images/login-bg.png');
    background-size: cover;
  }

  &-form {
    border-radius: 0 20px 20px 0;
    background: #ffffff;
    width: 458px;
    height: 680px;
    padding: 25px 25px 5px 25px;

    &-img {
      display: block;
      margin: 43px auto 24px auto;
      width: 90px;
      height: 82px;
    }

    &-art-fonts {
      margin: 0 auto 40px auto;
      display: block;
      width: 322px;
    }
    .el-input {
      height: 45px;

      input {
        height: 45px;
      }
    }

    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 0px;
    }

    .forgot-block {
      display: flex;
      justify-content: space-between;
    }
    .agreement {
      margin-bottom: 40px;
    }
  }
}

.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
