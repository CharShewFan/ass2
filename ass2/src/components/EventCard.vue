<template>
<div>

<v-container class="my-5">

  <v-row>
    <v-col sm="12" md="4" lg="3" xl="3"  v-for="event in displayLists" :key="event.index" >
      <v-card >
        <v-img
            class="align-end imgText"
            height="200px"
            :src="require('../assets/userProfileImg.jpeg')"
        >
          <v-card-title @click="toTop"><router-link :to="`/event/${event.eventId}/detail`" > {{event.title}}</router-link></v-card-title>
        </v-img>
<!--        "{name:`/event`,params:{id:event.eventId}}"-->

        <v-card-subtitle class="pb-4" >Event ID: {{event.eventId}}</v-card-subtitle>

        <v-card-text class="text--primary textCard" >
          <div>capacity: {{event.capacity}}</div>
          <div>organizer: {{event.organizerFirstName}} {{event.organizerLastName}}</div>
          <div>attendants: {{event.numAcceptedAttendees}}</div>
          <div>categories: {{ event.categories | convert}}</div>

        </v-card-text>

        <v-card-actions class="btn-box">
          <v-btn color="error" @click="join(event.eventId)" class="btn-join" >Join Now</v-btn>
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


import axios from "axios";
import store from "../store"
import {mapActions,mapGetters} from "vuex"

export default {
  name: "EventCard",
  components:{
    
  },

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
    }
  },

  data(){
    return{

      show: false,
      length:0,
      lists :[],
      page:1,
      displayLists:[],
      cateList:[],
      pageSize:10,
      categoriesList:["Outdoors & Adventure","Tech","Family","Health & Wellness","Sports & Fitness",
        "Learning","Photography","Food & Drink","Writing","Language & Culture",
        "Music","Movements","LGBTQ","Film","Sci-Fi & Games","Beliefs","Arts","Book clubs","Dance","Pets","Hobbies & Crafts","Fashion & Beauty",
          "Social","Career & Business"
      ]
    }
  },


beforeMount() {
  this.getEvents();
  this.getName(localStorage.getItem("userId"))
},

  mounted:function() {
    this.getEvents()
    this.getCategories()
    this.getName(localStorage.getItem("userId"))

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
    ...mapActions(["getCategories","getEvents","getName"]), // this VueX action retrieve event data from server

    join(id){
      let current = new Date();
      //console. log(current)

      let time = current.toString();
      let list = time.split(" ")

     // console.log(localStorage.getItem("userId"))
     //  console.log(store.getters.isFirstName)
     //
     //  console.log(store.getters.isLastName)
     //  console.log(store.getters.isLogIn)
     //  console.log(list)

      const strings = list[3]+"-"+"05"+"-"+list[2]+"T"+list[4]+".000Z"
      // console.log(strings)
      // console.log(id)
      if(store.getters.isLogIn === true){
        axios.post(`http://localhost:4941/api/v1/events/${id}/attendees`,{
          "attendeeId": localStorage.getItem("userId"),
          "firstName": store.getters.isFirstName,
          "lastName": store.getters.isLastName,
          "dateOfInterest":strings,
          "status": "accepted"
        }).then(response=>{
          if(response.status === 200){
            alert(" Join Successfully")
          }
          if(response.status == 403){
            alert("You already Joined")
          }
        })
      }else{
        this.$router.push({path:'/login'})
        //this.$router.push({ name: 'name', query: { redirect: '/path' } });
      }

    },

    pageChange(pageNumber){
      this.displayLists = this.lists.slice(this.pageSize*(pageNumber - 1),this.pageSize * (pageNumber));
    },

    toTop () {
      this.$vuetify.goTo(0)
    }





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

.btn-box{
  display: flex;
}

.btn-join{
  display: block;
  float: right;
}
</style>