import request from '@/utils/request'

export default {
  // 新增历程
  addHistoryLine (params) {
    return request({
      url: `/back/api/historyLine/insert`,
      method: 'post',
      data: params
    })
  },
  // 删除历程
  delHistoryLine (params) {
    return request({
      url: `/back/api/historyLine/delete`,
      method: 'post',
      data: params
    })
  },
  // 历程信息
  getHistoryLineInfo (params) {
    return request({
      url: `/back/api/historyLine/info`,
      method: 'post',
      data: params
    })
  },
  // 历程列表
  getHistoryLineList (params) {
    return request({
      url: `/back/api/historyLine/list`,
      method: 'post',
      data: params
    })
  },
  // 编辑历程
  editHistoryLineList (params) {
    return request({
      url: `/back/api/historyLine/update`,
      method: 'post',
      data: params
    })
  },
}