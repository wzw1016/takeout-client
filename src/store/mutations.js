/* 包含n个直接更改state状态数据的方法的对象 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_FOOD_CATEGORIES,
  RECEIVE_SHOP_LIST,
} from './mutation-types'

export default {
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