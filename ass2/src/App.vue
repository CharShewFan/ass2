<template>
  <v-app class="grey lighten-4">
  <NavBar/>

    <v-main class="main">
    <router-view></router-view>
    </v-main>
    <Footer />

  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar';
import Footer from '@/components/Footer'
import {mapGetters,mapActions} from 'vuex';


export default {
  //name: 'App',
  computed:mapGetters(["isLogIn"]),
  components: {
   NavBar,
    Footer
  },

  data (){
    return {
    }
  },

  mounted() {
    this.checkLoginStatus()
  },

  methods:{
    checkLoginStatus(){
      if(localStorage.getItem("token") && localStorage.getItem("userId")){
        this.refreshPage()
      }
    },

    ...mapActions(["refreshPage"])
  }
};
</script>


<style scoped>

</style>