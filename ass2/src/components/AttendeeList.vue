<template>
  <div class="my-10">

    <div v-show="hide">
    <h3 class="mt-16 mb-10" >Attendee List</h3>

    <ul >

<!--      <v-btn><v-icon></v-icon></v-btn>-->
      <li v-for="attendee in attendees" :key="attendee.index">
        <v-banner
            elevation="10"
        >
          <div class="float-right d-flex align-center profileBox" >
            <v-avatar class="bg"><v-img :src="`http://localhost:4941/api/v1/users/${attendee.attendeeId}/image`"></v-img></v-avatar>
          </div>

          <v-spacer></v-spacer>
          <div class="float-left">
          <h4 class="mb-3">Attendee ID : {{attendee.attendeeId}}</h4>
          <h4 class="mb-1">Attendee name: {{attendee.firstName}}  {{attendee.lastName}}</h4>
          <h5>Interested Date:  {{attendee.dateOfInterest | toDate()}}</h5>
          <h5 class="mb-2">Join Status:  {{attendee.status}}</h5>
          </div>
        </v-banner>
        <v-divider></v-divider>
      </li>

    </ul>
    </div>
       <div class="my-10 ">
         <v-btn class="primary d-block float-right backBtn" to="/event">back</v-btn>
       </div>
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
    //this.getAttendeeList()
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
    },


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

.profileBox{
  height: 104px;
}

.bg{
  background-image: url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
  //background-color: darkgrey;
  background-size:     cover;                      /* <------ */
  background-repeat:   no-repeat;
  background-position: center center;
}

.backBtn{
  line-height: 36px;
}
</style>