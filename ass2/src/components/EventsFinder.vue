<template>
<div >
  <!-- query search box -->
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header class="text-subtitle-1 ">
        Search By Conditions
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form class="mx-auto">
          <v-container >
            <v-row>
              <v-col
                  cols = "12"
                  sm = "12"
                  md = "4"
                  lg = "3"
              >
                <v-text-field label = "query string" v-model = "query" clearable solo> </v-text-field>
              </v-col>



                <v-col sm="12" md="6" lg="4" xl="3">
                  <v-autocomplete
                      chips
                      clearable
                      deletable-chips
                      filled
                      multiple
                      small-chips
                      solo
                      v-model="categories"


                      :items = cateItem
                      label = "categories"
                      allow-overflow

                  >
                  </v-autocomplete>

              </v-col>
            </v-row>


            <v-row>
              <v-col
                  cols = "12"
                  sm = "12"
                  md = "4"
                  lg = "3"
              >
                <v-text-field label="startIndex" v-model="startIndex" clearable solo></v-text-field>
              </v-col >
              <v-col
                  cols = "12"
                  sm = "12"
                  md = "4"
                  lg = "3"
              >
                <v-text-field label="Organizer ID" v-model="organizerId" clearable solo></v-text-field>
              </v-col >

              <v-col
                  cols = "12"
                  sm = "12"
                  md = "4"
                  lg = "3"
              >

                <v-select :items = "countList" label="count" v-model="count" clearable solo></v-select>
              </v-col>

              <v-col cols = "12" sm = "12" md = "4" lg = "3">
                <v-select :items = "sortByList" label="sort by" v-model="sortBy" clearable solo></v-select>
              </v-col>
            </v-row>
            <div class="mx-auto my-2">
              <v-btn  @click="search()" class="primary float-right">
                search
              </v-btn>
            </div>

          </v-container>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>


<!-- a event display box -->
<v-container>

</v-container>

</div>
</template>
  
  <script>

  import store from '../store'
    import axios from "axios"
  //const url = require('url')
    export default {
      name: 'EventsFinder',

      data: () => ({
        items: [1, 2, 3, 4, 5, 6, 7],
        query: "",
        startIndex: "",
        organizerId:"",
        countList: [5, 10, 20, 50],
        count: "",
        sortByList: ["DATE_ASC", "DATE_DESC", "ALPHABET_ASC", "ALPHABET_DESC"],
        sortBy: "",
        categories: [],
        cateItem: [],
        cateID:[]
      }),

        mounted() {
          this.getCates()
        },

        methods: {
          search() {
            //category -> category ID
            console.log(this.categories)
            this.categories.forEach(item=>{
              for(let i = 0; i < 24; i ++){
                if(item === store.getters.getUpdate[i].name){
                  this.cateID.push(i+1)
                }
              }
              console.log("hello hello")
              console.log(this.cateID)
            })

            // query generator
            let params = new URLSearchParams();
            // let queries = []
            if(this.query !== ""){
              params.append("q",this.query)
            }
            if(this.cateID !== []){
              this.cateID.forEach(num=>{
                params.append("categoryIds",num)
              })
            }
            if(this.organizerId !== ""){
              params.append('organizerId',this.organizerId)
            }
            if(this.sortBy !== ""){
              params.append("sortBy",this.sortBy)
            }
            if(this.count !== ""){
              params.append("count",this.count)
            }
            if(this.startIndex !== ""){
              params.append("startIndex",this.startIndex)
            }

            //check params
            console.log(params)


            //generate Params
            console.log(params.toString());

            //axios request
            axios.get('http://localhost:4941/api/v1/events', {params})
            .then(response=>{
              console.log(response.data)
              this.$store.dispatch("searchFeedBack",response.data)
            }).catch(e=>{
              console.log(e)
            })
          },


          getCates() {
            let list = store.getters.getUpdate
            list.forEach(item => {
              this.cateItem.push(item.name)
            })
          }
        }
    }
  </script>


  