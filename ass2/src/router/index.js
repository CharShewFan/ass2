import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '../views/Registration'
import Edit from '../components/EditUser'
import Login from '../components/Login'
import Event from '../views/Event'
import ManageEvent from "../views/ManageEvents"
import AddEvent from "../components/AddEvent"
import UserInfo from "@/components/UserInfo";
import EventDetail from "../components/EventDetail";
import AttendeeList from '../components/AttendeeList'
//import EventCard from "@/components/EventCard";
//import axios from 'axios'
//axios.defaults.baseURL = "http://localhost:4943/api/v1"


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
  },

  {
    path:'/userInfo',
    name:"userInfo",
    component: UserInfo,
    meta:{loginRequire: true}
  },

  {
    path:'/event/:id',
    component: Event,
    //name:"EventId",
    children:[
      {
        path:'',
        component: Event
      },
        {
          path:'detail',
          component:EventDetail
        },
      {
        path:'list',
        component: AttendeeList
      }

    ]

  },


]

const router = new VueRouter({
  mode:"history",
  routes
})



export default router
