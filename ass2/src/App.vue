<template>
  <v-app class="grey lighten-4">

    <NavBar/>

    <v-main>

    <router-view></router-view>

    </v-main>
    <Footer></Footer>

  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar';
import Footer from '@/components/Footer'


export default {
  name: 'App',

  components: {
   NavBar,
    Footer
  },

  data (){
    return {
    }
  },
};
</script>
