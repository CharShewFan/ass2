<template>
  <div>

    <v-alert elevation="10"
             v-show="error"
             :type="this.type"
             :color="this.color"
    >
      {{errorMessages}}
    </v-alert>

    <v-card flat class="mt-8">
      <v-card-title>Edit User Info</v-card-title>
    </v-card>
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
      <p class="text-caption">Upload Profile Image</p>
      <v-file-input show-size
                    prepend-icon="mdi-camera"
                    id="avatar"
                    accept="image/png, image/jpeg,image/jpg,image/gif"
                    v-model="file"
      >
      </v-file-input>
      <v-btn @click="rmProfileImg">Remove Profile Image</v-btn>

    </v-col>

<!--    <v-col cols="12" sm = "12" md = "6" lg = "6" xl="6">-->
<!--      <v-btn @click = "clear()" class="warning right ">Clear</v-btn>-->
<!--    </v-col>-->

    <v-col cols="12" sm = "12" md = "12" lg = "12" xl="12">
      <v-btn @click = "submit()" class="primary right">Submit</v-btn>
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
  data() {
    return {
      nfirstName: "",
      nLastName: "",
      nPassword: "",
      oPassword: "",
      filename: "",
      file:null,
      data:null,

      error:false,
      errorMessages:"",
      type:"",
      color:""
    }
  },
  compute: {},


  methods: {
// change user image and profile info
    submit() {
      // //check empty form
      // console.log(this.nfirstName)
      // console.log(typeof( this.nfirstName))
      // if(this.nfirstName === "" && this.nLastName === "" && this.nPassword === "" && this.oPassword === ""){
      //   this.error = true;
      //   this.errorMessages = "please fill in some field before submit"
      //   this.type = "warning"
      //   this.color = "red"
      // }
      // console.log(this.color)



      let userId = localStorage.getItem("userId")
      axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token");
      if (this.nPassword !== "" && this.oPassword !== "") {
        axios.patch(`http://localhost:4941/api/v1/users/${userId}`, {
          "firstName": this.nfirstName,
          "lastName": this.nLastName,
          "password": this.nPassword,
          "currentPassword": this.oPassword
        }).then(response=>{
          if(response.status === 200){
            if(this.filename === null || this.filename === "" || this.filename === undefined){
              let redirect = decodeURIComponent(this.$route.query.redirect || '/userInfo')
               this.$router.push({path:redirect})
            }
          }
        })
      }

      let reader  = new FileReader();
      //console.log(this.file)
     // console.log(this.file.type)
      reader.onload = function (){
        this.data = reader.result
        console.log(this.data)
        console.log(typeof (this.data))
      }
      reader.readAsArrayBuffer(this.file)



      axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token");

      let req = new XMLHttpRequest();
      req.open("PUT", `http://localhost:4941/api/v1/users/${userId}/image`,true)
      req.onload = function(){
        alert("Upload Success!")
      }
      req.setRequestHeader("content-type", this.file.type);
      req.setRequestHeader("X-Authorization", localStorage.getItem("token"));
      req.send(this.data)
      // const options = {
      //   method:"put",
      //   headers:{"content-type":`${this.file.type}`},
      //   data:this.data,
      //   url: `http://localhost:4941/api/v1/users/${userId}/image`
      // }
      // axios(options).then(response=>{console.log(response)
      // }).catch(err=>{
      //   console.log(err)
      // })

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
          console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>