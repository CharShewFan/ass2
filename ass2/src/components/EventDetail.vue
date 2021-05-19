<template>
<div>
  <Card :event="this.event" btnName="Collapse" btn-name2="Join" :hiddd-join-btn="this.expried"></Card>
</div>

</template>

<script>
import axios from 'axios'
import Card from "../components/Card"
export default {


name: "EventDetail",
  data(){
  return {
    event:Object,
    status:"",
    expried:Boolean
  }
  },
  components: {
    Card
  },

  watch:{
    '$route.params.id': function () {
      this.getEventDetail()

    }
  },


  mounted() {
    this.getEventDetail()

  },

  updated() {
    //this.getEventDetail()
  },





  methods:{
  getEventDetail(){
    let id = this.$route.params.id
    //console.log(id)
    axios.get(`http://localhost:4941/api/v1/events/${id}`).then(response=>{
      this.event = response.data;
      console.log(response.data)
      console.log(typeof (this.event.categories))
      this.checkExpried()
    }).catch(err=>{
      console.log(err)
    })
  },

    //date: "2021-05-05T19:00:00.000Z"

    checkExpried(){
   // console.log("hhhhhh")
     // console.log(this.event.date)
      const eventDate = new Date(this.event.date)
      const now = new Date()
      this.expried = !(now - eventDate > 0)
      //console.log(now - eventDate)
     // console.log(this.expried)
      //console.log("hhhhhh")
    }





  }
}
</script>



<style scoped>

</style>