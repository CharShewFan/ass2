<template>
<div class="outside">
  <v-alert elevation="10"
           v-show="error"
           :type="this.type"
           :color="this.color"
  >
    {{errorMessages}}
  </v-alert>

  <div class="container">




    <div class="box" >
      <v-form class="my-10">
      <v-text-field label="E-mail*" type="email" clearable outlined v-model="email"></v-text-field>
      <v-text-field label="Password*" type="password" clearable outlined v-model="password"></v-text-field>

      <div class="btn-group">
        <router-link  to="/registration" >I dont have an account*</router-link>
        <div class="btn-2">
          <v-btn type="button" @click="$router.go(-1)" class="mr-5 info" >back</v-btn>
        </div>
        <div class="btn-1">
          <v-btn type="button" class="primary mr-5 " @click="Login" >Submit</v-btn>
        </div>
      </div>


    </v-form>
    </div>


  </div>
</div>
</template>

<script>
//import axios from 'axios'
import {mapActions} from 'vuex'
import axios from "axios";

export default {
 //name: "Login",
  data(){
   return{
     email:"",
     password:"",
     error:false,
     errorMessages:"",
     type:"",
     color:""

   }
  },



  methods:{
   ...mapActions(["logIn","getUserInfo"]),

    async Login(){

          // console.log(this.email)
          // console.log(this.password)
          try{
            let response = await axios.post("http://localhost:4941/api/v1/users/login",{"email":this.email,"password":this.password})
            // console.log(this.email)
            // console.log(this.password)
            //
            // console.log(response.status)

            let token = response.data.token
            let userID = response.data.userId
            localStorage.setItem("token",token);
            localStorage.setItem("userId",userID)
            axios.defaults.headers.common["X-Authentication"] = token
            this.error = true
            this.type = "success"
            this.color = "green"
            this.errorMessages = "login in successfully"

              this.logIn()
              await this.getUserInfo(localStorage.getItem("userId"))


              let redirect = decodeURIComponent(this.$route.query.redirect || '/')
              await this.$router.push({path:redirect})


              // this.error = true;
              // this.errorMessages = "please input valid email or correct password"
              // this.type = "information"
              // this.color = "green"




          }catch(err)
          {
            //console.log("miss me?")
            //console.log(err)
            if(err.message === "Request failed with status code 400"){
              this.error = true;
              this.errorMessages = "please input valid email or correct password"
              this.type = "warning"
              this.color = "red"
            }

          }
    },


  }






}










</script>

<style scoped>


.container{
  margin-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.box{
  width: 800px;
  height: 400px;
}

.btn-1{
  float: right;
}

.btn-2{
  float: right;
}
.btn-group{
  align-items: center;
}


</style>