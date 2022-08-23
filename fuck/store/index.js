import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // 存储token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
  },
  // mutations: {
  //   // 修改token，并将token存入localStorage
  //   changeLogin (token) {
  //     // state.token = token
  //     localStorage.setItem('token', token)
  //   }
  // }
})

export default store
