<template>
<div>

<v-container class="my-5">

  <v-row>
    <v-col sm="12" md="4" lg="3" xl="3"  v-for="event in displayLists" :key="event.index" >
      <v-card>
        <v-img
            class="align-end imgText"
            height="200px"
            src="https://picsum.photos/500/300?image=40"
            
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
          <v-btn color="error" @click="join" >Join Now</v-btn>
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
                v-model="page"
                class="my-4"
                :length="length"
                @input="pageChange"
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


import axios from "axios";
import {mapActions,mapGetters} from "vuex"

export default {
  name: "EventCard",
  components:{
    
  },
  data(){
    return{

      show: false,
      length:0,
      lists :[],
      page:1,
      displayLists:[],
      cateList:[],
      pageSize:5
    }
  },





  mounted:function() {
    this.getEvents(),
    this.getCategories(),

    this.lists = this.$store.getters.allEvents
    this.length = Math.ceil(this.lists.length / this.pageSize);
    this.displayLists = this.lists.slice(this.pageSize * (this.page - 1), this.pageSize * (this.page));
  },

  computed:{
    match:(index)=>{
      return this.cateList[index]
    },
    ...mapGetters(['getUpdate']),

  },

  methods:{
    ...mapActions(["getCategories","getEvents"]), // this VueX action retrieve event data from server

    join(){
      axios.post('/events',{"hello":"world"})
    },

    pageChange(pageNumber){
      this.displayLists = this.lists.slice(this.pageSize*(pageNumber - 1),this.pageSize * (pageNumber));
    },





  }
}
</script>

<style scoped>
.imgText{
color:#ff5252
}
</style>