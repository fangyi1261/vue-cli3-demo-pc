<template>
  <div class="view">
    <div class="login-form">
      <div class="form-title">欢迎登陆</div>
      <el-form
        class="form-body"
        label-position="left"
        label-width="60px"
        :model="userInfo"
      >
        <el-form-item label="用户名">
          <el-input v-model="userInfo.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="userInfo.password"
            placeholder="请输入密码"
            type="password"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-button class="form-sumbit" type="primary" @click="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userInfo: {
        userName: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      // 调用登录信息校验接口成功进入
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style lang="scss" scoped>
  // @import '../style/utils';
  .view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/css_bg.jpg') no-repeat center;
    background-size: cover;

    .login-form {
      position: absolute;
      top: 50%;
      left: 50%;
      // transform: translate3d(-50%, -50%, 0);
      width: 320px;
      padding: 16px 0 32px;
      background: white;
      border-radius: 5px;
    }

    .form-title {
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      color: #ffbb17;
      font-weight: 500;
      margin-bottom: 20px;
      text-align: center;
    }

    .form-body {
      padding: 0 32px;

      .el-form-item {
        margin-bottom: 16px;
      }

      .el-form-item__label {
        line-height: 1;
        font-size: 14px;
        color: #90bbc7;
        padding-bottom: 0;
      }

      input {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        color: #000;
        font-weight: 100;
        border: 0;
        padding: 0;
        background-color: transparent;
        border-radius: 0;
        border-bottom: 1px solid #dae7ef;

        &:focus {
          color: #d74646;
          border-bottom: 1px solid #d74646;
        }
      }
    }

    .form-submit {
      margin-top: 20px;
      width: 100%;
    }

    .el-input__inner {
      width: 256px;
    }
  }
</style>
