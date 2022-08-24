<template>
<Base1>
  <div class="header">注册成功！</div>
  <div class="form-wrapper">
    <button @click="toLogin" class="btng">Go To Login</button>
  </div>
  <div>
    <button @click="toHome" class="msg">Back to menu</button>
  </div>
</Base1>
</template>

<script>
import Base1 from '../widget/Base1'
export default {
  name: 'SignUpSuccess',
  components: {Base1},
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    toHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.header{
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
.msg {
  cursor: pointer;
  font-size: 25px;
  background:rgba(0,0,0,0);
  border: none;
  text-align: center;
  line-height: 60px;
  text-decoration-line: none;
  color: #a6c1ee;
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
  cursor: pointer;
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
</style>
