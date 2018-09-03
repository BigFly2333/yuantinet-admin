import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import { Message } from 'element-ui'

// import Index from 'views/Index'
// import Login from 'views/login/index'
// import QuestionsList from 'views/questions/list'
// import Error404 from 'views/error/404'

const Index = resolve => require(['views/index'], resolve)
const Login = resolve => require(['views/login/index'], resolve)
const QuestionsList = resolve => require(['views/questions/list'], resolve)
const Error404 = resolve => require(['views/error/404'], resolve)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/questions',
      name: 'questions',
      component: QuestionsList
    },
    {
      path: '/404',
      name: '404',
      component: Error404
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.getters.loginState && to.matched.some(record => record.meta.requiresAuth !== false)) {
    if (!store.getters.token) {
      Message({
        message: '您未登录，请先登录',
        type: 'error',
        duration: 2000,
        onClose () {
          next({
            path: '/login',
            query: {
              redirect: location.hostname
            }
          })
        }
      })
    } else {
      store.dispatch('Tokencheck').then(msg => {
        if (msg) {
          Message({
            message: msg,
            type: 'error',
            duration: 2000,
            onClose () {
              next({
                path: '/login',
                query: {
                  redirect: location.hostname
                }
              })
            }
          })
        } else {
          next()
        }
      }).catch(error => {
        next({
          path: '/404',
          props: {
            msg: error
          }
        })
      })
    }
  } else {
    next()
  }
})

export default router
