<template>
    <v-container class="mt-8">
        <EventFinder />
        <EventDisplay/>
    </v-container>



</template>



<script>
    import EventFinder from '@/components/EventsFinder'
    import EventDisplay from '@/components/EventDisplay'
    export default{
        name:"Event",
        data:()=>{
            
        },
        components:{
            EventDisplay,
            EventFinder
        },
        methods:{

        }
    }
</script>