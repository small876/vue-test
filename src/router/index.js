import VueRouter from 'vue-router'

import WebCart from '../pages/WebCart'
import HomePage from '../pages/HomePage'
import OrderHistory from '../pages/Orderhistory'
import UserUpdate from '../pages/UserInfoUpdate'
import UserRegister from '../pages/UserRegister'


const router = new VueRouter({
        routes:[
        {            
            path:'/mycart',
            component:WebCart,
            beforeEnter:(to, from, next)=>{
                if (localStorage.getItem("authTokenAccess")){
                     next()
                }
                else{
                    alert('請先登入')
                }
            },            
            
        },
        {                
            path:'/',
            component:HomePage,
        },
        {                
            path:'/OrderHistory',
            component:OrderHistory,
            beforeEnter:(to, from, next)=>{
                if (localStorage.getItem("authTokenAccess")){
                     next()
                }
                else{
                    alert('請先登入')
                }
            },         
        },
        {                
            path:'/editor',
            component:UserUpdate,
            beforeEnter:(to, from, next)=>{
                if (localStorage.getItem("authTokenAccess")){
                     next()
                }
                else{
                    alert('請先登入')
                }
            },         
        }, 
        {                
            path:'/register',
            component:UserRegister,
        },
    ]    
})

// router.beforeEach((to,from,next)=>{
//     console.log(to,from)
//     if (localStorage){
//     next()
//     }
// })

export default router  //因為要使用router內的func 所以最後才匯出
