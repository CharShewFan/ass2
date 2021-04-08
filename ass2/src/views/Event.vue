<template>
    <v-container class="mt-8">
        <EventFinder />

      <EventCard></EventCard>
      <v-divider></v-divider>

    </v-container>



</template>



<script>
    import EventFinder from '@/components/EventsFinder'
   //import EventDisplay from '@/components/EventDisplay'
    import EventCard from "@/components/EventCard";
    export default{
        name:"Event",
        data:()=>{
            
        },
        components:{

            EventFinder,
            EventCard
        },
        methods:{

        }
    }
</script>