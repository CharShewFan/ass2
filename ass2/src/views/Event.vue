<template>
    <v-container>
        <EventFinda/>
        <EventsDisplay/>
    </v-container>



</template>



<script>
    import EventFinder from '../components/EventFinder'
    import EventDisplay from '../components/EventsDisplay'
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