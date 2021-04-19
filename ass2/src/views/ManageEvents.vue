<template>
<div class="contianer">
    <v-bar>
        <v-chip>
            <router-link to="/">Event I Hosted</router-link>
        </v-chip>

        <v-chip>
            <router-link to="/">Event I Join</router-link>
        </v-chip>
    </v-bar>

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