import Vue from 'vue'
import Vuex from 'vuex'
import Events from './modules/events'
import LogIn from './modules/login'
import User from './modules/user'
import Cate from './modules/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Events,
    LogIn,
    User,
    Cate
  }
})
