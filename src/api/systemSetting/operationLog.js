
import request from '@/utils/request'

export default {
  getOperationLogList (params) {
    return request({
      url: '/back/api/userOperation/list',
      method: 'post',
      data: params,
    })
  }
}