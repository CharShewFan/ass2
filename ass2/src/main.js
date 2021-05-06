import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'


Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:4941/api/v1';

// router.beforeEach((to,from,next)=>{
//   if(to.meta.loginRequire === true){
//     if(store.state.loginStatus !== true){
//       next({path:"/login",name:"Login"})
//     }else{
//       next();
//     }
//   }
// })


new Vue({
  axios,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
