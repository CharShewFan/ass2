<template>
 <nav
 >
 <v-toolbar  dark app>
  
   <v-toolbar-title class="text-uppercase grey--" >
     <span class="font-weight-light">Mock</span> 
     <span class="light-blue--text" >EventFinda </span></v-toolbar-title>
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



  <v-navigation-drawer app absolute temporary class=" dark--text" transition="slide-x-transition"  v-model="drawer">
    <v-list-item >
      <v-list-item-content>
        <v-list-item-title class="title">Navigation bar</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item v-for="item in navList" :key="item" :to=item.link>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>




</nav>
</template>
  
  <script>

    export default {
      name: 'NavBar',
  
      data: () => ({
        drawer:false,
        selectedItem: 0,
        navList:[
            {"title":"Home","link":"/"},
            {"title":"Events","link":"/query"},
            {"title":"User","link":"/registration"},
            {"title":"Edit","link":"/editUser"},
            {"title":"LogIn","link":"/login"}
          ]
      }),

      methods:{
        toggle(){
          this.drawer = !this.drawer
        }
      }
    }
  </script>
  