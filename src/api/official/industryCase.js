import request from '@/utils/request'

export default {
  // 新增案例
  addCase (params) {
    return request({
      url: `/back/api/case/insert`,
      method: 'post',
      data: params
    })
  },
  // 删除案例
  delCase (params) {
    return request({
      url: `/back/api/case/delete`,
      method: 'post',
      data: params
    })
  },
  // 案例信息
  getCaseInfo (params) {
    return request({
      url: `/back/api/case/info`,
      method: 'post',
      data: params
    })
  },
  // 案例列表
  getCaseList (params) {
    return request({
      url: `/back/api/case/list`,
      method: 'post',
      data: params
    })
  },
  // 编辑案例
  editCase (params) {
    return request({
      url: `/back/api/case/update`,
      method: 'post',
      data: params
    })
  },
}