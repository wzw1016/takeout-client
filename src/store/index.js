/* vuex最核心的状态管理对象store */
import Vue from 'vue'
import Vuex from 'vuex'

import msite from './modules/msite'
import login from './modules/login'
import shop from './modules/shop'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  
  modules: {
    msite,
    login,
    shop
  }
})