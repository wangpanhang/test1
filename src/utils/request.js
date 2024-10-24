import axios from 'axios'
import { Message, MessageBox, } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  withCredentials: true, // 跨域请求时是否需要使用凭证
  // timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (document.cookie.indexOf('token') > -1) {
    // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // config.headers['token'] = getToken()
    // }
    // config.headers['withCredentials'] = true
    // config.headers['Cookie'] = getToken()
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data

    const url = response.config.url

    if (res.code !== 200) {
      if (url.indexOf("/login") < 0 && res.code === 40005) {
        store.dispatch('FedLogOut').then(() => {
          router.push(`/login`)
        })
        Message({
          message: res.message,
          type: 'warning',
          duration: 2 * 1000,
        })

        return Promise.resolve(res)
      } else if (res.code >= 40000) {
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.resolve(res)
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
      }
      // Message({
      //   message: res.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm(
      //     '你已被登出，可以取消继续留在该页面，或者重新登录',
      //     '确定登出',
      //     {
      //       confirmButtonText: '重新登录',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }
      //   ).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      // return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
