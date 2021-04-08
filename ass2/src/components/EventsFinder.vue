<template>
<div >
  <!-- query search box -->
<v-form class="mx-auto">
    <v-container >
      <v-row>

        <v-col
            cols = "12"
            sm = "12"
            md = "4"
            lg = "3"
        >
        <v-text-field label = "query string" v-model = "query"> </v-text-field>
        </v-col>

        <v-col  
        cols = "12"
        sm = "12"
        md = "4"
        lg = "3">
        <v-select :items="items" label="catergory id" v-model = "cid_1"></v-select>
        </v-col>

        <v-col  
        cols = "12"
        sm = "12"
        md = "4"
        lg = "3">
        <v-select :items="items" label="catergory id" v-model = "cid_2"></v-select>
        </v-col>

      </v-row>

      <v-row>
        <v-col
        cols = "12"
        sm = "12"
        md = "4"
        lg = "3"
        >
        <v-text-field label="startIndex" v-model="startIndex"></v-text-field>
      </v-col >
          
      <v-col
      cols = "12"
      sm = "12"
      md = "4"
      lg = "3"
      >
    
      <v-text-field label="count" v-model = "count"></v-text-field>
    </v-col>

    <v-col cols = "12" sm = "12" md = "4" lg = "3">
      <v-select :item = "sortByList" label="sort by" v-model="sortBy"></v-select>
    </v-col>
      </v-row>

    </v-container>

    <v-btn  @click="search()" class="mx-auto">
      search
    </v-btn>


</v-form>
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
         
          
        }
      }
    }
  </script>
  