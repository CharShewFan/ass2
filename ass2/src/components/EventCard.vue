<template>
<div>
<v-container class="my-5">

  <v-row>
    <v-col sm="12" md="4" lg="3" xl="3"  v-for="event in totalEvents" :key="event.index" >
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
                :length="this.pageLength"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>

 <h1 class="mx-auto" >{{this.currentPage}}</h1>
</v-container>




</div>
</template>


<script>


import axios from "axios";

export default {
  name: "EventCard",
  data(){
    return{

      show: false,
      pageLength:10,
      totalEvents : [],
      numPerPage:5,
      currentPage:1,
      newList:[],
      pageNum:0,

      selected:[{
        "name":"5",
        "value":5
      }],

      items:[
        {
          "name":"5",
          "value":5
        },

        {"name":"10",
          "value":10
        },
        {"name":"20",
          "value":20
        }
      ],




    }
  },

  created() {
    this.getEvents()
  },

  beforeMount() {
    //this.getPageNum();
   // this.newArray()
  },

  mounted() {
   // this.getPageNum();
  },

  computed:{

  },
   // getPageNum(){
   //    return this.pageNumber = Math.ceil(this.events.length / this.pageSize)
   // }

  methods:{
     async getEvents(){
      try{
        const response = await axios.get('/events')
        console.log("hello mother fucker")
        this.totalEvents = response.data
        this.pageLength = Math.ceil(response.data.length / this.numPerPage)

       // console.log( this.totalEvents)
       // console.log( this.pageLength)


      }catch(err){
        console.log(err)
      }
    },

    changePagi(){
      this.numPerPage = this.selected
      console.log( this.numPerPage)
      console.log( "=========================")
      this.pageLength = Math.ceil(this.totalEvents.length / this.numPerPage)
     console.log( "=========================")
      console.log( this.pageLength)
    },

    async getPageNum(){
      try{
        console.log((this.totalEvents).length)
         if(this.totalEvents.length !== 0){
          return this.pageNum = Math.ceil(this.totalEvents.length / this.numPerPage)
        }
      }catch(e){
        console.log(e)
      }
    },

    newArray(){
      for(let i = 0; i < this.numPerPage; i ++){
        this.newList.push(this.totalEvents[i])
      }
      console.log(this.newList)
      return this.newList
    }

  }
}
</script>

<style scoped>

</style>