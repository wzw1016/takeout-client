import {
  reqAutoLogin
} from '../../api'

import {
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,
} from '../mutation-types'


const state = {
  /* Login */
  user: {},
  token: localStorage.getItem('token_key') || '',
}
const mutations = {
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
const actions = {
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
  },
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}