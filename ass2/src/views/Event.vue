<template>
    <v-container class="mt-8">

        <EventFinder />
        <v-chip link  pill class="mr-5 pill error" >
            <router-link to="/manageEvent">My Events</router-link>
        </v-chip>

        <v-chip class="mr-5 orange" >
            <router-link to="/addEvent">Creat Event</router-link>
        </v-chip>

      <router-view></router-view>
    <EventCard></EventCard>

    </v-container>



</template>



<script>
    import EventFinder from '@/components/EventsFinder'
   //import EventDisplay from '@/components/EventDisplay'
    import EventCard from "@/components/EventCard";
   // import AddEvent from "@/components/AddEvent"
    export default{
        name:"Event",
        data:()=>{
            return {

            }
        },
        components:{
            EventFinder,
            EventCard
        },
        methods:{

        }
    }
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.pill{
  background-color: #90caf9;
}
</style>