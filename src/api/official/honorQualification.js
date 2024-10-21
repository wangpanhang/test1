import request from '@/utils/request'

export default {
  // 新增证书
  addHonorQualification (params) {
    return request({
      url: `/back/api/certificate/insert`,
      method: 'post',
      data: params
    })
  },
  // 删除荣誉资质证书
  delHonorQualification (params) {
    return request({
      url: `/back/api/certificate/delete`,
      method: 'post',
      data: params
    })
  },
  // 证书信息
  getHonorQualification (params) {
    return request({
      url: `/back/api/certificate/info`,
      method: 'post',
      data: params
    })
  },
  // 证书列表
  getHonorQualification (params) {
    return request({
      url: `/back/api/certificate/list`,
      method: 'post',
      data: params
    })
  },
  // 编辑证书
  editHonorQualification (params) {
    return request({
      url: `/back/api/certificate/update`,
      method: 'post',
      data: params
    })
  },
}