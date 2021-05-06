import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '../views/Registration'
import Edit from '../components/EditUser'
import Login from '../components/Login'
import Event from '../views/Event'
import ManageEvent from "../views/ManageEvents"
import AddEvent from "../components/AddEvent"

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
    meta:{loginRequire: true}
  },


  {
    path:'/manageEvent',
    name:"ManageEvent",
    component:ManageEvent,
    meta:{loginRequire: true}
  },

  {
    path:'/login',
    name:'Login',
    component: Login,
  },

  {
    path:'/addEvent',
    name:'AddEvent',
    component:AddEvent,
    meta:{loginRequire: true}
  }
]

const router = new VueRouter({
  mode:"history",
  routes
})

// router.beforeEach((to,from,next)={
//   if(to.name !== 'login' && !isAuthenticated) next
// })

// function checkAuth(){
//   let isAuthenticated = false
//   let id = parseInt(sessionStorage.getItem("userId"))
//   let token = sessionStorage.getItem("token")
//   if(id !== undefined && token !== undefined){
//     const options = {
//       method: 'POST',
//       headers: { 'X-Authorization': token },
//       url:`/users/${id}`,
//     };
//     axios(options).then((response)=>{
//       if(response.data.email !== undefined){
//         isAuthenticated = true
//       }
//     }).catch(err=>{
//       console.log(err)
//     })
//   }
//   console.log(isAuthenticated)
//   return isAuthenticated
// }

export default router
