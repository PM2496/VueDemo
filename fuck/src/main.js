// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import './assets/stylesheet/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import store from '../store'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$http = axios // 设置http全局标量，之后就可以以this.$http的形式访问了
Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:8080'

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store: store,
  axios,
  components: { App },
  template: '<App/>'
})

// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })
// 响应拦截器，状态码对应跳转页面
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response
    }
  },
  error => {
    console.log('axios中response报错', error)
    switch (error.response.status) {
      case 404:
        vm.$router.push('/404')
        break
      case 403:
        vm.$router.push('/403')
        break
      case 405:
        this.$router.push('/405')
        break
      case 400:
        vm.$router.push('/400')
        break
      case 500:
        vm.$router.push('/500')
        break
      default:
        vm.$router.push('/')
    }
    return Promise.reject(error)
  }
)
