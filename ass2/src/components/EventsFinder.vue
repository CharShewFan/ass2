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
    //import axios from "axios"
    export default {
      name: 'EventsFinder',

      data: () => ({
        items: [1, 2, 3, 4, 5, 6, 7],

        query: "",
        startIndex: "",
        countList: [5, 10, 20, 50],
        count: "",
        sortByList: ["DATE ASC", "DATE DESC", "ALPHABET ASC", "ALPHABET DESC"],
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
            // const url = require('url');
            // const params = new url.URLSearchParams({ q: this.query ,categoryIds:"1"});
            // axios.post('http://something.com/', params.toString());

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
            //
            // axios.get(
            //     "/event", {
            //       "q": this.query,
            //       "categoryid": this.cid_1,
            //       "categoryid2": this.cid_2,
            //       "startIndex": this.startIndex,
            //       "count": this.count,
            //       "sortBy": this.sortBy
            //     }).then((response) => {
            //   console.log(response)
            // }).catch((e) => {
            //   console.log(e)
            // })


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


  