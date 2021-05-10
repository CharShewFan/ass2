<template>
<div class="container">
    <v-banner   elevation="12"
                class="mt-3"
                sticky>
        <v-chip link pill class="orange mr-10">
            <router-link to="/">Event I Hosted</router-link>
        </v-chip>

        <v-chip link pill class="error">
            <router-link to="/">Event I Join</router-link>
        </v-chip>
    </v-banner>

    <div class="contentBox">
        <router-view />

    </div>
</div>
</template>

<script>
    
    export default{
        name:"ManageEvent",
        data(){
            return{

            }
        }
    }
    

</script>