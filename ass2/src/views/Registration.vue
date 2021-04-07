<template>
    <v-container>
    <form>
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

  
      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>

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
  
    export default {
        name: 'Registration',
    components: {
     // NavBar
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
        userInfo:[]
        
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
        submit () {
          this.$v.$touch()
          axios.post('/users',{
              "firstname":this.firstname,
              "lastname":this.lastname,
              "password":this.password
          }).then(response=>{
              this.userId = response.body.id
              
          })
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
  
  