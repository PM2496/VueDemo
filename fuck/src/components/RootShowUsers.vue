<template>
  <div class="container">
    <p class="msg">用户管理页</p>

    <span>
      <button @click="logout" class="bt_logout">登出</button>
    </span>

    <button class="bt_menu" @click="toRootPage">菜单</button>

    <button class="bt_add" @click="togglePopOut">增添用户</button>

<!--    <form action="" class="search-bar">&lt;!&ndash;TODO 搜素框&ndash;&gt;-->
<!--      <input type="search" name="search" pattern=".*\S.*" placeholder="Search" required="required"-->
<!--             onkeyup="this.value=this.value.replace(/[(/,<>: |'\\)]/g,'')">-->
<!--      <button class="search-btn" type="submit">-->
<!--        <span>Search</span>-->
<!--      </button>-->
<!--    </form>-->
    <div class="wrapper">
      <el-table
        :data="userInf.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :border="true">
        <el-table-column
          label="用户名"
          prop="name"
          align="center">
        </el-table-column>
        <el-table-column
          label="用户邮箱"
          prop="email"
          align="center">
        </el-table-column>
        <el-table-column
          align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入用户名搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleCheckFile(scope.$index, scope.row)">查看文件</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="popout_operate">
      <div class="content">
        <h2>增添用户</h2>
        <form>
          <div class="inputbox">
            <input v-model="user.name" type="text" placeholder="username" class="input-item"
                   onkeyup="this.value=this.value.replace(/[, <>/|'\\]/g,'')" autofocus="autofocus">
          </div>
          <div class="inputbox">
            <input v-model="user.password" type="password" placeholder="password" class="input-item"
                   onkeyup="this.value=this.value.replace(/[, <>/|'\\]/g,'')">
          </div>
          <div class="inputbox">
            <input v-model="user.email" type="email" placeholder="email" class="input-item"
                   onkeyup="this.value=this.value.replace(/[, <>/|'\\]/g,'')">
          </div>
          <button @click="addUser" class="bt_inputbox">增添用户</button><!--TODO check-->
        </form>
      </div>
      <button @click="togglePopOut" class="bt_close"><img src="../../static/image/close.png" width="45" height="45"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RootShowUsers',
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: ''
      },
      userInf: [],
      search: ''
    }
  },
  mounted () {
    // 不知道为什么请求拦截器不对mounted里的请求进行拦截，只能单独设置token了
    this.reloadFile()
  },
  watch: {
    '$route': 'reloadFile'
  },
  methods: {
    reloadFile () {
      const config = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      const _this = this
      this.$http.post('/RootShowUsers', null, config).then(response => {
        if (response.data.status === 404) {
          _this.$route.push('/404')
          return
        }
        // console.log(response.data.status)
        _this.userInf = response.data.userInf
      })
    },
    handleCheckFile (index, row) {
      this.$router.push({path: '/RSUF', query: {email: JSON.stringify(row.email), name: JSON.stringify(row.name)}})
    },
    handleDelete (index, row) {
      console.log(index, row)
      const _this = this
      this.$http({
        url: '/RootDelUser',
        method: 'post',
        data: {
          delEmail: row.email // 向后台传递要删除的邮箱
        }
      }).then((res) => {
        /*
        statusCode
        0:后台删除成功
        1:用户文件夹删除失败
        2:删除失败
         */
        switch (res.data.code) {
          case 0:
            _this.userInf = res.data.userInf
            alert('删除成功')// 删除某一行
            break
          case 1:
            console.log('用户文件夹删除失败')
            alert('用户文件夹删除失败')
            break
          case 2:
            this.$router.push('/RootDeleteFail')
            break
        }
      })
    },
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/')
    },
    toRootPage () {
      this.$router.push('/RootPage')
    },
    addUser () {
      const _this = this
      this.$http({
        url: '/RootAddUser',
        method: 'post',
        data: _this.user
      }).then((res) => {
        // console.log(res)
        if (res.data.code === 1) {
          alert('未成功添加用户')
          return
        }
        _this.userInf = res.data.userInf
        alert('成功添加用户')
      }).catch((error) => {
        console.log(error)
      })
    },
    togglePopOut () {
      const popOut = document.getElementById('popout_operate')
      popOut.classList.toggle('active')
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  font-family: 'Open Sans Light', sans-serif;
  letter-spacing: .05em;
}

html {
  height: 100%;
}

body {
  height: 100%;
}

/* 渐变背景 */
.container {
  height: 100%;
  width: 100%;
  float: right;
  background-image: linear-gradient(135deg, #69FF97 10%, #00E4FF 100%);
}

/* 中心白框 */
.wrapper {
  overflow: scroll;
  background-color: #fff;
  width: 80%;
  height: 80%;
  padding: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -48%);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
}

.wrapper table {
  border-collapse: collapse;
  width: 100%;
}

.wrapper table tbody tr td {
  text-align: center;
  padding: 20px 40px;
}

.wrapper table tbody tr td {
  border: 1px solid rgb(210, 210, 210);
}

.wrapper table tbody tr:nth-child(odd) {
  background-color: #fcfcfc;
}

.msg {
  font-family: \22Comic Sans MS\22, sans-serif;
  font-size: 34px;
  text-align: left;
  float: left;
  margin: 1% 0 0 10%;
}

/* 增添用户按钮 */
.bt_add {
  font-family: \u5E7C\u5706, sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin: 1% 0 0 1%;
  padding: 1.3em 3em;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  float: right;
}

.bt_add:hover {
  background-color: #2EE59D;
  box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.bt_add:active {
  transform: translateY(-1px);
}

/* 菜单按钮 */
.bt_menu {
  font-family: \u5E7C\u5706, sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin: 1% 0 0 1%;
  padding: 1.3em 3em;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  float: right;
}

.bt_menu:hover {
  background-color: #2EE59D;
  box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.bt_menu:active {
  transform: translateY(-1px);
}

/* 登出按钮 */
.bt_logout {
  font-family: \u5E7C\u5706, sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin: 1% 2% 0 1%;
  padding: 1.3em 3em;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  float: right;
}

.bt_logout:hover {
  background-color: #e52e2e;
  box-shadow: 0 15px 20px rgba(229, 46, 46, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.bt_logout:active {
  transform: translateY(-1px);
}

/* 搜索框 */
.search-bar * {
  border: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.search-bar button,
.search-bar input {
  font: 1em Hind, sans-serif;
  line-height: 1em;
}

.search-bar input{
  color: rgba(214, 117, 236, 0.72);
}
.search-bar {
  display: flex;
  width: 30%;
  float: right;
}

.search-bar input,
.search-btn,
.search-btn:before,
.search-btn:after {
  transition: all 0.3s ease-out;
}

.search-bar input,
.search-btn {
  width: 3em;
  height: 3em;
}

.search-bar input:invalid:not(:focus),
.search-btn {
  cursor: pointer;
}

.search-bar input:focus,
.search-bar input:valid  {
  width: 100%;
}
.search-bar input:focus,
.search-bar input:not(:focus) + .search-btn:focus {
  outline: transparent;
}
.search-bar {
  margin: auto;
  padding: 19px 0;
  justify-content: right;
  max-width: 24%;
}
.search-bar input {
  background: transparent;
  border-radius: 1.5em;
  box-shadow: 0 0 0 0.4em #171717 inset;
  padding: 0.75em;
  transform: translate(0.5em,0.5em) scale(0.5);
  transform-origin: 100% 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.search-bar input::-webkit-search-decoration {
  -webkit-appearance: none;
}
.search-bar input:focus,
.search-bar input:valid {
  background: rgba(255, 255, 255, 0.54);
  border-radius: 0.375em 0 0 0.375em;
  box-shadow: 0 0 0 0.1em rgba(217, 217, 217, 0.66) inset;
  transform: scale(1);
}
.search-btn {
  background: #000000;
  border-radius: 0 0.75em 0.75em 0 / 0 1.5em 1.5em 0;
  padding: 0.75em;
  position: relative;
  transform: translate(0.25em,0.25em) rotate(45deg) scale(0.25,0.125);
  transform-origin: 0 50%;
}
.search-btn:before,
.search-btn:after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
}
.search-btn:before {
  border-radius: 50%;
  box-shadow: 0 0 0 0.2em #f1f1f1 inset;
  top: 0.75em;
  left: 0.75em;
  width: 1.2em;
  height: 1.2em;
}
.search-btn:after {
  background: #f1f1f1;
  border-radius: 0 0.25em 0.25em 0;
  top: 51%;
  left: 51%;
  width: 0.75em;
  height: 0.25em;
  transform: translate(0.2em,0) rotate(45deg);
  transform-origin: 0 50%;
}
.search-btn span {
  display: inline-block;
  overflow: hidden;
  width: 1px;
  height: 1px;
}

/* Active state */
.search-bar input:focus + .search-btn,
.search-bar input:valid + .search-btn {
  background: rgba(117, 133, 236, 0.72);
  border-radius: 0 0.375em 0.375em 0;
  transform: scale(1);
}
.search-bar input:focus + .search-btn:before,
.search-bar input:focus + .search-btn:after,
.search-bar input:valid + .search-btn:before,
.search-bar input:valid + .search-btn:after {
  opacity: 1;
}
.search-bar input:focus + .search-btn:hover,
.search-bar input:valid + .search-btn:hover,
.search-bar input:valid:not(:focus) + .search-btn:focus {
  background: #5accb1;
}
.search-bar input:focus + .search-btn:active,
.search-bar input:valid + .search-btn:active {
  transform: translateY(1px);
}

@media screen and (prefers-color-scheme: dark) {
  body, input {
    color: #f1f1f1;
  }
  body {
    background: #171717;
  }
  .search-bar input {
    box-shadow: 0 0 0 0.4em #f1f1f1 inset;
  }
  .search-bar input:focus,
  .search-bar input:valid {
    background: #3d3d3d;
    box-shadow: 0 0 0 0.1em #3d3d3d inset;
  }
  .search-btn {
    background: #f1f1f1;
  }
}

/* 增加用户弹框 */
#popout_operate {
  position: fixed;
  top: -100%; /* -100% */
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
  background: white;
  width: 450px;
  padding: 20px 50px 50px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  transition: 0.5s;
  visibility: hidden;
  border-radius: 15px;
}

#popout_operate.active {
  visibility: visible;
  top: 50%;
}

#popout_operate .content {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}

#popout_operate .content h2 {
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: #0d0d0d;
  margin: 20px 0 20px 0;
}

#popout_operate .content .inputbox {
  position: relative;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
}

#popout_operate .content .inputbox input {
  width: 100%;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 15px;
  outline: none;
  font-size: 18px;
}

#popout_operate .content .bt_inputbox {
  position: relative;
  left: 50%;
  transform: translate(-50%,0);
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 150px;
  height: 45px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  font-family: sans-serif;
  box-sizing: border-box;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4 );
  background-size: 400%;
  border-radius: 30px;
  outline: none;
}
#popout_operate .content .bt_inputbox:hover{
  color: #fff;
  animation: animation 8s linear infinite;
}
@keyframes animation{
  0%
  {
    background-position: 0;
  }
  100%
  {
    background-position: 400%;
  }
}
#popout_operate .content .bt_inputbox::before{
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4 );
  background-size: 400%;
  border-radius: 40px;
  filter: blur(20px);
  opacity: 0;
  transition: .5s;
}
#popout_operate .content .bt_inputbox:hover::before{
  filter: blur(20px);
  opacity: 1;
  animation: animation 8s linear infinite;
}
#popout_operate .bt_close {
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.content {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}

#popout_user .content h2 {
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: #0d0d0d;
  margin: 20px 0 20px 0;
}

#popout_user .content .inputbox {
  position: relative;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
}
/* 展示文件按钮 */
#popout_user .content .bt_RSF {
  font-family: \u5E7C\u5706, sans-serif;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  left: 50%;
  transform: translate(-50%,0);
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 150px;
  height: 45px;
  text-align: center;
  line-height: 40px;
  color: #000;
  background-color: rgba(172, 229, 209, 0.78);
  text-transform: uppercase;
  border: none;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

#popout_user .content .bt_RSF:hover{
  background-color: #2EE59D;
  box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translate(-50%, -14%);
}

#popout_user .content .bt_RSF:active{
  transform: translate(-50%, -2%);
}

/* 删除用户按钮 */
#popout_user .content .bt_RDU {
  font-family: \u5E7C\u5706, sans-serif;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  left: 50%;
  transform: translate(-50%,0);
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 150px;
  height: 45px;
  text-align: center;
  line-height: 40px;
  color: #000;
  background-color: rgba(229, 172, 172, 0.78);
  text-transform: uppercase;
  border: none;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

#popout_user .content .bt_RDU:hover{
  background-color: #e52e2e;
  box-shadow: 0 15px 20px rgba(229, 46, 46, 0.4);
  color: #fff;
  transform: translate(-50%, -14%);
}

#popout_user .content .bt_RDU:active{
  transform: translate(-50%, -2%);
}

#popout_user .bt_close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

</style>
