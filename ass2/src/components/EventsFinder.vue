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

              <v-col
                  cols = "12"
                  sm = "12"
                  md = "4"
                  lg = "3">
                <v-select :items="items" label="catergory id" v-model = "cid_1" clearable solo></v-select>
              </v-col>

              <v-col
                  cols = "12"
                  sm = "12"
                  md = "4"
                  lg = "3">
                <v-select :items="items" label="catergory id" v-model = "cid_2" clearable solo></v-select>
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

                <v-text-field label="count" v-model = "count" clearable solo></v-text-field>
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
    import axios from "axios"
    export default {
      name: 'EventsFinder',
  
      data: () => ({
        items:[1,2,3,4,5,6,7],
        cid_1 : "",
        cid_2 : "",
        query : "",
        startIndex:"",
        count:"",
        sortByList:["DATE ASC","DATE DESC","ALPHABET ASC","ALPHABET DESC"],
        sortBy:""

      }),

      methods:{
        search(){
          axios.post(   
            "/event",{
              "q":this.query,
              "categoryid":this.cid_1,
              "categoryid2":this.cid_2,
              "startIndex":this.startIndex,
              "count":this.count,
              "sortBy":this.sortBy
          })
         
          
        },
      }
    }
  </script>


  