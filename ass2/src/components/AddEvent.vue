<template>
<div>
    <v-form v-model="valid">
        <v-container>
            <h3  class="my-16">Input the form below</h3>
            <v-row>
                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-text-field 
                        v-model="title"
                        label="Title:"
                        required
                        solo
                    >
                </v-text-field>
                </v-col>
                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-text-field 
                        v-model="description"
                        label="description"
                        required
                        solo
                    >
                </v-text-field>
                </v-col>
                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-text-field 
                        v-model="url"
                        label="url"
                        required
                        solo
                    >
                </v-text-field>
                </v-col>
                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-text-field 
                        v-model="capacity"
                        label="capacity"
                        required
                        solo
                    >
                </v-text-field>
                </v-col>

                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-text-field 
                        v-model="fee"
                        label="fee"
                        required
                        solo
                    >
                </v-text-field>
                </v-col>

                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-autocomplete
                    chips
                    clearable
                    deletable-chips
                    filled
                    multiple
                    rounded
                    small-chips
                    solo
                    v-model="catogories"
                    :items = items
                    item-value = item.value
                    item-text = item.id
                    label = "categories"
                    >

                    </v-autocomplete>
                </v-col>

                <v-col sm="12" md="6" lg="4" xl="3">

                </v-col>

                <v-col sm="12" md="6" lg="4" xl="3">

                </v-col>

                <v-col sm="12" md="6" lg="4" xl="3">

                </v-col>

                <v-col sm="12" md="6" lg="4" xl="3">

                </v-col>
            </v-row>
        </v-container>
    </v-form>
</div>
</template>

<script>
    //import axios from 'axiso'
    export default{

        name:"addEvent",
        data(){
            return{
                title:"",
                description:"",
                url:"",
                capacity:"",
                fee:"",
                items:["aniaml","human right" ,"earthquake","forest"],
                catogories:[]
            };
        },

        methods:{
        //    add(){
        //        const response = axios.post("/event",{id:"1"})
        //    }
        }
    }
</script>