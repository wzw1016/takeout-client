/* 封装axios请求的模块，函数的返回值是promise */
import axios from 'axios'
import qs from 'qs'
import {Toast} from 'mint-ui'
import store from '../store'
import router from '../router'

// axios.defaults.baseURL = 'http://localhost:4000'

/* 请求拦截器 */
axios.interceptors.request.use(config => {
  const {method, data} = config
  // 将post请求请求体参数转换为urlencoded格式
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  
  // 判断请求是否需要token
  if (config.headers.needToken) {
    const token = store.state.token

    // state中没有token，不发送请求
    if (!token) {
      const error = new Error('token不存在，请先登录')
      // 向error中添加code属性，值为401，标识情况：state中没有token，没有发送请求
      error.code = 401
      throw error
    // state中有token，将token添加到请求头中，发送请求
    } else {
      config.headers['Authorization'] = token
    }
  }

  return config
})

/* 响应拦截器 */
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  // debugger
  const {code, response, message} = error

  // 1：请求前错误(即，state中没有token，抛出错误)，没有发送请求
  if (code === 401) {

    // 判断当前路由是否为'/login', 如果不是，则跳转到'/login'(避免多次发送请求，造成多次处理)
    if (router.currentRoute.path !== '/login') {
      Toast(message)
      router.replace('/login')
    }

  // 2：请求后错误(即响应错误，error对象中有response属性)
  } else if (response) {
    // 2.1: token过期(error.response.status的值为401)
    if (response.status === 401) {
      
      // 判断当前路由是否为'/login', 如果不是，则跳转到'/login'(避免多次发送请求，造成多次处理)
      if (router.currentRoute.path !== '/login') {
        Toast(response.data.message)
        router.replace('/login')
        // token过期，需要将state与localStorage中保存的token与user清除
        store.dispatch('logout')
      }  

    // 2.2: 请求资源不存在(error.response.status的值为404)
    } else if (response.status === 404) {
      Toast(error.message)
    }
  }
  
  return new Promise(() => {})
})

export default axios