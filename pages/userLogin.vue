<template>
  <div class="wd-userlogin">
    <section class="user">
      <div class="user_options-container">
        <div class="user_options-text">
          <div class="user_options-unregistered">
            <h2 class="user_unregistered-title">没有账号？</h2>
            <p class="user_unregistered-text">点击按钮注册.</p>
            <button
              class="user_unregistered-signup"
              id="signup-button"
              @click="()=>{bounce = true;}"
            >
              注册
            </button>
          </div>

          <div class="user_options-registered">
            <h2 class="user_registered-title">已有账号?</h2>
            <p class="user_registered-text">点击按钮登录.</p>
            <button
              class="user_registered-login"
              id="login-button"
              @click="bounce = false"
            >
              登录
            </button>
          </div>
        </div>

        <div
          class="user_options-forms"
          id="user_options-forms"
          :class="bounce ? 'bounceLeft' : 'bounceRight'"
        >
          <div class="user_forms-login">
            <h2 class="forms_title">登录</h2>
            <el-form :model="loginForm" ref="loginForm" :rules="signupRules">
              <el-form-item prop="userMail">
                <el-input
                  v-model="loginForm.userMail"
                  autocomplete="off"
                  placeholder="邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userPassword">
                <el-input
                  placeholder="密码"
                  type="password"
                  v-model="loginForm.userPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="forms_buttons">
              <div><el-link icon="el-icon-warning">忘记密码</el-link></div>
              <input
                type="submit"
                value="登录"
                class="forms_buttons-action"
                @click="loginStater=true"
              />
                <!-- @click="requireLogin" -->

            </div>
          </div>

          <div class="user_forms-signup">
            <h2 class="forms_title">注册</h2>
            <el-form :model="signupForm" ref="signupForm" :rules="signupRules">
              <el-form-item prop="userName">
                <el-input
                  v-model="signupForm.userName"
                  autocomplete="off"
                  placeholder="昵称"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userMail">
                <el-input
                  v-model="signupForm.userMail"
                  autocomplete="off"
                  placeholder="邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userPassword">
                <el-input
                  placeholder="密码"
                  type="password"
                  v-model="signupForm.userPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item prop="checkPass">
                <el-input
                  placeholder="确认密码"
                  type="password"
                  v-model="signupForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item> -->
            </el-form>
            <div class="forms_buttons">
              <div><el-link icon="el-icon-question">有疑问</el-link></div>
              <input
                type="submit"
                value="注册"
                class="forms_buttons-action"
                @click="requireSignup"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <updata-avatar :loginStater="loginStater" @changeLoginStater='loginStater=false'/>
  </div>
</template>

<script>
import updataAvatar from '../components/updataAvatar.vue';
import {
  validateUserEmail,
  validateNew,
  validateUserName,
} from "../plugins/rules";
export default {
  components: { updataAvatar },
  data() {
    return {
      loginStater:false,
      bounce: false,
      signupForm: {
        userName: "",
        userPassword: "",
        userMail: "",
      },
      loginForm: {
        userPassword: "",
        userMail: "",
      },

      signupRules: {
        userName: [
          { min: 1, max: 8, message: "昵称长度在1-8位", trigger: "blur" },
          { validator: validateUserName, trigger: "blur" },
        ],
        userMail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateUserEmail, trigger: "blur" },
        ],
        userPassword: [
          { validator: validateNew, trigger: "blur" },
          { min: 6, max: 8, message: "密码长度在6-8位", trigger: "blur" },
        ]
      },
    };
  },
  mounted() {},
  methods: {
    requireSignup() {
      this.$refs.signupForm.validate((valid) => {
        if (valid) {
          this.$axios.post("/api/register", this.signupForm).then((res) => {
            let data = res.data;
            if (data.code === 200) {
              this.$notify({
                message: data.msg,
                position: "bottom-right",
                type: "success",
              });
            } else {
              this.$notify({
                message: data.msg,
                position: "bottom-right",
                type: "error",
              });
            }
            this.loginForm.userMail = this.signupForm.userMail
            this.loginForm.userPassword = this.signupForm.userPassword
            this.bounce = false;
            this.$refs.signupForm.resetFields();
          });
        } else {
          return false;
        }
      });
    },
    // 登录
    requireLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$axios.post("/api/login", this.loginForm).then((res) => {
            let data = res.data;
            if (data.code === 200) {
              this.$notify({
                message: data.msg,
                position: "bottom-right",
                type: "success",
              });
              this.loginStater = true
            } else {
              this.$notify({
                message: data.msg,
                position: "bottom-right",
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
* {
  font-size: 0.16rem;
}

.wd-avatar {

}

/deep/.el-form {
  .el-form-item {
    margin-bottom: 0.15rem;
    .el-form-item__content {
      .el-input {
        .el-input__inner {
          border: none;
          border-bottom: 1px solid #ccc;
          &:focus {
            border-color: #00b3b0;
          }
        }
      }
    }
  }
}

.wd-userlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 1.2rem);
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type="submit"] {
  cursor: pointer;
}
input::-moz-placeholder {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::placeholder {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
/**
 * * Show Sign Up form
 * */
@-webkit-keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
/**
 * * Page background
 * */
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
  background: #ccc;
  background-size: cover;
}
.user_options-container {
  position: relative;
  width: 80%;
}
.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
}

/**
 * * Registered and Unregistered user box and text
 * */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

/**
 * * Login and signup forms
 * */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 420px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform 0.4s ease-in-out;
}
.user_options-forms .user_forms-login {
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}
.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: #00b3b0;
  letter-spacing: 0.1rem;
}

.user_options-forms .forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
}
.user_options-forms .forms_buttons-forgot {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.1rem;
  color: #ccc;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}
.user_options-forms .forms_buttons-action {
  background-color: #00b3b0;
  border-radius: 3px;
  padding: 10px 35px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: background-color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-action:hover {
  background-color: #e14641;
}
.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out,
    transform 0.5s ease-in-out;
}
.user_options-forms .user_forms-signup {
  transform: translate3d(120px, 0, 0);
}

.user_options-forms .user_forms-login {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/**
 * * Triggers
 * */
.user_options-forms.bounceLeft {
  -webkit-animation: bounceLeft 1s forwards;
  animation: bounceLeft 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-signup {
  -webkit-animation: showSignUp 1s forwards;
  animation: showSignUp 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-login {
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-120px, 0, 0);
}
.user_options-forms.bounceRight {
  -webkit-animation: bounceRight 1s forwards;
  animation: bounceRight 1s forwards;
}

/**
 * * Responsive 990px
 * */
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 350px;
  }
  .user_options-forms .forms_buttons {
    flex-direction: column;
  }
  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }
  .user_options-forms .user_forms-signup,
  .user_options-forms .user_forms-login {
    top: 40px;
  }

  .user_options-registered,
  .user_options-unregistered {
    padding: 50px 45px;
  }
}
</style>


