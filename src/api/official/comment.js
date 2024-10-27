import request from '@/utils/request'

export default {
  // 删除评论
  delArticleComment (params) {
    return request({
      url: `/back/api/comment/delete`,
      method: 'post',
      data: params
    })
  },
  // 获取评论列表
  getCommentList (params) {
    return request({
      url: `/back/api/comment/list`,
      method: 'post',
      data: params
    })
  },
}