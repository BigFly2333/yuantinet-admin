<template>
  <div class="login-page">
    <div class="login-card">
      <el-card shadow="hover" style="background: rgba(0,0,0,0.3);border-color: rgba(0,0,0,0.1);padding: 20px;">
        <el-form label-width="80px" ref="loginForm" :rules="formRules" :model="formData">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="formData.username"
              name="username"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formData.password"
              type="password"
              name="password"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss">
  .login-page {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(~@/assets/login_bg_2.jpg) no-repeat center;
    background-size: cover!important;
    .login-card {
      width: 400px;
      position: absolute;
      left: 50%;
      margin-left: -200px;
      top: 30vh;
      .title {
        color: #ebebeb
      }
      .el-form {
        margin-top: 50px;
        label {
          color: #fff
        }
        input {
          color: #fff
        }
      }
      .el-input .el-input__inner {
        background: none;
      }
    }
  }
</style>

<script>
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value === '') callback(new Error('请输入用户名'))
      else callback()
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') callback(new Error('请输入密码'))
      else callback()
    }

    return {
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          { validator: validateUsername, trigger: 'blur', required: true }
        ],
        password: [
          { validator: validatePass, trigger: 'blur', required: true }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.formData).then(msg => {
            if (msg) {
              this.$message.error(msg)
            } else {
              if (this.$route.query && this.$route.query.redirect === location.hostname) {
                this.$router.go(-1)
              } else {
                this.$router.push('/')
              }
            }
          }).catch(error => {
            this.$message.error(error)
          })
        } else {
          this.$message.error('请检查用户名密码格式')
        }
      })
    }
  }
}
</script>
