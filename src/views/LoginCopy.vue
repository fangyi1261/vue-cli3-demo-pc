<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title">快速登录</div>
      <div class="login-box-inner">
        <ul>
          <li class="i-first">
            <input type="text" placeholder="请输入账号" class="user-account">
          </li>
          <li class="i-second">
            <div class="password">
              <input type="text" placeholder="请输入密码">
            </div>
            <button @click="getVerificationCode">获取验证码</button>
          </li>
          <li class="i-third">
            <input type="checkbox">我已阅读并同意<a href="#">《XXX守则》</a>
          </li>
          <li class="i-text">
            温馨提示。。。
          </li>
          <li class="i-btn">
            <button @click="getLogin">登录</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {};
  },
  methods: {
    getVerificationCode() {
      console.log('==== getVerificationCode ====');
    },
    getLogin() {
      console.log('==== getLogin ====');
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss">
  .login-container{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    background: rgba(0, 0, 0, .5);

    .login-box {
      position: relative;
      top: 50%;
      max-width: 320px;
      margin: 0 auto;
      transform: translateY(-50%);
      background: #fff;
      text-align: left;
      border-radius: 5px;

      .title{
        height: 45px;
        line-height: 43px;
        border-bottom: 1px solid #ff6600;
        text-align: center;
        color: #ff6600;
        font-size: 16px;
      }

      .login-box-inner {
        padding: 15px;
        font-size: 14px;

        ul {
          box-sizing: border-box;
          margin: 0;
          li {
            position: relative;
            margin-bottom: 10px;
            text-align: left;
          }
          .i-first input, .i-second input {
            width: 100%;
            height: 42px;
            padding: 0 10px 0 35px;
            font-size: 12px;
            color: #333;
            line-height: 42px;
            background: #fff;
            border: 1px solid #ddd;
            appearance: none;
            border-radius: 5px;
          }
          .i-first::before{
            width: 18px;
            background: url('../assets/account.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 12px;
            left: 12px;
            height: 18px;
            display: block;
            content: '';
          }
          .i-second::before {
            width: 16px;
            background: url('../assets/password.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 12px;
            left: 12px;
            height: 18px;
            display: block;
            content: '';
          }
          .i-second button {
            width: 30%;
            height: 42px;
            line-height: 42px;
            border-radius: 5px;
            color: #fff;
            background: #f60;
            border: none;
          }
          .password {
            width: 70%;
            padding-right: 7px;
            float: left;
          }
          .i-third {
            a{
              text-decoration: none;
              color: blue;
            }
            input {
              width: 14px;
              height: 14px;
              padding: initial;
              box-sizing: border-box;
              vertical-align: middle;
              margin-top: -4px;
              margin-right: 10px;
              appearance: checkbox!important;
              transition: none!important;
              &::after{
                display: block;
                overflow: hidden;
                clear: both;
              }
            }
          }

          .i-btn button{
            width: 100%;
            height: 42px;
            line-height: 42px;
            border-radius: 5px;
            background: #f60;
            border: none;
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
