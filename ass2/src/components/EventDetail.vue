<template>
<div>
  <Card :event="this.event" btnName="Collapse" ></Card>
<!--  <div>{{event}}</div>-->
</div>

</template>

<script>
import axios from 'axios'
import Card from "../components/Card"
export default {


name: "EventDetail",
  data(){
  return {
    event:[]
  }
  },
  components: {
    Card
  },

  mounted() {
  this.getEventDetail()
  },

  updated() {
    this.getEventDetail()
  },


  methods:{
  getEventDetail(){
    let id = this.$route.params.id
    console.log(id)
    axios.get(`http://localhost:4941/api/v1/events/${id}`).then(response=>{
      this.event = response.data;
      console.log(response.data)
    })
  }
  }
}
</script>



<style scoped>

</style>