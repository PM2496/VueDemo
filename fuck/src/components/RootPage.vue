<template>
  <div class="body">
    <div class="container">
      <div class="wrapper">
        <h1 class="title">管理员菜单页</h1>
        <span>
          <button @click="toRSU" class="bt">查看用户列表</button>
        </span>
        <span>
          <button @click="toLogs" class="bt">显示网站日志</button>
        </span>
        <span>
          <button @click="logout" class="bt">登出</button>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RootPage',
  methods: {
    logout () {
      this.$http.get('/logout').then(response => {
        console.log('response:')
        console.log(response)
        /*
        statusCode
        0: 成功
        1: 失败
         */
        if (!response.headers.statusCode) {
          // 清除token
          localStorage.removeItem('token')
          this.$router.push('/')
        } else {
          console.log('token清除失败')
          alert('退出失败')
        }
      })
    },
    toRSU () {
      this.$http({
        url: '/RSU',
        method: 'get'
      }).then(response => {
        this.$router.push({
          name: 'RSU',
          params: {
            usersInf: response.data
          }
        })
      })
    },
    toLogs () {
      this.$http({
        url: '/logs',
        method: 'get'
      }).then(resp => {
        this.$router.push({
          name: 'logs',
          params: {
            logs: resp.data
          }
        })
      })
    }
  }
}
</script>
<style scoped>
.body {
  height: 100%;
}
.container {
  height: 100%;
  width: 100%;
  float:right;
  background-image: linear-gradient(135deg, #69FF97 10%, #00E4FF 100%);
}
.wrapper {
  overflow: hidden;
  width: 20%;
  height: 80%;
  padding: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -48%);
}

.wrapper .title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.wrapper .bt {
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 30px;
  background-image: linear-gradient(to right, #c5f4ff,#fbc2eb);
  font-size: 1em;
}

.wrapper .bt:hover {
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 30px;
  background-color: slategrey;
  background-image: linear-gradient(to right,#fbc2eb,#c5f4ff);
  font-size: 1em;
}
</style>
