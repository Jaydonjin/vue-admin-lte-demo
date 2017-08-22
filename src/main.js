// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import { ajax } from './common/ajax'

import 'va/lib/css'
import 'va/lib/script'
import './less/all.less'

Vue.config.productionTip = false
Vue.prototype.$http = axios
let baseURL = 'http://localhost:8088/dfis_api/api/v1'
ajax.init({baseURL})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
