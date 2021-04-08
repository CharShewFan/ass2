<template>
<div>
    <v-container>
        <v-card mx="auto" max-width="344">
            <v-img src=""https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
            <v-card-title>Hello world #here binding the event name</v-card-title>
            <v-card-subtitle>event id here</v-card-subtitle>
            <v-card-subtitle>event location here</v-card-subtitle>
            <v-card-subtitle>event time here</v-card-subtitle>
            <v-card-subtitle>event organizer here</v-card-subtitle>
            <v-card-actions>
                <v-btn text @click="join()">Join Now</v-btn>
                <v-btn text color = "warning" @click='leave()'>Leave This Event</v-btn>
           
            <v-spacer></v-spacer>
            <v-card-subtitle>Description</v-card-subtitle>
            <v-btn icon @click = "show = !show"><v-icon>{{show? 'mdi-chevron-up':'mdi-chevron-down'}}</v-icon></v-btn>
            </v-card-actions>

            <v-expend-transition>
                <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                         ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                         Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </v-card-text>
                </div>
            </v-expend-transition>
        </v-card>
    </v-container>
</div>
</template>

<script>
    import axios from 'axios'
    export default{
        name:"EventDisplay",
        data:()=>{
            
        },
        methods:{
            join(){
                return null
            },
        }
    }
</script>