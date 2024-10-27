import url from 'postcss-url'
import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'home',
    hidden: true,
    meta: { title: '首页', noCache: true },
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
    }]
  },
  {
    path: '/official',
    component: Layout,
    redirect: '/official/',
    name: 'official',
    meta: { title: '官网管理', icon: 'official' },
    children: [
      {
        path: 'homeCarousel',
        name: 'homeCarousel',
        component: () => import('@/views/official/homeCarousel/homeCarousel'),
        meta: { title: '首页轮播图' }
      },
      {
        path: 'developmentCourse',
        name: 'developmentCourse',
        component: () => import('@/views/official/developmentCourse/index'),
        meta: { title: '发展历程' }
      },
      {
        path: 'honorQualification',
        name: 'honorQualification',
        component: () => import('@/views/official/honorQualification/index'),
        meta: { title: '荣誉资质' }
      },
      {
        path: 'recruitManage',
        name: 'recruitManage',
        component: () => import('@/views/official/recruitManage/index'),
        meta: { title: '招聘管理' }
      },
      {
        path: 'addRecruitJob',
        name: 'addRecruitJob',
        component: () => import('@/views/official/recruitManage/addRecruitJob'),
        meta: { title: '招聘管理', hidden: true }
      },
      {
        path: 'recruitJobDetail',
        name: 'recruitJobDetail',
        component: () => import('@/views/official/recruitManage/recruitJobDetail'),
        meta: { title: '招聘管理', hidden: true }
      },
      {
        path: 'editRecruitJob',
        name: 'editRecruitJob',
        component: () => import('@/views/official/recruitManage/editRecruitJob'),
        meta: { title: '招聘管理', hidden: true }
      },
      {
        path: 'contactUs',
        name: 'contactUs',
        component: () => import('@/views/official/contactUs/index'),
        meta: { title: '联系我们' }
      },
      {
        path: 'messageManage',
        name: 'messageManage',
        component: () => import('@/views/official/messageManage/index'),
        meta: { title: '留言管理' }
      },
      {
        path: 'articleList',
        name: 'articleList',
        component: () => import('@/views/official/articleList/index'),
        meta: { title: '文章列表' }
      },
      {
        path: 'addArticle',
        name: 'addArticle',
        component: () => import('@/views/official/articleList/addArticle'),
        meta: { title: '新增文章', hidden: true }
      },
      {
        path: 'editArticle',
        name: 'editArticle',
        component: () => import('@/views/official/articleList/editArticle'),
        meta: { title: '编辑文章', hidden: true }
      },
      {
        path: 'previewArticle',
        name: 'previewArticle',
        component: () => import('@/views/official/articleList/previewArticle'),
        meta: { title: '文章预览', hidden: true }
      },
      {
        path: 'articleComment',
        name: 'articleComment',
        component: () => import('@/views/official/articleList/articleComment'),
        meta: { title: '文章列表', hidden: true }
      },
      {
        path: 'customerEvaluate',
        name: 'customerEvaluate',
        component: () => import('@/views/official/customerEvaluate/index'),
        meta: { title: '客户评价' }
      },
      {
        path: 'industryCase',
        name: 'industryCase',
        component: () => import('@/views/official/industryCase/index'),
        meta: { title: '行业案例' }
      },
      {
        path: 'addIndustryCase',
        name: 'addIndustryCase',
        component: () => import('@/views/official/industryCase/addIndustryCase'),
        meta: { title: '行业案例', hidden: true }
      },
      {
        path: 'editIndustryCase',
        name: 'editIndustryCase',
        component: () => import('@/views/official/industryCase/editIndustryCase'),
        meta: { title: '行业案例', hidden: true }
      },
      {
        path: 'previewIndustryCase',
        name: 'previewIndustryCase',
        component: () => import('@/views/official/industryCase/previewIndustryCase'),
        meta: { title: '行业案例', hidden: true }
      },
    ]
  },
  {
    path: '/systemSetting',
    component: Layout,
    redirect: '/systemSetting/',
    name: 'systemSetting',
    meta: { title: '系统设置', icon: 'official' },
    children: [
      {
        path: 'operationLog',
        name: 'operationLog',
        component: () => import('@/views/systemSetting/operationLog/index'),
        meta: { title: '操作日志' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'hash', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
