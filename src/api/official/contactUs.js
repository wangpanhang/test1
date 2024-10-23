import request from '@/utils/request'

export default {
  // 设置联系我们信息
  setContactUs (params) {
    return request({
      url: `/back/api/contactUs/set`,
      method: 'post',
      data: params
    })
  },
  // 获取联系我们信息
  getContactUs () {
    return request({
      url: `/back/api/contactUs/info`,
      method: 'post',
    })
  },
}