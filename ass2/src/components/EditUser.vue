<template>
  <div>
    <v-card flat class="mt-8">
      <v-card-title>Edit User Info</v-card-title>
    </v-card>
  <v-form class="ml-3">
<v-container>
  <v-row>
    <v-col cols="12" sm = "12" md = "6" lg = "6" xl="6">
      <v-text-field label="first name" v-model = "nfirstName" clearable solo></v-text-field>
    </v-col>

    <v-col cols="12" sm = "12" md = "6" lg = "6" xl="6">
      <v-text-field label="last name" v-model = "nLastName" clearable solo></v-text-field>
    </v-col>

    <v-col cols="12" sm = "12" md = "6" lg = "6" xl="6">
      <v-text-field label="new password" v-model = "nPassword" type="password" clearable solo></v-text-field>
    </v-col>

    <v-col cols="12" sm = "12" md = "6" lg = "6" xl="6">
      <v-text-field label="old password" v-model = "oPassword" type="password" clearable solo></v-text-field>
    </v-col>

    <v-col cols="12" sm = "12" md = "12" lg = "12" xl="12">
      <p class="text-caption">Upload Profile Image</p>
      <v-file-input show-size truncate-length = "43" prepend-icon="mdi-camera" v-model="filename">
      </v-file-input>
    </v-col>

    <v-col cols="12" sm = "12" md = "6" lg = "6" xl="6">
      <v-btn @click = "clear()" class="warning float-right ">Clear</v-btn>
    </v-col>

    <v-col cols="12" sm = "12" md = "12" lg = "12" xl="12">
      <v-btn @click = "submit()" class="primary float-right">Submit</v-btn>
    </v-col>

  </v-row>
</v-container>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
name: "EditUser",
  data(){
  return{
    nfirstName:"",
    nLastName:"",
    nPassword:"",
    oPassword:"",
    filename:""
  }
  },
  compute:{

  },
  methods:{
  submit(){
    axios.post('/user/:id',{
    })
  },
    clear(){
    return null
    }
  }
}
</script>

<style scoped>

</style>