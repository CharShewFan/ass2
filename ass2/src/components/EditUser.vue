<template>
  <div>

    <div class="d-flex align-center mt-15 mb-10">
      <h2 class="mx-auto text--primary">Edit User Information</h2>
    </div>
  <v-form class="ml-3">
<v-container>
  <v-row>
    <v-col cols="12" sm = "12" md = "6" lg = "6" xl="6">
      <v-text-field label="first name" v-model = "nfirstName" clearable outlined></v-text-field>
    </v-col>

    <v-col cols="12" sm = "12" md = "6" lg = "6" xl="6">
      <v-text-field label="last name" v-model = "nLastName" clearable outlined></v-text-field>
    </v-col>

    <v-col cols="12" sm = "12" md = "6" lg = "6" xl="6">
      <v-text-field label="new password" v-model = "nPassword" type="password" clearable outlined></v-text-field>
    </v-col>

    <v-col cols="12" sm = "12" md = "6" lg = "6" xl="6">
      <v-text-field label="old password" v-model = "oPassword" type="password" clearable outlined></v-text-field>
    </v-col>

    <v-col cols="12" sm = "12" md = "12" lg = "12" xl="12">

      <v-banner elevation="5">
        <label for="file" class="d-inline-block mb-3 text--primary">Upload Image File</label>
        <div><input type="file" id="file"  ref="file" @change="processFile()"/></div>
      </v-banner>


      <div class="mt-5"><v-btn @click="rmProfileImg" class="warning d-inline-block float-right">Remove Profile Image</v-btn></div>


    </v-col>



    <v-col cols="12" sm = "12" md = "12" lg = "12" xl="12">
      <v-btn @click = "submit()" class="primary d-inline-block float-right">Submit</v-btn>
    </v-col>

  </v-row>
</v-container>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  //name: "EditUser",
  data() {
    return {
      nfirstName: "",
      nLastName: "",
      nPassword: "",
      oPassword: "",
      filename: "",
      file:"",

      error:false,
      errorMessages:"",
      type:"",
      color:""
    }
  },
  compute: {},

  updated() {

  },

  methods: {
// change user image and profile info


    submit() {
      //check empty form

      let userId = localStorage.getItem("userId")
        axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token");

      //update password
        if (this.nPassword !== "" && this.oPassword !== "") {
          axios.patch(`http://localhost:4941/api/v1/users/${userId}`, {
            "firstName":this.nfirstName,
            "lastName":this.nLastName,
            "password": this.nPassword,
            "currentPassword": this.oPassword
          }).then(response => {
            if (response.status === 200) {
              if (this.filename === null || this.filename === "" || this.filename === undefined) {
                let redirect = decodeURIComponent(this.$route.query.redirect || '/userInfo')
                this.$router.push({path: redirect})
              }
            }
          })
        }

        if(this.file !== ""){

          axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token");
          const options = {
            method: "put",
            headers: {"content-type": `${this.file.type}`},
            data: this.file,
            url: `http://localhost:4941/api/v1/users/${userId}/image`
          }
          axios(options).then(response => {
            //console.log(response)
            if(response.status === 201 || response.status === 200){
              alert("set up profile image success")
            }
          }).catch(err => {
            //console.log(err)
            alert(err)
          })
        }


    },

     processFile () {
       this.file = this.$refs.file.files[0]
    },

  //remove user image file
    rmProfileImg(){
      let id = localStorage.getItem("userId")
      //const file = document.getElementById("avatar").value

      axios.defaults.headers.common['X-Authorization'] = localStorage.getItem('token')
      axios.delete(`http://localhost:4941/api/v1/users/${id}/image`).then(response=>{
        if(response.status === 200){
          alert("Profile Removed")
          this.$route.push({path:"/userInfo"})
        }
      }).catch(error=>{
          //console.log(error)
        alert(error)
      })
    }
  }
}
</script>

<style scoped>

</style>