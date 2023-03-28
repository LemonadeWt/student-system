import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StudentList from '../views/students/StudentsList.vue'
import HomePage from '../views/HomePage.vue'
import Error from '../views/error/Error.vue'
import StudentUpdate from '../views/students/StudentEdit.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        // name: 'home',
        component: Home,
        children:[
            {
                path:'',
                name:'home',
                component: HomePage,
                meta:{
                    isKeepAlive: false,
                    //通过路由元信息传递面包屑参数
                    title: 'index'
                }
            },
            {
                path:'studentList',
                name:'studentList',
                component:StudentList,
                meta:{
                    isKeepAlive: false,
                    //通过路由元信息传递面包屑参数
                    title: '学生管理',
                    subTitle:'学生列表'
                }
            },
            {
                // path:'studentUpdate/:id',
                path:'studentUpdate/:_id/:name',
                name:'studentUpdate',
                component:StudentUpdate,
                // props:true,
                meta:{
                    isKeepAlive: false,
                    //通过路由元信息传递面包屑参数
                    title: '学生管理',
                    subTitle:'学生信息修改'
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
    },
    {
        path:'*',
        name:'error',
        component: Error
    }

]

const router = new VueRouter({
    routes,
    // mode: 'history'
    mode: 'hash'
})

export default router
