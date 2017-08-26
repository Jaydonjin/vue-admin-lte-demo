// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import {ajax} from './common/ajax'
import EventBus from './lib/eventBus.js'
import {FILTERS} from '@/filters/index'

import 'va/lib/css'
import 'va/lib/script'
import './less/all.less'
import './lib/css'
import './lib/script'

Object.keys(FILTERS).forEach((key) => {
  Vue.filter(key, FILTERS[key])
})

Vue.config.productionTip = false
Vue.prototype.$bus = EventBus
Vue.prototype.$http = axios
let baseURL = 'http://localhost:8088/dfis_api/api/v1/'
ajax.init({baseURL})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
