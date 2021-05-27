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
      <img :src="`http://localhost:4941/api/v1/users/${this.userId}/image`" alt="avatar" :key="this.imageSrc">
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
        <v-list-item @click="this.logout" to="/">
          <v-list-item-title @click="this.logout">Log out</v-list-item-title>
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
     // name: 'NavBar',
  
      data: () => ({
        drawer:false,
        selectedItem: 0,
        navList:[
            {"title":"Home","link":"/"},
            {"title":"Events","link":"/event"},
            {"title":"User","link":"/userInfo"},
            {"title":"Edit","link":"/editUser"},
          ],
        userId:localStorage.getItem("userId"),

        imageSrc: require('../assets/userProfileImg.jpeg')
      }),
      computed:mapGetters(["isLogIn"]),

      watcher:{

      },

      beforeMount() {
        this.getProfileImage()
      },
      mounted() {
        this.getProfileImage()
      },
      methods:{
        ...mapActions(["logOut"]),

        logout(){
            //console.log("nav bar log out call")
            axios.post("http://localhost:4941/api/v1/users/logout").then(response=>{
              console.log(response)
              localStorage.clear()
              this.logOut()
            }).catch(err=>{   console.log(err)})



        },

        toggle(){
          this.drawer = !this.drawer
        },

        getProfileImage(){
            let id = localStorage.getItem("userId")
            axios.get(`http://localhost:4941/api/v1/users/${id}/image`,{responseType:'arraybuffer'}).then(response=> {
              if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data], {type: ['image/png', 'image/jpg', 'image/gif']}));
                this.imageSrc = url
              }
            }).catch(err=>{
              console.log(err)
            })

        }

      }
    }
  </script>
  