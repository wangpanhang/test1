<template>
  <div
    class="login-container"
    :style="{ backgroundImage: 'url(' + loginBg + ')' }"
  >
    <div class="login-box">
      <div class="login-logo"></div>
      <div class="login-title">欢迎使用谦亨网站管理后台</div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="请输入登录账号"
            style="width: 320px"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :type="pwdType"
            v-model="loginForm.password"
            name="password"
            auto-complete="on"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-form>
      <div class="remember-account">
        <el-checkbox v-model="rememberMe"></el-checkbox>
        <span style="color: #666;font-size: 14px;margin-left: 4px;"
          >记住账号密码</span
        >
      </div>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-top: 40px;"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
      <span style="color: #778699;margin-top: 94px;font-size: 12px;"
        >方向角科技提供技术支持</span
      >
    </div>
    <div class="login-bottom">
      <div class="company-box">
        <div class="company-logo"></div>
        <span class="company-name">谦亨电子官网管理后台</span>
      </div>
      <div class="company-info">
        Copyright ©2024 Produced by Shenzhen Qian Heng electronics Co., LTD
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";

export default {
  components: {},
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == null || value === "" || value === undefined) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value == null || value === "" || value === undefined) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      loginBg: require("@/assets/img/login_bg.png"),
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      redirect: undefined,
      rememberMe: false
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (localStorage.getItem("rememberMeInfo")) {
        const rememberMeInfo = JSON.parse(
          localStorage.getItem("rememberMeInfo")
        );
        if (rememberMeInfo.rememberMe) {
          this.loginForm.username = rememberMeInfo.username;
          this.loginForm.password = rememberMeInfo.password;
          this.rememberMe = true;
        }
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // 加密
          const params = {
            ...this.loginForm,
            password: md5(this.loginForm.password)
          };
          this.$store
            .dispatch("Login", params)
            .then(() => {
              this.loading = false;
              if (this.rememberMe) {
                localStorage.setItem(
                  "rememberMeInfo",
                  JSON.stringify({
                    rememberMe: true,
                    username: this.loginForm.username.trim(),
                    password: this.loginForm.password
                  })
                );
              } else {
                if (localStorage.getItem("rememberMeInfo")) {
                  localStorage.removeItem("rememberMeInfo");
                }
              }
              this.$router.push("/home");
            })
            .catch(() => {
              this.$router.push("/home");
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: #B3B3B3;
      height: 47px;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #f2f4f9 inset !important;
        // -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #f2f4f9;
    border-radius: 5px;
    color: #454545;
  }
  .login-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    .company-box {
      display: flex;
      justify-content: center;
      align-items: center;
      .company-logo {
        width: 20px;
        height: 20px;
        background-image: url("../../assets/img/logo.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .company-name {
        font-size: 14px;
        color: #333;
        margin-left: 4px;
      }
    }
    .company-info {
      font-size: 12px;
      color: #666;
      margin-bottom: 18px;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-box {
  position: absolute;
  right: 13%;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  box-sizing: border-box;
  padding: 40px 80px 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // gap: 20px;
  box-shadow: 0px 4px 20px 0px rgba(0, 54, 128, 0.08);
  .login-logo {
    width: 240px;
    height: 100px;
    background-image: url("../../assets/img/login_logo.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
  }
  .login-title {
    margin: 20px 0px;
    font-size: 20px;
    color: #333;
    font-family: "Noto Sans SC";
  }
  .login-container {
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    // .tools {
    //   font-size: 13px;
    //   margin-bottom: 20px;

    //   span {
    //     &:first-of-type {
    //       color: #DCDFE6;
    //     }
    //   }

    //   .three {
    //     margin-left: 5px;
    //     display: inline-block;

    //     .active {
    //       display: inline;
    //     }

    //     .noActive {
    //       display: none;
    //     }

    //     img {
    //       width: 20px;
    //       height: 20px;
    //     }

    //     &:hover {
    //       .active {
    //         display: none;
    //       }

    //       .noActive {
    //         display: inline;
    //       }
    //     }
    //   }
    // }

    // .tips {
    //   font-size: 14px;
    //   color: #fff;
    //   margin-bottom: 10px;

    //   span {
    //     &:first-of-type {
    //       margin-right: 16px;
    //     }
    //   }
    // }

    // .svg-container {
    //   padding: 6px 5px 6px 15px;
    //   color: $dark_gray;
    //   vertical-align: middle;
    //   width: 30px;
    //   display: inline-block;
    // }

    // .title {
    //   font-size: 26px;
    //   color: $light_gray;
    //   margin: 0 auto 40px auto;
    //   text-align: center;
    //   font-weight: bold;
    // }

    // .show-pwd {
    //   position: absolute;
    //   right: 10px;
    //   top: 7px;
    //   font-size: 16px;
    //   color: $dark_gray;
    //   cursor: pointer;
    //   user-select: none;
    // }

    //.wx {
    //  display: flex;
    //  justify-content: center;
    //  align-items: center;
    //  height: 200px;
    //  //width: 300px;
    //}
  }
  .remember-account {
    width: 100%;
  }
}
</style>
