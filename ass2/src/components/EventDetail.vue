<template>
<div>
  <Card :event="this.event" btnName="Collapse" btn-name2="Join" ></Card>
</div>

</template>

<script>
import axios from 'axios'
import Card from "../components/Card"
export default {


name: "EventDetail",
  data(){
  return {
    event:[],
    status:""
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
    }).catch(err=>{
      console.log(err)
    })
  },





  }
}
</script>



<style scoped>

</style>