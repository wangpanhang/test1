

import request from '@/utils/request'

export default {
  uploadImg (params) {
    return request({
      url: '/back/api/file/upload',
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}