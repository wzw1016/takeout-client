/* 包含n个间接更改state状态数据的方法的对象 */
import {
  reqAddressByGeohash,
  reqFoodCategoryList,
  reqShopListByGeohash,
  reqAutoLogin
} from '../api'
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
  saveUser ({commit}, user) {
    const {token} = user
    // 将token保存到localStorage中
    localStorage.setItem('token_key', token)
    commit(RECEIVE_TOKEN, {token})

    delete user.token
    commit(RECEIVE_USER, {user})
  },
  resetUser ({commit}) {
    commit(RESET_USER)
  },
  logout ({commit}) {
    commit(RESET_USER)

    commit(RESET_TOKEN)
    
    localStorage.removeItem('token_key')
  },
  async autoLogin ({commit, state}) {
    if (state.token) {
      const result = await reqAutoLogin()
      const user = result.data
      if (result.code === 0) {
        commit(RECEIVE_USER, {user})
      }
    }
  }
}