<template>
  <v-container class="my-5">
        <v-card>
          <v-img
              class="align-end imgText"
              height="200px"
              :src="require('../assets/userProfileImg.jpeg')"
          >
            <v-card-title>{{event.title}}</v-card-title>
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
            <v-btn color="error"  @click="this.join" >{{this.btnName2}}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>




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
      //console.log(categories)
      categories.forEach((id)=>{
        if(typeof(id) == "number"){
          for(let i = 1; i <24; i++){
            if(id === i){
              categories[categories.indexOf(id)] = categoriesList[i - 1]
            }
          }
        }
      })

      return categories.toString()
    },

    toDate(date){
      let stringList = date.slice(0,-5).split("T")
      //console.log(stringList)
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
      event:Object,
      btnName:String,
      btnName2:String,

  },

  data(){
  return{

  }
  },

  methods:{
    join(){
      let id = this.$route.params.id
      // let current = new Date();
      // let time = current.toString();
      // let list = time.split(" ")
      // const strings = list[3]+"-"+"05"+"-"+list[2]+"T"+list[4]+".000Z"
      //

      if(store.getters.isLogIn === true){
        axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token")
        axios.post(`http://localhost:4941/api/v1/events/${id}/attendees`
        ).then(response=>{
          if(response.status === 200){
            alert(" Join Successfully")
          }
          if(response.status === 403){
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

</style>