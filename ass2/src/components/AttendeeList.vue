<template>
  <div >

    <div v-show="hide">
    <h3 class="mt-16 mb-10" >Attendee List</h3>

    <ul >

<!--      <v-btn><v-icon></v-icon></v-btn>-->
      <li v-for="attendee in attendees" :key="attendee.index">
        <v-banner
            elevation="10"
        >
        <h4 class="mb-3">Attendee ID : {{attendee.attendeeId}}</h4>
        <h4 class="mb-1">Attendee name: {{attendee.firstName}}  {{attendee.lastName}}</h4>
        <h5>Interested Date:  {{attendee.dateOfInterest | toDate()}}</h5>

        <h5 class="mb-2">Join Status:  {{attendee.status}}</h5>
        </v-banner>
        <v-divider></v-divider>
      </li>

    </ul>
    </div>
       <div class="mt-5 ">  <v-btn class="primary " @click="toggle">Hide/Show the Attendee</v-btn></div>
    {{this.attendeeId}}
  </div>
</template>


<script>
import axios from 'axios';


export default {
  name : "AttendeeList",

  data(){
    return{
      attendees:[ ],
      hide:true,
      attendeeId:[]
    }
  },

  beforeMount() {
    this.getAttendeeList()
  },

  updated() {
    this.getAttendeeList()
  },

  mounted() {
    // this.getAttendeeList();
     this.getUserImage()

  },

  filters:{
    toDate(date){
      let stringList = date.slice(0,-5).split("T")
      console.log(stringList)
      return "Date:  "+  stringList[0]+"           "+" Time:"+"  "+stringList[1]
    }
  },
  methods:{
    getAttendeeList(){
      let eventId = this.$route.params.id
      axios.get(`http://localhost:4941/api/v1/events/${eventId}/attendees`)
      .then(response=>{
        if(response.status === 200){
          this.attendees = response.data
        }
        if(response.status === 404){
          alert("This event is Not Exist. Code: 404")
        }
        if(response.status === 500){
          alert ("Sorry Internal Error. Code: 500")
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    toggle(){
      return this.hide = !this.hide
    },


    getUserImage(){
      this.attendeeId = []
     this.attendees.forEach(item=>{
        this.attendeeId.push(item.attendeeId)
       console.log(this.attendeeId)
      })
    }

  },



  components:{

  },

  props:{

  }

}



</script>

<style scoped>
li{
  list-style-type:none
}
</style>