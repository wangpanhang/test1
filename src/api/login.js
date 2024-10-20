import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/back/api/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/back/api/api/getInfo',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/back/api/api/logout',
    method: 'post'
  })
}

export function wxLogin() {
  return request({
    url: '/system/wx_login',
    method: 'get'
  })
}
