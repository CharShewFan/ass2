<template>
<div>
    <v-form >
        <v-container>
            <h3  class="my-16">Input the form below</h3>
            <v-row>
                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-text-field 
                        v-model="title"
                        label="Title:"
                        required
                        outlined
                    >
                </v-text-field>
                </v-col>
                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-text-field 
                        v-model="description"
                        label="description"
                        required
                        outlined
                    >
                </v-text-field>
                </v-col>
                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-text-field 
                        v-model="url"
                        label="url"
                        required
                        outlined
                    >
                </v-text-field>
                </v-col>
                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-text-field 
                        v-model="capacity"
                        label="capacity"
                        required
                        outlined
                    >
                </v-text-field>
                </v-col>

                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-text-field 
                        v-model="fee"
                        label="fee"
                        required
                        outlined
                    >
                </v-text-field>
                </v-col>

                <v-col sm="12" md="6" lg="4" xl="3">
                    <v-autocomplete
                    chips
                    clearable
                    deletable-chips
                    multiple
                    small-chips
                    outlined
                    v-model="catogories"
                    :items = items
                    item-value = item.value
                    item-text = item.id
                    label = "categories *(require)"
                    >

                    </v-autocomplete>
                </v-col>

              <v-col sm="12" md="6" lg="4" xl="3">
                <v-select
                    :items="items"
                    label="Online ?"
                    outlined
                ></v-select>
              </v-col>


              <v-col sm="12" md="6" lg="4" xl="3">
                <v-text-field
                    v-model="location"
                    label="Location"

                    outlined
                >
                </v-text-field>
              </v-col>

              <v-col sm="12" md="6" lg="4" xl="3">
                <v-date-picker v-model="picker"></v-date-picker>
              </v-col>

                <v-col sm="12" md="6" lg="4" xl="3">
                   <v-btn @click="add()" color="primary" class="float-right">Add Event</v-btn>
                </v-col>



            </v-row>
        </v-container>
    </v-form>
</div>
</template>

<script>

    import axios from 'axios'
    export default{

        name:"addEvent",
        data:()=>({
            
                title:"",
                description:"",
                url:"",
                capacity:"",
                fee:"",
                venue:"",
                items:["aniaml","human right" ,"earthquake","forest"],
                catogories:[],
                //picker:""
                picker: new Date().toISOString().substr(0, 10),
           
        }),

        beforeMount(){
            this.getCate()
        },

        methods:{
            getCate(){
                axios.get("http://localhost:4941/api/v1/events/categories").then((response)=>{
                    console.log(response.data)
                    this.catogories.push(response)
                }).catch((e)=>{
                    console.log(e)
                }    
                )
            },

            add(){

            if (this.title !== "" && this.description !== "" && this.picker !== ""){
                axios.post(   
                    "/event",{
                    "q":this.query,
                    "categoryid":this.cid_1,
                    "categoryid2":this.cid_2,
                    "startIndex":this.startIndex,
                    "count":this.count,
                    "sortBy":this.sortBy
                }).then((response) =>{
                    console.log(response)
                }).catch((e)=>{
                    console.log(e)
                })
            }else{
                alert("please fill in the require files")
            }


        },
    }
}

</script>