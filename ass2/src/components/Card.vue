<template>
  <v-container class="my-5 d-flex justify-center" >
    <v-row class="d-flex justify-center">
      <v-col sm="12" md="4" lg="3" xl="3">
        <v-card>
          <v-img
              class="align-end imgText"
              height="200px"
              :src="`http://localhost:4941/api/v1/events/${this.$route.params.id}/image`"
          >
            <v-card-title class="white--text cardTitle">{{event.title}}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-4" >Event ID: {{event.id}}</v-card-subtitle>

          <v-card-text class="text--primary textCard" >
            <div>capacity: {{event.capacity}}</div>
            <div>organizer: {{event.organizerFirstName}} {{event.organizerLastName}}</div>
            <div>organizer ID:{{event.organizerId}}</div>
            <div><router-link :to="`/event/${event.id}/list`">attendants: {{event.attendeeCount}}</router-link></div>
            <div>categories: {{ event.categories | convert}}</div>
            <div v-if="event.isOnline != 0">OnLine Event </div>
            <div v-if="event.url !== null">URL:{{event.url}}</div>
            <div v-if="event.venue !== null">Venue:{{event.venue}}</div>
            <div>Need Apply? {{event.requiresAttendanceControl | zeroToFalse}}</div>
            <div>Fee:${{event.fee}}</div>
            <div>{{event.date | toDate}}</div>

            <v-spacer></v-spacer>
            <div>description:</div>
            <p>{{event.description}}</p>

          </v-card-text>

          <v-card-actions class="btn-box">
            <v-btn color="primary"  to="/event" >{{this.btnName}}</v-btn>
            <v-btn color="error"  @click="this.join" v-if="!this.joined" v-show="this.hidddJoinBtn">{{this.btnName2}}</v-btn>
            <v-btn color="warning" @click="this.cancel" v-if="this.joined">Withdraw</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>

</template>

<script>


import store from "@/store";
import axios from "axios";

export default {
name: "Card",

  filters:{
    convert:function(categories){
      let categoriesList = ["Outdoors & Adventure","Tech","Family","Health & Wellness","Sports & Fitness",
        "Learning","Photography","Food & Drink","Writing","Language & Culture",
        "Music","Movements","LGBTQ","Film","Sci-Fi & Games","Beliefs","Arts","Book clubs","Dance","Pets","Hobbies & Crafts","Fashion & Beauty",
        "Social","Career & Business"
      ]
      if(categories.length !== undefined){
        for(let i = 0; i < categories.length; i++){
          if(typeof(categories[i]) == "number"){
            for(let j = 1; j <24; j++){
              if(categories[i] === j){
                categories[i] = categoriesList[j - 1]
              }
            }
          }
        }
        return categories.toString()
      }

    },



    toDate(date){
      let stringList = date.slice(0,-5).split("T")
      return "Date:  "+  stringList[0]+"  "+"Time:"+"  "+stringList[1]
    },

    zeroToFalse(num){
      if(num === 0){
        return num = "No"
      }else{
        return num = "Yes"
      }
    },


  },
  props:{
      event:{},
      btnName:String,
      btnName2:String,
      hidddJoinBtn:Boolean
  },

  computed:{

  },

  mounted(){
  },

  watch:{
    '$route.params.id': function () {

    }
  },

  data(){
  return{
    joined:false,
    URL:"require('../assets/userProfileImg.jpeg')"
  }
  },

  methods:{
    join(){
      let id = this.$route.params.id

      if(store.getters.isLogIn === true){
        axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token")
        axios.post(`http://localhost:4941/api/v1/events/${id}/attendees`
        ).then(response=>{
          if(response.status === 201){
            this.joined = !this.joined
            alert(" Join Successfully")
          }
          if(response.status === 403){
            alert("You already Joined")
          }
        }).catch(error=>{
          console.log(error)
          console.log(error.message)
        })
      }else{
        this.$router.push({path:'/login'})
        //this.$router.push({ name: 'name', query: { redirect: '/path' } });
      }

    },

    cancel(){
      let id = this.$route.params.id

      if(store.getters.isLogIn === true){
        axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token")
        axios.delete(`http://localhost:4941/api/v1/events/${id}/attendees`
        ).then(response=>{
          if(response.status === 200){
            this.joined = !this.joined
            alert(" Withdraw Successfully")
          }

        }).catch(err=>{
          if(err.message === "Request failed with status code 403"){
            alert("You already Joined")

          }

        })
      }else{
        this.$router.push({path:'/login'})
        //this.$router.push({ name: 'name', query: { redirect: '/path' } });
      }
    },




  }
}
</script>

<style scoped>
.cardTitle{
  background-color: rgba(256,256,256,0.5);
}

img{
  filter: blur(10px);
  -webkit-filter: blur(10px);
}

a{
  color: white;
}
</style>