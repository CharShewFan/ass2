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

                <v-col sm="12" md="6" lg="4" xl="3" cols="12">
                    <v-text-field 
                        v-model="fee"
                        label="fee"
                        required
                        outlined
                        prefix="$"
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
                    v-model="categories"
                    :items = items
                    label = "categories *(require)"
                    >

                    </v-autocomplete>
                </v-col>

              <v-col sm="12" md="6" lg="4" xl="3">
                <v-select
                    :items="onlineCheckBox"
                    label="Online ?"
                    outlined
                    v-model="online"
                ></v-select>
              </v-col>

              <v-col sm="12" md="6" lg="4" xl="3">
                <v-select
                    :items="onlineCheckBox"
                    label="attendant control ?"
                    outlined
                    v-model="controls"
                ></v-select>
              </v-col>


              <v-col sm="12" md="12" lg="12" xl="12">
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

              <v-col sm="12" md="6" lg="4" xl="3" >
                <v-time-picker
                    format="24hr"
                    landscape
                    v-model="time"
                >
                </v-time-picker>
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
                capacity:0,
                fee:"",
                items:["Outdoors & Adventure","Tech","Family","Health & Wellness","Sports & Fitness",
                  "Learning","Photography","Food & Drink","Writing","Language & Culture",
                  "Music","Movements","LGBTQ","Film","Sci-Fi & Games","Beliefs","Arts","Book clubs","Dance","Pets","Hobbies & Crafts","Fashion & Beauty",
                  "Social","Career & Business"
                ],
                onlineCheckBox:["Yes","No"],
                categories:[],
                //picker:""
                picker: new Date().toISOString().substr(0, 10),
                location:"",
                online:"",
                time:"",
                controls:""
        }),

        beforeMount(){
            this.getCate()
        },

        methods:{
            getCate(){
                axios.get("http://localhost:4941/api/v1/events/categories").then((response)=>{
                   // console.log(response.data)
                    this.catogories.push(response)
                }).catch((e)=>{
                    console.log(e)
                }    
                )
            },

          // "title": "Film Club",
          // "description": "Meetup with others to watch interesting movies.",
          // "venue": "Haere-roa",
          // "categoryIds": [14,17,23],
          // "date": "2021-07-02 18:25:00"
            add(){
              axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token");
              //sort categories
              let cateArray = []
              for(let i = 0 ; i < this.categories.length ; i ++){
                //console.log(this.categories[i])
                cateArray.push(this.items.indexOf(this.categories[i])+1)
              }
              //console.log(cateArray)
              //sort dates
              let dates = this.picker +" " + this.time + ":"+"00"


4
              if(this.title !== "" && this.description !== "" && this.categories !== "" && this.picker !== "" && this.picker !== undefined && this.time !== undefined){
                //on site event
                if(this.online === "NO" || this.online === undefined){
                  if(this.location === "" || this.location === undefined){
                    alert("please fill a location")
                  }else{
                    //return 0 and 1;
                    this.controls = this.controls === "YES";
                    this.online = this.online === "YES";

                    axios.post("http://localhost:4941/api/v1/events",{
                      "title":this.title,
                      "description":this.description,
                      "venue":this.location,
                      "categoryIds":cateArray,
                      "date":dates,
                      "fee":parseFloat(this.fee),
                      "capacity":parseInt(this.capacity),
                      "requiresAttendanceControl":this.controls,
                      "isOnline":this.online
                    }).then(
                        response=>{
                          console.log(response)
                          alert(response)
                        }
                    ).catch(err=>{
                      console.log(err)
                      alert(err)
                    })
                  }
                }else{
                  //return 0 and 1;
                  this.controls = this.controls === "YES";
                  this.online = this.online === "YES";

                  //online event
                  axios.post("http://localhost:4941/api/v1/events",{
                    "title":this.title,
                    "description":this.description,
                    "categoryIds":cateArray,
                    "date":dates,
                    "fee":parseFloat(this.fee),
                    "capacity":parseInt(this.capacity),
                    "requiresAttendanceControl":this.controls,
                    "isOnline" : this.online,
                    "venue":this.location,

                  }).then(
                      response=>{
                        console.log(response)
                        alert(response.data)
                      }
                  ).catch(err=>{
                    console.log(err)
                    alert(err)
                  })

                }
              }else{
                alert("please fill the required fields")
              }
        },

          checkData(){
            let dates = this.picker +" " + this.time + ":"+"00"
            console.log(this.title)
            console.log(this.description)
            console.log(this.url)
            console.log(this.categories)
            console.log(this.capacity)
            console.log(this.fee)
            console.log(this.time)
            console.log(dates)
            console.log(this.online)
            console.log(this.picker)
            console.log(this.location)


          }
    }
}

</script>