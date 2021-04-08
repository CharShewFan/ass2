import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '../views/Registration'
import EventsFinder from '../components/EventsFinder'
import Edit from '../components/EditUser'
import Login from '../components/Login'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/registration',
    name:'Registration',
    component:Registration
  },
  {
    path:'/query',
    name:'EventsFinder',
    component:EventsFinder
  },
  {
    path:'/editUser',
    name:'Edit',
    component:Edit
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
