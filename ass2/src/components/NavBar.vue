<template>
 <nav>
 <v-toolbar  dark >
  
   <v-toolbar-title class="text-uppercase grey--" >
     <span class="font-weight-light" >Mock</span>
     <span class="light-blue--text" >EventFinda </span></v-toolbar-title>

     <v-divider 
      class="mx-4"
      vertical
     >
    </v-divider>
    <v-btn   class = "hidden-sm-and-down mr-3 flat dark" to="/" >Home</v-btn>
    
    <v-btn   class = "hidden-sm-and-down mr-2 flat dark" to="/event" >Events</v-btn>


   <v-spacer></v-spacer>


   <v-btn icon to="/event">
     <v-icon>mdi-magnify</v-icon>
   </v-btn>

   <v-btn icon to = "/userInfo">
    <v-avatar 
      size = "32"
      color = "primary"
    >
    </v-avatar>
   </v-btn>

   <v-app-bar-nav-icon  @click="toggle()"></v-app-bar-nav-icon>
 </v-toolbar>


  <v-navigation-drawer app absolute temporary class=" dark lighten-4 --text" transition="slide-x-transition"  v-model="drawer">
    <v-list-item >
      <v-list-item-content>
        <v-list-item-title class="title">Navigation bar</v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item v-for="item in navList" :key="item.index" :to=item.link>

        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>

    <v-list dense nav v-show="!isLogIn">
      <v-list-item-group>
        <v-list-item  to="/login">
          <v-list-item-title>Log In</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>

    <v-list dense nav v-show="isLogIn">
      <v-list-item-group>
        <v-list-item @click="logOut" to="/">
          <v-list-item-title @click="logout">Log out</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

  </v-navigation-drawer>




</nav>
</template>
  
  <script>
  import axios from 'axios'
  import {mapGetters,mapActions} from 'vuex';

    export default {
      name: 'NavBar',
  
      data: () => ({
        drawer:false,
        selectedItem: 0,
        navList:[
            {"title":"Home","link":"/"},
            {"title":"Events","link":"/event"},
            {"title":"User","link":"/userInfo"},
            {"title":"Edit","link":"/editUser"},
          ],
      }),
      computed:mapGetters(["isLogIn"]),
      methods:{
        ...mapActions(["logOut"]),

        async logout(){
          try{
            console.log("nav bar log out call")
            let response = await axios.post("http://localhost:4943/api/v1/users/logout")
            console.log(response)
              localStorage.clear()
              this.logOut()
          }catch (e) {
            console.log(e)
          }
        },

        toggle(){
          this.drawer = !this.drawer
        },

      }
    }
  </script>
  