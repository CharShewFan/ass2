<template>
  <v-app class="grey lighten-4">

    <NavBar/>

    <v-main>

    <router-view></router-view>

    </v-main>

  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar';


export default {
  name: 'App',

  components: {
   NavBar,
  },

  data (){
    
  },
};
</script>
