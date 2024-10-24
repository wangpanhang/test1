import request from '@/utils/request'

export default {
  // 新增历程
  addArticle (params) {
    return request({
      url: `/back/api/article/publish`,
      method: 'post',
      data: params
    })
  },
  // 删除历程
  delArticle (params) {
    return request({
      url: `/back/api/article/delete`,
      method: 'post',
      data: params
    })
  },
  // 历程信息
  getArticleInfo (params) {
    return request({
      url: `/back/api/article/info`,
      method: 'post',
      data: params
    })
  },
  // 历程列表
  getArticleList (params) {
    return request({
      url: `/back/api/article/list`,
      method: 'post',
      data: params
    })
  },
  // 编辑历程
  editArticleList (params) {
    return request({
      url: `/back/api/article/update`,
      method: 'post',
      data: params
    })
  },
}