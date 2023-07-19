import VueRouter from 'vue-router'

import HomePage from '@/pages/HomePage'
import ShopPage from '@/pages/ShopPage'
import NotFound from '@/pages/404NotFound'
import ItemDetail from '@/pages/ItemDetail'

import WebCart from '@/pages/users/WebCart'
import OrderHistory from '@/pages/users/Orderhistory'
import UserUpdate from '@/pages/users/UserInfoUpdate'
import UserRegister from '@/pages/users/UserRegister'
import CheckOut from '@/pages/users/CheckOut'



import AdminLogin from '@/pages/admin/AdminLogin'
import AdminPage from '@/pages/admin/Admin'
import AdminOrderDetail from '@/pages/admin/AdminOrderDetail'
import LaunchPage from '@/pages/admin/Launch'


const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: HomePage,
        },
        {
            path: '*',
            component: NotFound,
        },
        {
            path: '/ShopPage',
            component: ShopPage
        },
        {
            path: '/register',
            component: UserRegister,
        },
        {
            path: '/ItemDetail/:id',
            component: ItemDetail
        },
        // ################################################################
        {
            path: '/mycart',
            component: WebCart,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("authTokenAccess")) {
                    next()
                }
                else {
                    alert('請先登入')
                }
            },

        },
        {
            path: '/OrderHistory',
            component: OrderHistory,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("authTokenAccess")) {
                    next()
                }
                else {
                    alert('請先登入')
                }
            },
        },
        {
            path: '/editor',
            component: UserUpdate,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("authTokenAccess")) {
                    next()
                }
                else {
                    alert('請先登入')
                }
            },
        },

        {
            path: '/CheckOut',
            component: CheckOut,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("authTokenAccess")) {
                    next()
                }
                else {
                    alert('請先登入')
                }
            },
        },
        // ################################################################
        {
            path: '/adminlogin',
            component: AdminLogin
        },
        {
            path: '/admin',
            component: AdminPage,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("adminTokenAccess")) {
                    next()
                }
                else {
                    alert('請先登入')
                }
            },
        },
        {
            path: '/AdminOrderDetail/:id',
            component: AdminOrderDetail,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("adminTokenAccess")) {
                    next()
                }
                else {
                    alert('請先登入')
                }
            },
        },
        {
            path: '/LaunchPage',
            component: LaunchPage,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("adminTokenAccess")) {
                    next()
                }
                else {
                    alert('請先登入')
                }
            },
        }
    ]
})

// router.beforeEach((to,from,next)=>{
//     console.log(to,from)
//     if (localStorage){
//     next()
//     }
// })

export default router  //因為要使用router內的func 所以最後才匯出
