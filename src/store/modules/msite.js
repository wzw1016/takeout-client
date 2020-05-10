import Vue from 'vue'
import Vuex from 'vuex'

import {
  reqAddressByGeohash,
  reqFoodCategoryList,
  reqShopListByGeohash
} from '../../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_FOOD_CATEGORIES,
  RECEIVE_SHOP_LIST
} from '../mutation-types'


const state = {
  /* Msite */
  longitude: 116.3972282409668,
  latitude: 39.90960456049752,
  address: {},
  categories: [],
  shopList: [],
}
const mutations = {
  /* Msite */
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  [RECEIVE_FOOD_CATEGORIES] (state, categories) {
    state.categories = categories
  },
  [RECEIVE_SHOP_LIST] (state, shopList) {
    state.shopList = shopList
  },
}
const actions = {
  /* 
    Msite
  */
  /* 1. 获取当前地址信息的异步action */
  async getAddressByGeohash ({commit, state}) {
    const geohash = {
      longitude: state.longitude,
      latitude: state.latitude
    }
    // 1. 调用用接口请求函数发送请求
    const result = await reqAddressByGeohash(geohash)
    // 2. 有了结果，提交mutation
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, result.data)
    }
  },

  /* 2. 获取食品分类列表的异步action */
  async getFoodCategoriesList ({commit}) {
    // 1. 调用用接口请求函数发送请求
    const result = await reqFoodCategoryList()
    // 2. 有了结果，提交mutation
    if (result.code === 0) {
      commit(RECEIVE_FOOD_CATEGORIES, result.data)
    }
  },

  /* 3. 获取商户列表的异步action */
  async getShopListByGeohash ({commit, state}) {
    const geohash = {
      longitude: state.longitude,
      latitude: state.latitude
    }
    // 1. 调用用接口请求函数发送请求
    const result = await reqShopListByGeohash(geohash)
    // 2. 有了结果，提交mutation
    if (result.code === 0) {
      commit(RECEIVE_SHOP_LIST, result.data)
    }
  },
}

const getters = {}

Vue.use(Vuex)

export default {
  state,
  actions,
  mutations,
  getters
}