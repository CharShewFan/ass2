import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'




Vue.config.productionTip = false


// an axios interceptor which set up the header and base route
const instance = axios.create({
  baseURL: 'http://localhost:4941/api/v1',
});

let token = localStorage.getItem("token");
console.log("main js token")
console.log(token)
if (token !== null) {
    instance.defaults.headers.common['X-Authorization'] = token;
}


instance.interceptors.request.use(
    function(config) {
      let token = localStorage.getItem("token");
      if (token) {
        config.headers["X-Authorization"] = token;
        config.headers.test = 'I am only a header!';
        console.log(config)
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
);



router.beforeEach((to,from,next)=>{
  if(to.meta.loginRequire === true){
      console.log("store.state.loginStatus")
      console.log(store.getters.isLogIn)
    if(store.getters.isLogIn !== true){
      next({path:"/login",name:"Login",query:{
          redirect:to.fullPath
          }})
    }else{
      next();
    }
  }else{
    next()
  }

})


new Vue({
  axios,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
