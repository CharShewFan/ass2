<template>
<div class="container">

<vue-confirm-dialog></vue-confirm-dialog>
  <div class="row">
    <div class="column">

      <v-banner   elevation="6"
                  class="mt-3"
                  sticky>
        <v-chip link pill class="primary mx-auto">
          Event I Host
        </v-chip>
      </v-banner>

        <div v-for="event in eventList" :key="event.index">
          <v-card
              class="mx-auto my-5"
              max-width="400"

          >
            <v-img
                class="white--text align-end image"
                height="200px"
                :src="`http://localhost:4941/api/v1/events/${event.eventId}/image`" >
              <v-card-title>{{event.title}}</v-card-title>
            </v-img>

            <v-card-subtitle>Organizer:{{event.organizerFirstName}} {{event.organizerLastName}}</v-card-subtitle>
            <v-card-text>
              <div>capacity:{{event.capacity}}</div>
              <div>date:{{event.date}}</div>
              <div>Categories:{{event.categories}}</div>
              <div>Attendees:{{event.numAcceptedAttendees}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn class="primary" :to="`/manageEvent/${event.eventId}/edit`">
                edit
              </v-btn>
<!--              <v-btn class="error float-right" @click="deleteEvent(event.eventId)" >delete</v-btn>-->
              <v-btn class="error" @click="handleClick(event.eventId)">delete</v-btn>
              <v-btn class="warning" :to="`/manageAttendees/${event.eventId}/edit`">manage attendees</v-btn>
            </v-card-actions>
          </v-card>
        </div>



    </div>
    <div class="column">
      <v-banner
          elevation="12"
          class="mt-3"
          sticky>
        <v-chip link pill class="error">
          Event I Join
        </v-chip>
      </v-banner>
    </div>
  </div>

</div>
</template>

<script>

    import {mapActions} from 'vuex'
    import axios from 'axios'

    export default{
        name:"ManageEvent",
        data(){
            return{
              eventList:[]
            }
        },
        components: {
        },


      created(){
        this.hostedEvent();
      },

      watch:{
          deep:true,
        // eslint-disable-next-line no-unused-vars
          check(newValue,oldValue){
            this.eventList = newValue;
          }
      },


      computed:{
       check(){
         return this.$store.getters.getHosted();
       }
      },



      methods:{
          ...mapActions(["hostedEvent"]),
        deleteEvent(id){
          axios.defaults.headers.common["X-Authorization"] = localStorage.getItem("token")
          axios.delete(`http://localhost:4941/api/v1/events/${id}`).then(res=>{
              console.log(res)
              alert("Delete Successfully")
              this.hostedEvent();
            }).catch(err=>{
              console.log(err)
            alert(err)
            })

        },

        handleClick(id){
            this.$confirm({
              message:`Do You Confirm Deleting This Event ?`,
              button:{
                no:"No",
                yes:"Yes"
              },

              callback:confirm =>{
                if(confirm){
                  this.deleteEvent(id)
                }

              }
            })
        }

      },

    }
    

</script>

<style scoped>
.column{
  float:left;
  width: 50%;
}

.row:after{

  clear:both;

}

.image{
  background-image:url("https://cdn.vuetifyjs.com/images/cards/docks.jpg") ;
}



</style>