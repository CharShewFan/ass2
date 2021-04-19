<template>
    <v-container class="mt-8">
        <EventFinder />
        <v-chip>
            <router-link to="/manageEvent">My Events</router-link>
        </v-chip>

        <v-chip>
            <router-link to="/addEvent">Creat Event</router-link>
        </v-chip>

      <EventCard></EventCard>
      <AddEvent></AddEvent>
    


    </v-container>



</template>



<script>
    import EventFinder from '@/components/EventsFinder'
   //import EventDisplay from '@/components/EventDisplay'
    import EventCard from "@/components/EventCard";
    import AddEvent from "@/components/AddEvent"
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