import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import api from './http/api'

Vue.config.productionTip = false

//配置请求基础路径
axios.defaults.baseURL = 'http://47.98.128.191:3000'

//将封装的api配置全局变量
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
