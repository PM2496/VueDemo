<template>
  <Base1>
    <div class="header">注册</div>
    <div>
      <input type="text" v-model="user.name" @blur="checkUser" placeholder="name" class="input-item" onkeyup="this.value=this.value.replace(/[, ]/g,'')" required="required" autofocus="autofocus">
      <input type="password" v-model="user.password" @blur="checkPwd" placeholder="password" class="input-item" onkeyup="this.value=this.value.replace(/[, ]/g,'')" required="required">
      <input type="email" v-model="user.email" @blur="checkE" placeholder="email" class="input-item"
             onkeyup="this.value=this.value.replace(/[, ]/g,'')" required="required">
      <button @click="submit" class="btn">Sign up</button>
    </div>
    <div>
      <button @click="toLogin" class="msg">Login in</button><br>
      <button @click="toHome" class="msg">Back</button>
    </div>
  </Base1>
</template>

<script>
import Base1 from '../widget/Base1'
export default {
  name: 'Register',
  components: {Base1},
  data () {
    return {
      user: {
        name: '',
        password: '',
        email: ''
      },
      validPwd: false, // 密码输入是否合法
      validE: false, // 邮箱输入是否合法
      validU: false // 用户名输入是否合法
    }
  },
  methods: {
    // 页面跳转
    toLogin () {
      this.$router.push('/login')
    },
    toHome () {
      this.$router.push('/')
    },
    // 输入长度检查
    checkUser () {
      if (this.user.name.length > 0 && this.user.name.length <= 2) {
        alert('用户名过短，请重新输入！')
        this.validU = false
      } else if (this.user.name.length > 20) {
        alert('用户名过长，请重新输入！')
        this.validU = false
      } else {
        this.validU = true
      }
    },
    checkPwd () {
      if (this.user.password.length > 0 && this.user.password.length < 6) {
        alert('密码过短，请重新输入！')
        this.validPwd = false
      } else if (this.user.password.length > 32) {
        alert('密码过长，请重新输入！')
        this.validPwd = false
      } else {
        this.validPwd = true
      }
    },
    checkE () {
      if (this.user.email.length > 32) {
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
      } else if (!this.validE) {
        alert('邮箱长度不合法，请重新输入')
      } else {
        this.$http.post('/register', this.user).then(res => {
          // console.log(res)
          /*
          statusCode
          0: 注册成功
          1: 用户名或邮箱或密码格式非法、不允许注册管理员账号
          2: ServerError
          3: EmailExist
          4: SignUpFail
           */
          switch (res.data) {
            case 0:
              this.$router.push('/SignUpSuccess')
              break
            case 1:
              alert('非法输入！请重新注册！')
              break
            case 2:
              this.$router.push('/ServerError')
              break
            case 3:
              this.$router.push('/EmailExist')
              break
            case 4:
              this.$router.push('/SignUpFail')
              break
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.header{
  color: #0d0d0d;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
.input-item{
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
.btn {
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  width: 100%;
  margin-top: 30px;
  background-image: linear-gradient(to right, #c5f4ff, #fbc2eb);
  font-size: 1em;
}
.btn:hover {
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  width: 100%;
  margin-top: 30px;
  background-color: slategrey;
  background-image: linear-gradient(to right, #fbc2eb, #c5f4ff);
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
