<template>
<div>
  <v-alert elevation="10"
           :type="`${type}`"
           v-show="error">
    {{errorMessages}}
  </v-alert>
  <v-card flat>
    <v-card-title>Sign In</v-card-title>
  </v-card>

  <v-form class="ml-5">
    <v-text-field label="E-mail" type="email" clearable solo v-model="email"></v-text-field>
    <v-text-field label="Password" type="password" clearable solo v-model="password"></v-text-field>

    <div class="right mr-5">
      <v-btn type="button" class="warning">Reset</v-btn>
      <v-btn type="button" class="primary" @click="login" >Submit</v-btn>
      <v-btn type="button" @click="$router.go(-1)">back</v-btn>
    </div>


  </v-form>
</div>
</template>

<script>
import axios from 'axios'
export default {
 name: "Login",
  data(){
   return{
     email:"",
     password:"",
     error:false,
     errorMessages:"",
     type:""
   }
  },
  methods:{

   async login(){
     try{
       let response = await axios.post("/users/login",{"email":this.email,"password":this.password})
        //console.log(response.data.token)
       console.log(response.status)

        let token = response.data.token
        let userId = response.data.userId
        sessionStorage.setItem("token",token);
        sessionStorage.setItem("userId",userId)
       this.error = true
       this.errorMessages = "login in successfully"
       this.type = "success"

     }catch(err){
       console.log("miss me?")
       console.log(err)
       this.error = true;
       this.errorMessages = "please input valid email or correct password"
       this.type = "warning"
      }
     }
   },



}
</script>

<style scoped>

</style>