import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import category from '../view/category'
import detail from '../view/detail'
import shopCart from '../view/shopCart'
import order from '../view/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: index
    },
    {
      path: '/category/:id?',
      name: 'Category',
      component: category
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: detail
    },
    {
      path: '/shopCart',
      name: 'ShopCart',
      component: shopCart
    },
    {
      path: '/order',
      name: 'Order',
      component: order
    }
  ]
})
