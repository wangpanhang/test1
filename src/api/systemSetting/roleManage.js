
import request from '@/utils/request'

export default {
  getRoleList (params) {
    return request({
      url: '/back/api/role/list',
      method: 'post',
      data: params,
    })
  },
  delRole (params) {
    return request({
      url: '/back/api/role/deleteRole',
      method: 'post',
      data: params,
    })
  },
  addRole (params) {
    return request({
      url: '/back/api/role/insertRole',
      method: 'post',
      data: params,
    })
  },
  updateRolePermission (params) {
    return request({
      url: '/back/api/role/updatePermission',
      method: 'post',
      data: params,
    })
  }
}