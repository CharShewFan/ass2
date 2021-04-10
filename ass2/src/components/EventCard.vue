<template>
<div>
<v-container class="my-5">
  <v-row>
    <v-col sm="12" md="4" lg="4" xl="4"  v-for="event in newList" :key="event.index" >
      <v-card>
        <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>{{event.title}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-4">{{event.category}}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>capacity: {{event.capacity}}</div>
<!--          <div>{{event.location}}</div>-->
          <div>organizer: {{event.organizerFirstName}} {{event.organizerLastName}}</div>
          <div>attendants: {{event.numAcceptedAttendees}}</div>
          <div>categories: {{event.categories.toString()}}</div>

        </v-card-text>

        <v-card-actions>
          <v-btn color="error" text >Join Now</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{show ? 'mdi-chevron-up':'mdi-chevron-down'}}</v-icon>
            </v-btn>

        </v-card-actions>




        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              {{event.description}}
            </v-card-text>
          </div>
        </v-expand-transition>


      </v-card>
    </v-col>
  </v-row>

  <div class="text-center mt-15">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
                v-model="currentPage"
                class="my-4"
                :length="this.pageShown"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>

</v-container>




</div>
</template>


<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: "EventCard",
  data(){
    return{

      show: false,
      pageShown:0,
      totalEvents : [],
      numPerPage:5,
      currentPage:1,
      newList:[]



    }
  },

  created() {
    this.getEvents()
  },

  beforeMount() {

  },

  mounted() {
    this.selectEvent()
  },

  computed:{
    ...mapGetters(["allEvents","displayEvents"]),
  },
   // getPageNum(){
   //    return this.pageNumber = Math.ceil(this.events.length / this.pageSize)
   // }

  methods:{
    ...mapActions(["getEvents","selectEvent"]),

    getPageNum(){
      console.log(this.allEvents)
      return this.pageShown = 5  //Math.ceil(this.allEvents.length / 5)
    },

    newArray(){
      for(let i = 0; i < this.numPerPage; i ++){
        this.newList.push(this.allEvents[i])
      }
      console.log(this.newList)
      return this.newList
    }

  }
}
</script>

<style scoped>

</style>