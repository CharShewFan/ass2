<template>
 <nav
 >
 <v-toolbar dense dark app>
  
   <v-toolbar-title class="text-uppercase grey--">
     <span class="font-weight-light">Mock</span> 
     <span class="green--text">EventFinda</span></v-toolbar-title>
     <v-divider 
      class="mx-4"
      vertical
      :inset = "inset"
      >
    </v-divider>



   <v-spacer></v-spacer>
   <v-hover><v-btn dark class="hidden-sm-and-down"><router-link to="/home">Home</router-link></v-btn></v-hover>
    

   <!-- <v-divider 
     vertical
     class="mx-4"
     :inset = "inset"
     >
   </v-divider> -->

   <v-btn class="hidden-sm-and-down"><router-link to="/home">Events</router-link></v-btn>

   <v-btn icon>
     <v-icon>mdi-magnify</v-icon>
   </v-btn>

   <v-btn icon>
    <v-avatar 
      size = "32"
      color = "grey"
    ></v-avatar>
   </v-btn>
   <v-app-bar-nav-icon class="hidden-md-and-up" v-on:click="toggle()"></v-app-bar-nav-icon>
 </v-toolbar>

 <v-navigation-drawer v-model="drawer" app class="green">
   <p>test</p>
 </v-navigation-drawer>

</nav>
</template>
  
  <script>

    export default {
      name: 'NavBar',
  
      data: () => ({
        drawer:false
      }),

      methods:{
        toggle(){
          this.drawer = !this.drawer
        }
      }
    }
  </script>
  