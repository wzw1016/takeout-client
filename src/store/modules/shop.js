import Vue from 'vue'

import {
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../../api'

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  RESET_CART_FOODS
} from '../mutation-types'


const state = {
  /* Shop */
  goods: [],
  ratings: [],
  info: {},
  cartFoods: []
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
  },
  [ADD_FOOD_COUNT] (state, {food}) {
    // eslint-disable-next-line no-debugger
    // debugger
    if (!food.count) {
      Vue.set(food, 'count', 1)

      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [REDUCE_FOOD_COUNT] (state, {food}) {

    food.count > 0 ? food.count-- : null

    if (food.count === 0) {
      state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
    }
  },
  [RESET_CART_FOODS] (state) {
    state.cartFoods.forEach(cartFood => {
      cartFood.count ? cartFood.count = 0 : null
    })
    state.cartFoods = []
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
  },

  updateFoodCount ({commit}, {isAdd, food}) {
    // eslint-disable-next-line no-debugger
    // debugger
    isAdd ? commit(ADD_FOOD_COUNT, {food}) : commit(REDUCE_FOOD_COUNT, {food})
  },

  resetFoodCarts ({commit}) {
    commit(RESET_CART_FOODS)
  }
}

const getters = {
  // 性能较差
  /* cartGoods (state) {
    const cartFoods = []
    state.goods.forEach(good => {
      good.foods.forEach(food => {
        food.count ? cartFoods.push(food) : null
      })
    })
    return cartFoods
  } */

  totalCount (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}