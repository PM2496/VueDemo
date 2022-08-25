<!--基于此布局的页面:
1. login.html
2. register.html
3. index
4. IPForbidden
5. wrongPassword
6. wrongUsername
7. ServerError
8. EmailExist
9. SignUpSuccess
10. RootDeleteFail
11. RootEmailExist
12. RootSignUpFail
13. RootSignUpSuccess
14. SignUpFail
-->
<template>
  <div class="bgImg">
    <div class="container">
      <div class="login-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Base1'
}
</script>

<style scoped>
.bgImg{
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-repeat: repeat-y;
  background-image: url("../../static/image/yingxing.jpg");
}
.container {
  height: 100%;
  width: 80%;
  float:right;
  background-image: linear-gradient(to right,#F8C26B,#fbc2eb);
}

.login-wrapper{
  background-color: #fff;
  width: 250px;
  height: 500px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

/*.login-wrapper .header{*/
/*  font-size: 30px;*/
/*  font-weight: bold;*/
/*  text-align: center;*/
/*  line-height: 200px;*/
/*}*/

.login-wrapper .form-wrapper {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}
.login-wrapper .form-wrapper {
  text-transform: uppercase;
}
/*.btnb {*/
/*  -webkit-transition-duration: 0.4s;*/
/*  transition-duration: 0.4s;*/
/*  border-radius: 10px;*/
/*  text-align: center;*/
/*  padding: 15px;*/
/*  width: 100%;*/
/*  margin-top: 40px;*/
/*  background-image: linear-gradient(to right, #c5f4ff,#fbc2eb);*/
/*  font-size: 1em;*/
/*}*/
/*.btnb:hover{*/
/*  border-radius: 10px;*/
/*  text-align: center;*/
/*  padding: 15px;*/
/*  width: 100%;*/
/*  margin-top: 40px;*/
/*  background-color: slategrey;*/
/*  background-image: linear-gradient(to right,#fbc2eb,#c5f4ff);*/
/*  font-size: 1em;*/
/*}*/
/*.btng{*/
/*  -webkit-transition-duration: 0.4s;*/
/*  transition-duration: 0.4s;*/
/*  border-radius: 10px;*/
/*  text-align: center;*/
/*  padding: 15px;*/
/*  width: 100%;*/
/*  margin-top: 40px;*/
/*  background-image: linear-gradient(to right, #c5ffd5,#fbc2eb);*/
/*  font-size: 1em;*/
/*}*/
/*.btng:hover{*/
/*  border-radius: 10px;*/
/*  text-align: center;*/
/*  padding: 15px;*/
/*  width: 100%;*/
/*  margin-top: 40px;*/
/*  background-color: slategrey;*/
/*  background-image: linear-gradient(to right,#fbc2eb,#c5ffd5);*/
/*  font-size: 1em;*/
/*}*/

.login-wrapper .form-wrapper {
  border: none;
}

.login-wrapper {
  text-align: center;
  line-height: 40px;
}

.login-wrapper {
  text-decoration-line: none;
  color: #a6c1ee;
}
</style>
