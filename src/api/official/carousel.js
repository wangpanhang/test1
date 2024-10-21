import request from '@/utils/request'

export default {
  // 新增轮播图
  addCarousel (params) {
    return request({
      url: `/back/api/carouse/insert`,
      method: 'post',
      data: params
    })
  },
  // 轮播图播放设置
  setCarouselConfig () {
    return request({
      url: `/back/api/carouse/config`,
      method: 'post',
      data: params
    })
  },
  // 获取轮播图播放
  getCarouselConfig () {
    return request({
      url: `/back/api/carouse/configInfo`,
      method: 'post',

    })
  },
  // 删除轮播图
  delCarousel (params) {
    return request({
      url: `/back/api/carouse/delete`,
      method: 'post',
      data: params
    })
  },
  // 轮播图信息
  getCarouselInfo (params) {
    return request({
      url: `/back/api/carouse/info`,
      method: 'post',
      data: params
    })
  },
  // 轮播图列表
  getCarouselList (params) {
    return request({
      url: `/back/api/carouse/list`,
      method: 'post',
      data: params
    })
  },
  // 编辑轮播图
  editCarousel (params) {
    return request({
      url: `/back/api/carouse/update`,
      method: 'post',
      data: params
    })
  },
}