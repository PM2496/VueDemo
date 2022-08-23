import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../components/Register'
import Login from '../components/Login'
import RootPage from '../components/RootPage'
import WrongPassword from '../components/WrongPassword'
import IPForbidden from '../components/IPForbidden'
import WrongUsername from '../components/WrongUsername'
import ServerError from '../components/ServerError'
import EmailExist from '../components/EmailExist'
import SignUpSuccess from '../components/SignUpSuccess'
import SignUpFail from '../components/SignUpFail'
import RootEmailExist from '../components/RootEmailExist'
import RootSignUpFail from '../components/RootSignUpFail'
import RootSignUpSuccess from '../components/RootSignUpSuccess'
import RootDeleteFail from '../components/RootDeleteFail'
import Index from '../components/Index'
import FilePage from '../components/FilePage'
import Logs from '../components/Logs'
import RootShowUsers from '../components/RootShowUsers'
import RootShowUserFiles from '../components/RootShowUserFiles'
import E400 from '../components/E400'
import E403 from '../components/E403'
import E404 from '../components/E404'
import E405 from '../components/E405'

Vue.use(VueRouter)
const router = new VueRouter({
  base: '/NetDisk/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/wrongpassword',
      name: 'WrongPassword',
      component: WrongPassword
    },
    {
      path: '/IPForbidden',
      name: 'IPForbidden',
      component: IPForbidden
    },
    {
      path: '/wrongusername',
      name: 'WrongUsername',
      component: WrongUsername
    },
    {
      path: '/ServerError',
      name: 'ServerError',
      component: ServerError
    },
    {
      path: '/EmailExist',
      name: 'EmailExist',
      component: EmailExist
    },
    {
      path: '/SignUpSuccess',
      name: 'SignUpSuccess',
      component: SignUpSuccess
    },
    {
      path: '/SignUpFail',
      name: 'SignUpFail',
      component: SignUpFail
    },
    {
      path: '/RootEmailExist',
      name: 'RootEmailExist',
      component: RootEmailExist
    },
    {
      path: '/RootSignUpFail',
      name: 'RootSignUpFail',
      component: RootSignUpFail
    },
    {
      path: '/RootSignUpSuccess',
      name: 'RootSignUpSuccess',
      component: RootSignUpSuccess
    },
    {
      path: '/RootDeleteFail',
      name: 'RootDeleteFail',
      component: RootDeleteFail
    },
    {
      path: '/RootPage',
      name: 'RootPage',
      component: RootPage
    },
    {
      path: '/FilePage',
      name: 'FilePage',
      component: FilePage
    },
    {
      path: '/logs',
      name: 'Logs',
      component: Logs
    },
    {
      path: '/RSU',
      name: 'RootShowUsers',
      component: RootShowUsers
    },
    {
      path: '/RSUF',
      name: 'RootShowUserFiles',
      component: RootShowUserFiles
    },
    {
      path: '/400',
      name: 'E400',
      component: E400
    },
    {
      path: '/403',
      name: 'E403',
      component: E403
    },
    {
      path: '/404',
      name: 'E404',
      component: E404
    },
    {
      path: '/405',
      name: 'E405',
      component: E405
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/index') {
    next()
  } else {
    let token = localStorage.getItem('token')
    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
