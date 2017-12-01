import axios from 'axios'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做某事
  return config
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做些事
  return response.data
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})
