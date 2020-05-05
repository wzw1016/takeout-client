/* 封装axios请求的模块，函数的返回值是promise */
import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = 'http://localhost:4000'

axios.interceptors.request.use(config => {
  const {method, data} = config
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  return config
})

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  alert('请求出错：' + error.message)
  return new Promise(() => {})
})

export default axios