<template>
<div>
  <v-alert elevation="10"
           v-show="error"
           :type="this.type"
           :color="this.color"
  >
    {{errorMessages}}
  </v-alert>
  <v-card flat>
    <v-card-title>Sign In</v-card-title>
  </v-card>

  <v-form class="ml-5">
    <v-text-field label="E-mail" type="email" clearable solo v-model="email"></v-text-field>
    <v-text-field label="Password" type="password" clearable solo v-model="password"></v-text-field>

    <div class="right mr-5">

      <div>
        <v-btn type="button" class="primary mr-5 " @click="Login" >Submit</v-btn>
        <v-btn type="button" class="warning mr-5" >Reset</v-btn>
      </div>

      <div class="mx-2 my-5">
        <v-btn type="button" @click="$router.go(-1)" class="mr-5 info" >back</v-btn>
      </div>
      <div>
        <v-btn type="button" to="/registration" class="success">sign up</v-btn>
      </div>
    </div>
  </v-form>

</div>
</template>

<script>
//import axios from 'axios'
import {mapActions} from 'vuex'
import axios from "axios";

export default {
 name: "Login",
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
   ...mapActions(["logIn","getUerInfo"]),

    async Login(){

          console.log(this.email)
          console.log(this.password)
          try{
            let response = await axios.post("/users/login",{"email":this.email,"password":this.password})
            console.log(this.email)
            console.log(this.password)

            console.log(response.status)

            let token = response.data.token
            let userID = response.data.userId
            localStorage.setItem("token",token);
            localStorage.setItem("userId",userID)
            axios.defaults.headers.common["X-Authentication"] = token
            this.error = true
            this.type = "success"
            this.color = "green"
            this.errorMessages = "login in successfully"

            if(response.status === 200){
              this.logIn()
              let redirect = decodeURIComponent(this.$route.query.redirect || '/')
              await this.$router.push({path:redirect})
              //await this.getUerInfo(userID)
            }else{
              this.error = true;
              this.errorMessages = "please input valid email or correct password"
              this.type = "warning"
              this.color = "red"
            }



          }catch(err)
          {
            console.log("miss me?")
            console.log(err)
          }
    }

  }






}










</script>

<style scoped>

</style>