import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/front/Login')
  },
  {
    path: '/',
    name: 'FrontEnd',
    component: () => import('@/views/front/FrontEnd'),
    children: [
      {
        path: 'home',
        name: 'FrontHome',
        component: () => import('@/views/front/FrontHome')
      },
      {
        path: 'front_products',
        name: 'FrontProducts',
        component: () => import('@/views/front/FrontProducts')
      },
      {
        path: 'front_wishlist',
        name: 'FrontWishlist',
        component: () => import('@/views/front/FrontWishlist')
      },
      {
        path: 'front_single_product/:productID',
        name: 'FrontSingleProduct',
        component: () => import('@/views/front/FrontSingleProduct')
      },
      {
        path: 'shopping_cart',
        name: 'FrontShoppingCart',
        component: () => import('@/views/front/FrontShoppingCart'),
        children: [
          {
            path: 'front_cart_items',
            name: 'FrontCartItems',
            component: () => import('@/views/front/FrontCartItems')
          },
          {
            path: 'front_order',
            name: 'FrontOrder',
            component: () => import('@/views/front/FrontOrder')
          },
          {
            path: 'front_checkout/:orderId',
            name: 'FrontCheckout',
            component: () => import('@/views/front/FrontCheckout')
          }
        ]
      }
    ]
  },
  {
    path: '/admin',
    name: 'Setting',
    component: () => import('@/views/back/Setting'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/back/Products'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('@/views/back/Coupons'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/back/Orders'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
