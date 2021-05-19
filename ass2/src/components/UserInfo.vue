<template>
<v-container class="mt-16" >

    <v-card
        max-width="375"
        class="mx-auto"
    >
      <v-img
          :src="this.URL"
          height="300px"
          dark
      >
        <v-row class="fill-height">
          <v-card-title>
            <v-btn
                dark
                icon
                to="/"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                dark
                icon
                class="mr-4"
                to="/editUser"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

          </v-card-title>

          <v-spacer></v-spacer>

          <v-card-title class="white--text pl-12 pt-12">
            <div class="display-1 pl-12 pt-12">
              {{ this.$store.getters.isUserName }}
            </div>
          </v-card-title>
        </v-row>
      </v-img>

      <v-list two-line>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">
              mdi-account
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>User ID:</v-list-item-title>
            <v-list-item-subtitle class="empty"> {{this.id}}  </v-list-item-subtitle>
          </v-list-item-content>


        </v-list-item>



        <v-divider inset></v-divider>

        <v-list-item>
<!--content block-->
          <v-list-item-icon>
            <v-icon color="indigo">
              mdi-email
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> E-mail:</v-list-item-title>
          <v-list-item-subtitle class="empty"> {{this.$store.getters.isEmail }} </v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>







      </v-list>
    </v-card>



</v-container>
</template>


<script>
//import userImg from "../assets/userProfileImg.jpeg"
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import store from "../store"

    export default{

        //name:"userInfo",
        data:()=>({
         userName:"",
          email:"",
          id:"",
          empty:"",
          URL: require('../assets/userProfileImg.jpeg')
        }),

      beforeCreate() {

      },

      beforeMount() {
        this.getUserInfo(localStorage.getItem("userId"))
        this.match()
        this.getUserImage()
      },

      computed:{
          ...mapGetters(['isUserName','isEmail']),


      },

      updated() {

      },

      mounted() {
        this.getUserInfo(localStorage.getItem("userId"))
        this.match()
        this.getUserImage()
      },

      components:{

        },
        methods:{
          async getInfo(){


              this.id = localStorage.getItem("userId")
              console.log(this.id)

              axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token");
              axios.get(`http://localhost:4941/api/v1/users/${parseInt(this.id)}`).then(response=>{
                if(response.data.email === undefined){
                  this.email = "Login in to check"
                }
                this.email = response.data.email
                this.firstName = response.data.firstName
                this.lastName = response.data.lastName
                console.log(this.email)
                console.log(this.firstName)
                console.log(response)
              }).catch(err=>{
                console.log(err)
              })

          },
          ...mapActions(['getUserInfo']),

          match(){
            this.userName = store.getters.isUserName
            this.id = localStorage.getItem("userId")
            this.email = store.getters.isEmail
          },

          getUserImage(){
            this.id = localStorage.getItem("userId")
            axios.get(`http://localhost:4941/api/v1/users/${this.id}/image`,{responseType:'arraybuffer'}).then(response=>{
              if(response.status === 200){
                // console.log(response.headers)
                // console.log(response.status)
                // console.log(response.data)
                const url = window.URL.createObjectURL(new Blob([response.data],{type:['image/png','image/jpg','image/gif']}));
                this.URL = url
               console.log(url)
              }
            }).catch(error=>{
              // console.log("error catch")
              console.log(error)
            })
          }

        },

    }
</script>

<style scoped>
.empty{
  color: white;
}
</style>