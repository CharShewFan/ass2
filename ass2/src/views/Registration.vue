<template>
    <v-container>
      <v-card flat>
        <v-card-title>
          Sign Up
        </v-card-title>
      </v-card>

    <v-form class="ml-3">
      <v-text-field
        v-model="firstname"
        :error-messages="nameErrors"
        :counter="10"
        label="first name"
        required
        @input="$v.firstname.$touch()"
        @blur="$v.firstname.$touch()"
      ></v-text-field>

      <v-text-field
      v-model="lastname"
      :error-messages="nameErrors"
      :counter="10"
      label="last name"
      required
      @input="$v.lastname.$touch()"
      @blur="$v.lastname.$touch()"
    ></v-text-field>

      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      type = "password"
    ></v-text-field>

  
      <v-btn class="mr-4 primary" @click="submit">submit</v-btn>
      <v-btn class="warning" @click="clear">clear</v-btn>
      <v-btn class="info" to="/login">sign in</v-btn>
      <v-btn type="button" @click="$router.go(-1)">back</v-btn>
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
        info:""
        
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
        async submit () {
          await axios.post('http://localhost:4941/api/v1/users/register',{
              "firstName":this.firstname,
              "lastName":this.lastname,
              "email":this.email,
              "password":this.password
          }).then(response=>{
            console.log(response.data)
            alert(response.data)
            
            
          }).catch(
            response => {
              alert (response.status)
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
  
  