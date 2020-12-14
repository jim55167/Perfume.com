//官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/components/back/Dashboard';
import Login from '@/components/front/Login';
import Products from '@/components/back/Products';
import Orders from '@/components/back/Orders';
import FrontHome from '@/components/front/FrontHome';
import FrontEnd from '@/components/front/FrontEnd';
import FrontProducts from '@/components/front/FrontProducts';
import FrontSingleProduct from '@/components/front/FrontSingleProduct';
import Coupons from '@/components/back/Coupons';
import FrontCartItems from '@/components/front/FrontCartItems';
import FrontShoppingCart from '@/components/front/FrontShoppingCart';
import FrontOrder from '@/components/front/FrontOrder';
import FrontCheckout from '@/components/front/FrontCheckout';
import FrontWishlist from '@/components/front/FrontWishlist';



//自訂的分頁元件

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        { //再路由下隨意輸入網址會跳到空白頁，因此需要此段程式碼
            path: '*',
            redirect: '/home',
        },
        { 
            path: '/',
            redirect: '/home',
        },
        {
            path: '/login',//元件呈現的名稱
            name: 'Login',//對應的虛擬路徑
            component: Login,//對應的元件
        },
        {
            path: '/',
            name: 'FrontEnd',
            component: FrontEnd,
            children: [
                {
                    path: '/login',//元件呈現的名稱
                    name: 'Login',//對應的虛擬路徑
                    component: Login,//對應的元件
                },

                {
                    path: 'home',
                    name: 'FrontHome',
                    component: FrontHome,
                },
                {
                    path: 'front_products',
                    name: 'FrontProducts',
                    component: FrontProducts,
                },
                {
                    path: 'front_wishlist',
                    name: 'FrontWishlist',
                    component: FrontWishlist,
                },
                {
                    path: 'front_single_product/:productID',
                    name: 'FrontSingleProduct',
                    component: FrontSingleProduct,
                },
                {
                    path: 'shopping_cart',
                    name: 'FrontShoppingCart',
                    component: FrontShoppingCart,
                    children: [
                        {
                            path: 'front_cart_items',
                            name: 'FrontCartItems',
                            component: FrontCartItems,
                        }, 
                        {
                            path: 'front_order',
                            name: 'FrontOrder',
                            component: FrontOrder,
                        },
                        {
                            path: 'front_checkout/:orderId',
                            name: 'FrontCheckout',
                            component: FrontCheckout,
                        },
                    ]
                },
            ]
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Dashboard,
            children: [
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiresAuth: true }, //路由訊息
                },
                {
                    path: 'orders',
                    name: 'Orders',
                    component: Orders,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'coupons',
                    name: 'Coupons',
                    component: Coupons,
                    meta: { requiresAuth: true },
                },
            ]
        },
    ]
});