<template>
<div class="container">
    <v-banner   elevation="12"
                class="mt-3"
                sticky>
        <v-chip link pill class="primary mr-10">
            Event I Hosted
        </v-chip>
    </v-banner>

  <Card btn-name="Delete" display-lists=""/>




  <v-divider />


  <v-banner
      elevation="12"
      class="mt-3"
      sticky>
        <v-chip link pill class="error">
           Event I Join
        </v-chip>
    </v-banner>

    <div class="contentBox">
        <router-view />

    </div>
</div>
</template>

<script>

//import axios from "axios"
    //import EventCard from "@/components/EventCard";
    import Card from '@/components/Card'

    export default{
        name:"ManageEvent",
        data(){
            return{

            }
        },
        components: {
          Card
        },

      methods:{
          getMyEvent(){
           let myId = localStorage.getItem("userId")
            console.log(myId)
          }
      },
      computed:{

      }
    }
    

</script>