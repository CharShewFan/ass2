<template>
 <nav
 >
 <v-toolbar  dark app>
  
   <v-toolbar-title class="text-uppercase grey--">
     <span class="font-weight-light">Mock</span> 
     <span class="green--text">EventFinda</span></v-toolbar-title>
     <v-divider 
      class="mx-4"
      vertical
      :inset = "inset"
      >
    </v-divider>
    <v-btn   class = "hidden-sm-and-down mr-3 flat dark" to="/" >Home</v-btn>
    
    <v-btn   class = "hidden-sm-and-down mr-2 flat dark" to="/query" >Events</v-btn>


   <v-spacer></v-spacer>


   <v-btn icon to="/query">
     <v-icon>mdi-magnify</v-icon>
   </v-btn>

   <v-btn icon to = "/registration"> 
    <v-avatar 
      size = "32"
      color = "grey"
    ></v-avatar>
   </v-btn>

   <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggle()"></v-app-bar-nav-icon>
 </v-toolbar>


 <v-card 
  height = "500"
  width = "200"
  class="hidden-md-and-up"
  v-if = "drawer"
 >
  <v-navigation-drawer  absolute temporary class="primary white--text" transition="slide-x-transition"  v-model="drawer">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-tile class="title">Navigation bar</v-list-item-tile>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav> 
      <v-list-item v-for="item in navList" :key="item.title" link="item.link">
        <v-list-item-content>
          <v-list-title>{{item.title}}</v-list-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
 </v-card>



</nav>
</template>
  
  <script>

    export default {
      name: 'NavBar',
  
      data: () => ({
        drawer:false,
        navList:[{"title":"Home","link":"/"},{"title":"Events","link":"/"},{"title":"User","link":"/"}]
      }),

      methods:{
        toggle(){
          this.drawer = !this.drawer
        }
      }
    }
  </script>
  