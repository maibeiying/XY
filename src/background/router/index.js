import Vue from 'vue'
import Router from 'vue-router'
const login = () => import('../views/login.vue') // 登录
const home = () => import('../views/home.vue') // 首页
const goodsManage = () => import('../views/goodsManage.vue') // 商品管理
const custom = () => import('../views/custom.vue') // 客户管理
const manager = () => import('../views/manager.vue') // 管理员管理
const siteView = () => import('../views/siteView.vue') // 访问量
const userFb = () => import('../views/userFb.vue') // 用户分布
const banner = () => import('../views/banner.vue') // 广告管理
const addBanner = () => import('../views/addBanner.vue') // 添加广告
const addGoods = () => import('../views/addGoods.vue') // 添加商品
const category = () => import('../views/category.vue') // 类目管理
const evaluate = () => import('../views/evaluate.vue') // 类目管理

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    }, {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '',
          name: 'siteView',
          component: siteView
        }, {
          path: 'siteView',
          name: 'siteView',
          component: siteView
        }, {
          path: 'userFb',
          name: 'userFb',
          component: userFb
        }, {
          path: 'custom',
          name: 'custom',
          component: custom
        }, {
          path: 'manager',
          name: 'manager',
          component: manager
        }, {
          path: 'goodsManage',
          name: 'goodsManage',
          component: goodsManage
        }, {
          path: 'addGoods',
          name: 'addGoods',
          component: addGoods
        }, {
          path: 'banner',
          name: 'banner',
          component: banner
        }, {
          path: 'addBanner',
          name: 'addBanner',
          component: addBanner
        }, {
          path: 'category',
          name: 'category',
          component: category
        }, {
          path: 'evaluate',
          name: 'evaluate',
          component: evaluate
        }
      ]
    }
  ]
})
