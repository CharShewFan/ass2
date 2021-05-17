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
            <v-spacer></v-spacer>
          </v-card-actions>

        </v-card>




  </v-container>

</template>

<script>
export default {
name: "Card",

  filters:{
    convert:function(categories){
      let categoriesList = ["Outdoors & Adventure","Tech","Family","Health & Wellness","Sports & Fitness",
        "Learning","Photography","Food & Drink","Writing","Language & Culture",
        "Music","Movements","LGBTQ","Film","Sci-Fi & Games","Beliefs","Arts","Book clubs","Dance","Pets","Hobbies & Crafts","Fashion & Beauty",
        "Social","Career & Business"
      ]
      console.log(categories)
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
      console.log(stringList)
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
      event:Array,
      btnName:String,
  },

  data(){
  return{

  }
  }
}
</script>

<style scoped>

</style>