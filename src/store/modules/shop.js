import Vue from 'vue'
import Vuex from 'vuex'

import {
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../../api'

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
} from '../mutation-types'


const state = {
  /* Shop */
  goods: [],
  ratings: [],
  info: {}
}
const mutations = {
  /* Shop */
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  }
}
const actions = {
  /* 
    Shop
  */
  async getShopGoods ({commit}, callback) {

    const result = await reqShopGoods()
    const goods = result.data
    if (result.code === 0) {
      commit(RECEIVE_GOODS, {goods})
      typeof callback === 'function' && callback()
    }
    
  },
  async getShopRatings ({commit}, callback) {

    const result = await reqShopRatings()
    const ratings = result.data
    if (result.code === 0) {
      commit(RECEIVE_RATINGS, {ratings})
      typeof callback === 'function' && callback()
    }

  },
  async getShopInfo ({commit}, callback) {

    const result = await reqShopInfo()
    const info = result.data
    if (result.code === 0) {
      commit(RECEIVE_INFO, {info})
      typeof callback === 'function' && callback()
    }
    
  }
}

const getters = {}

Vue.use(Vuex)

export default {
  state,
  actions,
  mutations,
  getters
}