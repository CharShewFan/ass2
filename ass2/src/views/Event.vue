<template>
    <v-container class="mt-8">
        <EventFinder />

      <EventCard></EventCard>


    </v-container>



</template>



<script>
    import EventFinder from '@/components/EventsFinder'
   //import EventDisplay from '@/components/EventDisplay'
    import EventCard from "@/components/EventCard";
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