<template>
<div class="container">
    <v-banner   elevation="12"
                class="mt-3"
                sticky>
        <v-chip link pill class="primary mr-10">
            Event I Hosted
        </v-chip>

    </v-banner>
  <EventCard />
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

    import EventCard from "@/components/EventCard";

    export default{
        name:"ManageEvent",
        data(){
            return{

            }
        },
        components: {
          EventCard
        },

      methods:{

      },
      computed:{

      }
    }
    

</script>