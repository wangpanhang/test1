import request from '@/utils/request'

export default {
  // 删除客户评价
  delCustomerEvaluate (params) {
    return request({
      url: `/back/api/customerReview/delete`,
      method: 'post',
      data: params
    })
  },
  // 获取客户评价信息
  getCustomerEvaluateInfo (params) {
    return request({
      url: `/back/api/customerReview/info`,
      method: 'post',
      data: params
    })
  },
  // 获取客户评价列表
  getCustomerEvaluateList (params) {
    return request({
      url: `/back/api/customerReview/list`,
      method: 'post',
      data: params
    })
  },
  // 编辑客户评价信息
  updateCustomerEvaluate (params) {
    return request({
      url: `/back/api/customerReview/update`,
      method: 'post',
      data: params
    })
  },
  // 新增客户评价信息
  addCustomerEvaluate (params) {
    return request({
      url: `/back/api/customerReview/insert`,
      method: 'post',
      data: params
    })
  },
}