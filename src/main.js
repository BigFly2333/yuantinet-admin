// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'

import App from './App'
import ElementUi from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
