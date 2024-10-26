import request from '@/utils/request'

export default {
  // 新增文章
  addArticle (params) {
    return request({
      url: `/back/api/article/publish`,
      method: 'post',
      data: params
    })
  },
  // 删除文章
  delArticle (params) {
    return request({
      url: `/back/api/article/delete`,
      method: 'post',
      data: params
    })
  },
  // 文章信息
  getArticleInfo (params) {
    return request({
      url: `/back/api/article/info`,
      method: 'post',
      data: params
    })
  },
  // 文章列表
  getArticleList (params) {
    return request({
      url: `/back/api/article/list`,
      method: 'post',
      data: params
    })
  },
  // 编辑文章
  editArticleList (params) {
    return request({
      url: `/back/api/article/update`,
      method: 'post',
      data: params
    })
  },
  // 发布/下架文章
  updateArticleList (params) {
    return request({
      url: `/back/api/article/status/update`,
      method: 'post',
      data: params
    })
  },
}