/* 包含n个间接更改state状态数据的方法的对象 */

import {
  reqAddressByGeohash,
  reqFoodCategoryList,
  reqShopListByGeohash,
  // reqsendCode
} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOOD_CATEGORIES,
  RECEIVE_SHOP_LIST,
  // RECEIVE_SMS_VERIFICATION_CODE
} from './mutation-types'

export default {
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

  /* 
    Login
  */
  /* async getSMSVerificationCode ({commit}, phone) {
    // 1. 调用用接口请求函数发送请求
    const result = await reqsendCode(phone)
    // 2. 有了结果，提交mutation
    result.code === 0 ? commit(RECEIVE_SMS_VERIFICATION_CODE, '验证码发送成功') : commit(RECEIVE_SMS_VERIFICATION_CODE, result.msg)
  } */
}