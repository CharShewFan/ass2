<template>

  <div>
    <div class="mt-8 d-flex align-center">
      <h2 class="mx-auto text--primary" >Attendees List</h2>
    </div>

    <div v-for="attendee in attendees" :key="attendee.index" class="mt-15 ">
      <v-banner elevation="5" class="mx-15">
        <v-avatar  size="48px">
          <img :src="`http//localhost:4941/api/v1/users/${attendee.attendeeId}/image`" class="pImage"  alt=" "/>
        </v-avatar>
        <div>Attendee ID : {{attendee.attendeeId}}</div>
        <div>Attendee Name :  {{attendee.firstName}} {{attendee.lastName}}</div>
        <div>Attendee Status: {{attendee.status}}</div>

        <div>Attendee Date Of Interest:   {{attendee.dateOfInterest}}</div>
        <div class="btn">
          <v-btn class="green mt-5 mr-10 d-inline-block" @click="change(1,attendee.attendeeId)">accept</v-btn>
          <v-btn class="warning mt-5 mr-10 d-inline-block" @click="change(2,attendee.attendeeId)">pending</v-btn>
          <v-btn class="error mt-5 mr-10 d-inline-block" @click="change(3,attendee.attendeeId)">rejected</v-btn>
        </div>
      </v-banner>
    </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
name: "OrganizeAttandees",
  data(){
  return {
    attendees:[]
  }
  },

  created() {
  this.getAtt()
  },

  computed:{
  check(){
    return this.attendees
  }
  },


  methods:{
    getAtt(){
      let id = this.$route.params.id
      axios.get(`http://localhost:4941/api/v1/events/${id}/attendees`).then(
          res=>{
            this.attendees = res.data
            console.log(this.attendees)
          }
      ).catch(err=>{
        console.log(err)
      })
    },
    change(code,userId){
      if(code === 1){
        var datas = {
          "status": "accepted"
        }
      }
      if(code === 2){
         datas = {
          "status": "pending"
        }
      }
      if(code === 3){
         datas = {
          "status": "rejected"
        }
      }
      let eventId = this.$route.params.id
      axios.defaults.headers.common["X-Authorization"] = localStorage.getItem("token")
      axios.patch(`http://localhost:4941/api/v1/events/${eventId}/attendees/${userId}`,datas).then(res=>{
        console.log(res)
        alert("Update Successfully")
        this.getAtt()
      }).catch(err=>{
        console.log(err)
        alert(err)
      })
    }
  }
}

</script>

<style scoped>
.pImage{
  background-image: url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
  background-size:     cover;                      /* <------ */
  background-repeat:   no-repeat;
  background-position: center center;
  background-color: darkblue;
}
</style>