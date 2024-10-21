import request from '@/utils/request'

export default {
  // 新增职位
  addRecruit (params) {
    return request({
      url: `/back/api/recruit/insert`,
      method: 'post',
      data: params
    })
  },
  // 删除职位
  delRecruit (params) {
    return request({
      url: `/back/api/recruit/delete`,
      method: 'post',
      data: params
    })
  },
  // 职位信息
  getRecruitInfo (params) {
    return request({
      url: `/back/api/recruit/info`,
      method: 'post',
      data: params
    })
  },
  // 职位列表
  getRecruitList (params) {
    return request({
      url: `/back/api/recruit/list`,
      method: 'post',
      data: params
    })
  },
  // 编辑职位
  editRecruit (params) {
    return request({
      url: `/back/api/recruit/update`,
      method: 'post',
      data: params
    })
  },
  // 发布/下架职位
  publishRecruit (params) {
    return request({
      url: `/back/api/recruit/updateState`,
      method: 'post',
      data: params
    })
  }
}