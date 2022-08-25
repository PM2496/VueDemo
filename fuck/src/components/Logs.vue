<template>
  <div class="container">
    <p class="msg">日志</p>

    <span>
      <el-input
        placeholder="查询日期格式20220101"
        v-model="reqDate"
        clearable
        class="elInput"
        @change="reloadLogs">
      </el-input>
    </span>

    <span>
      <button @click="logout" class="bt_logout">登出</button>
    </span>

    <button class="bt_menu" @click="toRootPage">菜单</button>
    <div class="wrapper">
      <table>
        <thead>
        <tr>
          <th>序号</th>
          <th>ip地址</th>
          <th>日期</th>
          <th>请求方法</th>
          <th>请求url</th>
          <th>请求协议</th>
          <th>状态码</th>
          <th>请求耗时</th>
        </tr><!--TODO onmouseover="ShowBgColor()" onmouseout="ClearBgColor()"-->
        </thead>
        <tbody>
        <tr v-for="(item, index) in logs" :key="index">
          <td>{{index}}</td>
          <td>{{item.ip}}</td>
          <td>{{item.date}}</td>
          <td>{{item.method}}</td>
          <td>{{item.url}}</td>
          <td>{{item.protocol}}</td>
          <td>{{ item.status }}</td>
          <td>{{item.time}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  data () {
    return {
      logs: [],
      reqDate: ''
    }
  },
  // mounted () {
  //   // 不知道为什么请求拦截器不对mounted里的请求进行拦截，只能单独设置了
  //   this.reloadLogs()
  //   console.log('token', localStorage.getItem('token'))
  // },
  // watch: {
  //   '$route': 'reloadLogs'
  // },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/')
    },
    toRootPage () {
      this.$router.push('/RootPage')
    },
    reloadLogs () {
      // const config = {
      //   headers: {
      //     token: localStorage.getItem('token')
      //   }
      // }
      // if (this.reqDate.length === 0) {TODO 校验日期格式
      //   console.log('输入日期')
      //   alert()
      // }
      this.$http({
        url: '/ShowLogs',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        },
        params: {
          date: this.reqDate
        }
      }).then(resp => {
        console.log('logs', this.logs)
        this.logs = resp.data.logs
      })
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

.wrapper thead {
  height: 60px;
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

.elInput {
  width: 200px;
  float: left;
  padding: 1.3em 3em;}
</style>
