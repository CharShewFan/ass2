<template>
<div >
<v-form>
    <v-container>
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

    </v-container>
</v-form>
</div>
</template>
  
  <script>
    export default {
      name: 'EventsFinder',
  
      data: () => ({
        items:[1,2,3,4,5,6,7],
        cid_1 : "",
        cid_2 : "",
        query : ""

      })
    }
  </script>
  