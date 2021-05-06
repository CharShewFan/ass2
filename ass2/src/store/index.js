import Vue from 'vue'
import Vuex from 'vuex'
import LogOut from "./modules/logOut"
import Events from './modules/events'
import LogIn from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    LogOut,
    Events,
    LogIn
  }
})
