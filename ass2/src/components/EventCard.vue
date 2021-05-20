<template>
<div>

<v-container class="my-5">

  <v-row>
    <v-col sm="12" md="4" lg="3" xl="3"  v-for="event in displayLists" :key="event.index" >
      <v-card>
        <v-img
            class="align-end imgText"
            height="200px"
            :src="`http://localhost:4941/api/v1/events/${event.eventId}/image`"
        >
          <v-card-title @click="toTop" class="cardTitle"><router-link :to="`/event/${event.eventId}/detail`" > {{event.title}}</router-link></v-card-title>
        </v-img>

        <v-card-subtitle class="pb-4" >Event ID: {{event.eventId}}</v-card-subtitle>

        <v-card-text class="text--primary textCard" >
          <div>capacity: {{event.capacity}}</div>
          <div>organizer: {{event.organizerFirstName}} {{event.organizerLastName}}</div>
          <div>attendants: {{event.numAcceptedAttendees}}</div>
          <div>categories: {{ event.categories | convert}}</div>
        </v-card-text>

        <v-card-actions class="btn-box">
          <v-btn color="error" :to="`/event/${event.eventId}/detail`" class="btn-join" > Details</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>

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



import {mapActions,mapGetters} from "vuex"


export default {
  //name: "EventCard",
  components:{
    
  },

  filters:{
    convert:function(categories){
      let categoriesList = ["Outdoors & Adventure","Tech","Family","Health & Wellness","Sports & Fitness",
        "Learning","Photography","Food & Drink","Writing","Language & Culture",
        "Music","Movements","LGBTQ","Film","Sci-Fi & Games","Beliefs","Arts","Book clubs","Dance","Pets","Hobbies & Crafts","Fashion & Beauty",
        "Social","Career & Business"
      ]
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
    }
  },

  data(){
    return{
      show: false,

      lists :[],
      page:1,
      displayLists:[],
      length:0,
      cateList:[],
      pageSize:10,
      categoriesList:["Outdoors & Adventure","Tech","Family","Health & Wellness","Sports & Fitness",
        "Learning","Photography","Food & Drink","Writing","Language & Culture",
        "Music","Movements","LGBTQ","Film","Sci-Fi & Games","Beliefs","Arts","Book clubs","Dance","Pets","Hobbies & Crafts","Fashion & Beauty",
          "Social","Career & Business"
      ],
    }
  },

  created() {
    this.getEvents();
    this.getName(localStorage.getItem("userId"))

  },


  mounted() {
    this.getCategories()
    this.getName(localStorage.getItem("userId"))
    console.log(this.$store.getters.allEvents)
    this.lists = this.$store.getters.allEvents
    this.length = Math.ceil(this.lists.length / this.pageSize);
    this.displayLists = this.lists.slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
  },

  computed:{
    match:(index)=>{
      return this.cateList[index]
    },
    ...mapGetters(['getUpdate']),


  },


  watch:{
  },

  methods:{
    ...mapActions(["getCategories","getEvents","getName","reqImage"]), // this VueX action retrieve event data from server
    toTop () {
      this.$vuetify.goTo(0)
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

.textCard{
  height: 150px;
}

.cardTitle{
  background-color: rgba(256,256,256,0.8);
}




.btn-join{

}
</style>