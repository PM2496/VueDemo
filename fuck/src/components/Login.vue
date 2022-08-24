<template>
  <Base1>
    <div class="header">登录</div>
    <div class="form-wrapper">
      <span>
        <input @blur="checkE" v-model="email" type="email" placeholder="email"    class="input-item" onkeyup="this.value=this.value.replace(/[, <>/|'\\]/g,'')" required="required" autofocus="autofocus">
        <input @blur="checkPwd" v-model="password" type="password" placeholder="password" class="input-item" onkeyup="this.value=this.value.replace(/[, <>/|'\\]/g,'')" required="required">
        <button @click="submit" class="btng">Login in</button>
      </span>
      <div>
        <button @click="toRegister" class="msg">Sign up</button>
        <br>
        <button @click="toHome" class="msg">Back to menu</button>
      </div>
    </div>
  </Base1>
</template>

<script>
import Base1 from '../widget/Base1'
export default {
  name: 'Login',
  components: {Base1},
  data () {
    return {
      password: '',
      email: '',
      validPwd: false, // 密码输入是否合法
      validE: false // 邮箱输入是否合法
    }
  },
  methods: {
    toRegister () {
      this.$router.push('/register')
    },
    toHome () {
      this.$router.push('/')
    },
    checkPwd () {
      if (this.password.length > 0 && this.password.length < 6) {
        alert('密码过短，请重新输入！')
        this.validPwd = false
      } else if (this.password.length > 32) {
        alert('密码过长，请重新输入！')
        this.validPwd = false
      } else {
        this.validPwd = true
      }
    },
    checkE () {
      if (this.email.length > 32) {
        alert('邮箱过长，请重新输入！')
        this.validE = false
      } else {
        this.validE = true
      }
    },
    submit () {
      if (!this.validE) {
        alert('邮箱长度不合法，请重新输入')
      } else if (!this.validPwd) {
        alert('密码长度不合法，请重新输入')
      } else {
        // let params = new URLSearchParams()
        // params.append('password', this.password)
        // params.append('email', this.email)
        const _this = this
        this.$http({
          url: '/login',
          method: 'post',
          data: {
            email: _this.email,
            password: _this.password
          }
        }).then(response => {
          /*
          statusCode
          0: 登录成功
          1: wrongpassword 密码错误
          2: IPForbidden IP封禁
          3: wrongusername 用户不存在
           */
          console.log(response.data)
          switch (response.data.code) {
            case 0:
              const token = response.data.token
              // 存储token到LocalStorage
              localStorage.setItem('token', token)
              this.$router.push({
                name: 'FilePage'
                // params: {
                //   email: response.data.email,
                //   username: response.data.username,
                //   files: response.data.filelist
                // }
              })
              break
            case 1:
              this.$router.push('/wrongpassword')
              break
            case 2:
              this.$router.push('/IPForbidden')
              break
            case 3:
              this.$router.push('wrongusername')
              break
            case 4:
              localStorage.setItem('token', response.data.token)
              this.$router.push('/RootPage')
          }
        })
      }
    }

  }
}
</script>

<style scoped>
.form-wrapper {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
  text-transform: uppercase;
}

.header {
  color: #0d0d0d;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.input-item::placeholder {
  text-transform: uppercase;
}

.btng {
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #c5ffd5, #fbc2eb);
  font-size: 1em;
}

.btng:hover {
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  width: 100%;
  margin-top: 40px;
  background-color: slategrey;
  background-image: linear-gradient(to right, #fbc2eb, #c5ffd5);
  font-size: 1em;
}

.msg {
  text-align: center;
  line-height: 40px;
  border: none;
  color: #a6c1ee;
  background-color: transparent;
  cursor: pointer;
  font-size: 17px;
}
</style>
