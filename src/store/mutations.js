/* 包含n个直接更改state状态数据的方法的对象 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_FOOD_CATEGORIES,
  RECEIVE_SHOP_LIST,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN
} from './mutation-types'

export default {
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

  /* Login */
  [RECEIVE_USER] (state, {user}) {
    state.user = user
  },
  [RESET_USER] (state) {
    state.user = {}
  },
  
  [RECEIVE_TOKEN] (state, {token}) {
    state.token = token
  },
  [RESET_TOKEN] (state) {
    state.token = ''
  },
}