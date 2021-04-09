import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '../views/Registration'
//import EventsFinder from '../components/EventsFinder'
import Edit from '../components/EditUser'
import Login from '../components/Login'
import Event from '../views/Event'

import axios from 'axios'
axios.defaults.baseURL = "http://localhost:4941/api/v1"
//axios.defaults.withCredentials = true;

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
    path:'/event',
    name:'Event',
    component:Event
  },
  {
    path:'/editUser',
    name:'Edit',
    component:Edit,
    beforeEnter:(to,from,next)=>{
      let isAuthenticated = checkAuth()
      if(!isAuthenticated) next({name:Login})
      else next()
    }
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode:"history",
  routes
})

// router.beforeEach((to,from,next)={
//   if(to.name !== 'login' && !isAuthenticated) next
// })

function checkAuth(){
  let isAuthenticated = false
  let id = parseInt(sessionStorage.getItem("userId"))
  let token = sessionStorage.getItem("token")
  if(id !== undefined && token !== undefined){
    const options = {
      method: 'POST',
      headers: { 'X-Authorization': token },
      url:`/users/${id}`,
    };
    axios(options).then((response)=>{
      if(response.data.email !== undefined){
        isAuthenticated = true
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  console.log(isAuthenticated)
  return isAuthenticated
}

export default router
