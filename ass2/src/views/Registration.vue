<template>
    <v-container>
      <v-alert elevation="10"
               v-show="error"
               :type="this.type"
               :color="this.color"
      >
        {{errorMessages}}
      </v-alert>

      <v-card flat class="my-10">
        <v-card-title>
          Sign Up
        </v-card-title>
      </v-card>

    <v-form class="ml-3">
      <v-text-field
          outlined
          v-model="firstname"
          :counter="10"
          label="first name"
          required
          @input="$v.firstname.$touch()"
          @blur="$v.firstname.$touch()"
      ></v-text-field>

      <v-text-field
          outlined
          v-model="lastname"
          :counter="10"
          label="last name"
          required
          @input="$v.lastname.$touch()"
          @blur="$v.lastname.$touch()"
    ></v-text-field>

      <v-text-field
          outlined
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
      ></v-text-field>

      <v-text-field
          outlined
          v-model="password"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          type = "password"
    ></v-text-field>


      <v-row>
        <v-col>
          <div>
            <v-btn type="button" class="d-inline-block float-right" @click="$router.go(-1)">back</v-btn>
            <v-btn class="mr-4 primary d-inline-block float-right ml-5" @click="submit">submit</v-btn>
            <v-btn class="warning d-inline-block float-left" @click="clear">clear</v-btn>
          </div>
        </v-col>


      </v-row>
      <v-row class="ml-10">
        <v-col>
        </v-col>
      </v-row>
      <!--返回上一页-->
    </v-form>

    <v-card v-if = "userInfo.length > 0">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>
        <v-card-title>You user id : {{userInfo[0].id}}</v-card-title>
    </v-card>

</v-container>
  </template>
  
  <script>
    import { validationMixin } from 'vuelidate'
    import { required, maxLength, email } from 'vuelidate/lib/validators'
    import axios from 'axios'
    import {mapActions} from 'vuex'
    //import Login from '@/components/Login';

    export default {
        name: 'Registration',
    components: {
     // NavBar
      //Login
    },
      mixins: [validationMixin],
  
      validations: {
        firstname: { required, maxLength: maxLength(10) },
        lastname: { required, maxLength: maxLength(10) },
        email: { required, email },
        password:{required}
        
 
      },
  
      data: () => ({
        firstname: '',
        lastname:"",
        email: '',
        password:"",
        userInfo:[],
        info:"",
        error:false,
        errorMessages:"",
        type:"",
        color:""
      }),
  
      computed: {
        firstnameErrors () {
          const errors = []
          if (!this.$v.firstname.$dirty) return errors
          !this.$v.firstname.maxLength && errors.push('Name must be at most 10 characters long')
          !this.$v.firstname.required && errors.push('Name is required.')
          return errors
        },

        lastnameErrors () {
          const errors = []
          if (!this.$v.lastname.$dirty) return errors
          !this.$v.lastname.maxLength && errors.push('Name must be at most 10 characters long')
          !this.$v.lastname.required && errors.push('Name is required.')
          return errors
        },

        emailErrors () {
          const errors = []
          if (!this.$v.email.$dirty) return errors
          !this.$v.email.email && errors.push('Must be valid e-mail')
          !this.$v.email.required && errors.push('E-mail is required')
          return errors
        },
      },
  
      methods: {
          ...mapActions(['logIn','getUserInfo']),

         submit () {
           localStorage.setItem("email",this.email)
           localStorage.setItem("password",this.password)
           axios.post('http://localhost:4941/api/v1/users/register',{
              "firstName":this.firstname,
              "lastName":this.lastname,
              "email":this.email,
              "password":this.password
          }).then(response=>{
            console.log(response.data)
             this.error = true
             this.type = "success"
             this.color = "green"
             this.errorMessages = "Sign Up successfully ! Now jump to Home page"
            //alert("Sign Up success")
             //this.$route.push({path:'/userInfo'})
          }).then(()=>{
              axios.post("http://localhost:4941/api/v1/users/login",{
                "email":localStorage.getItem("email"),
                "password":localStorage.getItem("password")
              }
          ).then((response)=>{
                if(response.status === 200){
                  localStorage.clear()
                  localStorage.setItem("userId",response.data.userId)
                  localStorage.setItem("token",response.data.token)
                  this.logIn()
                  this.getUserInfo(localStorage.getItem("userId"))
                  //after login jump to home page
                  let redirect = decodeURIComponent(this.$route.query.redirect || '/')
                  this.$router.push({path:redirect})
                }else{
                  alert(response.status.toString())
                }
              }).catch(error=>{
                console.log(error)
                alert("Login failed")
              })
          }
           )
               .catch(
            error => {
              console.log(error.message)
              if(error.message === "Request failed with status code 400"){
                this.error = true;
                this.errorMessages = "Email Had Been Taken"
                this.type = "warning"
                this.color = "red"
              }

            }
          )
        },
        clear () {
          this.$v.$reset()
          this.firstname = ''
          this.email = ''
          this.lastname = ''
          this.password = ''
        },
      },
    }
  </script>
  
  