import request from '@/utils/request'

export default {
  // 删除留言
  delMessage (params) {
    return request({
      url: `/back/api/homeMessage/delete`,
      method: 'post',
      data: params
    })
  },
  // 留言详细信息
  getMessageInfo (params) {
    return request({
      url: `/back/api/homeMessage/info`,
      method: 'post',
      data: params
    })
  },
  // 处理留言
  handleMessage (params) {
    return request({
      url: `/back/api/homeMessage/handle`,
      method: 'post',
      data: params
    })
  },
  // 留言列表
  messageList (params) {
    return request({
      url: `/back/api/homeMessage/list`,
      method: 'post',
      data: params
    })
  },
}