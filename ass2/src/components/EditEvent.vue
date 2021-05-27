<template>
<v-container class="mt-10">
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="12" xl="12">
      <h2>Edit Event</h2>
    </v-col>

    <v-col sm="12" md="6" lg="4" xl="3" cols="12">
      <v-text-field placeholder="Title" label="Title" v-model="title" outlined  >

      </v-text-field>
    </v-col>

    <v-col sm="12" md="6" lg="4" xl="3" cols="12">
      <v-text-field placeholder="Description" label="Description" v-model="description" outlined  >

      </v-text-field>
    </v-col>

    <v-col sm="12" md="6" lg="4" xl="3">
      <v-text-field placeholder="URL" label="URL" v-model="url" outlined  >

      </v-text-field>
    </v-col>

    <v-col sm="12" md="6" lg="4" xl="3">
      <v-text-field placeholder="Venue" label="Venue" v-model="venue" outlined  >

      </v-text-field>
    </v-col>

    <v-col sm="12" md="6" lg="4" xl="3">
      <v-text-field placeholder="Capacity" label="Capacity" v-model="capacity" outlined  >
      </v-text-field>
    </v-col>

    <v-col sm="12" md="6" lg="4" xl="3" cols="12">
      <v-text-field
          v-model="fee"
          label="fee"
          required
          outlined
          prefix="$"
      >
      </v-text-field>
    </v-col>

    <v-col sm="12" md="6" lg="6" xl="6" cols="12">
      <v-select
          :items="onlineCheckBox"
          label="Online ?"
          outlined
          v-model="online"
      ></v-select>
    </v-col>

    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-autocomplete
          chips
          clearable
          deletable-chips
          multiple
          small-chips
          outlined
          v-model="categories"
          :items = items
          label = "categories *(require)"
      >
      </v-autocomplete>
    </v-col>

    <v-col sm="12" md="6" lg="4" xl="3">
      <v-date-picker v-model="picker" color="#ff5252"></v-date-picker>
    </v-col>

    <v-col sm="12" md="6" lg="4" xl="3" >
      <v-time-picker
          format="24hr"
          landscape
          v-model="time"
          color="#ff5252"
      >
      </v-time-picker>
    </v-col>

    <v-col sm="12" md="6" lg="4" xl="3" >
      <v-btn class="error float-right" @click="submit">Submit</v-btn>
    </v-col>

  </v-row>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "EditEvent",
  data:()=>({
    title:"",
        description:"",
        url:"",
        capacity:"",
        fee:"",
        items:["Outdoors & Adventure","Tech","Family","Health & Wellness","Sports & Fitness",
      "Learning","Photography","Food & Drink","Writing","Language & Culture",
      "Music","Movements","LGBTQ","Film","Sci-Fi & Games","Beliefs","Arts","Book clubs","Dance","Pets","Hobbies & Crafts","Fashion & Beauty",
      "Social","Career & Business"
    ],
        onlineCheckBox:["Yes","No"],
        categories:[],
        picker: new Date().toISOString().substr(0, 10),
        venue:"",
        online:"",
        time:"",
        controls:""
  }),

  methods:{
    submit(){

      //create data
      let text = {}
      if(this.title !== ""){
        text.title = this.title
        //text += `{"title":"${this.title}"},`
      }

      if(this.description !== ""){
        text.description = this.description
        //text += `{"description":"${this.description}"},`
      }

      if(this.online !== "" && this.online !== undefined){
        this.online = this.online === "YES"
        text.isOnline = this.online
        //text += `{"isOnline":${this.online}},`
      }
      if(this.venue !== "" && this.venue !== undefined){
        text.venue = this.venue
        //text += `{"venue":"${this.venue}"},`
      }
      if(this.capacity !== "" && this.capacity !== undefined){
       this.capacity =  parseInt(this.capacity)
        text.capacity = this.capacity
        //text += `{"capacity":${this.capacity}},`
      }
      if(this.controls !== "" && this.controls !== undefined){
        this.controls =  this.controls === "YES"
        text.requiresAttendanceControl = this.controls
        //text += `{"requiresAttendanceControl":${this.controls}},`
      }
      if(this.fee !== "" && this.fee !== undefined){
        this.fee =  parseFloat(this.fee)
        text.fee = this.fee
        //text += `{"fee":${this.fee}},`
      }
      if(this.time !== undefined && this.picker !== undefined){
        let dates = this.picker +" " + this.time + ":"+"00"
        text.date = dates
        //text += `{"date":"${dates}"},`
      }



      if(this.categories.length > 0){
        let cateArray = []
        for(let i = 0 ; i < this.categories.length ; i ++){
          //console.log(this.categories[i])
          cateArray.push(this.items.indexOf(this.categories[i])+1)
        }
        text.categories = cateArray
        //text += `{"categoryIds":[${cateArray}]},`
      }

      if(this.url !== ""){
        text.url = this.url
        //text += `{"url":"${this.url}"},`
      }


      console.log(text)
      console.log(this.$route.params.id)

      //patch to server
      let id = this.$route.params.id
      //text = text.slice(0,-1)
      axios.defaults.headers.common["X-Authorization"] = localStorage.getItem("token")
      axios.patch(`http://localhost:4941/api/v1/events/${id}`, text
      ).then(res=>{
        console.log(res)
        alert("update successfully")
      }).catch(err=>{
        console.log(err)
        alert(err)
      })

    },
  }

}
</script>

<style scoped>

</style>