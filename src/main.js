import Vue from 'vue'

import App from './App'
import router from './router'
import Header from './components/Header/Header'
import store from './store'
import Star from './components/Star/Star'

Vue.component('Header', Header)
Vue.component('Star', Star)

new Vue({
  render: h => h(App),
  router, // 配置路由器
  store // 配置vuex
}).$mount('#app')
