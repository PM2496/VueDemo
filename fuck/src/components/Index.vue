<template>
  <Base1>
    <div class="header">导航页</div>
    <div class="form-wrapper">
      <button @click="toLogin" class="btng">用户登录</button>
      <button @click="toRegister" class="btnb">用户注册</button>
    </div>
  </Base1>
</template>

<script>
import Base1 from '../widget/Base1'

export default {
  name: 'Index',
  components: {Base1},
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.header {
  color: #0d0d0d;
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

.btnb {
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #c5f4ff, #fbc2eb);
  font-size: 1em;
}

.btnb:hover {
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  width: 100%;
  margin-top: 40px;
  background-color: slategrey;
  background-image: linear-gradient(to right, #fbc2eb, #c5f4ff);
  font-size: 1em;
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
</style>
