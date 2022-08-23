<template>
  <Base1>
    <div class="header">账号输入错误</div>
    <div class="form-wrapper">
      <button @click="toLogin" class="btng">Back to login</button>
    </div>
    <div>
      <button @click="toRegister" class="msg">Sign up</button>
      <br>
      <button @click="toHome" class="msg">Back to menu</button>
    </div>
  </Base1>
</template>

<script>
import Base1 from '../widget/Base1'
export default {
  name: 'WrongUsername',
  components: {Base1},
  methods: {
    toRegister () {
      this.$router.push('/register')
    },
    toHome () {
      this.$router.push('/')
    },
    toLogin () {
      this.$router.push('/login.html')
    }
  }
}
</script>

<style scoped>
.header {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
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
.btng {
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #c5ffd5,#fbc2eb);
  font-size: 1em;
}
.btng:hover {
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  width: 100%;
  margin-top: 40px;
  background-color: slategrey;
  background-image: linear-gradient(to right,#fbc2eb,#c5ffd5);
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
